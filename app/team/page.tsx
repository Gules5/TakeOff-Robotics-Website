'use client';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Team() {
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

  if (!mounted) return null;


  return (

    <div className="relative min-h-5000 bg-[#a82328]">

      {/* Background Image mixing */}
      
      <div className="absolute top-0 left-0 w-full h-full" 
      style={{
        backgroundImage: 'url(/DottedBackground.png)',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        opacity:0.05,
      }}/>

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

      <main>
    
    
      {/* Page Start */}

      <div className='relative overflow-hidden min-h-100 min-w-full z-10'>
        {/* Title text */}
        <h1 className='text-[100px] text-center mt-[100px] font-black tracking-tighter uppercase'>The Team</h1>
        
        <div className='mt-10 max-w-[85%] mx-auto overflow-visible pb-20'>
          {/*Captain Header and Underscore*/}
          <h2 className='relative text-[50px] text-center mt-[40px] mb-[10px] max-w-[80%] mx-auto border-b-2 border-black font-[monospace]'>The Executives</h2>
          
          {/*Captain Grid*/}
          <div className="grid grid-cols-3 gap-8 max-w-[85%] mx-auto">

            <div className=" bg-white border-4 border-black rounded-lg p-4 mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img src="/Sinaj.jpg" alt="Sinaj" className="h-[300px] w-[300px] bg-gray-200 rounded-lg mb-4"></img>
              <h3 className="text-xl font-bold text-center text-black">Sinaj</h3>
              <p className="text-center text-black">Big Boss Man</p>
            </div> 

            <div className=" bg-white border-4 border-black rounded-lg p-4 mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img src="/Sinaj2.jpg" alt="Sinaj" className="h-[300px] w-[300px] bg-gray-200 rounded-lg mb-4"></img>
              <h3 className="text-xl font-bold text-center text-black">Sinaj</h3>
              <p className="text-center text-black">Big Boss Man</p>
            </div> 

            <div className=" bg-white border-4 border-black rounded-lg p-4 mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img src="/Sinaj.jpg" alt="Sinaj" className="h-[300px] w-[300px] bg-gray-200 rounded-lg mb-4"></img>
              <h3 className="text-xl font-bold text-center text-black">Sinaj</h3>
              <p className="text-center text-black">Big Boss Man</p>
            </div> 

          </div>

          {/*Captain Grid*/}
          <div className="grid grid-cols-4 gap-8 mt-20">

            <div className=" bg-white border-4 border-black rounded-lg p-4 mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img src="/Sinaj.jpg" alt="Sinaj" className="h-[250px] w-[250px] bg-gray-200 rounded-lg mb-4"></img>
              <h3 className="text-xl font-bold text-center text-black">Sinaj</h3>
              <p className="text-center text-black">Big Boss Man</p>
            </div> 

            <div className=" bg-white border-4 border-black rounded-lg p-4 mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img src="/Sinaj2.jpg" alt="Sinaj" className="h-[250px] w-[250px] bg-gray-200 rounded-lg mb-4"></img>
              <h3 className="text-xl font-bold text-center text-black">Sinaj</h3>
              <p className="text-center text-black">Big Boss Man</p>
            </div> 

            <div className=" bg-white border-4 border-black rounded-lg p-4 mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img src="/Sinaj.jpg" alt="Sinaj" className="h-[250px] w-[250px] bg-gray-200 rounded-lg mb-4"></img>
              <h3 className="text-xl font-bold text-center text-black">Sinaj</h3>
              <p className="text-center text-black">Big Boss Man</p>
            </div> 

            <div className=" bg-white border-4 border-black rounded-lg p-4 mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img src="/Sinaj.jpg" alt="Sinaj" className="h-[250px] w-[250px] bg-gray-200 rounded-lg mb-4"></img>
              <h3 className="text-xl font-bold text-center text-black">Sinaj</h3>
              <p className="text-center text-black">Big Boss Man</p>
            </div> 
          </div>

          {/* This can be copy and pasted as much as is needed. :D 
            Probably best to stlyize it first then fill in every portrait*/}

          
        </div>
      </div> 

      </main>

    </div>
  );
}
