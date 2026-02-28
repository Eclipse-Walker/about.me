import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Loader2, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
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

const SUBMIT_THROTTLE_MS = 15000;
const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 3000;

export function Contact() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [website, setWebsite] = useState('');
  const [lastSubmitAt, setLastSubmitAt] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const recaptchaSiteKey = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY ?? '';
  const allowedOrigins = (import.meta.env.PUBLIC_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const isAllowedOrigin =
    typeof window === 'undefined' ||
    allowedOrigins.length === 0 ||
    allowedOrigins.includes(window.location.origin);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setSubmitMessage('');
    setIsSubmitting(true);

    const now = Date.now();
    const normalizedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (website.trim()) {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setSubmitMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setWebsite('');
      recaptchaRef.current?.reset();
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    if (!isAllowedOrigin) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('This form is not available from this site origin.');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    if (now - lastSubmitAt < SUBMIT_THROTTLE_MS) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('Please wait a few seconds before sending again.');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    if (
      !normalizedFormData.name ||
      !normalizedFormData.email ||
      !normalizedFormData.message
    ) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('Please complete all required fields.');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    if (
      normalizedFormData.name.length > MAX_NAME_LENGTH ||
      normalizedFormData.message.length > MAX_MESSAGE_LENGTH
    ) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('Input exceeds allowed length.');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
    const recaptchaToken = recaptchaRef.current?.getValue();

    if (!serviceId || !templateId || !publicKey) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('Email service is not configured yet.');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    if (!recaptchaSiteKey) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('Captcha is not configured yet.');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    if (!recaptchaToken) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('Please verify that you are not a robot.');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setLastSubmitAt(now);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          ...normalizedFormData,
          'g-recaptcha-response': recaptchaToken,
        },
        {
          publicKey,
        },
      );

      setSubmitStatus('success');
      setSubmitMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      recaptchaRef.current?.reset();
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Unable to send your message. Please try again.');
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleRecaptchaExpired = () => {
    recaptchaRef.current?.reset();
  };

  const handleRecaptchaErrored = () => {
    setSubmitStatus('error');
    setSubmitMessage('Captcha failed to load. Please refresh and try again.');
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
                    autoComplete="name"
                    maxLength={MAX_NAME_LENGTH}
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
                    autoComplete="email"
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
                    maxLength={MAX_MESSAGE_LENGTH}
                    required
                    className="form-input form-textarea"
                    placeholder="Your message..."
                    rows={4}
                  />
                </div>

                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                <div className="form-footer">
                  <span className="syntax-keyword">{'}'}</span>
                </div>

                <div className="form-group recaptcha-group">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={recaptchaSiteKey}
                    onExpired={handleRecaptchaExpired}
                    onErrored={handleRecaptchaErrored}
                  />
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
                  <output className="form-message success" aria-live="polite">
                    <span className="syntax-comment">
                      {`// ${submitMessage}`}
                    </span>
                  </output>
                )}
                {submitStatus === 'error' && (
                  <div className="form-message error" role="alert">
                    <span className="syntax-comment">{`// ${submitMessage}`}</span>
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
