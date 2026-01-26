import {
  BookOpen,
  Code2,
  FileSpreadsheet,
  type LucideIcon,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { resumeData } from '../data/resume';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { TerminalWindow } from './TerminalWindow';
import './Skills.css';

const categoryIcons: Record<string, LucideIcon> = {
  'Programming Languages & Frameworks': Code2,
  'Office Development': FileSpreadsheet,
  'Agile Practices': Users,
  'Tools & Platforms': Settings,
  'Testing & Quality Assurance': ShieldCheck,
  'Additional Skills': Sparkles,
  'Currently Learning': BookOpen,
};

export function Skills() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>();

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="skills-container">
        <h2
          className={`section-title scroll-animate ${isVisible ? 'visible' : ''}`}
        >
          <span className="title-prefix">03.</span> Skills
        </h2>

        <div className="skills-grid">
          {resumeData.skills.map((category, index) => {
            const IconComponent = categoryIcons[category.name] || Code2;
            return (
              <div
                key={category.name}
                className={`skill-card scroll-animate stagger-${index + 1} ${isVisible ? 'visible' : ''}`}
              >
                <TerminalWindow
                  title={`${category.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.ts`}
                >
                  <div className="skill-content">
                    <div className="skill-header">
                      <IconComponent
                        size={18}
                        className="skill-icon"
                        aria-hidden="true"
                      />
                      <span className="syntax-keyword">interface</span>{' '}
                      <span className="syntax-type">
                        {category.name.replace(/[^a-zA-Z0-9]/g, '')}
                      </span>{' '}
                      <span className="syntax-keyword">{'{'}</span>
                    </div>
                    <div className="skill-list">
                      {category.skills.map((skill, i) => (
                        <div key={skill} className="skill-item">
                          <span className="syntax-variable">
                            {skill.toLowerCase().replace(/[^a-z0-9]/g, '_')}
                          </span>
                          <span className="syntax-keyword">:</span>{' '}
                          <span className="syntax-type">Skill</span>
                          {i < category.skills.length - 1 && (
                            <span className="syntax-keyword">,</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="skill-footer">
                      <span className="syntax-keyword">{'}'}</span>
                    </div>

                    <div className="skill-tags">
                      {category.skills.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
