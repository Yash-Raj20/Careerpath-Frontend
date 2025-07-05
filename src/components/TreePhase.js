import React, { useState } from "react";
import {
  FaRegClock,
  FaChevronDown,
  FaChevronUp,
  FaRegCircle,
} from "react-icons/fa";

export default function TreePhaseVisual({ phases = [] }) {
  const [expandedPhases, setExpandedPhases] = useState(new Set());
  const [completedPhases, setCompletedPhases] = useState(new Set());

  if (!phases.length) return null;

  const phaseColors = [
    "from-pink-500 via-rose-500 to-red-500",
    "from-purple-500 via-violet-500 to-indigo-500",
    "from-blue-500 via-cyan-500 to-teal-500",
    "from-green-500 via-emerald-500 to-teal-500",
    "from-yellow-500 via-amber-500 to-orange-500",
    "from-indigo-500 via-blue-500 to-purple-500",
    "from-pink-500 via-purple-500 to-indigo-500",
    "from-teal-500 via-cyan-500 to-blue-500"
  ];

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedPhases);
    newExpanded.has(index) ? newExpanded.delete(index) : newExpanded.add(index);
    setExpandedPhases(newExpanded);
  };

  const toggleCompleted = (index) => {
    const newCompleted = new Set(completedPhases);
    newCompleted.has(index) ? newCompleted.delete(index) : newCompleted.add(index);
    setCompletedPhases(newCompleted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Roadmap Timeline
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl">
            Your personalized roadmap with timeline
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-60"></div>

          <div className="space-y-8 sm:space-y-12">
            {phases.map((phase, index) => {
              const color = phaseColors[index % phaseColors.length];
              const isExpanded = expandedPhases.has(index);
              const hasChildren = phase.children?.length > 0;

              return (
                <div key={index} className="relative group">
                  <div className="absolute left-0 sm:left-2 top-6 sm:top-8 z-20">
                    <div className="relative">
                      <div className={`absolute inset-0 w-8 h-8 bg-gradient-to-r ${color} rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      <button
                        onClick={() => toggleCompleted(index)}
                        className={`relative w-8 h-8 bg-gradient-to-br ${color} border-4 border-white dark:border-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center`}
                      >
                        <FaRegCircle className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="ml-12 sm:ml-16">
                    <div
                      className={`relative bg-gradient-to-br ${color} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-500 transform hover:-translate-y-1 hover:scale-[1.02] backdrop-blur-sm border border-white/20 overflow-hidden`}
                      style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>

                      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm">
                              {index + 1}
                            </div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                              {phase.title}
                            </h3>
                          </div>
                          {phase.duration && (
                            <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
                              <FaRegClock className="w-4 h-4" />
                              <span>Duration: {phase.duration}</span>
                            </div>
                          )}
                        </div>

                        {hasChildren && (
                          <button
                            onClick={() => toggleExpanded(index)}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors text-white"
                          >
                            {isExpanded ? (
                              <FaChevronUp className="w-5 h-5" />
                            ) : (
                              <FaChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        )}
                      </div>

                      {phase.description && (
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4">
                          {phase.description}
                        </p>
                      )}

                      {hasChildren && (
                        <div className={`transition-all duration-500 ease-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mt-4 border border-white/20">
                            <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Subtasks:</h4>
                            <div className="grid gap-3 sm:gap-4">
                              {phase.children.map((child, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                  <div className="w-2 h-2 bg-white/60 rounded-full mt-2"></div>
                                  <div className="flex-1">
                                    <span className="text-white font-medium text-sm sm:text-base">
                                      {child.title}
                                    </span>
                                    {child.duration && (
                                      <span className="block text-white/70 text-xs sm:text-sm italic">
                                        Duration: {child.duration}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}