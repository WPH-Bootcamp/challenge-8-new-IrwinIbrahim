import { imageUrl } from "../lib/api";
import type { Cast } from "../types/movie";

interface Props {
  cast: Cast[];
}

export default function CastList({ cast }: Props) {
  return (
    <div className="px-15 mt-10">
      <h2 className="text-xl font-bold mb-4">Cast & Crew</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-9">
        {cast.slice(0, 12).map((c) => (
          <div key={c.id} className="flex gap-3 items-start">
            {/* Cast Photo */}
            <img
              src={
                c.profile_path
                  ? `${imageUrl}${c.profile_path}`
                  : "/avatar-placeholder.png"
              }
              className="w-30 h-30 rounded-md object-cover bg-gray-700"
            />

            {/* Cast Info */}
            <div>
              <p className="font-semibold leading-tight">{c.name}</p>
              <p className="text-sm text-gray-400">{c.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
