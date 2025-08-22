import { useState, useEffect } from "react";
import {
  Play,
  ArrowRight,
  Mic,
  Sparkles,
  Zap,
  Users,
  Star,
  Headphones,
  Bot,
  MagnetIcon as Magic,
  Target,
  BarChart3,
  Globe,
  CheckCircle,
  X,
  MessageSquare,
  Briefcase,
} from "lucide-react";
// import YourInterviewCard from "../components/YourInterviewCard";

export default function HeroThree() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Demo video URL
  const demoVideoUrl = "";

  const getVideoEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0";
  };

  const aiFeatures = [
    {
      icon: Bot,
      title: "AI Voice Enhancement",
      description: "Crystal clear audio with noise reduction",
      color: "from-emerald-500 to-teal-400",
    },
    {
      icon: Magic,
      title: "Auto Transcription",
      description: "Instant, accurate transcripts in 50+ languages",
      color: "from-amber-500 to-orange-400",
    },
    {
      icon: Target,
      title: "Smart Editing",
      description: "AI removes filler words and awkward pauses",
      color: "from-rose-500 to-pink-400",
    },
    {
      icon: BarChart3,
      title: "Analytics Insights",
      description: "AI-powered audience engagement metrics",
      color: "from-violet-500 to-purple-400",
    },
  ];

  const stats = [
    { number: "10M+", label: "Episodes Enhanced", icon: Headphones },
    { number: "50K+", label: "Active Podcasters", icon: Users },
    { number: "99.9%", label: "Uptime Guarantee", icon: Zap },
    { number: "40+", label: "Languages Supported", icon: Globe },
  ];

  const testimonials = [
    {
      name: "Alex Rodriguez",
      role: "Host of Tech Talk Daily",
      content:
        "This AI platform transformed my podcast production. What used to take hours now takes minutes!",
      rating: 5,
      avatar: "🎙️",
    },
    {
      name: "Sarah Kim",
      role: "Business Podcast Network",
      content:
        "The voice enhancement is incredible. Our audio quality improved dramatically overnight.",
      rating: 5,
      avatar: "🎧",
    },
    {
      name: "Mike Johnson",
      role: "Independent Podcaster",
      content:
        "Auto-transcription saved me 20 hours per week. This tool is a game-changer!",
      rating: 5,
      avatar: "📻",
    },
  ];

  // Generate animated audio waves
  useEffect(() => {
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Audio Waves Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-500/12 to-orange-500/12 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-r from-rose-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Podcast Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const top = Math.floor(Math.random() * 100); // random top position %
          const left = Math.floor(Math.random() * 100); // random left position %
          const sizeOptions = ["text-xs", "text-sm", "text-base"];
          const colorOptions = [
            "text-emerald-400/25",
            "text-amber-400/25",
            "text-rose-400/25",
            "text-violet-400/25",
          ];
          const emojiOptions = ["Careerpath AI"];
          const size =
            sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
          const color =
            colorOptions[Math.floor(Math.random() * colorOptions.length)];
          const content =
            emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
          const delay = Math.floor(Math.random() * 2000); // 0ms - 2000ms

          return (
            <div
              key={i}
              className={`absolute animate-bounce ${size} ${color}`}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}ms`,
              }}
            >
              {content}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div
          className={
            "text-center mb-16 transition-all duration-1000 " +
            (isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10")
          }
        >
          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-md border border-emerald-400/30 rounded-full mb-6">
            <Bot className="w-4 h-4 text-emerald-400 mr-2 animate-pulse" />
            <span className="text-emerald-300 font-semibold text-sm">
              AI-Powered Career Guidence
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Career
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl">
              with AI Magic
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            Discover your perfect career path with advanced AI analysis. Get
            personalized recommendations, skill roadmaps, and market insights to
            accelerate your professional growth.
            <span className="block mt-3 text-emerald-300 font-medium">
              Join the AI Revolution and unlock your career potential today.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group relative px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 flex items-center space-x-3">
              <Mic className="w-5 h-5 group-hover:animate-pulse" />
              <span>Start Free Chat</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="group flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-emerald-400/50 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:bg-white/20"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
              <span>Watch AI Demo</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-md">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Free trial 5-chat</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>100% data privacy</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>

        {/* Interactive Cards Visualizer */}
        <div
          className={
            "mb-16 transition-all duration-1000 delay-500 " +
            (isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10")
          }
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 pt-16">
              Powered by{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Advanced AI
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our cutting-edge AI technology handles the technical complexity so
              you can focus on creating amazing content
            </p>
          </div>
          <div className="relative max-w-6xl mx-auto py-20">
            {/* Center Glowing Orb */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 rounded-full bg-emerald-500/40 blur-3xl animate-pulse"></div>
                <div className="text-white text-3xl font-bold">
                  CareerPath AI
                </div>
              </div>
            </div>

            {/* Grid Layout for Cards */}
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {/* Card 1 - AI Mock Interview */}
              <div className="bg-slate-900/60 border border-emerald-400/20 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-emerald-500/20 transition-all duration-300">
                <h3 className="text-xl font-bold text-emerald-400 mb-2 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" /> AI Mock Interview
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Practice real-world interview Q&A with AI in real-time.
                </p>
                <button className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-emerald-500/25">
                  Start Interview
                </button>
              </div>

              {/* Card 2 - Chat Assistant */}
              <div className="bg-slate-900/60 border border-emerald-400/20 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-emerald-500/20 transition-all duration-300">
                <h3 className="text-xl font-bold text-emerald-400 mb-2 flex items-center">
                  <Bot className="w-5 h-5 mr-2" /> AI Career & Coding Assistant
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Get coding help, career guidance & personalized suggestions.
                </p>
                <button className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-emerald-500/25">
                  Ask AI
                </button>
              </div>

              {/* Card 3 - Career Suggestions */}
              <div className="bg-slate-900/60 border border-emerald-400/20 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-emerald-500/20 transition-all duration-300">
                <h3 className="text-xl font-bold text-emerald-400 mb-2 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" /> AI Career Suggestions
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Explore tailored career paths based on your skills and goals.
                </p>
                <button className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-emerald-500/25">
                  Get Suggestions
                </button>
              </div>

              {/* Card 4 - Future Expansion */}
              <div className="bg-slate-900/60 border border-emerald-400/20 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-emerald-500/20 transition-all duration-300">
                <h3 className="text-xl font-bold text-emerald-400 mb-2 flex items-center">
                  <Zap className="w-5 h-5 mr-2" /> AI Projects
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Work on guided AI projects and build your portfolio.
                </p>
                <button className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-emerald-500/25">
                  Explore Projects
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <YourInterviewCard /> */}

        {/* AI Features Grid */}
        <div
          className={
            "mb-16 transition-all duration-1000 delay-500 " +
            (isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10")
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powered by{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Advanced AI
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our cutting-edge AI technology handles the technical complexity so
              you can focus on creating amazing content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map((feature, index) => (
              <div
                key={index}
                className={
                  "group p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-emerald-400/50 transition-all duration-500 cursor-pointer hover:scale-105 " +
                  (currentFeature === index
                    ? "border-emerald-400/50 bg-white/10 scale-105"
                    : "")
                }
                onClick={() => setCurrentFeature(index)}
              >
                <div
                  className={
                    "w-14 h-14 bg-gradient-to-r " +
                    feature.color +
                    " rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto"
                  }
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-center text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={
            "mb-16 transition-all duration-1000 delay-700 " +
            (isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10")
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:border-emerald-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div
          className={
            "mb-16 transition-all duration-1000 delay-900 " +
            (isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10")
          }
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Loved by{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Creators
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              See how podcasters are transforming their shows with AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-emerald-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div
          className={
            "text-center py-16 transition-all duration-1000 delay-1100 " +
            (isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10")
          }
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-600/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-amber-400 mr-3 animate-spin" />
              <span className="text-2xl font-bold text-white">
                Ready to Transform Your Podcast?
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your AI-Powered Journey Today
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of podcasters who've already discovered the power
              of AI.
              <span className="block mt-3 text-emerald-300 font-medium">
                Free trial • No setup fees • Cancel anytime
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-12 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 flex items-center space-x-3">
                <Mic className="w-6 h-6 group-hover:animate-pulse" />
                <span>Get Started Free</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  $29<span className="text-lg text-gray-400">/month</span>
                </div>
                <div className="text-gray-400 text-sm">
                  after 14-day free trial
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-8 space-x-8 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Unlimited episodes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Advanced analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="group w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-110"
        >
          <Play className="w-6 h-6 text-white ml-0.5 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-emerald-400/30">
            <iframe
              src={getVideoEmbedUrl(demoVideoUrl)}
              title="AI Podcast Tools Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm group"
            >
              <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
