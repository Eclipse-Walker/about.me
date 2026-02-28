import { motion } from 'framer-motion';
import { Building2, Calendar, ChevronRight, MapPin } from 'lucide-react';
import { resumeData } from '../data/resume';
import {
  sectionTitleVariants,
  staggerItemVariants,
  viewportSettings,
} from '../motion/variants';
import { TerminalWindow } from './TerminalWindow';
import './Experience.css';

export function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={sectionTitleVariants}
        >
          <span className="title-prefix">02.</span> Experience
        </motion.h2>

        <div className="experience-timeline">
          {resumeData.experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              className="timeline-item"
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerItemVariants}
              custom={index}
            >
              <div className="timeline-marker">
                <span className="timeline-dot" />
                {index < resumeData.experiences.length - 1 && (
                  <span className="timeline-line" />
                )}
              </div>

              <TerminalWindow
                title={`${exp.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}.log`}
              >
                <div className="experience-content">
                  <div className="experience-header">
                    <h3 className="experience-role">
                      <span className="syntax-function">{exp.role}</span>
                    </h3>
                    <div className="experience-meta">
                      <span className="experience-company">
                        <Building2 size={14} aria-hidden="true" />
                        {exp.company}
                      </span>
                      <span className="experience-period">
                        <Calendar size={14} aria-hidden="true" />
                        {exp.period}
                      </span>
                    </div>
                    <span className="experience-location">
                      <MapPin size={14} aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="experience-list">
                    {exp.responsibilities.map((item, i) => (
                      <li
                        key={`resp-${exp.company}-${i}`}
                        className="experience-item"
                      >
                        <ChevronRight
                          size={14}
                          className="item-bullet"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
