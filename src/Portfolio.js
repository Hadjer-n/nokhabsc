import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, ArrowRight, Brain, Cpu, Car, Zap, Sparkles, Globe, ExternalLink } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import Flag from 'react-world-flags';
import 'leaflet/dist/leaflet.css';
import './index.css';
import adsLogo from './assets/ADS-removebg-preview.png';
import sc from './assets/dr_sc.jpg';
import SDU from './assets/SDU-removebg-preview.png';
import llm from './assets/LLM&chips.png';
import MH from './assets/Muhammad.jpg';
import PT from './assets/Patrik.jpg';
import ch from './assets/Ch.jpg';
import newResearcherImg from './assets/toqeer.jpg'; 

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const createFlagIcon = (countryCode) => {
  return divIcon({
    html: `
      <div style="
        width: 50px; 
        height: 35px; 
        border-radius: 8px; 
        background: rgba(255, 255, 255, 0.95); 
        border: 2px solid #00d4aa; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0, 212, 170, 0.4);
        transition: all 0.3s ease;
        cursor: pointer;
        backdrop-filter: blur(10px);
      ">
        <div style="
          width: 40px; 
          height: 25px; 
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <img src="https://flagcdn.com/w40/${countryCode.toLowerCase()}.png" 
               alt="${countryCode} flag" 
               style="width: 100%; height: 100%; object-fit: cover;" 
               onerror="this.style.display='none'" />
        </div>
      </div>
    `,
    iconSize: [50, 35],
    iconAnchor: [25, 17],
    popupAnchor: [0, -17],
    className: 'custom-flag-icon'
  });
};



const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mapStyle, setMapStyle] = useState('blue-white');
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 3D Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.z -= 2;
        if (this.z <= 0) this.reset();
        
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = this.size * scale;
        const opacity = 1 - this.z / 1000;

        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.6})`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(10, 25, 47, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const scale1 = 1000 / (1000 + p1.z);
            const scale2 = 1000 / (1000 + p2.z);
            const x1 = (p1.x - canvas.width / 2) * scale1 + canvas.width / 2;
            const y1 = (p1.y - canvas.height / 2) * scale1 + canvas.height / 2;
            const x2 = (p2.x - canvas.width / 2) * scale2 + canvas.width / 2;
            const y2 = (p2.y - canvas.height / 2) * scale2 + canvas.height / 2;
            const opacity = (1 - distance / 150) * 0.2;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        });
      });

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const smoothScroll = (targetId) => {
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const collaborations = [
    { 
      country: "Denmark", 
      countryCode: "DK",
      coordinates: [56.2639, 9.5018],
      region: "EUROPE",
    },
    { 
      country: "United States", 
      countryCode: "US",
      coordinates: [39.8283, -98.5795],
      region: "NORTH AMERICA",
    },
    { 
      country: "France", 
      countryCode: "FR",
      coordinates: [46.6031, 1.8883],
      region: "EUROPE",
    },
    { 
      country: "South Korea", 
      countryCode: "KR",
      coordinates: [36.6384, 127.6961],
      region: "ASIA",
    },
    { 
      country: "United Kingdom", 
      countryCode: "GB",
      coordinates: [54.7024, -3.2766],
      region: "EUROPE",
    },
    { 
      country: "Netherlands", 
      countryCode: "NL",
      coordinates: [52.2479, 5.5416],
      region: "EUROPE",
    },
    { 
      country: "Algeria", 
      countryCode: "DZ",
      coordinates: [28.2639, 2.4603],
      region: "AFRICA",
    },
    { 
      country: "Ireland", 
      countryCode: "IE",
      coordinates: [53.1424, -7.6921],
      region: "EUROPE",
    }
  ];

  const researchers = [
    {
      name: "Dr M.Benaoumeur Senouci",
      title: "Associate Professor",
      subtitle: "SDU Mechatronics (CIM)",
      image: sc
    },
    {
      name: "Muhammad Saqib Saeed",
      title: "PhD Student",
      image: MH
    },
    {
      name: "Patrik Drazic",
      title: "Research Engineer",
      image: PT
    },
    {
      name: "Christon Fredrick David Gnanamani",
      title: "Master student",
      image: ch
    },
    {
      name: "Toqeer Waheed", 
      title: "Research Assistant", 
      image: newResearcherImg 
    }
  ];

  const researchAreas = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "LLM Based Design",
      description: "Leveraging Large Language Models to create AI agents that autonomously reason, plan, and execute complex design tasks.",
      image: llm
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "HW/SW Embedded AI",
      description: "Developing specialized hardware and software to run AI models directly on devices, enabling efficient edge intelligence.",
      image: llm
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Robotics & Autonomous Vehicles",
      description: "Building intelligent systems that integrate sensors and adaptive behaviors for independent operation.",
      image: llm
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI on Chip",
      description: "Integrating specialized hardware directly onto microchips to accelerate artificial intelligence tasks.",
      image: llm
    }
  ];

  const publications = [
    {
      title: "Estimation of the fuel consumption in autonomous vehicles using machine learning techniques",
      year: "2025",
      authors: "Ghazli A., Senouci M.B., Abid D.E., Bouache M."
    },
    {
      title: "Platform Based DL Applications Design: Autonomous Vehicles Case Study",
      year: "2025",
      authors: "Aly Allam, Benaoumeur Senouci"
    },
    {
      title: "Fast prototyping of Quantized neural networks on an FPGA edge computing device with Brevitas and FINN",
      year: "2024",
      authors: "Devansh Chawda, Benaoumeur Senouci"
    }
  ];

  const mapStyles = {
    'blue-white': 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  };

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
           <div className="logo">
              <div className="logo-image-professional">
                <div className="logo-circle-outer">
                  <div className="logo-circle-middle">
                    <div className="logo-circle-inner">
                      <img src={adsLogo} alt="ADS Logo" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="logo-text-container">
                <div className="logo-text">Agentic AI-D&S</div>
                <div className="logo-subtext">University of Southern Denmark</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="nav-links desktop">
              {['home', 'about', 'Team', 'research', 'collaborations', 'publications'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => { e.preventDefault(); smoothScroll(`#${item}`); }}
                  className={`nav-link ${activeSection === item ? 'active' : ''}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="nav-underline"></span>
                </a>
              ))}

              <a
                href="https://github.com/NOKHAB-Lab/LLM4VHDL"
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn"
              >
                <Github className="icon" />
                <span>GitHub</span>
              </a>
              <a
                href="https://huggingface.co/NOKHAB-Lab"
                target="_blank"
                rel="noopener noreferrer"
                className="huggingface-btn"
              >
                <span>🤗</span>
                <span>Hugging Face</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-nav">
            {['home', 'about', 'Team', 'research', 'collaborations', 'publications'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => { e.preventDefault(); smoothScroll(`#${item}`); }}
                className="mobile-nav-link"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}

            <a
              href="https://github.com/NOKHAB-Lab/LLM4VHDL"
              target="_blank"
              rel="noopener noreferrer"
              className="github-btn mobile"
            >
              <Github className="icon" />
              <span>GitHub</span>
            </a>
            <a
              href="https://huggingface.co/NOKHAB-Lab"
              target="_blank"
              rel="noopener noreferrer"
              className="huggingface-btn mobile"
            >
              <span>🤗</span>
              <span>Hugging Face</span>
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
        
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge fade-in-up">
              <Sparkles className="icon" />
              Innovation in AI-Driven Design
            </div>

            <h1 className="hero-title fade-in-up delay-200">
              <span className="gradient-text">
                Agentic AI
              </span>
              {' '}for On-Chip Systems Design
            </h1>

            <p className="hero-description fade-in-up delay-400">
              The Agentic Design Synthesis Lab explores the use of agentic LLMs to enhance creativity and design innovation through intelligent systems, with a focus on on-chip systems design.
            </p>

            <div className="hero-buttons fade-in-up delay-600">
              <a
                href="#research"
                onClick={(e) => { e.preventDefault(); smoothScroll('#research'); }}
                className="btn btn-primary"
              >
                <span>Explore Research</span>
                <ArrowRight className="icon" />
              </a>
              <a
                href="#publications"
                onClick={(e) => { e.preventDefault(); smoothScroll('#publications'); }}
                className="btn btn-secondary"
              >
                <span>View publication</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Our Lab</h2>
            <p className="section-subtitle">Advancing the frontier of computational creativity and on-chip systems design</p>
          </div>

          <div className="about-content">
            <div className="about-main">
              <div className="about-text-section">
                <p className="about-text">
                  The Agentic Design Synthesis Lab is dedicated to advancing the field of computational creativity and on-chip systems design through the development of agentic large language models (LLMs). Our research focuses on creating systems that can reason, plan, and collaborate with human designers to generate innovative and adaptive design solutions for next-generation chip architectures.
                </p>
                <p className="about-text">
                  We combine cutting-edge AI research with practical design applications, working at the intersection of computer science, cognitive science, and hardware design theory. Our interdisciplinary approach allows us to tackle complex problems in creative domains and develop tools that enhance human creativity in on-chip systems design.
                </p>
              </div>
             <div className="about-image">
                <div className="circular-logo-container">
                  <div className="circular-logo">
                    <img src={adsLogo} alt="ADS Lab" />
                    <div className="logo-ring"></div>
                    <div className="logo-sparkle"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">Agentic AI Systems</h3>
                <p className="feature-subtitle">Developing autonomous AI agents for creative design synthesis and on-chip optimization</p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">On-Chip Design</h3>
                <p className="feature-subtitle">Specializing in AI-driven methodologies for efficient and intelligent chip design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Researchers Section */}
      <section id="Team" className="section researchers-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Research Team</h2>
            <p className="section-subtitle">Pioneering Minds in AI-Driven Design Innovation</p>
          </div>

          <div className="researchers-grid-wow">
            {researchers.map((researcher, idx) => (
              <div key={idx} className="researcher-card-wow">
                <div className="researcher-image-wow">
                  <div className="image-container">
                    <img src={researcher.image} alt={researcher.name} />
                    <div className="image-glow"></div>
                  </div>
                  <div className="floating-orb orb-1"></div>
                  <div className="floating-orb orb-2"></div>
                  <div className="floating-orb orb-3"></div>
                </div>
                
                <div className="researcher-content-wow">
                  <div className="name-glow"></div>
                  <h3 className="researcher-name-wow">{researcher.name}</h3>
                  <div className="researcher-title-wow">{researcher.title}</div>
                  <div className="researcher-subtitle-wow">{researcher.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research" className="section research-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Research Areas</h2>
            <p className="section-subtitle">Exploring diverse fields to drive innovation in on-chip systems</p>
          </div>

          <div className="research-grid">
            {researchAreas.map((area, idx) => (
              <div key={idx} className="research-card">
                <div className="research-image-bg">
                  <img src={area.image} alt="" />
                </div>
                <div className="research-content">
                  <div className="research-icon">
                    {area.icon}
                  </div>
                  <h3 className="research-title">{area.title}</h3>
                  <p className="research-description">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations Section */}
      <section id="collaborations" className="section collaborations-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Global Collaborations</h2>
            <p className="section-subtitle">Partnering with leading institutions worldwide to advance AI research</p>
          </div>

          <div className="collaborations-content">
            {/* Map Style Selector */}
            <div className="map-style-selector">
             
            </div>

            {/* World Map */}
            <div className="world-map-container">
              <MapContainer
                center={[30, 0]}
                zoom={2}
                style={{ height: '500px', width: '100%', borderRadius: '16px' }}
                zoomControl={true}
                attributionControl={false}
              >
                <TileLayer
                  url={mapStyles[mapStyle]}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {collaborations.map((collab, index) => (
                  <Marker
                    key={index}
                    position={collab.coordinates}
                    icon={createFlagIcon(collab.countryCode)}
                  >
                    <Popup className="custom-popup">
                      <div className="popup-content">
                        <div className="popup-flag">
                          <Flag 
                            code={collab.countryCode} 
                            style={{
                              width: '60px',
                              height: '40px',
                              borderRadius: '6px',
                              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                              border: '2px solid rgba(255, 255, 255, 0.3)'
                            }}
                          />
                        </div>
                        <h3 className="popup-country">{collab.country}</h3>
                        <div className="popup-region">{collab.region}</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      <section id="publications" className="section publications-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recent Publications</h2>
            <p className="section-subtitle">Our latest contributions to scientific literature</p>
          </div>

          <div className="publications-list">
            {publications.map((pub, idx) => (
              <div key={idx} className="publication-card">
                <div className="publication-content">
                  <h3 className="publication-title">{pub.title}</h3>
                  <p className="publication-authors">{pub.authors}</p>
                </div>
                <span className="publication-year">{pub.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <div className="footer-logo-container">
                <img src={SDU} alt="SDU" className="footer-logo-img" />
                <div className="footer-logo">University of Southern Denmark</div>
              </div>
              <p className="footer-text">
                Pioneering the future of computational creativity and on-chip systems design through agentic AI systems and innovative design methodologies.
              </p>
            </div>

            <div className="footer-links">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-list">
                {['Home', 'About', 'Team', 'Research', 'Collaborations', 'Publications'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => { e.preventDefault(); smoothScroll(`#${item.toLowerCase()}`); }}
                      className="footer-link"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-connect">
              <h4 className="footer-title">Connect</h4>
              <a
                href="https://github.com/NOKHAB-Lab/LLM4VHDL"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-github"
              >
                <Github className="icon" />
                <span>GitHub</span>
              </a>
              <a
                href="https://huggingface.co/NOKHAB-Lab"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-huggingface"
              >
                <span>🤗</span>
                <span>Hugging Face</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
