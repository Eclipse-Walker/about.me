import { resumeData } from '../data/resume';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { TerminalWindow } from './TerminalWindow';
import './Experience.css';

export function Experience() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>();

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="experience-container">
        <h2
          className={`section-title scroll-animate ${isVisible ? 'visible' : ''}`}
        >
          <span className="title-prefix">02.</span> Experience
        </h2>

        <div className="experience-timeline">
          {resumeData.experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className={`timeline-item scroll-animate stagger-${index + 1} ${isVisible ? 'visible' : ''}`}
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
                        <span className="syntax-keyword">@</span> {exp.company}
                      </span>
                      <span className="experience-period">
                        <span className="syntax-comment">
                          {'// '}
                          {exp.period}
                        </span>
                      </span>
                    </div>
                    <span className="experience-location">
                      <span className="syntax-string">"{exp.location}"</span>
                    </span>
                  </div>

                  <ul className="experience-list">
                    {exp.responsibilities.map((item, i) => (
                      <li
                        key={`resp-${exp.company}-${i}`}
                        className="experience-item"
                      >
                        <span className="item-bullet">{'>'}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TerminalWindow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
