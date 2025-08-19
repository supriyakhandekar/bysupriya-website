import React, { useEffect, useRef, useState } from "react";
import './App.css';
import './Landing.css';
import './Main.css';
import './Record.css';

export default function App() {
  const [entered, setEntered] = useState(false);
  return (
    <div className="app-container">
      {!entered ? <Landing onEnter={() => setEntered(true)} /> : <Main />}
    </div>
  );
}

function Landing({ onEnter }) {
  return (
    <section className="landing-section">
      <button onClick={onEnter} className="record-button" aria-label="Enter site">
        <VintageRecord sizeClass="record-size" />
        <div className="record-label">
          <span className="record-welcome">WELCOME</span>
          <span className="record-sub">Press to enter</span>
          <span className="record-pulse"></span>
        </div>
      </button>
    </section>
  );
}

function Main() {
  return (
    <div className="main-container">
      <header className="main-header ">
      <img src="assets/profile.png" alt="Supriya Khandekar" className="profile-pic" />
        <div>
          <h1 className="tagline">I build beautiful, impactful product experiences.</h1>
          <p className="bio">Engineering leader and creative technologist with expertise in building AI centric applications, web experiences for internal tooling and external tools for financial analytics. Passionate about blending engineering excellence, product vision, and art to deliver meaningful, user‑centered solutions.</p>
        </div>
      </header>

      <Section id="about" title="About">
        <p>I’m an engineering team lead at Bloomberg (London) with 6+ years delivering products at the intersection of AI, web technologies, and financial analytics. I launched the first BQL engineering team in London and helped launch critical internal and external tools for Bloomberg Query Language (BQL). Prior to that, I led the BQuant
          Visualizations Team in San Franciscso for the quantitative platform, BQuant.
        </p>
      </Section>

      <Section id="writing" title="Writing & Thought Leadership">
        <p>Insights and stories on the intersection of music, product, and leadership.</p>
        <ul className="writing-list">
          <li><a href="#">Vanity in the Face of Being Taken Seriously</a></li>
          <li><a href="#">Understanding the Gender Deficiency</a></li>
        </ul>
      </Section>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  );
}

function VintageRecord({ sizeClass }) {
  const ref = useRef(null);
  useEffect(() => {
    let raf; let a = 0;
    const tick = () => {
      a = (a + 0.3) % 360;
      if (ref.current) ref.current.style.transform = `rotate(${a}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className={`record-container ${sizeClass}`}>
      <div className="record-outer" aria-hidden>
        <div ref={ref} className="record-inner">
          <svg viewBox="0 0 600 600" className="record-svg">
            <defs>
              <radialGradient id="matte" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#555" />
                <stop offset="60%" stopColor="#222" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="290" fill="url(#matte)" />
            {Array.from({ length: 38 }).map((_, i) => (
              <circle key={i} cx="300" cy="300" r={220 + i * 2} fill="none" stroke="#111" strokeWidth="1" opacity="0.5" />
            ))}
            <circle cx="300" cy="300" r="10" fill="#000" />
          </svg>
        </div>
      </div>
    </div>
  );
}
