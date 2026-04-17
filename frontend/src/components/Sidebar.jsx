import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../assets/profileimage.jpg';

const texts = ["Data Analyst", "SQL | Power BI Expert", "Python for Data Analysis", "Turning Data into Insights"];

export default function Sidebar() {
  // Typing animation state
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseTime = 2000;

    const type = () => {
      const fullText = texts[textIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 relative overflow-hidden group w-full h-full flex flex-col items-center flex-shrink-0 transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(255,215,0,0.15)] hover:-translate-y-1"
    >
      {/* Subtle Dark + Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/40 via-transparent to-accent/10 opacity-70 z-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"></div>

      {/* Floating Animated Profile Image */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative z-10 w-[120px] h-[120px] mb-5 mt-2 rounded-2xl border-2 border-accent shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-all duration-300 hover:scale-105 flex items-center justify-center overflow-hidden bg-[#2b2b2c]"
      >
        <img 
          src={profileImage} 
          alt="Ankit Tiwari Profile"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Name + Status Badge */}
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-[26px] font-extrabold text-white mb-2 tracking-wide text-center drop-shadow-md">Ankit Tiwari</h1>
        
        {/* Pulse Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold tracking-wider mb-5 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          AVAILABLE FOR WORK
        </div>
      </div>

      {/* Animated Typing Text */}
      <div className="z-10 bg-black/30 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-xl text-[13px] font-semibold mb-6 tracking-wide flex items-center justify-center min-h-[36px] w-[230px] shadow-inner">
        <span>{currentText}</span>
        <span className="w-[2px] h-[14px] bg-accent ml-1 animate-[pulse_0.8s_ease-in-out_infinite]"></span>
      </div>

      {/* Base Info (Contact) */}
      <div className="w-full flex justify-center gap-6 mb-7 z-10">
        <a href="mailto:ankittiwari201600@gmail.com" className="flex items-center gap-2 text-dark-mutedtext hover:text-accent transition-colors text-xs font-medium">
          <Mail className="w-3.5 h-3.5" /> Email
        </a>
        <span className="flex items-center gap-2 text-dark-mutedtext hover:text-white transition-colors text-xs font-medium">
          <MapPin className="w-3.5 h-3.5 text-accent" /> New Delhi
        </span>
      </div>

      <div className="w-full border-t border-white/10 mb-7 z-10"></div>

      {/* Stats - Pro Features */}
      <div className="w-full space-y-3 flex-grow z-10">
        <StatRow icon="📊" title="40K+ Records" desc="Analyzed" />
        <StatRow icon="📈" title="Data Projects" desc="Built" />
        <StatRow icon="⚡" title="Insights Driven" desc="Decisions" />
      </div>

      {/* Social Icons */}
      <div className="flex gap-5 mt-8 w-full justify-center z-10">
        <SocialLink icon={<FaLinkedin className="w-[18px] h-[18px]" />} href="https://www.linkedin.com/in/ankit-tiwari-59002334a/" tooltip="LinkedIn" />
        <SocialLink icon={<FaGithub className="w-[18px] h-[18px]" />} href="https://github.com/Ankit-Tiwari24" tooltip="GitHub" />
      </div>
    </motion.aside>
  );
}

function StatRow({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-colors w-full group/stat cursor-default shadow-sm hover:shadow-md">
      <div className="text-lg w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center border border-white/5 group-hover/stat:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold text-[13px] leading-tight group-hover/stat:text-accent transition-colors">{title}</span>
        <span className="text-dark-mutedtext text-[10px] uppercase tracking-wider font-semibold mt-0.5">{desc}</span>
      </div>
    </div>
  );
}

function SocialLink({ icon, href, tooltip }) {
  return (
    <div className="relative group/social">
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-11 h-11 bg-black/20 border border-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-dark-mutedtext hover:text-accent hover:bg-accent/10 hover:border-accent/40 hover:scale-[1.15] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300"
      >
        {icon}
      </a>
      {/* Tooltip */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/social:opacity-100 group-hover/social:-translate-y-1 transition-all duration-300 pointer-events-none px-2 py-1 bg-[#1a1a1b] border border-white/10 rounded-md text-[10px] font-bold tracking-wider text-white whitespace-nowrap shadow-xl">
        {tooltip}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1b] border-b border-r border-white/10 rotate-45"></div>
      </div>
    </div>
  );
}
