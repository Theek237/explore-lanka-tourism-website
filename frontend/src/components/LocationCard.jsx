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
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/70 to-slate-900 border border-slate-700/60 backdrop-blur shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-slate-600">
        {location.image && (
          <div className="relative">
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-70"></div>
            <h3 className="absolute bottom-3 left-4 right-4 font-koulen text-2xl text-white drop-shadow">
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
          <p className="font-segoe text-gray-300 text-sm leading-relaxed mb-3">
            {desc}
          </p>

          {location.coordinates &&
            location.coordinates.lat &&
            location.coordinates.lng && (
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span className="inline-block">
                  📍 {location.coordinates.lat.toFixed(4)},{" "}
                  {location.coordinates.lng.toFixed(4)}
                </span>
              </div>
            )}

          <div className="flex items-center justify-between text-[11px] text-gray-500">
            {location.createdAt && (
              <span>
                Added {new Date(location.createdAt).toLocaleDateString()}
              </span>
            )}
            <span className="text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
              View details →
            </span>
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl ring-1 ring-white/5 pointer-events-none" />
      </div>
    </Link>
  );
}

export default LocationCard;
