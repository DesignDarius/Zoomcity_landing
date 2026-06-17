'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.uroskovcicdeveloper.zoomcity'

const FEATURES = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFF32B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: 'Interactive World Map',
    desc: 'Explore a live map with video pins from creators around the globe. Tap any city to see what\'s happening right now.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFF32B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    title: 'Video Reels by City',
    desc: 'Short video reels from real travelers. Share your own city moments and grow your audience globally.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFF32B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: 'Tours & Top Places',
    desc: 'Book local tours and discover curated top places and hidden gems — all in one app for every city.',
  },
]

const STEPS = [
  { num: '01', title: 'Choose your city', desc: 'Select from our growing global network of cities and destinations.' },
  { num: '02', title: 'Watch video reels', desc: 'Discover authentic content created by real local travelers and creators.' },
  { num: '03', title: 'Explore & book', desc: 'Find top places, book local tours and experiences directly in the app.' },
]

// CSS rotate property (ne transform!) + transform-origin: bottom center
// rotate + dc-float transform ne gaze jedan drugog — to je DashCore trik
const SCREENSHOTS = [
  { src: '/screen-home.jpg',        label: 'Home',       rotate: -16, w: 200, delay: 0.0, zIndex: 1, opacity: 0.70 },
  { src: '/screen-map.jpg',         label: 'Explore',    rotate:  -8, w: 210, delay: 0.5, zIndex: 2, opacity: 0.86 },
  { src: '/screen-tours.jpg',       label: 'Tours',      rotate:   0, w: 230, delay: 1.0, zIndex: 5, opacity: 1.00 },
  { src: '/screen-tour-detail.jpg', label: 'Book',       rotate:   8, w: 210, delay: 0.3, zIndex: 2, opacity: 0.86 },
  { src: '/screen-barcelona.jpg',   label: 'Top Places', rotate:  16, w: 200, delay: 0.7, zIndex: 1, opacity: 0.70 },
]

const MARQUEE_ROW1 = ['Barcelona', 'Paris', 'London', 'Amsterdam', 'Madrid', 'Florence', 'Rome', 'Tokyo', 'Dubai', 'NYC', 'Berlin', 'Prague']
const MARQUEE_ROW2 = ['Video Reels', 'City Map', 'Local Tours', 'Top Places', 'Community', 'Explore', 'Travel', 'Hidden Gems', 'Culture', 'Food', 'Architecture', 'Adventure']

// Floating data chips (DashCore data-flow style)
const DATA_CHIPS = [
  { icon: '🎬', label: 'Video Reels', top: '18%', left: '62%', dir: 'ltr', delay: '0s', duration: '3s' },
  { icon: '📍', label: 'Barcelona', top: '38%', left: '58%', dir: 'rtl', delay: '1.2s', duration: '3.5s' },
  { icon: '⭐', label: '4.9 Rating', top: '62%', left: '65%', dir: 'ltr', delay: '0.6s', duration: '4s' },
  { icon: '🗺️', label: 'Live Map', top: '78%', left: '60%', dir: 'rtl', delay: '1.8s', duration: '3.2s' },
]

export default function PromoClient() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up').forEach((el) => observer.observe(el))

    // Stats counter animation
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-count]').forEach((el) => {
              const target = el.getAttribute('data-count') || ''
              if (target === '∞' || target.includes('%') || target.includes('+')) {
                el.textContent = target
                el.classList.add('counted')
                return
              }
              const num = parseInt(target)
              if (isNaN(num)) return
              let start = 0
              const step = Math.ceil(num / 40)
              const tick = setInterval(() => {
                start = Math.min(start + step, num)
                el.textContent = start + (target.includes('+') ? '+' : '')
                if (start >= num) clearInterval(tick)
              }, 30)
            })
          }
        })
      },
      { threshold: 0.5 }
    )
    if (statsRef.current) statsObserver.observe(statsRef.current)

    return () => {
      observer.disconnect()
      statsObserver.disconnect()
    }
  }, [])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0e0e1a; }
        .promo { font-family: var(--font-dm-sans), sans-serif; background: #0e0e1a; color: #CDCDE0; overflow-x: hidden; }

        /* ── KEYFRAMES (DashCore-ported) ── */

        /* pulse-glow: pulsira gold glow oko elementa */
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px 0 rgba(255,243,43,0.35); }
          50%       { box-shadow: 0 0 55px 12px rgba(255,243,43,0.55); }
        }

        /* radar-ping: krug se širi i nestaje (sonar) */
        @keyframes radar-ping {
          0%        { opacity: 0.6; transform: scale(1); }
          75%, 100% { opacity: 0;   transform: scale(2.2); }
        }

        /* ping-slow: sporija, veća verzija radar-ping-a */
        @keyframes ping-slow {
          0%        { opacity: 0.45; transform: scale(1); }
          70%, 100% { opacity: 0;    transform: scale(2.8); }
        }

        /* hero-shimmer: svetlosni sweep s leva na desno */
        @keyframes hero-shimmer {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%)  skewX(-15deg); }
        }

        /* dc-star-scale: zvezdica diše scale */
        @keyframes dc-star-scale {
          0%, 100% { opacity: 0.5;  transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }

        /* data-flow-ltr: translateX umesto left — ne gazi inline poziciju */
        @keyframes data-flow-ltr {
          0%   { opacity: 0; transform: translateY(-50%) translateX(-16px) scale(0.65); }
          18%  { opacity: 1; transform: translateY(-50%) translateX(0px)   scale(1); }
          82%  { opacity: 1; transform: translateY(-50%) translateX(0px)   scale(1); }
          100% { opacity: 0; transform: translateY(-50%) translateX(16px)  scale(0.65); }
        }

        /* data-flow-rtl: isto ali suprotna strana */
        @keyframes data-flow-rtl {
          0%   { opacity: 0; transform: translateY(-50%) translateX(16px)  scale(0.65); }
          18%  { opacity: 1; transform: translateY(-50%) translateX(0px)   scale(1); }
          82%  { opacity: 1; transform: translateY(-50%) translateX(0px)   scale(1); }
          100% { opacity: 0; transform: translateY(-50%) translateX(-16px) scale(0.65); }
        }

        /* float: lebdenje sa CSS var amplitudom */
        @keyframes dc-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(calc(var(--float-amp, -14px))); }
        }

        /* draw-line: SVG stroke se crta */
        @keyframes draw-line {
          0%   { stroke-dashoffset: 600px; }
          100% { stroke-dashoffset: 0px; }
        }

        /* heroFloat — zadržano za backward compat */
        @keyframes heroFloat {
          0%,100% { transform: rotate(0deg) scale(1.06) translateY(0); }
          50%      { transform: rotate(0deg) scale(1.06) translateY(-16px); }
        }

        /* marquee */
        @keyframes marqueeLeft  { 0% { transform: translateX(0); }    100% { transform: translateX(-50%); } }
        @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

        /* floatUp / floatDown */
        @keyframes floatUp   { 0%,100% { transform: translateY(0px); }  50% { transform: translateY(-22px); } }
        @keyframes floatDown { 0%,100% { transform: translateY(0px); }  50% { transform: translateY(22px); } }

        /* ── SCROLL REVEALS (clip-path stil) ── */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal-left {
          opacity: 0;
          transform: translateX(-52px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(52px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal-up {
          opacity: 0;
          transform: translateY(24px) scale(0.97);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.visible, .reveal-left.visible, .reveal-right.visible, .reveal-up.visible {
          opacity: 1; transform: translate(0) scale(1);
        }
        .delay-1 { transition-delay: 0.1s !important; }
        .delay-2 { transition-delay: 0.22s !important; }
        .delay-3 { transition-delay: 0.36s !important; }
        .delay-4 { transition-delay: 0.52s !important; }
        .delay-5 { transition-delay: 0.68s !important; }

        /* ── NAV ── */
        .nav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 48px;
          background: rgba(14,14,26,0.88); backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .nav-logo-text { font-family: var(--font-bebas-neue), sans-serif; font-size: 1.6rem; color: #FFF32B; letter-spacing: 0.05em; }
        .nav-btn {
          background: #FFF32B; color: #0e0e1a;
          font-weight: 700; font-size: 0.85rem; padding: 10px 26px;
          border-radius: 50px; text-decoration: none;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.3s;
          letter-spacing: 0.02em;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .nav-btn:hover { opacity: 0.9; transform: translateY(-2px); }

        /* ── HERO ── */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          overflow: hidden; padding: 80px 48px;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 60% 50%, rgba(7,59,76,0.5) 0%, transparent 70%);
          pointer-events: none;
        }
        /* dot-grid background */
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,243,43,0.07) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 80% 80% at 60% 50%, black 20%, transparent 80%);
        }

        /* radar rings sulla hero */
        .hero-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(255,243,43,0.18);
          pointer-events: none;
        }
        .hero-ring-1 { width: 340px; height: 340px; top: 50%; right: 200px; transform: translate(50%,-50%); animation: ping-slow 3.5s cubic-bezier(0,0,0.2,1) infinite; }
        .hero-ring-2 { width: 500px; height: 500px; top: 50%; right: 200px; transform: translate(50%,-50%); animation: ping-slow 3.5s cubic-bezier(0,0,0.2,1) 1.1s infinite; }
        .hero-ring-3 { width: 680px; height: 680px; top: 50%; right: 200px; transform: translate(50%,-50%); animation: ping-slow 3.5s cubic-bezier(0,0,0.2,1) 2.2s infinite; }

        /* floating dots */
        .hero-dot { position: absolute; border-radius: 50%; animation: dc-float var(--float-dur,4s) ease-in-out var(--float-del,0s) infinite; }

        .hero-content { position: relative; z-index: 2; max-width: 520px; flex-shrink: 0; }

        /* badge */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,243,43,0.1); border: 1px solid rgba(255,243,43,0.3);
          border-radius: 50px; padding: 7px 18px; margin-bottom: 28px;
          color: #FFF32B; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .badge-star { animation: dc-star-scale 2.8s ease-in-out infinite; transform-origin: center; display: inline-flex; }

        /* hero title */
        .hero-title {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(3.2rem, 6vw, 6rem);
          line-height: 0.93; letter-spacing: 0.02em;
          color: #fff; margin-bottom: 24px;
        }
        .hero-title .shimmer-text {
          color: #FFF32B; position: relative; display: inline-block; overflow: hidden;
        }
        .hero-title .shimmer-text::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%);
          animation: hero-shimmer 3.5s cubic-bezier(0.4,0,0.6,1) 1s infinite;
          pointer-events: none;
        }

        .hero-desc { font-size: 1.05rem; line-height: 1.72; color: rgba(205,205,224,0.72); margin-bottom: 40px; max-width: 440px; }
        .hero-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }

        /* cta download button */
        .cta-dl-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #FFF32B; color: #0e0e1a;
          font-weight: 800; font-size: 0.9rem; padding: 14px 32px;
          border-radius: 50px; text-decoration: none;
          letter-spacing: 0.04em; text-transform: uppercase;
          transition: transform 0.15s, opacity 0.2s;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .cta-dl-btn:hover { transform: translateY(-3px) scale(1.03); opacity: 0.92; }

        .ios-note { color: rgba(205,205,224,0.38); font-size: 0.8rem; }

        /* data-flow chips */
        .data-chips { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
        .data-chip {
          position: absolute;
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(7,59,76,0.85); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,243,43,0.22);
          border-radius: 50px; padding: 7px 14px;
          font-size: 0.78rem; font-weight: 600; color: #CDCDE0;
          white-space: nowrap;
        }
        .data-chip-ltr { animation: data-flow-ltr var(--chip-dur,3s) cubic-bezier(0.4,0,0.2,1) var(--chip-del,0s) infinite; }
        .data-chip-rtl { animation: data-flow-rtl var(--chip-dur,3s) cubic-bezier(0.4,0,0.2,1) var(--chip-del,0s) infinite; }

        /* ── HERO PHONES FAN ── */
        .hero-phones {
          position: absolute; right: -20px; top: 50%; transform: translateY(-50%);
          display: flex; align-items: center; gap: 0; z-index: 1;
          cursor: pointer;
        }
        .hero-phone-wrap { position: relative; }

        /* base state */
        .hero-phone-1 {
          transform: rotate(-14deg) translateY(60px) translateX(20px);
          z-index: 1; opacity: 0.7;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
        }
        .hero-phone-2 { transform: rotate(0deg) scale(1.06); z-index: 3; }
        .hero-phone-3 {
          transform: rotate(14deg) translateY(60px) translateX(-20px);
          z-index: 1; opacity: 0.7;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
        }

        /* hover — karata širi se kao špil */
        .hero-phones:hover .hero-phone-1 {
          transform: rotate(-26deg) translateY(90px) translateX(-30px);
          opacity: 0.88;
        }
        .hero-phones:hover .hero-phone-3 {
          transform: rotate(26deg) translateY(90px) translateX(30px);
          opacity: 0.88;
        }

        /* float animacije */
        .hero-phone-1 .phone-frame { animation: dc-float 5s ease-in-out infinite; --float-amp: -14px; }
        .hero-phone-2 .phone-frame { animation: pulse-glow 3s ease-in-out infinite, dc-float 5s ease-in-out 0.5s infinite; --float-amp: -16px; }
        .hero-phone-3 .phone-frame { animation: dc-float 5s ease-in-out 1s infinite; --float-amp: -12px; }

        .phone-frame {
          border-radius: 36px;
          border: 2.5px solid rgba(255,243,43,0.25);
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,243,43,0.06);
          position: relative; background: #000;
        }
        .phone-frame::before {
          content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 60px; height: 20px; background: #0e0e1a;
          border-radius: 0 0 12px 12px; z-index: 2;
        }

        /* ── FEATURES ── */
        .section { padding: 100px 48px; max-width: 1200px; margin: 0 auto; }
        .section-label {
          color: #FFF32B; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 10px;
          position: relative; display: inline-block;
        }
        /* label shimmer bar */
        .section-label::after {
          content: '';
          display: block; margin-top: 6px;
          height: 2px; width: 100%;
          background: linear-gradient(90deg, #FFF32B 0%, transparent 100%);
          transform-origin: left; animation: draw-line 1.2s cubic-bezier(0.22,1,0.36,1) both;
          stroke-dasharray: none;
        }
        .section-title {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          color: #fff; letter-spacing: 0.02em; margin-bottom: 16px; line-height: 1;
        }
        .section-desc { font-size: 1rem; color: rgba(205,205,224,0.65); max-width: 440px; line-height: 1.65; margin-bottom: 48px; }

        .features-row { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .features-grid { display: flex; flex-direction: column; gap: 24px; }
        .feature-card {
          background: rgba(7,59,76,0.35);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 24px;
          display: flex; gap: 18px; align-items: flex-start;
          transition: border-color 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s;
          cursor: default;
        }
        .feature-card:hover {
          border-color: rgba(255,243,43,0.35);
          transform: translateX(8px);
          box-shadow: -4px 0 24px rgba(255,243,43,0.08), 0 8px 32px rgba(0,0,0,0.3);
        }
        .feature-icon {
          width: 48px; height: 48px;
          background: rgba(255,243,43,0.08); border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .feature-card:hover .feature-icon { background: rgba(255,243,43,0.15); transform: scale(1.08); }
        .feature-title { font-family: var(--font-bebas-neue), sans-serif; font-size: 1.3rem; color: #fff; letter-spacing: 0.03em; margin-bottom: 6px; }
        .feature-desc { font-size: 0.88rem; color: rgba(205,205,224,0.6); line-height: 1.6; }
        .features-phone-wrap { display: flex; justify-content: center; align-items: center; position: relative; }
        .features-glow { position: absolute; width: 320px; height: 320px; background: radial-gradient(circle, rgba(255,243,43,0.1) 0%, transparent 70%); pointer-events: none; animation: pulse-glow 4s ease-in-out infinite; border-radius: 50%; }

        /* ── HOW IT WORKS ── */
        .howitworks-wrap { background: linear-gradient(180deg, #0e0e1a 0%, #091c27 50%, #0e0e1a 100%); padding: 100px 0; }
        .howitworks-row { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        .steps { display: flex; flex-direction: column; gap: 32px; margin-top: 40px; }
        .step { display: flex; gap: 20px; align-items: flex-start; position: relative; }
        /* connector line between steps */
        .step:not(:last-child)::after {
          content: ''; position: absolute; left: 26px; top: 48px;
          width: 2px; height: calc(100% + 8px);
          background: linear-gradient(180deg, rgba(255,243,43,0.15) 0%, transparent 100%);
        }
        .step-num {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 2.5rem; color: rgba(255,243,43,0.2);
          line-height: 1; flex-shrink: 0; width: 56px;
          transition: color 0.3s;
        }
        .step:hover .step-num { color: rgba(255,243,43,0.6); }
        .step-title { font-weight: 700; color: #fff; font-size: 1rem; margin-bottom: 6px; }
        .step-desc { font-size: 0.88rem; color: rgba(205,205,224,0.6); line-height: 1.6; }
        .two-phones { position: relative; height: 480px; display: flex; align-items: center; justify-content: center; }
        .phone-back { position: absolute; left: 0; top: 40px; z-index: 1; opacity: 0.65; transform: rotate(-6deg); animation: dc-float 5.5s ease-in-out 0.3s infinite; --float-amp: -16px; }
        .phone-front { position: absolute; right: 0; bottom: 0; z-index: 2; transform: rotate(4deg); animation: dc-float 5.5s ease-in-out infinite; --float-amp: -14px; }

        /* ── FLOATING SCREENSHOTS ── */
        .screenshots-section { padding: 100px 0 160px; overflow: visible; background: radial-gradient(ellipse at center, rgba(7,59,76,0.25) 0%, transparent 70%); }
        .screenshots-title-wrap { text-align: center; padding: 0 48px; margin-bottom: 80px; }

        /* DashCore fan — CSS rotate property + transform-origin: bottom center */
        /* perspective na containeru daje blagi 3D dubinski osećaj */
        .screenshots-fan {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          perspective: 1200px;
          padding-bottom: 80px;
          min-height: 560px;
          overflow: visible;
        }

        .float-item {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          margin-left: -36px;
          /* CSS rotate NE gazi transform — mogu da rade zajedno */
          transform-origin: bottom center;
          transition: rotate 0.45s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.35s ease,
                      z-index 0s;
        }
        .float-item:first-child { margin-left: 0; }

        /* hover: resetuje rotaciju, digne se, stavi napred */
        .float-item:hover {
          rotate: 0deg !important;
          opacity: 1 !important;
          z-index: 10 !important;
          transform: translateY(-22px) scale(1.04) !important;
        }

        .float-phone {
          border-radius: 32px;
          border: 2px solid rgba(255,243,43,0.18);
          overflow: hidden;
          box-shadow: 0 24px 56px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative; background: #000;
          transition: border-color 0.35s, box-shadow 0.35s;
        }
        .float-item:hover .float-phone {
          border-color: rgba(255,243,43,0.55);
          box-shadow: 0 24px 56px rgba(0,0,0,0.65), 0 0 48px rgba(255,243,43,0.18);
        }
        .float-phone::before {
          content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 54px; height: 18px; background: #0e0e1a;
          border-radius: 0 0 12px 12px; z-index: 2;
        }
        .float-label { font-size: 0.68rem; font-weight: 600; color: rgba(205,205,224,0.3); letter-spacing: 0.12em; text-transform: uppercase; }

        /* ── MARQUEE ── */
        .marquee-section { padding: 80px 0; overflow: hidden; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .marquee-title-wrap { text-align: center; padding: 0 48px; margin-bottom: 48px; }
        .marquee-row { display: flex; gap: 16px; margin-bottom: 16px; overflow: hidden; }
        .marquee-track { display: flex; gap: 16px; flex-shrink: 0; animation: marqueeLeft 24s linear infinite; }
        .marquee-track-rev { display: flex; gap: 16px; flex-shrink: 0; animation: marqueeRight 28s linear infinite; }
        .marquee-row:hover .marquee-track,
        .marquee-row:hover .marquee-track-rev { animation-play-state: paused; }
        .marquee-pill {
          display: flex; align-items: center; gap: 8px;
          background: rgba(7,59,76,0.5); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50px; padding: 10px 22px;
          white-space: nowrap; font-size: 0.85rem; font-weight: 600;
          color: rgba(205,205,224,0.75);
          transition: border-color 0.3s, color 0.3s, box-shadow 0.3s;
        }
        .marquee-pill:hover { border-color: rgba(255,243,43,0.4); color: #fff; box-shadow: 0 0 18px rgba(255,243,43,0.1); }
        .marquee-dot { width: 8px; height: 8px; border-radius: 50%; background: #FFF32B; flex-shrink: 0; }
        /* ping dot on hover */
        .marquee-pill:hover .marquee-dot { animation: radar-ping 1s cubic-bezier(0,0,0.2,1) infinite; }

        /* ── STATS ── */
        .stats-section { padding: 80px 48px; }
        .stats-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: center; }
        .stat-card {
          background: rgba(7,59,76,0.3); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 36px 24px;
          transition: border-color 0.35s, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s;
          cursor: default;
        }
        .stat-card:hover {
          border-color: rgba(255,243,43,0.35); transform: translateY(-6px);
          box-shadow: 0 0 40px rgba(255,243,43,0.1), 0 16px 48px rgba(0,0,0,0.3);
        }
        .stat-num {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 3.5rem; color: #FFF32B; letter-spacing: 0.04em;
          line-height: 1; margin-bottom: 8px;
        }
        .stat-label { font-size: 0.88rem; color: rgba(205,205,224,0.6); }

        /* ── CTA ── */
        .cta-section {
          padding: 120px 48px; text-align: center;
          position: relative; overflow: hidden;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(7,59,76,0.5) 0%, transparent 70%);
        }
        /* CTA radar rings */
        .cta-ring {
          position: absolute; border-radius: 50%; pointer-events: none;
          border: 1px solid rgba(255,243,43,0.12);
          left: 50%; top: 50%; transform: translate(-50%,-50%);
        }
        .cta-ring-1 { width: 260px; height: 260px; animation: ping-slow 4s cubic-bezier(0,0,0.2,1) infinite; }
        .cta-ring-2 { width: 440px; height: 440px; animation: ping-slow 4s cubic-bezier(0,0,0.2,1) 1.3s infinite; }
        .cta-ring-3 { width: 640px; height: 640px; animation: ping-slow 4s cubic-bezier(0,0,0.2,1) 2.6s infinite; }

        .cta-title { font-family: var(--font-bebas-neue), sans-serif; font-size: clamp(2.8rem, 6vw, 5.5rem); color: #fff; letter-spacing: 0.02em; line-height: 0.95; margin-bottom: 20px; position: relative; z-index: 1; }
        .cta-title span { color: #FFF32B; }
        .cta-desc { font-size: 1rem; color: rgba(205,205,224,0.65); max-width: 480px; margin: 0 auto 44px; line-height: 1.65; position: relative; z-index: 1; }
        .cta-actions { display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap; position: relative; z-index: 1; }

        /* ── FOOTER ── */
        .footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 28px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-logo { display: flex; align-items: center; gap: 10px; }
        .footer-logo-text { font-family: var(--font-bebas-neue), sans-serif; font-size: 1.3rem; color: #FFF32B; letter-spacing: 0.05em; }
        .footer-copy { font-size: 0.78rem; color: rgba(205,205,224,0.3); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 0.8rem; color: rgba(205,205,224,0.35); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: #FFF32B; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .nav { padding: 14px 20px; }
          .hero { flex-direction: column; padding: 60px 20px 40px; min-height: auto; text-align: center; }
          .hero-desc { margin: 0 auto 40px; }
          .hero-actions { justify-content: center; }
          .hero-phones { position: relative; right: auto; top: auto; transform: none; margin-top: 40px; gap: 0; }
          .hero-ring-1, .hero-ring-2, .hero-ring-3 { display: none; }
          .data-chips { display: none; }
          .features-row, .howitworks-row { grid-template-columns: 1fr; gap: 40px; }
          .features-phone-wrap, .two-phones { display: none; }
          .section, .howitworks-row, .screenshots-title-wrap { padding-left: 20px; padding-right: 20px; }
          .section { padding: 60px 20px; }
          .stats-inner { grid-template-columns: 1fr; }
          .cta-section { padding: 70px 20px; }
          .footer { flex-direction: column; text-align: center; padding: 20px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="promo">

        {/* ── NAV ── */}
        <nav className="nav">
          <a href="/" className="nav-logo">
            <Image src="/zoom-city-logo.png" alt="Zoom City" width={34} height={30} style={{ objectFit: 'contain' }} />
            <span className="nav-logo-text">Zoom City</span>
          </a>
          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="nav-btn">Download Free</a>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grid" />

          {/* radar rings */}
          <div className="hero-ring hero-ring-1" />
          <div className="hero-ring hero-ring-2" />
          <div className="hero-ring hero-ring-3" />

          {/* floating dots */}
          <div className="hero-dot" style={{ width: 10, height: 10, background: '#FFF32B', top: '22%', left: '38%', '--float-dur': '3.5s', '--float-del': '0s', '--float-amp': '-10px', opacity: 0.7 } as React.CSSProperties} />
          <div className="hero-dot" style={{ width: 6, height: 6, background: '#FFF32B', top: '60%', left: '42%', '--float-dur': '4.5s', '--float-del': '1s', '--float-amp': '-8px', opacity: 0.4 } as React.CSSProperties} />
          <div className="hero-dot" style={{ width: 8, height: 8, background: '#FFF32B', top: '35%', left: '52%', '--float-dur': '5s', '--float-del': '0.5s', '--float-amp': '-12px', opacity: 0.5 } as React.CSSProperties} />

          {/* data-flow chips (DashCore style) */}
          <div className="data-chips">
            {DATA_CHIPS.map((chip) => (
              <div
                key={chip.label}
                className={`data-chip data-chip-${chip.dir}`}
                style={{
                  top: chip.top,
                  left: chip.left,   // koristi stvarnu left poziciju iz DATA_CHIPS
                  '--chip-dur': chip.duration,
                  '--chip-del': chip.delay,
                } as React.CSSProperties}
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-content reveal">
            <div className="hero-badge">
              <span className="badge-star">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFF32B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </span>
              Now on Android
            </div>
            <h1 className="hero-title">
              Explore the world<br />through <span className="shimmer-text">video reels</span>
            </h1>
            <p className="hero-desc">
              Discover cities like never before. Watch local video reels, explore interactive maps, book tours and uncover hidden gems — all in one app.
            </p>
            <div className="hero-actions">
              <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="cta-dl-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83 1-.96 1.5-.5l14 8.5-14 8.5c-.5.46-1.5.33-1.5-.5z"/></svg>
                Get on Google Play
              </a>
              <span className="ios-note">iOS coming soon</span>
            </div>
          </div>

          {/* 3 phones fan */}
          <div className="hero-phones">
            <div className="hero-phone-wrap hero-phone-1">
              <div className="phone-frame">
                <Image src="/screen-tours.jpg" alt="Tours" width={200} height={430} style={{ width: 200, height: 'auto', display: 'block' }} priority />
              </div>
            </div>
            <div className="hero-phone-wrap hero-phone-2" style={{ marginLeft: -30, marginRight: -30, zIndex: 3 }}>
              <div className="phone-frame" style={{ borderColor: 'rgba(255,243,43,0.55)' }}>
                <Image src="/screen-barcelona.jpg" alt="Barcelona" width={220} height={474} style={{ width: 220, height: 'auto', display: 'block' }} priority />
              </div>
            </div>
            <div className="hero-phone-wrap hero-phone-3">
              <div className="phone-frame">
                <Image src="/screen-map.jpg" alt="Map" width={200} height={430} style={{ width: 200, height: 'auto', display: 'block' }} priority />
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ background: 'linear-gradient(180deg, #0e0e1a 0%, #091c27 100%)', padding: '100px 0' }}>
          <div className="section" style={{ padding: '0 48px' }}>
            <div className="features-row">
              <div className="reveal-left">
                <p className="section-label">Features for you</p>
                <h2 className="section-title">We provide the<br />best for you</h2>
                <p className="section-desc">A complete travel companion designed for modern explorers who want to experience cities authentically.</p>
                <div className="features-grid">
                  {FEATURES.map((f, i) => (
                    <div key={f.title} className={`feature-card reveal delay-${i + 1}`}>
                      <div className="feature-icon">{f.icon}</div>
                      <div>
                        <div className="feature-title">{f.title}</div>
                        <div className="feature-desc">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="features-phone-wrap reveal-right">
                <div className="features-glow" />
                <div className="phone-frame" style={{ animation: 'dc-float 5s ease-in-out infinite', '--float-amp': '-16px' } as React.CSSProperties}>
                  <Image src="/screen-home.jpg" alt="Home" width={260} height={560} style={{ width: 260, height: 'auto', display: 'block' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <div className="howitworks-wrap">
          <div className="howitworks-row">
            <div className="reveal-left">
              <p className="section-label">How it works</p>
              <h2 className="section-title">Path to<br />exploration</h2>
              <p className="section-desc">Get started in minutes and discover the world through a completely new lens.</p>
              <div className="steps">
                {STEPS.map((s, i) => (
                  <div key={s.num} className={`step reveal delay-${i + 1}`}>
                    <div className="step-num">{s.num}</div>
                    <div>
                      <div className="step-title">{s.title}</div>
                      <div className="step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="two-phones reveal-right">
              <div className="phone-back">
                <div className="phone-frame">
                  <Image src="/screen-tour-detail.jpg" alt="Tour Detail" width={220} height={474} style={{ width: 220, height: 'auto', display: 'block' }} />
                </div>
              </div>
              <div className="phone-front">
                <div className="phone-frame" style={{ borderColor: 'rgba(255,243,43,0.45)' }}>
                  <Image src="/screen-profile.jpg" alt="Profile" width={240} height={516} style={{ width: 240, height: 'auto', display: 'block' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FLOATING SCREENSHOTS ── */}
        <section className="screenshots-section">
          <div className="screenshots-title-wrap reveal">
            <p className="section-label">App Screenshots</p>
            <h2 className="section-title">See it in action</h2>
          </div>
          <div className="screenshots-fan">
            {SCREENSHOTS.map((s, i) => {
              const isCenter = s.rotate === 0
              return (
                <div
                  key={s.src}
                  className="float-item"
                  style={{
                    // CSS rotate property — nezavisno od transform!
                    rotate: `${s.rotate}deg`,
                    zIndex: s.zIndex,
                    opacity: s.opacity,
                    marginLeft: i === 0 ? 0 : -36,
                    // dc-float koristi transform: translateY — ne gazi rotate
                    animation: `dc-float ${4.0 + s.delay}s ease-in-out ${s.delay}s infinite`,
                    ['--float-amp' as string]: isCenter ? '-20px' : '-11px',
                  } as React.CSSProperties}
                >
                  <div
                    className="float-phone"
                    style={isCenter ? {
                      borderColor: 'rgba(255,243,43,0.48)',
                      boxShadow: '0 28px 64px rgba(0,0,0,0.7), 0 0 52px rgba(255,243,43,0.14)',
                    } : undefined}
                  >
                    <Image
                      src={s.src}
                      alt={s.label}
                      width={s.w}
                      height={Math.round(s.w * 2.16)}
                      style={{ width: s.w, height: 'auto', display: 'block' }}
                    />
                  </div>
                  <span className="float-label">{s.label}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <section className="marquee-section">
          <div className="marquee-title-wrap reveal">
            <p className="section-label">Explore the world</p>
            <h2 className="section-title">Cities & experiences</h2>
          </div>
          <div className="marquee-row">
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee-track">
                {MARQUEE_ROW1.map((city) => (
                  <div key={city + copy} className="marquee-pill">
                    <div className="marquee-dot" />
                    {city}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee-row">
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee-track-rev">
                {MARQUEE_ROW2.map((tag) => (
                  <div key={tag + copy} className="marquee-pill">
                    <div className="marquee-dot" style={{ background: 'rgba(205,205,224,0.3)' }} />
                    {tag}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="stats-section">
          <div className="stats-inner reveal" ref={statsRef}>
            {[
              { num: '17+', label: 'Cities on the map' },
              { num: '100%', label: 'Free to download' },
              { num: '∞', label: 'Experiences to discover' },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-num" data-count={s.num}>{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          {/* radar rings */}
          <div className="cta-ring cta-ring-1" />
          <div className="cta-ring cta-ring-2" />
          <div className="cta-ring cta-ring-3" />

          <h2 className="cta-title reveal">Ready to<br /><span>explore?</span></h2>
          <p className="cta-desc reveal delay-1">Download Zoom City for free and start discovering the world through the eyes of real travelers.</p>
          <div className="cta-actions reveal delay-2">
            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="cta-dl-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83 1-.96 1.5-.5l14 8.5-14 8.5c-.5.46-1.5.33-1.5-.5z"/></svg>
              Get on Google Play
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-logo">
            <Image src="/zoom-city-logo.png" alt="Zoom City" width={28} height={25} style={{ objectFit: 'contain' }} />
            <span className="footer-logo-text">Zoom City</span>
          </div>
          <span className="footer-copy">© 2026 Zoom City. All rights reserved.</span>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/downloads">Download</a>
          </div>
        </footer>

      </div>
    </>
  )
}
