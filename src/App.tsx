// Self-hosted fonts (replaces the Google Fonts @import; keeps CSP at 'self').
// Latin subset only — the site content is English/code.
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import '@fontsource/jetbrains-mono/latin-600.css';
import '@fontsource/jetbrains-mono/latin-700.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import './styles/variables.css';
import './styles/terminal.css';
import './App.css';
import { MotionConfig } from 'framer-motion';

import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { GitHubContributions } from './components/GitHubContributions';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Skills } from './components/Skills';
import { useTheme } from './hooks/useTheme';

function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <Navbar theme={theme} onThemeToggle={toggleTheme} />
        <main className="main">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <GitHubContributions />
          <Contact />
        </main>
        <footer className="footer">
          <div className="footer-container">
            <p className="footer-text">
              <span className="syntax-comment">{'// '}</span>
              <span className="syntax-keyword">Built with</span>{' '}
              <span className="syntax-type">Rsbuild</span>{' '}
              <span className="syntax-keyword">+</span>{' '}
              <span className="syntax-type">React</span>{' '}
              <span className="syntax-keyword">+</span>{' '}
              <span className="syntax-type">TypeScript</span>
            </p>
            <p className="footer-copyright">
              <span className="syntax-comment">
                {'/* '}Copyright &copy; {new Date().getFullYear()} Phisanurat W.
                All Rights Reserved{' */'}
              </span>
            </p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default App;
