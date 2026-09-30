'use client';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Icon from '../Icon';

export default function Accordion({ data }) {
  const [active, setActive] = useState(null);

  return (
    <div className="react-bits-accordion faq-list">
      {data.map((item, i) => (
        <AccordionItem
          key={i}
          title={item.q}
          content={item.a}
          isOpen={active === i}
          onClick={() => setActive(active === i ? null : i)}
        />
      ))}
    </div>
  );
}

function AccordionItem({ title, content, isOpen, onClick }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.35, ease: 'power2.out', opacity: 1, marginTop: 10 });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.35, ease: 'power2.inOut', opacity: 0, marginTop: 0 });
    }
  }, [isOpen]);

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`} style={{ border: '1px solid var(--line)', borderRadius: 16, background: '#fff', marginBottom: 10, overflow: 'hidden' }}>
      <button 
        className="accordion-header" 
        onClick={onClick} 
        aria-expanded={isOpen}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '20px', cursor: 'pointer', background: 'transparent', border: 'none', textAlign: 'left', fontSize: 16, fontWeight: 650 }}
      >
        {title}
        <div className="accordion-mark">
          <Icon name="plus" size={20} />
        </div>
      </button>
      <div className="accordion-content" ref={contentRef} style={{ height: 0, opacity: 0, padding: '0 20px', overflow: 'hidden' }}>
        <p style={{ paddingBottom: 20, fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, margin: 0 }}>{content}</p>
      </div>
    </div>
  );
}
