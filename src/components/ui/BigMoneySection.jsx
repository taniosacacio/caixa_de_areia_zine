import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { ArrowRight } from 'lucide-react';
import './BigMoneySection.css';

export const BigMoneySection = ({ language }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Content dictionary
  const content = {
    pt: {
      p3: 'Bem, o feedback e o rico e grande dinheiro dos nossos fãs (e futuros fãs) que vão pautar esse trabalho do Portal Rush Brasil. Veja nossas condições:',
      goals: [
        { value: 'Até $400', label: '1 edição mensal' },
        { value: '$600', label: '2 edições mensais' },
        { value: '$800', label: '3 edições mensais' }
      ]
    },
    en: {
      p3: 'Well, the feedback and the rich and big money of our fans (and future fans) will guide this work of Portal Rush Brasil. See our goals:',
      goals: [
        { value: 'Up to $400', label: '1 monthly edition' },
        { value: '$600', label: '2 monthly editions' },
        { value: '$800', label: '3 monthly editions' }
      ]
    },
    es: {
      p3: 'Bueno, los comentarios y el rico y gran dinero de nossos fans (y futuros fans) guiarán este trabajo de Portal Rush Brasil. Mira nuestras metas:',
      goals: [
        { value: 'Hasta $400', label: '1 edición mensal' },
        { value: '$600', label: '2 ediciones mensuales' },
        { value: '$800', label: '3 ediciones mensuales' }
      ]
    }
  };

  const text = content[language] || content['pt'];

  const highlightEditorialText = (textStr) => {
    if (typeof textStr !== 'string') return textStr;
    const regex = /(Portal Rush Brasil|RUSH|Rush|Zine|ZINE|Portal|PORTAL)/g;
    const parts = textStr.split(regex);
    return parts.map((part, i) => {
      const lower = part.toLowerCase();
      if (part === 'Portal Rush Brasil') {
        return <span key={i} className="highlight-text-portal" style={{ whiteSpace: 'nowrap' }}>{part}</span>;
      }
      if (lower === 'rush') {
        return <span key={i} className="highlight-text-rush">{part}</span>;
      }
      if (lower === 'zine') {
        return <span key={i} className="highlight-text-zine">{part}</span>;
      }
      if (lower === 'portal') {
        return <span key={i} className="highlight-text-portal">{part}</span>;
      }
      return part;
    });
  };

  const handleGoalClick = (idx) => {
    document.getElementById('apoio')?.scrollIntoView({ behavior: 'smooth' });
    if (idx === 2) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  };

  return (
    <section className="big-money-section-container">
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}>
          <Confetti numberOfPieces={300} recycle={false} />
        </div>
      )}

      <div className="big-money-card-layout">
        <p className="editorial-conditions-intro">
          {highlightEditorialText(text.p3)}
        </p>
        
        {/* The Big Money Title */}
        <motion.h4 
          className="editorial-big-money-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          style={{ display: "inline-block", textAlign: "center", width: "100%" }}
        >
          {"THE BIG MONEY".split("").map((char, index) => (
            <motion.span
              key={index}
              style={{ display: "inline-block" }}
              variants={{
                hidden: { color: "#ff5a36", y: 0 },
                visible: {
                  color: ["#ff5a36", "#10b981", "#10b981"], // Turns green (money color)
                  y: [0, -8, 0], // slight bounce
                  transition: {
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "easeInOut",
                    times: [0, 0.4, 1]
                  }
                }
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h4>

        {/* Visual Goal/Conditions Grid (Gradated color) */}
        <div className="editorial-goals-grid">
          {text.goals.map((g, idx) => (
            <motion.div 
              key={idx} 
              className={`editorial-goal-card goal-card-${idx}`}
              whileHover={{ 
                scale: 1.02, 
                borderRadius: "8px 8px 8px 8px"
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onClick={() => handleGoalClick(idx)}
            >
              <span className="goal-label" style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>{highlightEditorialText(g.label)}</span>
              
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{ display: 'flex', alignItems: 'center', opacity: 0.8, padding: '0 10px' }}
              >
                <ArrowRight size={24} />
              </motion.div>

              <span className="goal-value" style={{ flex: 1, textAlign: 'right' }}>{g.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
