import type { Crew } from "../types/movie";

export default function CrewInfo({ crew }: { crew: Crew[] }) {
  const director = crew.find((c) => c.job === "Director");
  const writer = crew.find(
    (c) => c.job === "Writer" || c.job === "Screenplay"
  );

  return (
    <div className="mt-6 p-10 text-sm text-gray-300">
      {director && (
        <p>
          <span className="font-semibold text-white">Director:</span>{" "}
          {director.name}
        </p>
      )}
      {writer && (
        <p>
          <span className="font-semibold text-white">Writer:</span>{" "}
          {writer.name}
        </p>
      )}
    </div>
  );
}
