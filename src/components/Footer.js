

import { useState } from "react"
import {
  Apple,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  BookOpen,
  Users,
  Target,
  Shield,
  FileText,
  HelpCircle,
  ChevronUp,
  Heart,
  Smartphone,
  Globe,
  Award,
  Clock,
} from "lucide-react"

export default function FooterOne() {
  const [expandedSection, setExpandedSection] = useState(null)
  const [email, setEmail] = useState("")

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  const footerLinks = {
    product: {
      title: "Product",
      icon: Smartphone,
      links: [
        { name: "Features", href: "#features" },
        { name: "Goal Setting", href: "#goals" },
        { name: "Study Planner", href: "#planner" },
        { name: "Progress Tracking", href: "#progress" },
        { name: "Study Groups", href: "#groups" },
        { name: "Premium Plans", href: "#premium" },
      ],
    },
    resources: {
      title: "Resources",
      icon: BookOpen,
      links: [
        { name: "Study Tips", href: "#tips" },
        { name: "Success Stories", href: "#stories" },
        { name: "Blog", href: "#blog" },
        { name: "Webinars", href: "#webinars" },
        { name: "Help Center", href: "#help" },
        { name: "Tutorials", href: "#tutorials" },
      ],
    },
    company: {
      title: "Company",
      icon: Users,
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Press Kit", href: "#press" },
        { name: "Partners", href: "#partners" },
        { name: "Contact", href: "#contact" },
        { name: "Investors", href: "#investors" },
      ],
    },
    support: {
      title: "Support",
      icon: HelpCircle,
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Contact Support", href: "#support" },
        { name: "System Status", href: "#status" },
        { name: "Bug Reports", href: "#bugs" },
        { name: "Feature Requests", href: "#requests" },
        { name: "Community Forum", href: "#forum" },
      ],
    },
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-500" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy", icon: Shield },
    { name: "Terms of Service", href: "#terms", icon: FileText },
    { name: "Cookie Policy", href: "#cookies", icon: Globe },
    { name: "GDPR Compliance", href: "#gdpr", icon: Award },
  ]

  const contactInfo = [
    { icon: Mail, text: "support@studymate.com", href: "mailto:support@studymate.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#location" },
  ]

  const stats = [
    { number: "500K+", label: "Active Students", icon: Users },
    { number: "2M+", label: "Goals Achieved", icon: Target },
    { number: "4.8★", label: "App Rating", icon: Award },
    { number: "24/7", label: "Support", icon: Clock },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Academic Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-blue-400/20 text-2xl animate-bounce delay-300">📚</div>
        <div className="absolute top-20 right-20 text-purple-400/20 text-xl animate-bounce delay-700">🎯</div>
        <div className="absolute bottom-20 left-20 text-green-400/20 text-3xl animate-bounce delay-1000">📊</div>
        <div className="absolute bottom-10 right-40 text-orange-400/20 text-xl animate-bounce delay-1500">🏆</div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & CTA Section */}
        <div className="py-12 border-b border-white/10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter Signup */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-4">
                <Mail className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-blue-300 font-semibold text-sm">📧 Stay Updated</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Get Study Tips &{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Success Stories
                </span>
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                Join 50,000+ students receiving weekly tips, motivation, and exclusive content to boost your academic
                success.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-blue-400 transition-colors duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* App Download CTA */}
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full mb-4">
                <Smartphone className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-300 font-semibold text-sm">📱 Download Now</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to{" "}
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Transform
                </span>{" "}
                Your Studies?
              </h3>
              <p className="text-gray-300 mb-6 text-lg">Join hundreds of thousands of successful students worldwide</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group flex items-center justify-center space-x-3 px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  <Apple className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </button>

                <button className="group flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xs">▶</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-green-100">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">Chaicode</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Empowering students worldwide to achieve their academic dreams through smart study tools and
                  AI-powered insights.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                      <contact.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{contact.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links - Desktop */}
            <div className="lg:col-span-4 hidden md:block">
              <div className="grid md:grid-cols-4 gap-8">
                {Object.entries(footerLinks).map(([key, section]) => (
                  <div key={key}>
                    <div className="flex items-center space-x-2 mb-6">
                      <section.icon className="w-5 h-5 text-blue-400" />
                      <h4 className="text-lg font-semibold text-white">{section.title}</h4>
                    </div>
                    <ul className="space-y-3">
                      {section.links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links - Mobile (Collapsible) */}
            <div className="lg:col-span-4 md:hidden">
              {Object.entries(footerLinks).map(([key, section]) => (
                <div key={key} className="border-b border-white/10 last:border-b-0">
                  <button
                    onClick={() => toggleSection(key)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <section.icon className="w-5 h-5 text-blue-400" />
                      <h4 className="text-lg font-semibold text-white">{section.title}</h4>
                    </div>
                    <ChevronUp
                      className={
                        "w-5 h-5 text-gray-400 transition-transform duration-200 " +
                        (expandedSection === key ? "rotate-180" : "")
                      }
                    />
                  </button>
                  <div
                    className={
                      "overflow-hidden transition-all duration-300 " +
                      (expandedSection === key ? "max-h-96 pb-4" : "max-h-0")
                    }
                  >
                    <ul className="space-y-3 pl-7">
                      {section.links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block py-1"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media & Legal */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Social Media Links */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="text-center sm:text-left">
                <h5 className="text-white font-semibold mb-3 sm:mb-0">Follow Us</h5>
              </div>
              <div className="flex justify-center sm:justify-start space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={
                      "w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 hover:bg-white/20 " +
                      social.color
                    }
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4">
              {legalLinks.map((legal, index) => (
                <a
                  key={index}
                  href={legal.href}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm group"
                >
                  <legal.icon className="w-4 h-4 group-hover:text-blue-400 transition-colors duration-200" />
                  <span>{legal.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 text-center md:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
              <p className="text-gray-400 text-sm">© 2024 StudyMate. All rights reserved.</p>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>for students worldwide</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-gray-400 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Available in 40+ languages</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </footer>
  )
}