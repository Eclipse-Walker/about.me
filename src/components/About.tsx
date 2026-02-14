import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import {
  blockVariants,
  sectionTitleVariants,
  viewportSettings,
} from '../motion/variants';
import { TerminalWindow } from './TerminalWindow';
import './About.css';

export function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={sectionTitleVariants}
        >
          <span className="title-prefix">01.</span> About Me
        </motion.h2>

        <motion.div
          className="about-content"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={blockVariants}
        >
          <TerminalWindow title="about.json">
            <div className="about-json">
              <div className="json-line">
                <span className="syntax-keyword">{'{'}</span>
              </div>
              <div className="json-line json-indent">
                <span className="syntax-variable">"name"</span>
                <span className="syntax-keyword">:</span>{' '}
                <span className="syntax-string">"{resumeData.name}"</span>
                <span className="syntax-keyword">,</span>
              </div>
              <div className="json-line json-indent">
                <span className="syntax-variable">"title"</span>
                <span className="syntax-keyword">:</span>{' '}
                <span className="syntax-string">"{resumeData.title}"</span>
                <span className="syntax-keyword">,</span>
              </div>
              <div className="json-line json-indent">
                <span className="syntax-variable">"location"</span>
                <span className="syntax-keyword">:</span>{' '}
                <span className="syntax-string">"Bangkok, Thailand"</span>
                <span className="syntax-keyword">,</span>
              </div>
              <div className="json-line json-indent">
                <span className="syntax-variable">"education"</span>
                <span className="syntax-keyword">:</span>{' '}
                <span className="syntax-keyword">{'{'}</span>
              </div>
              <div className="json-line json-indent-2">
                <span className="syntax-variable">"degree"</span>
                <span className="syntax-keyword">:</span>{' '}
                <span className="syntax-string">
                  "{resumeData.education.degree}, {resumeData.education.field}"
                </span>
                <span className="syntax-keyword">,</span>
              </div>
              <div className="json-line json-indent-2">
                <span className="syntax-variable">"university"</span>
                <span className="syntax-keyword">:</span>{' '}
                <span className="syntax-string">
                  "{resumeData.education.institution}"
                </span>
              </div>
              <div className="json-line json-indent">
                <span className="syntax-keyword">{'}'}</span>
                <span className="syntax-keyword">,</span>
              </div>
              <div className="json-line json-indent">
                <span className="syntax-variable">"languages"</span>
                <span className="syntax-keyword">:</span> [
                {resumeData.languages.map((lang, index) => (
                  <span key={lang.name}>
                    <span className="syntax-string">
                      "{lang.name} ({lang.proficiency})"
                    </span>
                    {index < resumeData.languages.length - 1 && (
                      <span className="syntax-keyword">, </span>
                    )}
                  </span>
                ))}
                ]
              </div>
              <div className="json-line">
                <span className="syntax-keyword">{'}'}</span>
              </div>
            </div>
          </TerminalWindow>

          <div className="about-links">
            <a
              href={resumeData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              <Linkedin size={20} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              href={resumeData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              <Github size={20} aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
