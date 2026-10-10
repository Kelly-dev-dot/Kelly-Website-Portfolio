import { useState } from 'react';
import { profile } from '../data/content';
import Icon from './Icons';
import Reveal from './Reveal';
import Socials from './Socials';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Sans serveur : le formulaire ouvre le logiciel de mail avec le message déjà écrit.
  // (Pour un envoi direct, voir le README : service gratuit Formspree.)
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Message from your portfolio — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Contact</p>
          <h2 className="section__title">
            Get in <span className="grad">touch</span>
          </h2>
        </Reveal>

        <div className="contact">
          <Reveal className="contact__intro">
            <h3>Let's work together</h3>
            <p className="contact__text">
              I am looking for an application development internship. Write to me, I reply quickly.
            </p>
            <ul className="contact__info">
              <li><Icon name="mail" size={20} /><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><Icon name="call" size={20} /><span>{profile.phone}</span></li>
              <li><Icon name="pin" size={20} /><span>{profile.location}</span></li>
            </ul>
            <Socials />
          </Reveal>

          <Reveal delay={120}>
            <form className="card contact__form" onSubmit={onSubmit}>
              <div className="contact__row">
                <label>
                  Name
                  <input name="name" value={form.name} onChange={onChange} required autoComplete="name" />
                </label>
                <label>
                  Email
                  <input name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
                </label>
              </div>
              <label>
                Subject
                <input name="subject" value={form.subject} onChange={onChange} />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" value={form.message} onChange={onChange} required />
              </label>
              <button className="btn btn--primary" type="submit">Send message</button>
            </form>
          </Reveal>
        </div>
      </div>

      <footer className="footer container">
        © {new Date().getFullYear()} {profile.name} — Built with React & Three.js
      </footer>
    </section>
  );
}
