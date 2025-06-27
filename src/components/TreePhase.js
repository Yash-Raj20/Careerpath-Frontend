export default function TreePhaseVisual({ phases = [] }) {
  if (!phases.length) return null;

  // Color palette for phases
  const phaseColors = [
    "from-pink-500 to-pink-400",
    "from-purple-500 to-purple-400",
    "from-blue-500 to-blue-400",
    "from-green-500 to-green-400",
    "from-yellow-500 to-yellow-400",
    "from-indigo-500 to-indigo-400",
  ];

  return (
    <div className="relative border-l-4 border-blue-500 dark:border-blue-400 pl-6 ml-2 mt-6 space-y-12">
      {phases.map((phase, index) => {
        const color = phaseColors[index % phaseColors.length];

        return (
          <div key={index} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[15px] top-2 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-white dark:border-gray-900 rounded-full z-10 shadow-md group-hover:scale-110 transition" />

            {/* Phase Card */}
            <div
              className={`bg-gradient-to-br text-white dark:text-white dark:bg-gray-900 p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out ${color}`}
              style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
              }}
            >
              {/* Phase Title */}
              <div className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
                {index + 1}. {phase.title}
              </div>

              {/* Duration */}
              {phase.duration && (
                <div className="text-sm italic opacity-90 mb-2">
                  ⏳ Duration:{" "}
                  <span className="underline">{phase.duration}</span>
                </div>
              )}

              {/* Children / Subtopics */}
              {phase.children?.length > 0 && (
                <ul className="list-disc ml-5 mt-2 space-y-1 text-sm sm:text-base">
                  {phase.children.map((child, i) => (
                    <li key={i} className="font-medium text-white/90">
                      <span>{child.title}</span>
                      {child.duration && (
                        <span className="ml-2 italic text-white/70">
                          ({child.duration})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
