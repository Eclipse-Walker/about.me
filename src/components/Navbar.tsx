import {
  Briefcase,
  Code2,
  Github,
  type LucideIcon,
  Mail,
  Terminal,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

interface NavbarProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

interface NavLink {
  id: string;
  label: string;
  icon: LucideIcon;
}

const navLinks: NavLink[] = [
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'github', label: 'GitHub', icon: Github },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <button type="button" className="navbar-logo" onClick={scrollToTop}>
          <Terminal size={20} className="logo-icon" aria-hidden="true" />
          <span className="logo-bracket">{'{'}</span>
          <span className="logo-text">PW</span>
          <span className="logo-bracket">{'}'}</span>
        </button>

        <button
          type="button"
          className={`navbar-mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <button
                type="button"
                key={link.id}
                className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                <IconComponent
                  size={16}
                  className="link-icon"
                  aria-hidden="true"
                />
                {link.label}
              </button>
            );
          })}
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </nav>
  );
}
