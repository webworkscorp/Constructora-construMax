import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight,
  Hammer,
  Settings,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Check,
  Shield,
  Home,
  Star,
  Zap,
} from 'lucide-react';
import { WhatsAppButton } from './components/WhatsAppButton';
import { 
  WHATSAPP_NUMBER,
} from './constants';

const useTypewriter = (text: string[], speed = 100, wait = 3000, loop = true, enabled = true) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (!enabled || pause) return;
    const currentFullText = text[index % text.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        if (displayedText.length === currentFullText.length) {
          setPause(true);
          setTimeout(() => {
            setPause(false);
            setIsDeleting(true);
          }, wait);
        }
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, speed, wait, pause, loop, enabled, index]);
  return displayedText;
};

const useTypewriterPlaceholder = (examples: string[], speed = 60, wait = 2000) => {
  const [placeholder, setPlaceholder] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = examples[index % examples.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholder(currentWord.substring(0, placeholder.length + 1));
        if (placeholder.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), wait);
        }
      } else {
        setPlaceholder(currentWord.substring(0, placeholder.length - 1));
        if (placeholder.length === 0) {
          setIsDeleting(false);
          setIndex(index + 1);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [placeholder, isDeleting, index, examples, speed, wait]);
  return placeholder;
};

const useOnVisible = (threshold = 0.15) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIntersecting(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isIntersecting] as const;
};

const App: React.FC = () => {
  const [formData, setFormData] = useState({ nombre: '', detalle: '' });
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  
  const [heroRef, heroVisible] = useOnVisible(0);
  const [aboutRef, aboutVisible] = useOnVisible(0.2);
  const [servicesRef, servicesVisible] = useOnVisible(0.1);
  const [portfolioRef, portfolioVisible] = useOnVisible(0.1);
  const [standardsRef, standardsVisible] = useOnVisible(0.2);
  const [contactRef, contactVisible] = useOnVisible(0.2);

  const LOGO_URL = "https://i.imgur.com/p482t8d.png";
  const HERO_VIDEO_URL = "https://mqajxigehitkgdtepqzi.supabase.co/storage/v1/object/public/Video%20surf/FDownloader.Net_AQO41W1zONF8mNWyRRBELz0VRIust-J720P0P4x3_7pzFpShV47X3ctA0xhXoKnyTBQot8FP2RpXY-HvbZTpUek46_euexTvE23uFNVScr5XwA_720p_(HD).mp4";

  const heroTitleText = useTypewriter(["PREFABRICADOS.", "MATERIALES.", "SIN VUELTAS."], 150, 2500, true, heroVisible);
  const firstWord = "CONSTRUMAX";
  const secondWord = heroTitleText || '';

  const placeholderName = useTypewriterPlaceholder([
    "Tu nombre...",
    "Casa prefabricada...",
    "Materiales eléctricos...",
  ], 50, 3000);

  useEffect(() => {
    const handleScroll = () => { setShowStickyHeader(window.scrollY > 200); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*SOLICITUD DE COTIZACIÓN - CONSTRUMAX*\n\n*Nombre:* ${formData.nombre}\n*Interés:* ${formData.detalle}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const serviceIcons = [
    <Home size={48} strokeWidth={1} key="home" />, 
    <Zap size={48} strokeWidth={1} key="zap" />, 
    <Hammer size={48} strokeWidth={1} key="hammer" />
  ];

  const revealClass = (visible: boolean, delay = "delay-0", direction = "up") => {
    const directions = {
      up: visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0",
      down: visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0",
      left: visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0",
      right: visible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0",
    };
    return `transition-all duration-[1200ms] cubic-bezier(0.23,1,0.32,1) ${delay} transform ${directions[direction as keyof typeof directions]}`;
  };

  const portfolioItems = [
    { id: '01', img: 'https://i.imgur.com/UQwJr69.jpeg' },
    { id: '02', img: 'https://i.imgur.com/VeA4ARS.jpeg' },
    { id: '03', img: 'https://i.imgur.com/kCbOAcO.jpeg' },
    { id: '04', img: 'https://i.imgur.com/lvynYbs.jpeg' },
    { id: '05', img: 'https://i.imgur.com/TQSDy0K.jpeg' },
    { id: '06', img: 'https://i.imgur.com/odyqbWu.jpeg' }
  ];

  const simpleServices = [
    { name: "Prefabricados", description: "Tu casa lista en tiempo récord. Kits completos y asesoría para armar tu hogar." },
    { name: "Materiales", description: "Venta de cemento, block, varilla y todo lo eléctrico. Suministro confiable en Sarapiquí." },
    { name: "Herramientas", description: "Venta de equipo para construcción. Herramientas que aguantan el trabajo pesado." }
  ];

  const buttonStyle = "relative overflow-hidden px-14 py-6 font-black text-[12px] uppercase tracking-[0.3em] transition-all duration-300 group select-none bg-brand-blue text-white hover:bg-brand-navy inline-flex items-center justify-center";

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
      
      {/* Header Sticky con logo grande centrado */}
      <nav className={`fixed top-0 left-0 w-full bg-brand-blue z-[200] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${showStickyHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} border-b border-white/10 py-2 md:py-4 shadow-2xl`}>
        <div className="max-w-screen-2xl mx-auto flex justify-center items-center px-6">
          <img 
            src={LOGO_URL} 
            alt="Logo Construmax" 
            className="h-24 md:h-32 lg:h-36 w-auto object-contain drop-shadow-lg"
          />
        </div>
      </nav>

      <header ref={heroRef} className="relative h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className={`w-full h-full object-cover transition-all duration-[3000ms] ${heroVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-brand-blue/30 backdrop-brightness-[0.6]" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl">
          <div className="space-y-6">
            <div className={revealClass(heroVisible, "delay-100", "right")}>
              <div className="flex items-center gap-4 text-white">
                <span className="text-[10px] uppercase tracking-architect font-black">CONSTRUCTORA CONSTRUMAX</span>
                <div className="h-px w-16 bg-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-[6.5rem] lg:text-[7.5rem] leading-[0.9] heading-bold text-white tracking-tighter uppercase min-h-[2.5em] md:min-h-[1.8em]">
              {firstWord} <br />
              <span className="text-white drop-shadow-lg">{secondWord}</span>
              <span className={`inline-block w-[3px] md:w-[6px] h-[0.8em] bg-white ml-2 align-middle ${heroVisible ? 'animate-pulse' : 'opacity-0'}`} />
            </h1>
            
            <div className={`flex flex-col gap-6 pt-4 ${revealClass(heroVisible, "delay-500", "up")}`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <a href="#contacto" className={`${buttonStyle} !px-16 !bg-white !text-brand-blue hover:!bg-brand-offwhite shadow-xl`}>
                  <span className="relative z-10">COTIZAR AHORA</span>
                </a>
                <div className="flex flex-col gap-1.5 opacity-90">
                  <div className="flex gap-1.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-white text-white" />)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Confianza en Sarapiquí</span>
                </div>
              </div>
              <p className="text-lg md:text-xl text-gray-100 font-light max-w-xl leading-relaxed drop-shadow-md">
                Tu casa prefabricada o materiales de construcción en un solo lugar. Precios justos y entrega puntual.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section ref={aboutRef} id="nosotros" className="bg-brand-offwhite text-slate-900 py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start mb-40">
            <div className={`lg:col-span-7 ${revealClass(aboutVisible, "delay-0", "right")}`}>
              <h2 className="text-5xl md:text-[6rem] heading-bold uppercase leading-[0.8] tracking-tighter">
                TRABAJAMOS <br />
                <span className="text-brand-blue">BIEN.</span>
              </h2>
            </div>
            <div className={`lg:col-span-5 pt-4 ${revealClass(aboutVisible, "delay-300", "left")}`}>
              <p className="text-2xl md:text-4xl font-black uppercase leading-tight tracking-tight">
                COMPROMISO REAL CON <br />
                <span className="text-brand-blue underline decoration-2 underline-offset-8">TU OBRA Y TU PLATA.</span>
              </p>
              <p className="mt-8 text-slate-500 text-lg font-light leading-relaxed max-w-md italic">
                En Construmax nos enfocamos en que tu construcción sea sencilla. Menos vueltas, más resultados.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 md:gap-24">
            {[
              { num: '01', title: 'Casas Listas', text: 'Vendemos kits de casas prefabricadas de alta calidad para que construyas rápido.' },
              { num: '02', title: 'Todo Eléctrico', text: 'Desde cables hasta herramientas. No tenés que ir a otro lado para terminar tu red.' },
              { num: '03', title: 'Local y Seguro', text: 'Estamos en Río Frío. Si tenés un problema, venís y te lo resolvemos al momento.' }
            ].map((item, idx) => (
              <div key={idx} className={`relative group ${revealClass(aboutVisible, `delay-[${idx * 200}ms]`, "up")}`}>
                <span className="text-[8rem] md:text-[10rem] font-black text-brand-blue/[0.05] absolute -top-16 -left-4 leading-none select-none group-hover:text-brand-blue/10 transition-colors duration-500">{item.num}</span>
                <div className="relative z-10 pt-8">
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 group-hover:text-brand-blue transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-600 text-xl font-light leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={servicesRef} id="servicios" className="bg-white py-40 px-8 md:px-16 lg:px-24 border-y border-slate-100 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className={revealClass(servicesVisible, "delay-0", "right")}>
              <h2 className="text-6xl md:text-8xl heading-bold uppercase tracking-tighter text-slate-900">Qué ofrecemos.</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {simpleServices.map((service, i) => (
              <div key={i} className={`bg-brand-offwhite p-12 border border-slate-100 rounded-sm group ${revealClass(servicesVisible, `delay-[${i * 200}ms]`, "up")} hover:bg-white hover:shadow-2xl transition-all duration-500`}>
                <div className="flex flex-col h-full">
                  <div className="mb-12 text-brand-blue group-hover:scale-110 transition-all duration-500">
                    {serviceIcons[i]}
                  </div>
                  <h3 className="text-4xl font-black uppercase mb-6 tracking-tighter text-slate-900 group-hover:text-brand-blue transition-colors duration-500">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-xl leading-relaxed font-light mb-16">
                    {service.description}
                  </p>
                  <div className="mt-auto flex items-center gap-4 text-brand-blue">
                    <div className="h-px w-12 bg-brand-blue group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        ref={standardsRef} 
        className="relative py-48 px-8 md:px-16 lg:px-24 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://i.imgur.com/cO0DEEr.jpeg")' }}
      >
        {/* Fondo mucho más visible con overlay mínimo */}
        <div className="absolute inset-0 bg-brand-blue/20 backdrop-brightness-[0.85] z-0" />
        
        <div className="max-w-screen-2xl mx-auto relative z-10 text-center">
          <div className={revealClass(standardsVisible, "delay-0", "up")}>
            <h2 className="text-5xl md:text-[8rem] heading-bold uppercase leading-[0.8] tracking-tighter text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
              CERO <br />
              VUELTAS. <br />
              <span className="text-white/95">RESULTADO CONSTRUMAX.</span>
            </h2>
          </div>
          <div className={`max-w-4xl mx-auto mt-12 ${revealClass(standardsVisible, "delay-200", "up")}`}>
            <p className="text-2xl md:text-4xl font-light text-white italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
              "Tu casa o materiales sin complicaciones."
            </p>
          </div>
          <div className={`mt-24 ${revealClass(standardsVisible, "delay-500", "up")}`}>
            <a href="#contacto" className={`${buttonStyle} !px-20 scale-110 !bg-white !text-brand-blue hover:!bg-brand-offwhite shadow-2xl transition-transform hover:scale-125`}>
                <span className="relative z-10">PEDIR PRESUPUESTO</span>
            </a>
          </div>
        </div>
      </section>

      <section ref={portfolioRef} id="showcase" className="bg-white py-48 px-8 md:px-16 lg:px-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-32">
            <h2 className={`text-6xl md:text-[7rem] heading-bold uppercase leading-[0.85] tracking-tighter text-slate-900 ${revealClass(portfolioVisible, "delay-0", "up")}`}>
              TRABAJOS <br />
              <span className="text-brand-blue">REALES.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {portfolioItems.map((item, idx) => (
              <div key={item.id} className={`group ${revealClass(portfolioVisible, `delay-[${idx * 150}ms]`, "up")}`}>
                <div className="relative overflow-hidden aspect-video md:aspect-[16/10] bg-slate-100 rounded-sm shadow-xl">
                  <img src={item.img} alt={`Obra ${item.id}`} className="w-full h-full object-cover transition-all duration-[2.5s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-blue/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={contactRef} id="contacto" className="bg-brand-offwhite text-slate-900 py-40 px-8 md:px-16 lg:px-24 border-t border-slate-200">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-24 items-start">
            <div className={`lg:col-span-5 space-y-16 ${revealClass(contactVisible, "delay-0", "right")}`}>
              <h2 className="text-6xl md:text-[7rem] heading-bold uppercase leading-[0.8] tracking-tighter">
                CONTANOS <br /> <span className="text-brand-blue">TU IDEA.</span>
              </h2>
              <div className="space-y-8 max-w-sm">
                <p className="text-2xl font-black uppercase leading-tight tracking-tight">TE AYUDAMOS A <span className="text-brand-blue">PLANEAR</span> TODO.</p>
                <div className="space-y-4 text-slate-600 font-light text-lg">
                  <div className="flex items-center gap-3"><Phone size={20} className="text-brand-blue" /><span>8474 4690</span></div>
                  <div className="flex items-center gap-3"><Mail size={20} className="text-brand-blue" /><span>facturaconstrumax@gmail.com</span></div>
                  <div className="flex items-start gap-3"><MapPin size={24} className="text-brand-blue flex-shrink-0" /><span>Río Frío, Sarapiquí. 50m Este y 950m Sur de la Escuela Colonia Huertares.</span></div>
                </div>
              </div>
            </div>
            <div className={`lg:col-span-7 ${revealClass(contactVisible, "delay-300", "left")}`}>
              <form onSubmit={handleFormSubmit} className="bg-white p-12 md:p-20 shadow-2xl border border-slate-200 rounded-sm space-y-16">
                <div className="space-y-16">
                  <div className="relative group/input">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue block mb-4">Tu Nombre</label>
                    <input required type="text" placeholder={formData.nombre ? '' : placeholderName} className="w-full bg-transparent border-b-2 border-slate-200 py-4 outline-none focus:border-brand-blue transition-all text-2xl font-bold tracking-tight" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                  </div>
                  <div className="relative group/input">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue block mb-4">¿Qué buscás?</label>
                    <textarea required rows={4} placeholder="Prefabricado, materiales, etc..." className="w-full bg-transparent border-b-2 border-slate-200 py-4 outline-none focus:border-brand-blue transition-all text-xl font-medium resize-none" value={formData.detalle} onChange={(e) => setFormData({ ...formData, detalle: e.target.value })} />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="w-full md:w-auto bg-brand-blue text-white px-10 py-5 text-[12px] font-black uppercase tracking-[0.5em] hover:bg-brand-navy transition-all duration-500 flex items-center justify-center gap-6 shadow-2xl">
                    ENVIAR CONSULTA <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-brand-navy pt-32 pb-16 px-8 md:px-16 lg:px-24 text-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-20">
            <div className="space-y-8 max-w-xs">
              <img src={LOGO_URL} alt="Logo Construmax" className="h-16 md:h-20 w-auto object-contain brightness-0 invert opacity-80" />
              <p className="text-[9px] text-white/60 uppercase font-black tracking-[0.4em] leading-relaxed">CONSTRUCCIÓN, PREFABRICADOS Y <br /> HERRAMIENTAS EN SARAPIQUÍ.</p>
            </div>
            <nav className="flex flex-wrap gap-12 md:gap-24 items-start">
              <div className="flex flex-col gap-6">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.6em]">DÓNDE IR</span>
                <div className="flex flex-wrap md:flex-col gap-8 md:gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-white/80">
                  <a href="#servicios" className="hover:text-white transition-all">SERVICIOS</a>
                  <a href="#showcase" className="hover:text-white transition-all">OBRAS</a>
                  <a href="#contacto" className="hover:text-white transition-all">CONTACTO</a>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.6em]">CONTACTO</span>
                <div className="flex flex-col gap-4">
                  <a href="https://www.facebook.com/share/1PwTd5Jndb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-white/80 hover:text-white transition-all">
                    <Facebook size={16} className="text-white/60" /> FACEBOOK
                  </a>
                  <a href="https://instagram.com/constructora_construmax" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-white/80 hover:text-white transition-all">
                    <Instagram size={16} className="text-white/60" /> INSTAGRAM
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-widest text-white/20 text-center md:text-left">
            <p>© 2025 CONSTRUCTORA CONSTRUMAX. RÍO FRÍO, SARAPIQUÍ.</p>
            <p>ASISTENCIA DIRECTA • CALIDAD LOCAL</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton text="Escribinos" variant="floating" />
    </div>
  );
};

export default App;