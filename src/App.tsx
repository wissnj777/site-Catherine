import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Users, 
  MessageCircle, 
  Plus, 
  Layout, 
  Activity, 
  PenTool, 
  Search, 
  Target, 
  ShieldCheck, 
  Compass, 
  Zap,
  ChevronDown,
  Sparkles
} from 'lucide-react';

// --- Components ---

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const HorseIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 20c0-2.5 2-4.5 4.5-4.5h1.5c1.5 0 2.5-1 2.5-2.5V9c0-2.5 2-4.5 4.5-4.5h1.5c1.5 0 2.5 1 2.5 2.5v4c0 1.5-1 2.5-2.5 2.5h-1.5c-2.5 0-4.5 2-4.5 4.5v1" />
    <path d="M11 9c0-1.5 1-2.5 2.5-2.5h1" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'À propos', href: '#about' },
    { name: 'L\'Académie', href: 'https://go.lecodeducheval.com/optin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQqs9BleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadU8HGt_Nr5FGNEaQlSELy-zqrNTpKvTTc47BEL3vuAzAKu9QbiyDEHEMYevg_aem_yWrxvJwhIYBQHEz5d3ZeQw' },
    { name: 'Parcours', href: '#timeline' },
    { name: 'Podcast', href: '#show' },
    { name: 'Actualités', href: '#news' },
    { name: 'Speaking', href: '#speaking' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] px-10 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-bg/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center text-black shadow-[0_0_15px_rgba(242,125,38,0.3)] group-hover:shadow-[0_0_20px_rgba(242,125,38,0.5)] transition-all">
          <HorseIcon size={22} />
        </div>
        <div className="flex flex-col">
          <span className="font-heading text-sm font-bold tracking-tight text-white leading-none">CATHERINE EVRARD</span>
        </div>
      </div>
      
      <ul className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a 
              href={link.href} 
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-heading text-[11px] font-semibold tracking-[0.15em] uppercase text-white hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

        <div className="hidden md:flex gap-4">
        <a href="https://go.lecodeducheval.com/optin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQqs9BleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadU8HGt_Nr5FGNEaQlSELy-zqrNTpKvTTc47BEL3vuAzAKu9QbiyDEHEMYevg_aem_yWrxvJwhIYBQHEz5d3ZeQw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-black font-heading text-[11px] font-bold tracking-widest uppercase px-8 py-3 rounded-sm hover:bg-white transition-all group">
          Contact
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[72px] left-0 right-0 bg-bg-card p-10 flex flex-col gap-6 border-b border-border md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-heading text-sm font-bold tracking-widest uppercase text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://go.lecodeducheval.com/optin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQqs9BleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadU8HGt_Nr5FGNEaQlSELy-zqrNTpKvTTc47BEL3vuAzAKu9QbiyDEHEMYevg_aem_yWrxvJwhIYBQHEz5d3ZeQw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-accent text-black font-heading text-sm font-bold tracking-widest uppercase px-8 py-4 text-center rounded-sm"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Ticker = () => (
  <div className="overflow-hidden border-y border-border py-4 bg-bg-card">
    <div className="flex gap-16 w-max animate-[ticker_30s_linear_infinite]">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-16">
          {['Équitation', 'Coaching', 'Bien-être', 'Performance', 'Connexion', 'Technique', 'Le Code du Cheval'].map((item) => (
            <div key={item} className="flex items-center gap-4 font-heading text-[11px] font-bold tracking-[0.15em] uppercase text-text-muted whitespace-nowrap">
              <span className="text-accent">◆</span> {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string, key?: number | string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border py-8">
      <button 
        className="w-full flex justify-between items-center text-left gap-6 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-heading text-lg font-bold uppercase tracking-wider group-hover:text-accent transition-colors">{question}</span>
        <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : 'text-text-muted'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-6 text-text-muted leading-relaxed font-light">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const prompt = "A high-quality artistic photograph of a white horse rearing up with a blonde woman seen from behind. The photo is primarily black and white but features selective orange accents matching the website's theme (hex #F27D26). The horse has orange leg wraps, an orange saddle pad, and other small orange details. Cinematic lighting, professional photography, elegant and powerful atmosphere.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4",
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial generation or use default
    generateImage();
  }, []);

  if (loading && !imageUrl) {
    return (
      <div className="w-full h-full bg-surface flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        <span className="font-heading text-[10px] font-bold tracking-widest uppercase text-accent animate-pulse">Génération de l'image...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <img 
        src={imageUrl || "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2071&auto=format&fit=crop"} 
        alt="Catherine Evrard - Vision Équestre" 
        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
        referrerPolicy="no-referrer"
      />
      <button 
        onClick={(e) => { e.stopPropagation(); generateImage(); }}
        className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-accent hover:text-black transition-all group/btn"
        title="Régénérer l'image"
      >
        <Sparkles size={16} className={loading ? 'animate-spin' : ''} />
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden" id="home">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/1175250629?autoplay=1&loop=1&muted=1&background=1"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Background Video"
          ></iframe>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        <div className="relative z-10 px-10 max-w-[1800px] mx-auto w-full">
          <div className="font-display text-[clamp(4rem,15vw,16rem)] font-normal leading-[0.85] tracking-normal text-text uppercase">
            <motion.span 
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ 
                duration: 7, 
                times: [0, 0.28, 0.45, 0.9, 1], 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="block"
            >
              CATHERINE
            </motion.span>
            <motion.span 
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ 
                duration: 7, 
                times: [0, 0.42, 0.59, 0.9, 1], 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="block text-transparent [-webkit-text-stroke:1px_white] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              EVRARD
            </motion.span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mt-4 md:mt-14 gap-8">
            <div className="max-w-lg"></div>
            
            <div className="flex flex-col items-center md:items-end gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="flex gap-2 md:gap-4 flex-wrap justify-center md:justify-end"
              >
                <a href="#about" className="inline-flex items-center gap-2 md:gap-3 bg-accent text-black font-heading text-[9px] md:text-[11px] font-bold tracking-widest uppercase px-6 py-2.5 md:px-10 md:py-4 rounded-sm hover:bg-white transition-all group">
                  Mon histoire
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://go.lecodeducheval.com/optin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQqs9BleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadU8HGt_Nr5FGNEaQlSELy-zqrNTpKvTTc47BEL3vuAzAKu9QbiyDEHEMYevg_aem_yWrxvJwhIYBQHEz5d3ZeQw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 md:gap-3 bg-transparent border border-border text-text font-heading text-[9px] md:text-[11px] font-bold tracking-widest uppercase px-6 py-2.5 md:px-10 md:py-4 rounded-sm hover:border-accent hover:text-accent transition-all">
                  L'Académie
                </a>
              </motion.div>

              {/* Mobile Scroll Indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="md:hidden flex flex-col items-center gap-1 font-heading text-[8px] font-bold tracking-[0.2em] uppercase text-white/40 cursor-pointer"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Scroll</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ChevronDown size={12} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            y: 0 
          }}
          transition={{ 
            opacity: { repeat: Infinity, duration: 1, ease: "easeInOut" },
            y: { delay: 1.1, duration: 0.8 }
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 font-heading text-[11px] font-bold tracking-[0.3em] uppercase text-white cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Scroll</span>
          <div className="relative h-16 w-8 flex justify-center overflow-hidden">
            <motion.div
              animate={{ 
                y: [-40, 60],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "easeInOut" 
              }}
              className="flex flex-col items-center"
            >
              <div className="w-[2px] h-10 bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
              <ChevronDown size={20} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Ticker />

      {/* About Section */}
      <section className="py-28 bg-bg relative overflow-hidden" id="about">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="px-10 max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="aspect-[3/4] overflow-hidden rounded-sm grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl">
                <AboutImage />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-accent -z-10 rounded-sm opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-accent/30 -z-10 rounded-sm opacity-50"></div>
            </div>

            <div>
              <div className="inline-block font-heading text-[11px] font-bold tracking-[0.15em] uppercase text-accent border border-accent-dim px-3 py-1 rounded-sm mb-5">
                À propos
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight mb-6">
                Une histoire construite sur <br /> <span className="text-accent">la persévérance</span>.
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-6 font-light">
                Depuis l’adolescence, Catherine a consacré sa vie au cheval. Entre chutes, doutes, travail acharné, remises en question et rencontres décisives, elle a construit au fil des années une méthode née de l’expérience réelle.
              </p>
              <p className="text-text-muted text-lg leading-relaxed mb-10 font-light">
                Ce parcours, profondément humain, a forgé sa capacité à accompagner les cavaliers qui se sentent perdus, frustrés ou seuls face aux difficultés avec leur cheval.
              </p>
              
              <div className="grid grid-cols-3 gap-10 pt-10 border-t border-border">
                <div>
                  <div className="font-display text-4xl font-bold text-accent">20+</div>
                  <div className="text-[11px] text-text-muted uppercase tracking-widest mt-1">Années<br />d'expertise</div>
                </div>
                <div>
                  <div className="font-display text-4xl font-bold text-accent">500+</div>
                  <div className="text-[11px] text-text-muted uppercase tracking-widest mt-1">Duos<br />accompagnés</div>
                </div>
                <div>
                  <div className="font-display text-4xl font-bold text-accent">40+</div>
                  <div className="text-[11px] text-text-muted uppercase tracking-widest mt-1">Modules<br />de formation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventures Section */}
      <section className="py-28 bg-bg-card" id="ventures">
        <div className="px-10 max-w-[1400px] mx-auto">
          <div className="mb-12">
            <div className="inline-block font-heading text-[11px] font-bold tracking-[0.15em] uppercase text-accent border border-accent-dim px-3 py-1 rounded-sm mb-5">
              Mes projets
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight">
              Ce sur quoi je <span className="text-accent">travaille</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border border-border">
            {[
              { icon: <Activity />, label: 'Académie', title: 'L\'Académie Signature', desc: 'Le programme complet pour transformer votre relation et votre technique.', href: 'https://go.lecodeducheval.com/optin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQqs9BleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadU8HGt_Nr5FGNEaQlSELy-zqrNTpKvTTc47BEL3vuAzAKu9QbiyDEHEMYevg_aem_yWrxvJwhIYBQHEz5d3ZeQw' },
              { icon: <Users />, label: 'Coaching', title: 'Accompagnement Privé', desc: 'Un suivi sur-mesure pour résoudre vos problématiques spécifiques.', href: '#' },
              { icon: <Layout />, label: 'Stages', title: 'Stages Immersion', desc: 'Des journées intensives sur le terrain pour pratiquer la méthode.', href: '#' },
              { icon: <PenTool />, label: 'Méthode', title: 'Le Code du Cheval', desc: 'Une approche structurée basée sur les 4 piliers fondamentaux.', href: 'https://go.lecodeducheval.com/optin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQqs9BleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadU8HGt_Nr5FGNEaQlSELy-zqrNTpKvTTc47BEL3vuAzAKu9QbiyDEHEMYevg_aem_yWrxvJwhIYBQHEz5d3ZeQw' },
              { icon: <Zap />, label: 'Performance', title: 'Mental & Énergie', desc: 'Travailler sur soi pour mieux guider son partenaire équin.', href: '#' },
              { icon: <Plus />, label: 'Communauté', title: 'Espace Membres', desc: 'Un lieu d\'échange et de partage pour tous les passionnés.', href: '#' },
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-bg-card p-10 flex flex-col gap-5 group hover:bg-surface transition-colors cursor-pointer relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-accent rounded-sm flex items-center justify-center text-black">
                  {item.icon}
                </div>
                <div className="font-heading text-[10px] font-bold tracking-[0.15em] uppercase text-accent">{item.label}</div>
                <h3 className="font-heading text-lg font-extrabold uppercase tracking-tight leading-tight">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-light flex-1">{item.desc}</p>
                <div className="text-text-muted text-xl self-end group-hover:text-accent group-hover:translate-x-1 transition-all">→</div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-28" id="timeline">
        <div className="px-10 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <div className="inline-block font-heading text-[11px] font-bold tracking-[0.15em] uppercase text-accent border border-accent-dim px-3 py-1 rounded-sm mb-5">
                Parcours
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight">
                Des débuts <span className="text-accent">humbles</span> <br /> à aujourd'hui.
              </h2>
            </div>
            <a href="#about" className="inline-flex items-center gap-3 bg-transparent border border-border text-text font-heading text-[11px] font-bold tracking-widest uppercase px-10 py-4 rounded-sm hover:border-accent hover:text-accent transition-all">
              Tout le parcours
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:hidden"></div>

            {[
              { year: '2004', title: 'Les Premières Chutes', desc: 'L\'adolescence passée dans les écuries, à apprendre la dure réalité du terrain et la patience nécessaire.', side: 'left' },
              { year: '2012', title: 'La Rencontre Décisive', desc: 'La découverte d\'un cheval "impossible" qui a forcé Catherine à repenser toute son approche de l\'équitation.', side: 'right' },
              { year: '2018', title: 'Naissance du Code', desc: 'Après des années de recherche, les 4 piliers de la méthode sont enfin structurés et testés avec succès.', side: 'left' },
              { year: 'Aujourd\'hui', title: 'L\'Académie Mondiale', desc: 'Catherine accompagne désormais des centaines de cavaliers à travers le monde via ses programmes digitaux.', side: 'right', active: true },
            ].map((item, i) => (
              <div key={i} className={`grid grid-cols-[48px_1fr] md:grid-cols-[1fr_60px_1fr] gap-6 md:gap-10 items-start mb-20 relative`}>
                <div className={`hidden md:block ${item.side === 'left' ? 'text-right' : ''}`}>
                  {item.side === 'left' && (
                    <div className="py-2">
                      <div className="font-heading text-[10px] font-bold tracking-widest uppercase text-accent mb-2">Étape {i+1}</div>
                      <h4 className="font-heading text-lg font-extrabold uppercase tracking-tight mb-2">{item.title}</h4>
                      <p className="text-sm text-text-muted leading-relaxed font-light">{item.desc}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-2 pt-2">
                  <div className="font-heading text-[10px] font-bold text-accent tracking-widest uppercase whitespace-nowrap">{item.year}</div>
                  <div className={`w-3 h-3 rounded-full bg-accent border-2 border-bg outline outline-1 outline-accent ${item.active ? 'shadow-[0_0_14px_var(--color-accent)]' : ''}`}></div>
                </div>

                <div className={`${item.side === 'right' ? 'text-left' : 'md:hidden'}`}>
                  {(item.side === 'right' || window.innerWidth < 768) && (
                    <div className="py-2">
                      <div className="font-heading text-[10px] font-bold tracking-widest uppercase text-accent mb-2">Étape {i+1}</div>
                      <h4 className="font-heading text-lg font-extrabold uppercase tracking-tight mb-2">{item.title}</h4>
                      <p className="text-sm text-text-muted leading-relaxed font-light">{item.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Show Section */}
      <section className="py-28 bg-surface" id="show">
        <div className="px-10 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="aspect-square bg-bg-card overflow-hidden group">
                  <img 
                    src={`https://picsum.photos/seed/horse-${i}/600/600`} 
                    alt="Guest" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            <div>
              <div className="inline-block font-heading text-[11px] font-bold tracking-[0.15em] uppercase text-accent border border-accent-dim px-3 py-1 rounded-sm mb-5">
                Mon podcast
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-accent rounded-sm flex items-center justify-center text-black">
                  <HorseIcon size={36} />
                </div>
                <div className="flex flex-col">
                  <div className="font-display text-3xl font-black italic leading-none">
                    Le <span className="text-accent">Code</span>
                  </div>
                  <div className="font-display text-3xl font-black italic leading-none">
                    du Cheval
                  </div>
                </div>
              </div>
              <p className="text-text-muted text-lg leading-relaxed mb-10 font-light">
                Chaque semaine, je reçois des experts, des cavaliers inspirants et je partage mes réflexions sur la psychologie équine, la technique et le développement personnel du cavalier.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="#" className="inline-flex items-center gap-3 bg-accent text-black font-heading text-[11px] font-bold tracking-widest uppercase px-10 py-4 rounded-sm hover:bg-white transition-all group">
                  Écouter
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="inline-flex items-center gap-3 bg-transparent border border-border text-text font-heading text-[11px] font-bold tracking-widest uppercase px-10 py-4 rounded-sm hover:border-accent hover:text-accent transition-all">
                  Tous les épisodes
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-28" id="news">
        <div className="px-10 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div>
              <div className="inline-block font-heading text-[11px] font-bold tracking-[0.15em] uppercase text-accent border border-accent-dim px-3 py-1 rounded-sm mb-5">
                Actualités
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight">
                Dernières <span className="text-accent">nouvelles</span>.
              </h2>
            </div>
            <a href="#" className="inline-flex items-center gap-3 bg-transparent border border-border text-text font-heading text-[11px] font-bold tracking-widest uppercase px-10 py-4 rounded-sm hover:border-accent hover:text-accent transition-all">
              Tout voir
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-[1px] bg-border border border-border">
            <div className="bg-bg-card group cursor-pointer flex flex-col">
              <div className="aspect-video overflow-hidden">
                <img src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="News" referrerPolicy="no-referrer" />
              </div>
              <div className="p-10 flex flex-col gap-3">
                <div className="font-heading text-[10px] font-bold tracking-[0.15em] uppercase text-accent">Article · Mars 2024</div>
                <h3 className="font-heading text-2xl font-extrabold uppercase tracking-tight leading-tight">Comment instaurer un cadre clair sans utiliser la force</h3>
                <div className="text-text-muted text-sm mt-auto pt-4">Lire l'article →</div>
              </div>
            </div>

            <div className="bg-bg-card group cursor-pointer flex flex-col">
              <div className="aspect-square overflow-hidden">
                <img src="https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="News" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 flex flex-col gap-3">
                <div className="font-heading text-[10px] font-bold tracking-[0.15em] uppercase text-accent">Presse · 2024</div>
                <h3 className="font-heading text-lg font-extrabold uppercase tracking-tight leading-tight">Interview exclusive dans Cheval Magazine</h3>
                <div className="text-text-muted text-sm mt-auto pt-4">Lire →</div>
              </div>
            </div>

            <div className="bg-bg-card group cursor-pointer flex flex-col">
              <div className="aspect-square overflow-hidden">
                <img src="https://images.unsplash.com/photo-1598974357851-98166a9d9b44?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="News" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 flex flex-col gap-3">
                <div className="font-heading text-[10px] font-bold tracking-[0.15em] uppercase text-accent">Événement · 2024</div>
                <h3 className="font-heading text-lg font-extrabold uppercase tracking-tight leading-tight">Ouverture des inscriptions pour le Stage Immersion</h3>
                <div className="text-text-muted text-sm mt-auto pt-4">Lire →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Section */}
      <section className="py-28" id="speaking">
        <div className="px-10 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-block font-heading text-[11px] font-bold tracking-[0.15em] uppercase text-accent border border-accent-dim px-3 py-1 rounded-sm mb-5">
                Conférences
              </div>
              <div className="font-display text-8xl font-black italic text-transparent [-webkit-text-stroke:1px_var(--color-border)] leading-none mb-2">∞</div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight mb-6">
                Disponible pour <br /> <span className="text-accent">vos événements</span>.
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-6 font-light">
                Catherine intervient régulièrement lors de salons, séminaires et événements équestres pour partager sa vision d'une équitation plus consciente et structurée.
              </p>
              <p className="text-text-muted text-lg leading-relaxed mb-10 font-light">
                Thèmes : psychologie équine, leadership du cavalier, gestion du stress et performance durable.
              </p>
              <a href="mailto:contact@catherine-evrard.com" className="inline-flex items-center gap-3 bg-accent text-black font-heading text-[11px] font-bold tracking-widest uppercase px-10 py-4 rounded-sm hover:bg-white transition-all group">
                Demande de devis
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="relative h-[500px]">
              <div className="absolute top-0 left-0 w-3/4 h-[380px] rounded-sm overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Speaking" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute bottom-0 right-0 w-[60%] h-[260px] rounded-sm overflow-hidden border-[3px] border-bg shadow-2xl">
                <img src="https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Speaking" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 bg-bg-card" id="faq">
        <div className="px-10 max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block font-heading text-[11px] font-bold tracking-[0.15em] uppercase text-accent border border-accent-dim px-3 py-1 rounded-sm mb-5">
              FAQ
            </div>
            <h2 className="font-display text-5xl font-bold uppercase tracking-tight">Questions Fréquentes</h2>
          </div>
          
          <div className="bg-surface p-10 md:p-16 rounded-sm border border-border">
            {[
              { q: "Est-ce adapté si mon cheval est très sensible ?", a: "Absolument. La méthode est justement née du travail avec des chevaux complexes et réactifs. Elle privilégie la clarté et le calme." },
              { q: "Est-ce que cette approche convient aux débutants ?", a: "Oui, car elle pose des bases saines dès le départ. C'est même le meilleur moment pour apprendre à communiquer sans force." },
              { q: "Est-ce que je peux suivre l’académie même si j’ai déjà essayé d’autres méthodes ?", a: "Oui. Beaucoup de nos membres viennent après avoir testé d'autres approches. Notre cadre structuré aide souvent à débloquer ce qui résistait." },
              { q: "Combien de temps faut-il pour voir les premiers changements ?", a: "Les premiers résultats sur la connexion sont souvent visibles en quelques semaines si la pratique est régulière." },
              { q: "Est-ce que l’académie convient aussi aux cavaliers orientés performance ?", a: "Tout à fait. La performance durable ne peut se construire que sur une base de confiance et de contrôle technique précis." },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent py-28 px-10 text-center text-black" id="contact">
        <div className="inline-block font-heading text-[11px] font-bold tracking-[0.15em] uppercase bg-black/10 border border-black/20 px-4 py-1 rounded-sm mb-6">
          Contact
        </div>
        <h2 className="font-display text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] tracking-tighter mb-8 uppercase">
          Travaillons <br /> ensemble.
        </h2>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-12 opacity-80 font-light leading-relaxed">
          Que vous soyez cavalier, organisateur d'événement ou marque — contactez mon équipe pour explorer les possibilités d'accompagnement.
        </p>
        <a href="mailto:contact@catherine-evrard.com" className="inline-flex items-center gap-3 bg-black text-accent font-heading text-[12px] font-bold tracking-widest uppercase px-12 py-5 rounded-sm hover:bg-bg-card hover:text-white transition-all group">
          Envoyer un message
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-bg-card border-t border-border py-20 px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center text-black">
                  <HorseIcon size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-sm font-bold tracking-tight text-accent leading-none">CATHERINE EVRARD</span>
                </div>
              </div>
              <p className="text-text-muted text-sm leading-relaxed font-light max-w-xs">
                Accompagner les cavaliers vers une relation plus juste, claire et performante avec leur cheval.
              </p>
            </div>

            <div>
              <div className="font-heading text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-8">Navigation</div>
              <ul className="flex flex-col gap-4">
                <li><a href="#about" className="text-sm text-text-muted hover:text-accent transition-colors">À propos</a></li>
                <li><a href="https://go.lecodeducheval.com/optin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQqs9BleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadU8HGt_Nr5FGNEaQlSELy-zqrNTpKvTTc47BEL3vuAzAKu9QbiyDEHEMYevg_aem_yWrxvJwhIYBQHEz5d3ZeQw" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-accent transition-colors">L'Académie</a></li>
                <li><a href="#timeline" className="text-sm text-text-muted hover:text-accent transition-colors">Parcours</a></li>
                <li><a href="#show" className="text-sm text-text-muted hover:text-accent transition-colors">Podcast</a></li>
              </ul>
            </div>

            <div>
              <div className="font-heading text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-8">Ressources</div>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">Newsletter</a></li>
                <li><a href="https://go.lecodeducheval.com/optin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQqs9BleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadU8HGt_Nr5FGNEaQlSELy-zqrNTpKvTTc47BEL3vuAzAKu9QbiyDEHEMYevg_aem_yWrxvJwhIYBQHEz5d3ZeQw" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-accent transition-colors">L'Académie</a></li>
                <li><a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <div className="font-heading text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-8">Légal</div>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">Mentions légales</a></li>
                <li><a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">Confidentialité</a></li>
                <li><a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">CGV</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xs text-text-muted uppercase tracking-widest">
              © Catherine Evrard {new Date().getFullYear()}. Tous droits réservés.
            </div>
            <div className="flex gap-6">
              {['IG', 'YT', 'LI', 'FB'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 border border-border rounded-sm flex items-center justify-center text-[10px] font-heading font-bold text-text-muted hover:border-accent hover:text-accent transition-all">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
