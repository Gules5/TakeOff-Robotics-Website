'use client';
import { motion, AnimatePresence } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      // Default to light mode (explicitly remove dark class)
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      // Set light mode in localStorage if not set
      if (!savedTheme) {
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const headingText = "Building a Better Future";
  const letters = headingText.split('');

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="relative transition-colors duration-500">
      {/* Hero Section */}
      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)'
            : 'linear-gradient(to bottom right, #f8fafc, #dbeafe, #fed7aa)'
        }}
      >
      {/* Engineering Grid Background - Light Mode (subtle gray) */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Engineering Grid Background - Dark Mode (blue) */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 197, 253, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 197, 253, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />


      {/* Decorative Corner Elements */}

      {/* Apple-style Navigation Bar with Submenus */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <motion.nav
          className="flex justify-center items-center py-2 px-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex space-x-1">
            {/* Home */}
            <motion.a
              href="#home"
              className="px-4 py-2 font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.a>

            {/* About Us with Submenu */}
            <motion.div
              className="relative"
              onHoverStart={() => setHoveredMenu('about')}
              onHoverEnd={() => setHoveredMenu(null)}
            >
              <motion.button
                className="px-4 py-2 font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>About Us</span>
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-600 dark:text-slate-400"
                  animate={{ rotate: hoveredMenu === 'about' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {hoveredMenu === 'about' && (
                  <motion.div
                    className="absolute top-full mt-0 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-b-xl shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="py-2">
                      <motion.a
                        href="#team"
                        className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        Our Team
                      </motion.a>
                      <motion.a
                        href="#history"
                        className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        Our History
                      </motion.a>
                      <motion.a
                        href="#values"
                        className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        Our Values
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Our Projects with Submenu */}
            <motion.div
              className="relative"
              onHoverStart={() => setHoveredMenu('projects')}
              onHoverEnd={() => setHoveredMenu(null)}
            >
              <motion.button
                className="px-4 py-2 font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Our Projects</span>
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-600 dark:text-slate-400"
                  animate={{ rotate: hoveredMenu === 'projects' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {hoveredMenu === 'projects' && (
                  <motion.div
                    className="absolute top-full mt-0 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-b-xl shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="py-2">
                      <motion.a
                        href="#robots"
                        className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        Robotics Projects
                      </motion.a>
                      <motion.a
                        href="#software"
                        className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        Software Projects
                      </motion.a>
                      <motion.a
                        href="#competitions"
                        className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        Competitions
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Us with Submenu */}
            <motion.div
              className="relative"
              onHoverStart={() => setHoveredMenu('contact')}
              onHoverEnd={() => setHoveredMenu(null)}
            >
              <motion.button
                className="px-4 py-2 font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact Us</span>
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-600 dark:text-slate-400"
                  animate={{ rotate: hoveredMenu === 'contact' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {hoveredMenu === 'contact' && (
                  <motion.div
                    className="absolute top-full mt-0 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-b-xl shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="py-2">
                      <motion.a
                        href="#email"
                        className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        Email Us
                      </motion.a>
                      <motion.a
                        href="https://www.instagram.com/takeoffrobotics/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-2"
                        whileHover={{ x: 5 }}
                      >
                        <motion.svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-slate-600 dark:text-slate-400"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.377-.073 1.795-.073 4.947 0 3.153.014 3.57.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.377.058 1.795.072 4.947.072 3.153 0 3.57-.014 4.947-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.377.073-1.795.073-4.947 0-3.152-.014-3.569-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.377-.059-1.794-.073-4.947-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </motion.svg>
                        <span>Instagram</span>
                      </motion.a>
                      <motion.a
                        href="#location"
                        className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        Visit Us
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.nav>
      </div>

      {/* Top Right - Theme Toggle Button */}
      <motion.button
        className="absolute top-8 right-8 z-30 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl dark:hover:shadow-blue-500/20 transition-all duration-300"
        onClick={toggleTheme}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative w-8 h-8">
          <AnimatePresence mode="wait">
            {!isDark ? (
              // Sun Icon
              <motion.svg
                key="sun"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-orange-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </motion.svg>
            ) : (
              // Crescent Moon Icon
              <motion.svg
                key="moon"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
      </div>

      {/* Main Hero Content */}
<div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-20">
  <div className="text-center space-y-8">
    <div ref={containerRef} className="relative">
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight flex justify-center flex-wrap pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="flex justify-center flex-wrap">
          {letters.map((letter, index) => (
            <motion.span
              key={`letter-${index}`}
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #004E89 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                padding: '0 2px',
                lineHeight: '1.2',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </span>
      </motion.h1>
    </div>

          {/* Subtitle */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-slate-800 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-500 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Explore our projects and curriculum to see how we build a better future.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="pt-4"
          >
            <motion.button
              className="relative px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #004E89 100%)',
                boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)',
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 40px rgba(255, 107, 53, 0.8)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="relative z-10">Explore Our Robots</span>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400 opacity-0 group-hover:opacity-100"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>


      {/* New Section Below Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 py-20"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, #1e293b, #0f172a)'
            : 'linear-gradient(to bottom, #fed7aa, #f8fafc)'
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-12"
          >
            <div>
              <motion.h2
                className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #004E89 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Our Mission
              </motion.h2>
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                The True Lion. Doesn't take No for an answer.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  title: "Innovation",
                  description: "Cutting-edge technology and creative solutions",
                  icon: "⚡",
                },
                {
                  title: "Collaboration",
                  description: "Working together to achieve extraordinary results",
                  icon: "🤝",
                },
                {
                  title: "Excellence",
                  description: "Striving for perfection in every project",
                  icon: "🏆",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-200">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button
                className="relative px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #004E89 100%)',
                  boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)',
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 40px rgba(255, 107, 53, 0.8)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="relative z-10">Join Our Team</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 via-blue-400 to-orange-400 opacity-0 group-hover:opacity-100"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

    {/* Full-height Pixelated Earth Background - spans both sections */}
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Continuous Grid Background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 gap-1">
          {Array.from({ length: 20 }).map((_, rowIndex) => (
            Array.from({ length: 20 }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-full h-full border border-slate-300/10 dark:border-slate-600/10"
              />
            ))
          ))}
        </div>
      </div>

      {/* Pixelated Earth - spans both sections */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] lg:w-[1200px] lg:h-[1200px]">
          {/* More pixelated earth - 10x10 grid */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-0 opacity-60">
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              Array.from({ length: 10 }).map((_, colIndex) => {
                const distanceFromCenter = Math.sqrt(
                  Math.pow(rowIndex - 5, 2) + Math.pow(colIndex - 5, 2)
                );
                const isEarth = distanceFromCenter <= 4;

                let isLand = false;
                if (isEarth) {
                  if (
                    (rowIndex >= 2 && rowIndex <= 3 && colIndex >= 4 && colIndex <= 6) ||
                    (rowIndex >= 6 && rowIndex <= 7 && colIndex >= 2 && colIndex <= 4) ||
                    (rowIndex >= 3 && rowIndex <= 5 && colIndex >= 7 && colIndex <= 8)
                  ) {
                    isLand = true;
                  }
                }

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="w-full h-full"
                    style={{
                      backgroundColor: isEarth
                        ? isLand
                          ? isDark ? '#22c55e' : '#16a34a'
                          : isDark ? '#3b82f6' : '#1d4ed8'
                        : 'transparent',
                    }}
                  />
                );
              })
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
