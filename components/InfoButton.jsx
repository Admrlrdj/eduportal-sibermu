'use client';

import { useRef } from 'react';
import Icon from './Icon';

export default function InfoButton({ title, children, label = 'Lihat detail', className = 'card-link' }) {
  const ref = useRef(null);
  function closeOnBackdrop(event) {
    if (event.target !== ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) ref.current.close();
  }
  return <><button className={className} onClick={() => ref.current.showModal()} aria-haspopup="dialog">{label}</button>
    <dialog ref={ref} className="info-dialog" aria-label={title} onClick={closeOnBackdrop} data-lenis-prevent>
      <div className="dialog-top"><span className="eyebrow">EDUPORTAL SIBERMU</span><button onClick={() => ref.current.close()} className="close-button" aria-label="Tutup detail"><Icon name="close" /></button></div>
      <h2>{title}</h2><div className="dialog-content">{children}</div>
      <div className="dialog-actions"><a className="button navy" href="https://sibermu.ac.id/" target="_blank" rel="noreferrer">Kunjungi Situs Universitas</a><button className="button outline" onClick={() => ref.current.close()}>Tutup</button></div>
    </dialog>
  </>;
}
