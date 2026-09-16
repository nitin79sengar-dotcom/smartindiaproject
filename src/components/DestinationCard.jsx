import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
    console.log("destination", destination);
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Crowd Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-emerald-700 backdrop-blur">
          {destination.crowd}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {destination.name}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={14} />
              {destination.state}
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm font-semibold">
            <Star size={15} className="fill-current text-yellow-500" />
            {destination.rating}
          </div>

        </div>
<div className="mt-4 border-t border-gray-100 pt-4">

  <div className="flex items-center justify-between">

    <div>
      <p className="text-xs text-gray-500">
        Estimated from
      </p>

      <p className="font-semibold text-gray-900">
        {destination.budget}
      </p>
    </div>

    <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
      {destination.category}
    </span>

  </div>

  <Link
  to={`/destination/${destination.id}`}
  className="mt-4 block w-full rounded-xl bg-gray-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-600"
>
  Explore Destination →
</Link>
</div>
       
          </div>
    </div>
  );
}

export default DestinationCard;