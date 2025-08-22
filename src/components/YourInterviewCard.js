import { Bot, Briefcase, MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function YourInterviewCard() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {/* Section 1 */}
      <motion.section
        className="h-screen flex items-center justify-center snap-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className={
            "mb-16 transition-all duration-1000 delay-300 " +
            (isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10")
          }
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                <MessageSquare className="w-6 h-6 inline mr-2 text-emerald-400" />
                AI Mock Interview
              </h3>
              <p className="text-lg text-gray-300">
                Practice real-world interview Q&A with AI in real-time
              </p>
            </div>

            {/* Chat Window */}
            <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-4 h-72 overflow-y-auto space-y-4">
              {/* Interviewer Message */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-4 py-2 text-gray-200 max-w-sm">
                  Tell me about a challenging project you worked on and how you
                  solved it.
                </div>
              </div>

              {/* Candidate Message */}
              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-teal-500/20 border border-teal-400/20 rounded-xl px-4 py-2 text-gray-100 max-w-sm">
                  I led a team project where we built a scalable API. We faced
                  bottlenecks with database queries, but I optimized them with
                  indexing and caching.
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  Me
                </div>
              </div>

              {/* AI Follow-Up */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-4 py-2 text-gray-200 max-w-sm">
                  That’s great! How did you ensure your solution was
                  maintainable for the long term?
                </div>
              </div>
            </div>

            {/* Input Box */}
            <div className="mt-6 flex items-center space-x-3">
              <input
                type="text"
                placeholder="Type your response..."
                className="flex-1 px-4 py-3 bg-slate-800/60 border border-emerald-500/20 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-bold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-emerald-500/25">
                Send
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        className="h-screen flex items-center justify-center snap-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className={
            "mb-16 transition-all duration-1000 delay-300 " +
            (isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10")
          }
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                <Bot className="w-6 h-6 inline mr-2 text-emerald-400" />
                AI Career & Coding Assistant
              </h3>
              <p className="text-lg text-gray-300">
                Get coding help, career guidance & personalized suggestions
              </p>
            </div>

            {/* Chat Window */}
            <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-4 h-80 overflow-y-auto space-y-4">
              {/* AI Message */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-4 py-2 text-gray-200 max-w-md">
                  Hi! 👋 What can I help you with today? Career advice or coding
                  help?
                </div>
              </div>

              {/* User Message */}
              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-teal-500/20 border border-teal-400/20 rounded-xl px-4 py-2 text-gray-100 max-w-md">
                  Can you suggest a roadmap for becoming a full-stack developer?
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  Me
                </div>
              </div>

              {/* AI Response with Code */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-4 py-3 text-gray-200 max-w-md space-y-3">
                  <p className="text-sm">
                    Sure! Here’s a simple full-stack roadmap:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Frontend: HTML, CSS, JavaScript, React</li>
                    <li>Backend: Node.js, Express</li>
                    <li>Database: MongoDB / PostgreSQL</li>
                    <li>DevOps basics: Git, Docker</li>
                  </ul>
                  <p className="text-sm">Example API code (Node.js):</p>
                  <pre className="bg-slate-800 text-emerald-400 text-sm rounded-lg p-3 overflow-x-auto">
                    {`app.get('/api/hello', (req, res) => {
  res.send({ message: "Hello CareerPath AI!" });
});`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Input Box */}
            <div className="mt-6 flex items-center space-x-3">
              <input
                type="text"
                placeholder="Ask me about code or career..."
                className="flex-1 px-4 py-3 bg-slate-800/60 border border-emerald-500/20 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-bold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-emerald-500/25">
                Send
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 3 */}
      <motion.section
        className="h-screen flex items-center justify-center snap-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className={
            "mb-16 transition-all duration-1000 delay-300 " +
            (isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10")
          }
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                <Briefcase className="w-6 h-6 inline mr-2 text-emerald-400" />
                AI Career Suggestions
              </h3>
              <p className="text-lg text-gray-300">
                Get personalized career advice powered by AI
              </p>
            </div>

            {/* Suggestion Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-slate-900/60 border border-emerald-400/20 rounded-xl p-5 hover:shadow-emerald-500/20 hover:scale-[1.02] transition-transform duration-300">
                <h4 className="text-emerald-400 font-bold mb-2">
                  Full-Stack Developer
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Build scalable web apps with modern frameworks. High demand in
                  startups & tech companies.
                </p>
                <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                  <li>Frontend: React / Next.js</li>
                  <li>Backend: Node.js / Express</li>
                  <li>Database: MongoDB / PostgreSQL</li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-900/60 border border-emerald-400/20 rounded-xl p-5 hover:shadow-emerald-500/20 hover:scale-[1.02] transition-transform duration-300">
                <h4 className="text-emerald-400 font-bold mb-2">
                  AI/ML Engineer
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Work on cutting-edge AI models for healthcare, finance, and
                  automation.
                </p>
                <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                  <li>Python, TensorFlow, PyTorch</li>
                  <li>Data Science & ML pipelines</li>
                  <li>Cloud Deployment (AWS, GCP)</li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-900/60 border border-emerald-400/20 rounded-xl p-5 hover:shadow-emerald-500/20 hover:scale-[1.02] transition-transform duration-300">
                <h4 className="text-emerald-400 font-bold mb-2">
                  Cybersecurity Analyst
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Protect systems & data from cyber threats. Huge demand across
                  industries.
                </p>
                <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                  <li>Network Security, Firewalls</li>
                  <li>Ethical Hacking</li>
                  <li>Security Compliance</li>
                </ul>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-900/60 border border-emerald-400/20 rounded-xl p-5 hover:shadow-emerald-500/20 hover:scale-[1.02] transition-transform duration-300">
                <h4 className="text-emerald-400 font-bold mb-2">
                  Data Analyst
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Turn raw data into insights that drive business decisions.
                </p>
                <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                  <li>SQL, Python, Excel</li>
                  <li>Data Visualization (Tableau, PowerBI)</li>
                  <li>Statistics & Reporting</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-bold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-emerald-500/25">
                Get My Personalized Career Path
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
