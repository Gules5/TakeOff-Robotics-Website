'use client';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  // 1. Setup the SINGLE Scroll Logic for the right-side bar
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const headingText = "Takeoff Robotics";
  const letters = headingText.split('');

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#f2e8cf] overflow-x-hidden">
      
      {/* 2. THE ONLY SCROLL INDICATOR (Right Side) */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] h-32 md:h-48 w-2 md:w-3 bg-black/10 border-2 border-black rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[#ED1C24]"
          style={{ 
            scaleY, 
            originY: 0 // Ensures it fills from the top down
          }}
        />
      </div>

      {/* ROUGH PAPER TEXTURE OVERLAYS */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.15] mix-blend-multiply"
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }} 
      />
      
      {/* Grid Paper Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#004E89 1px, transparent 1px),
            linear-gradient(90deg, #004E89 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'rotate(-0.5deg) scale(1.1)', 
        }} />
      </div>

      {/* 3. HEADER / NAVIGATION BAR */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <motion.nav
          className="relative flex justify-between items-center py-3 px-6 bg-[#004E89] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-b-4 border-black"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 12 }}
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-4 border-black bg-white"
              whileHover={{ rotate: 180 }}
            >
              <Image src="/TakeOfflogo.png" alt="Logo" fill className="object-contain p-1" />
            </motion.div>
            <span className="text-white font-black text-xl md:text-3xl tracking-tighter" style={{ fontFamily: 'monospace' }}>
              TAKEOFF
            </span>
          </div>

          <div className="flex space-x-2">
            <motion.a href="/" className="px-3 py-1 md:px-4 md:py-2 font-black text-white hover:bg-[#ED1C24] transition-all text-sm md:text-lg uppercase">
              Home
            </motion.a>
            <motion.div 
              className="relative" 
              onHoverStart={() => setHoveredMenu('about')} 
              onHoverEnd={() => setHoveredMenu(null)}
            >
              <button className="px-3 py-1 md:px-4 md:py-2 font-black text-white flex items-center space-x-1 uppercase tracking-tighter text-sm md:text-lg">
                <span>About</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <AnimatePresence>
                {hoveredMenu === 'about' && (
                  <motion.div 
                    className="absolute top-full right-0 w-48 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="flex flex-col">
                      <a href="team" className="px-4 py-3 text-black font-black hover:bg-[#ED1C24] hover:text-white border-b-4 border-black transition-colors uppercase">OUR TEAM</a>
                      <a href="projects" className="px-4 py-3 text-black font-black hover:bg-[#ED1C24] hover:text-white transition-colors uppercase">PROJECTS</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.nav>
      </div>

      {/* 4. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-start z-20 overflow-hidden pt-24">
        <div //image
          className="absolute inset-0 z-0"
          style={{
            //Combines a gradient overlay with the background image
            backgroundImage: `linear-gradient(rgba(144, 144, 144, 0.2), rgba(0,0,0,0.2)), url("/TitleImage.JPG")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 1,
          }}
          
        />
        <div className="text-center space-y-4 px-0 w-full max-w-[100vw] relative z-10">
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] font-black tracking-tighter uppercase whitespace-nowrap inline-block"
            style={{ 
               color: '#ED1C24',
               filter: 'drop-shadow(8px 8px 0px rgba(0,0,0,0.15))' 
            }}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
                transition={{
                  delay: index * 0.035,
                  duration: 0.15,
                  ease: "linear"
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>

          <br />

          <motion.div 
            className="inline-block bg-[#ED1C24] text-white px-6 py-3 -rotate-2 border-4 border-black shadow-[6px_6px_0px_0px_#000] mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-xl md:text-3xl font-black uppercase tracking-widest italic">
              Breaking Down Barriers to Engineering
            </p>
          </motion.div>

          {/* Bouncing Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="pt-75"
          >
            <button 
              className="bg-black text-white border-4 border-black px-12 py-6 font-black text-2xl md:text-4xl shadow-[10px_10px_0px_0px_#ED1C24] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all uppercase italic flex items-center gap-6 mx-auto "
            >
              BUILD NOW 
              <span className="text-3xl md:text-5xl">→</span>
            </button>
          </motion.div>
        </div>
      </section>
        
        {/* 5. MISSION SECTION */}
      <section className="py-24 px-6 relative z-20 flex justify-center">
        <div className="max-w-5xl w-full text-center border-8 border-black p-12 bg-white shadow-[20px_20px_0px_0px_#004E89] relative">
          <div className="absolute -top-10 -left-6 bg-[#ED1C24] text-white px-4 py-2 border-4 border-black font-black -rotate-6 text-xl md:text-2xl shadow-lg">
            SYSTEM LOG: 001
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[#ED1C24] mb-10 underline decoration-black decoration-8 underline-offset-[12px] uppercase">
            MISSION STATEMENT
          </h2>
          <p className="text-2xl md:text-4xl text-black leading-none font-black uppercase tracking-tighter">
            We build. We learn. We Take Off.
          </p>
        </div>
      </section>
     
        

      
      
    </div>
  );
}