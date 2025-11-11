import { Link } from "react-router-dom";

function LocationCard({ location }) {
  const id = location._id || location.id;
  const MAX_LEN = 120;
  const desc =
    location.description && location.description.length > MAX_LEN
      ? location.description.slice(0, MAX_LEN) + "…"
      : location.description;

  return (
    <Link
      to={`/locations/${id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl"
    >
      <article className="relative overflow-hidden rounded-xl surface surface-hover">
        {location.image && (
          <div className="relative">
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.05]"
              onError={(e) => {
                e.target.style.display = "none";
              }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
            <h3 className="absolute bottom-3 left-4 right-4 font-koulen text-2xl text-white drop-shadow-sm">
              {location.name}
            </h3>
          </div>
        )}

        {!location.image && (
          <h3 className="font-koulen text-2xl text-blueC px-5 pt-5">
            {location.name}
          </h3>
        )}

        <div className="p-5 pt-4">
          <p className="font-segoe text-gray-300 text-sm leading-relaxed mb-3 line-clamp-4">
            {desc}
          </p>

          {location.coordinates &&
            location.coordinates.lat &&
            location.coordinates.lng && (
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span className="inline-block">
                  📍 {location.coordinates.lat.toFixed(4)}, {""}
                  {location.coordinates.lng.toFixed(4)}
                </span>
              </div>
            )}

          <footer className="flex items-center justify-between text-[11px] text-gray-500">
            {location.createdAt && (
              <time dateTime={new Date(location.createdAt).toISOString()}>
                Added {new Date(location.createdAt).toLocaleDateString()}
              </time>
            )}
            <span className="text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
              View details →
            </span>
          </footer>
        </div>

        <div className="absolute inset-0 rounded-xl ring-1 ring-white/5 pointer-events-none" />
      </article>
    </Link>
  );
}

export default LocationCard;
