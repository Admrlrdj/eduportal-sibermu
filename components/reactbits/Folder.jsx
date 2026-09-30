'use client';
import { useState } from 'react';
import { gsap } from 'gsap';

export default function Folder({ tabs, children, ariaLabel = 'Folder tabs' }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="react-bits-folder" style={{ width: '100%' }}>
      <div 
        className="folder-tabs" 
        role="tablist" 
        aria-label={ariaLabel}
        style={{ display: 'flex', gap: '4px', marginBottom: '-1px', position: 'relative', zIndex: 2 }}
      >
        {tabs.map((tab, i) => (
          <button 
            key={i} 
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`folder-panel-${i}`}
            id={`folder-tab-${i}`}
            className={`folder-tab ${activeTab === i ? 'active' : ''}`}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '12px 24px',
              background: activeTab === i ? '#fff' : 'var(--pale)',
              color: activeTab === i ? 'var(--navy)' : 'var(--muted)',
              border: '1px solid var(--line)',
              borderBottom: activeTab === i ? '1px solid #fff' : '1px solid var(--line)',
              borderRadius: '16px 16px 0 0',
              fontWeight: 650,
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div 
        className="folder-content"
        style={{
          background: '#fff',
          border: '1px solid var(--line)',
          borderRadius: '0 16px 16px 16px',
          padding: '30px',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 10px 30px #17314e05'
        }}
      >
        {children.map((child, i) => (
          <div 
            key={i}
            role="tabpanel"
            id={`folder-panel-${i}`}
            aria-labelledby={`folder-tab-${i}`}
            hidden={activeTab !== i}
          >
            {activeTab === i && (
              <div style={{ animation: 'fade-in 0.4s ease-out forwards' }}>
                {child}
              </div>
            )}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          .folder-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
            padding-bottom: 1px;
          }
          .folder-tabs::-webkit-scrollbar { display: none; }
          .folder-tab { flex: 0 0 auto; padding: 10px 16px !important; font-size: 14px !important; }
          .folder-content { padding: 20px !important; border-radius: 0 0 16px 16px !important; }
        }
      `}} />
    </div>
  );
}
