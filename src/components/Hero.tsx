import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Github, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { resumeData } from '../data/resume';
import { TerminalWindow } from './TerminalWindow';
import './Hero.css';

export function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const fullText = `Hello, I'm ${resumeData.name}`;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-terminal-wrapper"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <TerminalWindow title="welcome.sh">
              <div className="hero-terminal-content">
                <div className="terminal-line">
                  <span className="syntax-comment">
                    {'// Welcome to my portfolio'}
                  </span>
                </div>
                <div className="terminal-line">
                  <span className="syntax-keyword">const</span>{' '}
                  <span className="syntax-variable">greeting</span>{' '}
                  <span className="syntax-keyword">=</span>{' '}
                  <span className="syntax-string">"{displayText}"</span>
                  <span className={`cursor ${showCursor ? 'visible' : ''}`}>
                    |
                  </span>
                </div>
                <div className="terminal-line terminal-line-empty" />
                <div className="terminal-line">
                  <span className="syntax-keyword">const</span>{' '}
                  <span className="syntax-variable">role</span>{' '}
                  <span className="syntax-keyword">=</span>{' '}
                  <span className="syntax-string">"{resumeData.title}"</span>
                </div>
                <div className="terminal-line">
                  <span className="syntax-keyword">const</span>{' '}
                  <span className="syntax-variable">focus</span>{' '}
                  <span className="syntax-keyword">=</span> [
                </div>
                <div className="terminal-line terminal-indent">
                  <span className="syntax-string">"Office.js",</span>
                </div>
                <div className="terminal-line terminal-indent">
                  <span className="syntax-string">
                    "Microsoft 365 Add-ins",
                  </span>
                </div>
                <div className="terminal-line terminal-indent">
                  <span className="syntax-string">"TypeScript"</span>
                </div>
                <div className="terminal-line">]</div>
              </div>
            </TerminalWindow>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button
              type="button"
              className="hero-btn hero-btn-primary"
              onClick={scrollToContact}
            >
              <Mail size={18} aria-hidden="true" />
              Get in Touch
            </button>
            <a
              href={resumeData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-secondary"
            >
              <Github size={18} aria-hidden="true" />
              View GitHub
            </a>
          </motion.div>

          <motion.div
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          >
            <span className="scroll-text">scroll down</span>
            <motion.div
              className="scroll-arrow"
              animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 1.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }
              }
            >
              <ChevronDown size={24} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
