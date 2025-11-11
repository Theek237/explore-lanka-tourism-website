# Explore Lanka – Production Ops Cheatsheet

This repo now includes a one-off admin seeder service and a safer seeding script.

## What’s running in production (compose)

- nginx (port 80)
- frontend (served by nginx)
- backend (Node.js API)
- mongo (official `mongo:latest`, persisted to Docker named volume `mongo-data`)
- admin-seeder (one-off, only runs when you invoke the `seeder` profile)

MongoDB is NOT exposed publicly; it’s reachable by the backend at hostname `mongo` inside the compose network and its data lives in the named volume `mongo-data` on the host.

## One-off: create the admin in production

1) SSH to the EC2 host that runs the app, then go to the folder with `docker-compose.prod.yml`.

2) Run the seeder (defaults to admin@explorelanka.com / admin123):

```bash
docker compose -f docker-compose.prod.yml --profile seeder run --rm admin-seeder
```

3) (Optional) Provide your own credentials:

```bash
ADMIN_EMAIL="admin@example.com" \
ADMIN_PASSWORD="S3cureP@ssw0rd" \
docker compose -f docker-compose.prod.yml --profile seeder run --rm admin-seeder
```

The seeder is idempotent: if an admin already exists (any user with role `admin`), it will print the email and exit.

## Useful verification commands (run on the server)

```bash
# Show services
docker compose -f docker-compose.prod.yml ps

# Tail backend logs (look for "MongoDB Connected: ...")
docker compose -f docker-compose.prod.yml logs backend --tail=100

# Check environment actually seen by backend
docker compose -f docker-compose.prod.yml exec backend printenv MONGO_URI

# Inspect Mongo with mongosh inside the container
docker compose -f docker-compose.prod.yml exec mongo mongosh "mongodb://mongo:27017/explore-lanka" --eval 'db.users.find({}, {email:1, role:1}).limit(5).toArray()'
```

## Frontend API base and cookies

- The frontend is configured with `VITE_API_URL=/` so it uses relative URLs (same-origin). nginx proxies `/api` to the backend.
- The backend sets cookies with `secure: (NODE_ENV === "production")`. If you later enable HTTPS on nginx, cookies will be accepted. The app also stores JWT in localStorage on successful login as a fallback.

## Rotating secrets

- Set `JWT_SECRET` in your deployment environment (Jenkins/Ansible/host). Rotate if it was committed.
- For seeding, set `ADMIN_EMAIL`/`ADMIN_PASSWORD` when running the seeder, then change the password after first login.

## Troubleshooting

- Admin login says "Invalid admin credentials": the admin user likely doesn’t exist in prod; run the seeder as above.
- Normal users can register/login but admin fails: confirms DB is working; seed admin or ensure their `role` is `admin`.
- 401s from `/api/auth/me` after login: if running plain HTTP, the secure cookie won’t be set. The app still stores JWT in localStorage on successful login; verify the login response and localStorage. Consider adding HTTPS.
