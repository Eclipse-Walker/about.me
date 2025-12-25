import { useEffect, useState } from 'react';
import { resumeData } from '../data/resume';
import { TerminalWindow } from './TerminalWindow';
import './Hero.css';

export function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
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
                <span className="syntax-string">"Office.js"</span>,
              </div>
              <div className="terminal-line terminal-indent">
                <span className="syntax-string">"Microsoft 365 Add-ins"</span>,
              </div>
              <div className="terminal-line terminal-indent">
                <span className="syntax-string">"TypeScript"</span>
              </div>
              <div className="terminal-line">]</div>
            </div>
          </TerminalWindow>

          <div className="hero-actions">
            <button
              type="button"
              className="hero-btn hero-btn-primary"
              onClick={scrollToContact}
            >
              <span className="btn-icon">$</span>
              Get in Touch
            </button>
            <a
              href={resumeData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-secondary"
            >
              <span className="btn-icon">{'>'}</span>
              View GitHub
            </a>
          </div>

          <div className="hero-scroll-indicator">
            <span className="scroll-text">scroll down</span>
            <div className="scroll-arrow">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
