import { Download, Github, Linkedin, Loader2, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { resumeData } from '../data/resume';
import {
  sectionTitleVariants,
  staggerItemVariants,
  viewportSettings,
} from '../motion/variants';
import { TerminalWindow } from './TerminalWindow';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const handleDownloadCV = () => {
    // Create a simple text-based CV for download
    const cvContent = `
${resumeData.name}
${resumeData.title}

LinkedIn: ${resumeData.links.linkedin}
GitHub: ${resumeData.links.github}

EXPERIENCE
${resumeData.experiences
  .map(
    (exp) => `
${exp.role} @ ${exp.company}
${exp.period} | ${exp.location}
${exp.responsibilities.map((r) => `- ${r}`).join('\n')}
`,
  )
  .join('\n')}

SKILLS
${resumeData.skills.map((cat) => `${cat.name}: ${cat.skills.join(', ')}`).join('\n')}

EDUCATION
${resumeData.education.degree}, ${resumeData.education.field}
${resumeData.education.institution}
${resumeData.education.period}

LANGUAGES
${resumeData.languages.map((l) => `${l.name}: ${l.proficiency}`).join('\n')}
`.trim();

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phisanurat-cv.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={sectionTitleVariants}
        >
          <span className="title-prefix">05.</span> Contact
        </motion.h2>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerItemVariants}
            custom={0}
          >
            <TerminalWindow title="contact.sh">
              <div className="contact-terminal">
                <div className="terminal-line">
                  <span className="syntax-comment"># Get in touch</span>
                </div>
                <div className="terminal-line">
                  <span className="syntax-keyword">echo</span>{' '}
                  <span className="syntax-string">
                    "I'm always open to discussing new projects and
                    opportunities."
                  </span>
                </div>
                <div className="terminal-line terminal-line-empty" />
                <div className="terminal-line">
                  <span className="syntax-comment"># Connect with me</span>
                </div>
                <div className="terminal-line">
                  <Linkedin
                    size={14}
                    className="terminal-icon"
                    aria-hidden="true"
                  />
                  <span className="syntax-variable">LINKEDIN</span>=
                  <a
                    href={resumeData.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="syntax-string terminal-link"
                  >
                    "{resumeData.links.linkedin}"
                  </a>
                </div>
                <div className="terminal-line">
                  <Github
                    size={14}
                    className="terminal-icon"
                    aria-hidden="true"
                  />
                  <span className="syntax-variable">GITHUB</span>=
                  <a
                    href={resumeData.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="syntax-string terminal-link"
                  >
                    "{resumeData.links.github}"
                  </a>
                </div>
              </div>
            </TerminalWindow>

            <button
              type="button"
              className="download-btn"
              onClick={handleDownloadCV}
            >
              <Download size={18} aria-hidden="true" />
              Download CV
            </button>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerItemVariants}
            custom={1}
          >
            <TerminalWindow title="send-message.tsx">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <span className="syntax-keyword">const</span>{' '}
                  <span className="syntax-function">sendMessage</span>{' '}
                  <span className="syntax-keyword">=</span>{' '}
                  <span className="syntax-keyword">{'{'}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <span className="syntax-variable">name</span>
                    <span className="syntax-keyword">:</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <span className="syntax-variable">email</span>
                    <span className="syntax-keyword">:</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <span className="syntax-variable">message</span>
                    <span className="syntax-keyword">:</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-input form-textarea"
                    placeholder="Your message..."
                    rows={4}
                  />
                </div>

                <div className="form-footer">
                  <span className="syntax-keyword">{'}'}</span>
                </div>

                <button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={18}
                        className="spinner"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-message success">
                    <span className="syntax-comment">
                      {'// Message sent successfully!'}
                    </span>
                  </div>
                )}
              </form>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
