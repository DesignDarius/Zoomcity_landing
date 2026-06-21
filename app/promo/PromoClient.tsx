'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.uroskovcicdeveloper.zoomcity'

const SCREENSHOTS = [
  { src: '/screen-home.jpg',        label: 'Home' },
  { src: '/screen-map.jpg',         label: 'Explore' },
  { src: '/screen-tours.jpg',       label: 'Tours' },
  { src: '/screen-tour-detail.jpg', label: 'Detail' },
  { src: '/screen-barcelona.jpg',   label: 'Top Places' },
  { src: '/screen-profile.jpg',     label: 'Profile' },
]

const FEATURES = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
    title: 'Video Reels by City',
    desc: 'Short video reels from real travelers. Post your city moments and grow your audience globally.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: 'Interactive City Map',
    desc: 'Live map with video pins from creators around the globe. Tap any city to see what\'s happening.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: 'Tours & Top Places',
    desc: 'Discover curated top places, hidden gems and local tours for every city you visit.',
  },
]

const BENEFITS = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF32B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Community',
    desc: 'Connect with local creators and travelers. Follow, like and share city content from around the world.',
    screen: '/screen-profile.jpg',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF32B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: 'Privacy & Security',
    desc: 'Your travel data stays yours. Private routes, secure login and full control over your content.',
    screen: '/screen-home.jpg',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF32B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: 'GPS Efficiency',
    desc: 'Track your walks offline, export GPX routes compatible with Garmin and OsmAnd apps.',
    screen: '/screen-map.jpg',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF32B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    title: 'Growth Insights',
    desc: 'See your video reach grow city by city. Track views, followers and engagement over time.',
    screen: '/screen-tours.jpg',
  },
]

const STEPS = [
  { title: 'Choose your city', desc: 'Select from our growing global network of cities and destinations.' },
  { title: 'Watch & explore', desc: 'Discover authentic video reels from real local travelers and creators.' },
  { title: 'Post & connect', desc: 'Share your own video reels, follow creators and build your community.' },
]

const TESTIMONIALS = [
  { text: 'ZoomCity completely changed how I discover places when I travel. The video reels from locals are way more authentic than any travel blog.', name: 'Marija Petrović', role: 'Travel Photographer' },
  { text: 'Finally an app that combines maps, videos and tours in one place. I used it in Barcelona and found spots I would never have found otherwise.', name: 'Luca Moretti', role: 'Digital Nomad' },
  { text: 'The offline GPS tracking saved me so many times while hiking. I can export my routes and share them with friends on Garmin.', name: 'Ana Kovač', role: 'Outdoor Explorer' },
  { text: 'I love posting my city reels and seeing who follows me from around the world. The community here is genuinely amazing.', name: 'Darko Nikolić', role: 'Content Creator' },
  { text: 'The travel journal PDF export is incredible. I built a complete 7-day Rome itinerary and shared it as a beautiful PDF with my whole group.', name: 'Sophie Laurent', role: 'Travel Blogger' },
  { text: 'I discovered a tiny local restaurant in Tokyo through a video reel. No tourist would ever find it on Google Maps. This app is gold.', name: 'James Park', role: 'Food Traveler' },
  { text: 'We used ZoomCity to plan our whole Barcelona trip. The community videos gave us a real sense of each neighborhood before we even arrived.', name: 'Elena Rossi', role: 'Travel Enthusiast' },
  { text: 'The map is beautiful and actually works offline. I walked through Vienna for 3 hours without internet and had every street tracked.', name: 'Thomas Müller', role: 'City Walker' },
  { text: 'Posting my first video reel was so easy. Within a day I had followers from 5 different countries asking me about my city.', name: 'Camille Dupont', role: 'Local Guide' },
]

const MARQUEE_CITIES = ['Barcelona', 'Paris', 'London', 'Amsterdam', 'Madrid', 'Florence', 'Rome', 'Tokyo', 'Dubai', 'New York', 'Berlin', 'Prague', 'Vienna', 'Lisbon', 'Athens', 'Budapest']

// Centralni telefon najveci. Svaki sledeci nivo: scale -= 1/6, centrisano po Y osi.
// Gore i dole od centra svaki sledeci gubi H/6 — simetricno, transformOrigin center.
const PHONE_W = 260
const X_STEP = Math.round(PHONE_W * 0.72)  // ~187px center-to-center po nivou

function getSlideTransform(dist: number): React.CSSProperties {
  const abs = Math.abs(dist)
  const dir = dist < 0 ? -1 : 1
  if (abs >= 3) return {
    position: 'absolute', left: '50%', top: '50%', opacity: 0, pointerEvents: 'none',
    transform: `translateX(calc(-50% + ${dir * 3 * X_STEP}px)) translateY(-50%) scale(0.2)`,
    transition: 'all 0.42s cubic-bezier(0.22,1,0.36,1)',
  }
  const scale = +(1 - abs / 6).toFixed(4)
  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: `translateX(calc(-50% + ${dir * abs * X_STEP}px)) translateY(-50%) scale(${scale})`,
    opacity: abs === 2 ? 0.78 : 1,
    filter: abs === 0 ? 'none' : abs === 1 ? 'saturate(0.88)' : 'saturate(0.72) brightness(0.82)',
    zIndex: 10 - abs,
    pointerEvents: abs === 0 ? 'auto' : 'none',
    transition: 'all 0.42s cubic-bezier(0.22,1,0.36,1)',
    willChange: 'transform, opacity',
  }
}

export default function PromoClient() {
  const [active, setActive] = useState(0)
  const total = SCREENSHOTS.length
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const deckRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback((i: number) => setActive(((i % total) + total) % total), [total])
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setActive(a => (a + 1) % total), 3200)
  }, [total])

  useEffect(() => {
    startAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [startAuto])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-u').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Deck spread — kad .deck uđe 40% u viewport, dodaje .spread klasu
  useEffect(() => {
    const el = deckRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('spread') },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Benefits — sticky scroll peek+shrink (DashCore stacking effect)
  useEffect(() => {
    const STICKY_TOP = 7 * 16 // 7rem = 112px
    const TOLERANCE = 4
    const PEEK = 14        // px each buried card shifts up per depth level
    const SCALE_STEP = 0.04 // scale reduction per depth level

    const handleScroll = () => {
      const cards = document.querySelectorAll<HTMLElement>('.ben-sticky')
      if (!cards.length) return

      const stuck: number[] = []
      cards.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= STICKY_TOP + TOLERANCE) stuck.push(i)
      })

      cards.forEach((el, i) => {
        const glass = el.querySelector<HTMLElement>('.ben-glass')
        if (!glass) return
        const stuckIdx = stuck.indexOf(i)
        if (stuckIdx === -1) { glass.style.transform = ''; return }
        const depth = stuck.length - 1 - stuckIdx // 0 = active (topmost), 1+ = buried
        if (depth === 0) {
          glass.style.transform = ''
        } else {
          const scale = Math.max(0.82, 1 - depth * SCALE_STEP)
          glass.style.transform = `scale(${scale}) translateY(${-(depth * PEEK)}px)`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  function wrappedDist(i: number) {
    const raw = i - active
    const half = total / 2
    if (raw > half) return raw - total
    if (raw < -half) return raw + total
    return raw
  }

  // Testimonials — 3 columns, each duplicated for infinite scroll
  const tRows = [
    [TESTIMONIALS[0], TESTIMONIALS[3], TESTIMONIALS[6]],
    [TESTIMONIALS[1], TESTIMONIALS[4], TESTIMONIALS[7]],
    [TESTIMONIALS[2], TESTIMONIALS[5], TESTIMONIALS[8]],
  ]

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#0b1121}
        .promo{font-family:var(--font-dm-sans,system-ui,sans-serif);background:#0b1121;color:#cbd5e1;overflow-x:clip;-webkit-font-smoothing:antialiased}

        /* ── KEYFRAMES ── */
        @keyframes float-y{0%,100%{transform:translateY(var(--f0,0px))}50%{transform:translateY(var(--f1,-16px))}}
        @keyframes ping-slow{0%{opacity:.7;transform:scale(1)}70%,100%{opacity:0;transform:scale(1.8)}}
        @keyframes pulse-glow{0%,100%{box-shadow:0 0 28px 0 rgba(255,243,43,.28)}50%{box-shadow:0 0 70px 18px rgba(255,243,43,.48)}}
        @keyframes shimmer{0%{transform:translate(-40%)}50%{transform:translate(40%)}100%{transform:translate(-40%)}}
        @keyframes star-p{0%,100%{opacity:.4;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
        @keyframes marquee-l{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes marquee-r{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
        @keyframes data-ltr{0%{opacity:0;transform:translateY(-50%) translateX(-18px) scale(.55)}18%{opacity:1;transform:translateY(-50%) translateX(0) scale(1)}82%{opacity:1;transform:translateY(-50%) translateX(0) scale(1)}100%{opacity:0;transform:translateY(-50%) translateX(18px) scale(.55)}}
        @keyframes data-rtl{0%{opacity:0;transform:translateY(-50%) translateX(18px) scale(.55)}18%{opacity:1;transform:translateY(-50%) translateX(0) scale(1)}82%{opacity:1;transform:translateY(-50%) translateX(0) scale(1)}100%{opacity:0;transform:translateY(-50%) translateX(-18px) scale(.55)}}
        @keyframes radar{0%{opacity:.8;transform:scale(1)}75%,100%{opacity:0;transform:scale(2)}}

        /* Testimonials column scroll up */
        @keyframes testi-up{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
        .testi-track-1{animation:testi-up 22s linear infinite}
        .testi-track-2{animation:testi-up 15s linear infinite}
        .testi-track-3{animation:testi-up 29s linear infinite}
        .testi-track-1:hover,.testi-track-2:hover,.testi-track-3:hover{animation-play-state:paused}

        /* Phone spread for "we provide" — centered then spread via keyframe */
        @keyframes float-back{0%,100%{transform:translate(calc(-50% - 40px),calc(-50% + 30px)) rotate(-8deg) translateY(0)}50%{transform:translate(calc(-50% - 40px),calc(-50% + 30px)) rotate(-8deg) translateY(-16px)}}
        @keyframes float-front{0%,100%{transform:translate(calc(-50% + 28px),calc(-50% - 22px)) rotate(4deg) translateY(0)}50%{transform:translate(calc(-50% + 28px),calc(-50% - 22px)) rotate(4deg) translateY(-13px)}}
        .spread-back{animation:float-back 5.5s ease-in-out .6s infinite}
        .spread-front{animation:float-front 5s ease-in-out infinite}

        /* ── SCROLL REVEALS ── */
        .rv{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
        .rv-l{opacity:0;transform:translateX(-44px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
        .rv-r{opacity:0;transform:translateX(44px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
        .rv-u{opacity:0;transform:translateY(18px) scale(.97);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
        .rv.visible,.rv-l.visible,.rv-r.visible,.rv-u.visible{opacity:1;transform:none}
        .d1{transition-delay:.07s!important}.d2{transition-delay:.16s!important}.d3{transition-delay:.27s!important}.d4{transition-delay:.4s!important}

        /* ── NAV ── */
        .n{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:14px 48px;background:rgba(11,17,33,.92);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.06)}
        .n-logo{display:flex;align-items:center;gap:12px;text-decoration:none}
        .n-logo-txt{font-family:var(--font-bebas-neue,sans-serif);font-size:1.6rem;color:#FFF32B;letter-spacing:.06em}
        .n-cta{background:#FFF32B;color:#0b1121;font-weight:800;font-size:.8rem;padding:10px 24px;border-radius:8px;text-decoration:none;letter-spacing:.04em;text-transform:uppercase;box-shadow:0 0 22px 0 rgba(255,243,43,.32);transition:box-shadow .25s ease,opacity .2s,transform .15s}
        .n-cta:hover{opacity:.88;transform:translateY(-1px);box-shadow:0 0 40px 8px rgba(255,243,43,.50)}

        /* ── HERO ── */
        .hero{position:relative;min-height:100vh;display:flex;flex-direction:row;align-items:center;padding:0 48px;gap:40px;background:radial-gradient(ellipse 70% 60% at 65% 50%,rgba(7,59,76,.38) 0%,transparent 70%)}
        .hero::before{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle,rgba(255,243,43,.05) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(ellipse 80% 80% at 65% 50%,black 20%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 80% 80% at 65% 50%,black 20%,transparent 75%)}
        .hero-left{flex:1;min-width:0;z-index:1}

        /* hero left */
        .hero-badge{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,243,43,.3);background:rgba(255,243,43,.07);border-radius:50px;padding:6px 16px;margin-bottom:32px;color:#FFF32B;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
        .hero-star{animation:star-p 2.8s ease-in-out infinite;transform-origin:center;display:inline-flex}
        .hero-h1{font-family:var(--font-bebas-neue,sans-serif);font-size:clamp(4.5rem,7vw,8rem);line-height:.88;letter-spacing:.02em;color:#fff;margin-bottom:28px}
        .hero-h1 .glow{color:#FFF32B;position:relative;display:inline-block;overflow:hidden}
        .hero-h1 .glow::after{content:'';position:absolute;top:0;left:0;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3) 50%,transparent);animation:shimmer 3.5s ease-in-out 1s infinite;pointer-events:none}
        .hero-desc{font-size:1.08rem;line-height:1.7;color:rgba(203,213,225,.68);margin-bottom:40px;max-width:460px}
        .hero-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:44px}
        .sbtn{display:inline-flex;align-items:center;gap:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px 22px;text-decoration:none;color:#fff;transition:all .2s;backdrop-filter:blur(8px)}
        .sbtn:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.22);transform:translateY(-2px)}
        .sbtn.off{opacity:.36;pointer-events:none}
        .sbtn-sub{font-size:.58rem;opacity:.5;text-transform:uppercase;letter-spacing:.1em;line-height:1}
        .sbtn-main{font-size:1rem;font-weight:700;line-height:1.2}
        .trusted-lbl{font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(203,213,225,.33);margin-bottom:14px}
        .city-marquee{overflow:hidden;mask-image:linear-gradient(to right,transparent,black 12%,black 88%,transparent);-webkit-mask-image:linear-gradient(to right,transparent,black 12%,black 88%,transparent)}
        .city-track{display:flex;gap:10px;animation:marquee-l 20s linear infinite;white-space:nowrap}
        .city-pill{font-size:.75rem;font-weight:600;color:rgba(203,213,225,.38);border:1px solid rgba(255,255,255,.07);border-radius:50px;padding:5px 14px;white-space:nowrap;transition:border-color .2s,color .2s;cursor:pointer}
        .city-pill:hover{border-color:rgba(255,243,43,.45);color:#FFF32B}
        .city-marquee:hover .city-track{animation-play-state:paused}

        /* hero right */
        .hero-right{position:relative;display:flex;align-items:center;justify-content:center;min-height:680px;z-index:2;flex:0 0 520px;width:520px}
        .glow-orb{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:460px;height:460px;border-radius:50%;background:#FFF32B;filter:blur(22px);pointer-events:none;z-index:0}
        .fdot{position:absolute;border-radius:50%;pointer-events:none}
        .hero-phone-wrap{position:relative;z-index:3}
        .hero-phone{border-radius:44px;border:3px solid rgba(255,243,43,.24);overflow:hidden;background:#000;box-shadow:0 40px 100px rgba(0,0,0,.75),0 0 60px rgba(255,243,43,.07);display:block;position:relative}
        .hero-phone::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:88px;height:22px;background:#0b1121;border-radius:0 0 14px 14px;z-index:4}

        /* float cards */
        .fc{position:absolute;z-index:10;background:rgba(11,17,33,.92);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:14px 18px;box-shadow:0 16px 40px rgba(0,0,0,.5)}
        .fc-lbl{font-size:.58rem;font-weight:700;color:rgba(203,213,225,.4);letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}
        .fc-val{font-family:var(--font-bebas-neue,sans-serif);font-size:1.5rem;color:#FFF32B;line-height:1}
        .fc-sub{font-size:.68rem;margin-top:3px}
        .fc-green{color:#4ade80}
        .fc-1{top:10%;right:5%}
        .fc-2{bottom:18%;left:5%}

        /* bar chart in float card */
        .mini-bars{display:flex;align-items:flex-end;gap:3px;height:34px;margin:8px 0 6px}
        .mb{border-radius:3px;flex:1}

        /* data chips */
        .chip{position:absolute;display:inline-flex;align-items:center;gap:7px;background:rgba(7,59,76,.85);backdrop-filter:blur(10px);border:1px solid rgba(255,243,43,.2);border-radius:50px;padding:6px 14px;font-size:.73rem;font-weight:600;color:#CDCDE0;white-space:nowrap;pointer-events:none}
        .chip-ltr{animation:data-ltr 3.2s cubic-bezier(.4,0,.2,1) var(--cd,0s) infinite}
        .chip-rtl{animation:data-rtl 3.8s cubic-bezier(.4,0,.2,1) var(--cd,0s) infinite}

        /* ── SECTION BASE ── */
        .wrap{max-width:1200px;margin:0 auto;padding:0 48px}
        .pill{display:inline-flex;align-items:center;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);border-radius:50px;padding:5px 14px;font-size:.66rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(203,213,225,.65);margin-bottom:18px}
        .pill.gold{border-color:rgba(255,243,43,.28);background:rgba(255,243,43,.06);color:#FFF32B}
        .sh{font-family:var(--font-bebas-neue,sans-serif);font-size:clamp(3rem,5.5vw,5.8rem);color:#fff;line-height:.9;letter-spacing:.02em;margin-bottom:16px}
        .sp{font-size:1.05rem;line-height:1.68;color:rgba(203,213,225,.6);max-width:460px}

        /* ── FEATURES (no bordered cards) ── */
        .feat-s{background:linear-gradient(180deg,#0b1121 0%,#0d1a2e 100%);padding:100px 0}
        .feat-head{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:end;margin-bottom:56px}
        .feat-head-r{text-align:right}
        .feat-head-r p{font-size:1rem;color:rgba(203,213,225,.6);line-height:1.65;margin-left:auto;max-width:340px}
        .feat-divider{border:none;border-top:1px solid rgba(255,255,255,.07);margin-bottom:52px}
        .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:52px}
        .feat-item{}
        .feat-icon{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:rgba(203,213,225,.8);transition:all .3s}
        .feat-item:hover .feat-icon{background:rgba(255,243,43,.1);border-color:rgba(255,243,43,.3);color:#FFF32B}
        .feat-title{font-size:1.15rem;font-weight:700;color:#fff;margin-bottom:10px}
        .feat-desc{font-size:.9rem;color:rgba(203,213,225,.55);line-height:1.65}

        /* ── WE PROVIDE (two phones spread) ── */
        .provide-s{padding:100px 0;background:#0b1121}
        .provide-inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .provide-phones{position:relative;height:540px;display:flex;align-items:center;justify-content:center}
        .provide-glow{position:absolute;width:380px;height:380px;border-radius:50%;background:rgba(120,40,220,.15);filter:blur(80px);pointer-events:none}
        .p-phone{border-radius:36px;overflow:hidden;background:#000;position:relative}
        .p-phone::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:72px;height:18px;background:#0b1121;border-radius:0 0 10px 10px;z-index:2}
        .p-back{position:absolute;top:50%;left:50%;z-index:1;border:2.5px solid rgba(255,255,255,.1);box-shadow:0 20px 50px rgba(0,0,0,.5)}
        .p-front{position:absolute;top:50%;left:50%;z-index:2;border:2.5px solid rgba(255,243,43,.32);box-shadow:0 28px 70px rgba(0,0,0,.65),0 0 36px rgba(255,243,43,.1)}
        .provide-cta{display:inline-flex;align-items:center;gap:10px;background:#FFF32B;color:#0b1121;font-weight:800;font-size:.88rem;padding:14px 30px;border-radius:10px;text-decoration:none;letter-spacing:.04em;text-transform:uppercase;margin-top:36px;box-shadow:0 0 28px 0 rgba(255,243,43,.35);transition:box-shadow .25s ease,opacity .2s,transform .15s}
        .provide-cta:hover{opacity:.88;transform:translateY(-2px);box-shadow:0 0 50px 12px rgba(255,243,43,.52)}

        /* ── PATH TO SUCCESS ── */
        .path-s{background:linear-gradient(180deg,#0b1121 0%,#0d1a2e 50%,#0b1121 100%);padding:100px 0}
        .path-inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .steps{display:flex;flex-direction:column;gap:0;margin-top:36px}
        .step{display:flex;gap:20px;align-items:flex-start;padding:22px 0;border-bottom:1px solid rgba(255,255,255,.06)}
        .step:last-child{border-bottom:none}
        .step-ico{width:44px;height:44px;border-radius:50%;background:rgba(255,243,43,.08);border:1px solid rgba(255,243,43,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#FFF32B;transition:all .3s}
        .step:hover .step-ico{background:rgba(255,243,43,.16);border-color:rgba(255,243,43,.5)}
        .step-t{font-weight:700;color:#fff;font-size:1rem;margin-bottom:5px}
        .step-d{font-size:.86rem;color:rgba(203,213,225,.55);line-height:1.6}
        /* Deck of cards — wrapper handles float, phone handles spread (no conflict) */
        .deck{position:relative;height:580px;display:flex;align-items:center;justify-content:center}
        .deck-glow{position:absolute;width:340px;height:340px;border-radius:50%;background:rgba(120,40,220,.14);filter:blur(75px);pointer-events:none}

        /* Float wrappers — samo translateY, centered */
        .deck-fw-back{position:absolute;top:50%;left:50%;z-index:1;animation:float-y 6.5s ease-in-out .6s infinite;--f0:0px;--f1:-16px}
        .deck-fw-front{position:absolute;top:50%;left:50%;z-index:2;animation:float-y 5.8s ease-in-out infinite;--f0:0px;--f1:-14px}

        /* Phone elements — samo rotate+translate (CSS transition), pocetak: oba preklopljena u centru */
        .deck-back-p{position:relative;border-radius:36px;overflow:hidden;background:#000;border:2.5px solid rgba(255,255,255,.1);box-shadow:0 20px 50px rgba(0,0,0,.5);transform:translate(-50%,-50%);transition:transform 0.9s cubic-bezier(0.22,1,0.36,1)}
        .deck-back-p::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:72px;height:18px;background:#0b1121;border-radius:0 0 10px 10px;z-index:2}
        .deck-front-p{position:relative;border-radius:36px;overflow:hidden;background:#000;border:2.5px solid rgba(255,243,43,.34);box-shadow:0 28px 70px rgba(0,0,0,.65),0 0 42px rgba(255,243,43,.1);transform:translate(-50%,-50%);transition:transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s}
        .deck-front-p::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:72px;height:18px;background:#0b1121;border-radius:0 0 10px 10px;z-index:2}

        /* Spread state — kad IntersectionObserver doda .spread na .deck */
        .deck.spread .deck-back-p{transform:translate(calc(-50% - 72px),calc(-50% + 38px)) rotate(-13deg)}
        .deck.spread .deck-front-p{transform:translate(calc(-50% + 32px),calc(-50% - 28px)) rotate(4deg)}

        /* ── PLATFORM ── */
        .platform-s{padding:100px 0;background:#0b1121}
        .plat-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:52px}
        .plat-card-dark{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:36px;transition:border-color .3s;min-width:0}
        .plat-card-dark:hover{border-color:rgba(255,243,43,.18)}
        .plat-card-light{background:rgba(15,23,42,1);border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:36px}
        .plat-ct{font-size:1rem;font-weight:700;color:#fff;margin-bottom:5px}
        .plat-cd{font-size:.83rem;color:rgba(203,213,225,.48);margin-bottom:28px}
        .bars{display:flex;align-items:flex-end;gap:5px;height:60px;margin-bottom:20px}
        .bar{border-radius:4px;flex:1}
        .chart-row{display:flex;gap:28px}
        .chart-num{font-family:var(--font-bebas-neue,sans-serif);font-size:1.6rem;color:#FFF32B;line-height:1}
        .chart-lbl{font-size:.65rem;color:rgba(203,213,225,.4);text-transform:uppercase;letter-spacing:.08em;margin-top:2px}
        .int-rows{display:flex;flex-direction:column;gap:10px;overflow:hidden;margin-top:20px;mask-image:linear-gradient(to right,transparent,black 6%,black 94%,transparent);-webkit-mask-image:linear-gradient(to right,transparent,black 6%,black 94%,transparent)}
        .int-track{display:flex;gap:10px;width:max-content;flex-shrink:0}
        .int-track-l{animation:marquee-l 16s linear infinite}
        .int-track-r{animation:marquee-r 16s linear infinite}
        .int-rows:hover .int-track{animation-play-state:paused}
        .int-badge{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;color:rgba(203,213,225,.45);flex-shrink:0;transition:all .2s;cursor:pointer}
        .int-badge:hover{background:rgba(255,243,43,.1);border-color:rgba(255,243,43,.35);color:#FFF32B}

        /* ── TON OF BENEFITS (sticky scroll stacking — DashCore mechanism) ── */
        .benefits-s{background:linear-gradient(180deg,#0b1121 0%,#0d1a2e 50%,#0b1121 100%);padding:140px 0 0}
        .benefits-grid{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
        .benefits-left{position:sticky;top:7rem}
        .benefits-cards{position:relative}
        .ben-sticky{position:sticky;top:7rem;margin-bottom:4rem}
        .ben-sticky:last-child{margin-bottom:0}
        .benefits-cards{padding-bottom:140px}
        .ben-glass{background:rgba(30,41,59,.30);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border-radius:.75rem;border:1px solid rgba(148,163,184,.10);padding:2rem 2rem 2rem 2rem;position:relative;overflow:hidden;transition:background .3s,border-color .3s,transform .35s cubic-bezier(.22,1,.36,1);transform-origin:top center;min-height:200px;display:flex;flex-direction:column;justify-content:center}
        .ben-glass:hover{background:rgba(30,41,59,.50);border-color:rgba(148,163,184,.18)}
        .ben-card-grid{display:grid;grid-template-columns:1fr auto;gap:1.5rem;align-items:center}
        .ben-bg-ico{position:absolute;bottom:-1.5rem;right:-1.5rem;width:8rem;height:8rem;opacity:.04;pointer-events:none}
        .ben-title-row{display:flex;align-items:center;gap:.625rem;margin-bottom:.875rem}
        .ben-ico{width:2.5rem;height:2.5rem;border-radius:.625rem;background:rgba(255,243,43,.08);display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .ben-t{font-weight:700;color:#fff;font-size:1.15rem;line-height:1.2}
        .ben-d{font-size:.9rem;color:rgba(203,213,225,.62);line-height:1.7}
        .ben-img{flex-shrink:0}

        /* ── STATS BAR ── */
        .stats-bar-s{background:rgba(255,255,255,.025);border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);padding:60px 0;text-align:center}
        .stats-bar-title{font-family:var(--font-bebas-neue,sans-serif);font-size:clamp(2.8rem,5vw,5rem);color:#fff;margin-bottom:10px;line-height:.9}
        .stats-bar-sub{font-size:.95rem;color:rgba(203,213,225,.45);margin-bottom:44px}
        .stats-row{display:grid;grid-template-columns:repeat(4,1fr)}
        .stat-item{padding:20px;border-right:1px solid rgba(255,255,255,.06)}
        .stat-item:last-child{border-right:none}
        .stat-n{font-family:var(--font-bebas-neue,sans-serif);font-size:3.4rem;color:#FFF32B;letter-spacing:.04em;line-height:1;margin-bottom:6px}
        .stat-l{font-size:.72rem;color:rgba(203,213,225,.45);text-transform:uppercase;letter-spacing:.1em}

        /* ── APP SCREENSHOTS ── */
        .swiper-s{padding:100px 0 140px;background:radial-gradient(ellipse 70% 50% at 50% 40%,rgba(7,59,76,.16) 0%,transparent 65%)}
        .swiper-head{text-align:center;margin-bottom:72px}
        .swiper-sub{font-size:1rem;color:rgba(203,213,225,.5);margin-top:10px}
        .swiper-c{position:relative;height:640px;mask-image:linear-gradient(to right,transparent,black 7%,black 93%,transparent);-webkit-mask-image:linear-gradient(to right,transparent,black 7%,black 93%,transparent)}
        .slide-phone{border-radius:32px;border:2.5px solid rgba(255,255,255,.1);overflow:hidden;background:#000;box-shadow:0 24px 56px rgba(0,0,0,.65);position:relative;transition:border-color .42s cubic-bezier(.22,1,.36,1),box-shadow .42s cubic-bezier(.22,1,.36,1)}
        .slide-phone::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:58px;height:16px;background:#0b1121;border-radius:0 0 10px 10px;z-index:2}
        .slide-active .slide-phone{border-color:rgba(255,243,43,.45);box-shadow:0 28px 70px rgba(0,0,0,.7),0 0 54px rgba(255,243,43,.18)}
        .slide-lbl{text-align:center;margin-top:14px;font-size:.66rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(203,213,225,.28);transition:color .42s}
        .slide-active .slide-lbl{color:rgba(255,243,43,.65)}
        .sw-orb{position:absolute;left:calc(50% - 210px);top:calc(50% - 210px);width:420px;height:420px;border-radius:50%;background:#FFF32B;opacity:.26;filter:blur(45px);pointer-events:none;z-index:0}
        .sw-ping{position:absolute;border-radius:50%;border:1px solid rgba(255,243,43,.18);pointer-events:none;z-index:0}
        .sw-ping-1{width:220px;height:220px;left:calc(50% - 110px);top:calc(50% - 110px);animation:ping-slow 3.8s cubic-bezier(0,0,.2,1) infinite}
        .sw-ping-2{width:400px;height:400px;left:calc(50% - 200px);top:calc(50% - 200px);animation:ping-slow 3.8s cubic-bezier(0,0,.2,1) 1.4s infinite}
        .sw-ping-3{width:580px;height:580px;left:calc(50% - 290px);top:calc(50% - 290px);animation:ping-slow 3.8s cubic-bezier(0,0,.2,1) 2.8s infinite}
        .feat-flow{overflow:hidden;padding:36px 0 0;mask-image:linear-gradient(to right,transparent 0%,black 10%,black 70%,transparent 100%);-webkit-mask-image:linear-gradient(to right,transparent 0%,black 10%,black 70%,transparent 100%)}
        .feat-row{display:flex;gap:10px;width:max-content;animation:marquee-l 28s linear infinite}
        .feat-flow:hover .feat-row{animation-play-state:paused}
        .feat-pill{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:999px;background:rgba(255,243,43,.06);border:1px solid rgba(255,243,43,.14);font-size:.72rem;color:rgba(203,213,225,.5);white-space:nowrap;flex-shrink:0;transition:background .2s,border-color .2s,color .2s;cursor:pointer}
        .feat-pill:hover{background:rgba(255,243,43,.12);border-color:rgba(255,243,43,.45);color:#FFF32B}
        .feat-pill span{font-size:.85rem}
        .swiper-nav{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:44px}
        .arr{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(203,213,225,.65);transition:all .2s}
        .arr:hover{background:rgba(255,243,43,.12);border-color:rgba(255,243,43,.4);color:#FFF32B}
        .dots{display:flex;gap:8px}
        .dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.2);cursor:pointer;transition:all .3s}
        .dot.on{width:22px;border-radius:3px;background:#FFF32B}

        /* ── MARQUEE ── */
        .mq-s{padding:56px 0;border-top:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);overflow:hidden;background:#0b1121}
        .mq-row{display:flex;gap:12px;overflow:hidden}
        .mq-track{display:flex;gap:12px;flex-shrink:0;animation:marquee-l 26s linear infinite}
        .mq-row:hover .mq-track{animation-play-state:paused}
        .mpill{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:50px;padding:9px 20px;white-space:nowrap;font-size:.8rem;font-weight:600;color:rgba(203,213,225,.58);transition:all .3s}
        .mpill:hover{border-color:rgba(255,243,43,.35);color:#FFF32B}
        .mpill-d{width:6px;height:6px;border-radius:50%;background:#FFF32B;flex-shrink:0}
        .mpill:hover .mpill-d{animation:radar 1s cubic-bezier(0,0,.2,1) infinite}

        /* ── TESTIMONIALS (3 cols auto-scroll up) ── */
        .testi-s{padding:100px 0;background:#0b1121;overflow:hidden}
        .testi-head{margin-bottom:56px}
        .testi-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-height:680px;overflow:hidden;mask-image:linear-gradient(to bottom,transparent,black 6%,black 92%,transparent);-webkit-mask-image:linear-gradient(to bottom,transparent,black 6%,black 92%,transparent)}
        .testi-col{display:flex;flex-direction:column;gap:16px}
        .testi-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:26px;flex-shrink:0;transition:border-color .3s}
        .testi-card:hover{border-color:rgba(255,243,43,.2)}
        .testi-text{font-size:.9rem;color:rgba(203,213,225,.72);line-height:1.72;margin-bottom:22px}
        .testi-av{width:38px;height:38px;border-radius:50%;background:rgba(255,243,43,.1);border:1px solid rgba(255,243,43,.22);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.88rem;color:#FFF32B;flex-shrink:0}
        .testi-name{font-weight:700;color:#fff;font-size:.88rem}
        .testi-role{font-size:.73rem;color:rgba(203,213,225,.4);margin-top:2px}

        /* ── DOWNLOAD CTA ── */
        .dl-s{padding:120px 48px;text-align:center;background:linear-gradient(180deg,#0b1121 0%,#0d1a2e 50%,#0b1121 100%)}
        .dl-h{font-family:var(--font-bebas-neue,sans-serif);font-size:clamp(4rem,8vw,7.5rem);color:#fff;line-height:.88;letter-spacing:.02em;margin-bottom:16px}
        .dl-sub{font-size:1.05rem;color:rgba(203,213,225,.52);max-width:420px;margin:0 auto 52px;line-height:1.65}
        .dl-btns{display:flex;justify-content:center;gap:16px;flex-wrap:wrap}
        .sbtl{display:inline-flex;align-items:center;gap:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:16px 28px;text-decoration:none;color:#fff;transition:all .2s}
        .sbtl:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.22);transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.4)}
        .sbtl.off{opacity:.38;pointer-events:none}

        /* ── FOOTER ── */
        .ft{border-top:1px solid rgba(255,255,255,.06);padding:56px 48px 36px;background:#0b1121}
        .ft-inner{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px;margin-bottom:44px}
        .ft-brand{display:flex;align-items:center;gap:12px;margin-bottom:12px}
        .ft-logo-t{font-family:var(--font-bebas-neue,sans-serif);font-size:1.5rem;color:#FFF32B;letter-spacing:.06em}
        .ft-tagline{font-size:.82rem;color:rgba(203,213,225,.36);line-height:1.65;max-width:230px}
        .ft-col-h{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(203,213,225,.4);margin-bottom:16px}
        .ft-links{display:flex;flex-direction:column;gap:12px}
        .ft-a{font-size:.84rem;color:rgba(203,213,225,.42);text-decoration:none;transition:color .2s}
        .ft-a:hover{color:#FFF32B}
        .ft-bottom{border-top:1px solid rgba(255,255,255,.06);padding-top:22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .ft-copy{font-size:.74rem;color:rgba(203,213,225,.26)}

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          .n,.ft{padding:14px 20px}
          .hero{flex-direction:column;padding:60px 20px 0;min-height:auto;text-align:center}
          .hero-desc,.hero-btns{margin-left:auto;margin-right:auto}
          .hero-btns{justify-content:center}
          .hero-right{min-height:480px}
          .fc,.chip{display:none}
          .feat-head,.provide-inner,.path-inner,.benefits-inner{grid-template-columns:1fr;gap:36px}
          .feat-head-r{text-align:left}
          .provide-phones,.deck{display:none}
          .plat-grid{grid-template-columns:1fr}
          .stats-row{grid-template-columns:repeat(2,1fr)}
          .testi-cols{max-height:500px}
          .ft-inner{grid-template-columns:1fr 1fr}
          .dl-s{padding:70px 20px}
          .wrap{padding:0 20px}
          .benefits-left{position:relative;top:0;padding:60px 0 0}
          .benefits-inner{grid-template-columns:1fr;min-height:auto}
        }
        @media(max-width:640px){
          .feat-grid{grid-template-columns:1fr}
          .testi-cols{grid-template-columns:1fr;max-height:500px}
          .stats-row{grid-template-columns:1fr 1fr}
          .ft-inner{grid-template-columns:1fr}
        }
        @media(prefers-reduced-motion:reduce){
          *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
        }
      `}</style>

      <div className="promo">

        {/* NAV */}
        <nav className="n">
          <a href="/" className="n-logo">
            <Image src="/zoom-city-logo.png" alt="Zoom City" width={32} height={28} style={{ objectFit:'contain' }} />
            <span className="n-logo-txt">Zoom City</span>
          </a>
          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="n-cta">Get Started</a>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-star"><svg width="11" height="11" viewBox="0 0 24 24" fill="#FFF32B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>
              Introducing
            </div>
            <h1 className="hero-h1">Explore the<br />world through<br /><span className="glow">video reels</span></h1>
            <p className="hero-desc">Discover cities like never before. Watch local video reels, explore interactive maps, book tours and uncover hidden gems.</p>
            <div className="hero-btns">
              <a href="#" className="sbtn off">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#CDCDE0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div><div className="sbtn-sub">Download on the</div><div className="sbtn-main">App Store</div></div>
              </a>
              <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="sbtn">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><path d="M7.63 28.55L20.29 15.82 7.84 3.3C7.35 3.62 7 4.17 7 4.83v22.33c0 .57.25 1.06.63 1.38z" fill="#1be2fa"/><path d="M30.05 14.4C31.32 15.1 31.32 16.9 30.05 17.6l-5.12 2.82-4.64-4.6 4.4-4.44 5.36 2.97z" fill="#ffea00"/><path d="M24.93 20.42L20.29 15.82 7.63 28.55c.56.48 1.39.62 2.12.18l15.18-8.31z" fill="#fe3944"/><path d="M7.84 3.3l12.45 12.52 4.4-4.44L9.76 3.23C9.11 2.88 8.39 2.95 7.84 3.3z" fill="#11d574"/></svg>
                <div><div className="sbtn-sub">Get it on</div><div className="sbtn-main">Google Play</div></div>
              </a>
            </div>
            <p className="trusted-lbl">Trusted by travelers in</p>
            <div className="city-marquee">
              <div className="city-track">
                {[...MARQUEE_CITIES, ...MARQUEE_CITIES].map((c, i) => <span key={i} className="city-pill">{c}</span>)}
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="glow-orb" />
            <div className="hero-phone-wrap">
              <div className="hero-phone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/screen-tours.jpg" alt="Zoom City" width={295} height={637} style={{ width:295,height:637,display:'block' }} />
              </div>
            </div>

            {/* Float card: cities live + bar chart */}
            <div className="fc fc-1">
              <div className="fc-lbl">Cities live</div>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <div className="fc-val">17+</div>
                <span style={{ fontSize:'.62rem',color:'#4ade80',fontWeight:700 }}>+12.4%</span>
              </div>
              <div className="mini-bars">
                {[40,62,48,74,55,88,68].map((h,i) => (
                  <div key={i} className="mb" style={{ height:`${h}%`,background: i===5 ? '#FFF32B' : 'rgba(255,255,255,.18)' }} />
                ))}
              </div>
              <div className="fc-sub" style={{ color:'rgba(203,213,225,.5)' }}>Active cities this month</div>
            </div>

            {/* Float card: video activity */}
            <div className="fc fc-2">
              <div className="fc-lbl">Monthly videos</div>
              <div className="fc-val">2,400+</div>
              <div className="fc-sub fc-green">▲ +18% this month</div>
            </div>

            <div className="chip chip-ltr" style={{ top:'50%',left:'2%','--cd':'0s' } as any}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF32B" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
              Video Reels
            </div>
            <div className="chip chip-rtl" style={{ top:'35%',right:'2%','--cd':'1.5s' } as any}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFF32B" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Live Map
            </div>
          </div>
        </section>

        {/* PREMIUM FEATURES */}
        <section className="feat-s">
          <div className="wrap">
            <div className="feat-head rv">
              <div>
                <div className="pill">Features</div>
                <h2 className="sh">Premium features</h2>
              </div>
              <div className="feat-head-r">
                <p>Everything a modern traveler needs to discover, share and connect with cities around the world.</p>
              </div>
            </div>
            <hr className="feat-divider" />
            <div className="feat-grid">
              {FEATURES.map((f, i) => (
                <div key={f.title} className={`feat-item rv-u d${i+1}`}>
                  <div className="feat-icon">{f.icon}</div>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WE PROVIDE — two phones spreading */}
        <section className="provide-s">
          <div className="wrap">
            <div className="provide-inner">
              <div className="provide-phones rv-l">
                <div className="provide-glow" />
                <div className="p-back p-phone spread-back">
                  <Image src="/screen-home.jpg" alt="Home" width={210} height={453} style={{ width:210,height:'auto',display:'block' }} />
                </div>
                <div className="p-front p-phone spread-front">
                  <Image src="/screen-map.jpg" alt="Map" width={235} height={507} style={{ width:235,height:'auto',display:'block' }} />
                </div>
              </div>
              <div className="rv-r">
                <div className="pill gold">Features for you</div>
                <h2 className="sh">We provide the<br />best for you</h2>
                <p className="sp">A hybrid travel experience designed for modern explorers who need real content, real maps and real community.</p>
                <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="provide-cta">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83 1-.96 1.5-.5l14 8.5-14 8.5c-.5.46-1.5.33-1.5-.5z"/></svg>
                  Download Free
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PATH TO SUCCESS — deck of cards */}
        <section className="path-s">
          <div className="wrap">
            <div className="path-inner">
              <div className="rv-l">
                <div className="pill">How it works</div>
                <h2 className="sh">Path to<br />exploration</h2>
                <p className="sp">Get started in minutes and discover the world through a completely new lens.</p>
                <div className="steps">
                  {STEPS.map((s, i) => (
                    <div key={s.title} className={`step rv d${i+1}`}>
                      <div className="step-ico">
                        {i===0 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                        {i===1 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>}
                        {i===2 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>}
                      </div>
                      <div>
                        <div className="step-t">{i+1}. {s.title}</div>
                        <div className="step-d">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* DECK OF CARDS — float wrapper (translateY) + phone (rotate, CSS transition) */}
              <div className="deck rv-r" ref={deckRef}>
                <div className="deck-glow" />
                {/* Back phone — float wrapper */}
                <div className="deck-fw-back">
                  <div className="deck-back-p">
                    <Image src="/screen-barcelona.jpg" alt="Barcelona" width={222} height={479} style={{ width:222,height:'auto',display:'block' }} />
                  </div>
                </div>
                {/* Front phone — float wrapper */}
                <div className="deck-fw-front">
                  <div className="deck-front-p">
                    <Image src="/screen-tour-detail.jpg" alt="Detail" width={256} height={553} style={{ width:256,height:'auto',display:'block' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM */}
        <section className="platform-s">
          <div className="wrap">
            <div className="rv">
              <div className="pill">Platform</div>
              <h2 className="sh">Built for<br />travelers like you</h2>
            </div>
            <div className="plat-grid rv">
              <div className="plat-card-dark">
                <div className="plat-ct">Video activity</div>
                <div className="plat-cd">Real-time stats from travelers posting across all cities.</div>
                <div className="bars">
                  {[32,55,42,70,52,85,64,92,74,60,78,88].map((h, i) => (
                    <div key={i} className="bar" style={{ height:`${h}%`,background: i===9 ? '#FFF32B' : i===11 ? 'rgba(255,243,43,.55)' : 'rgba(255,255,255,.14)' }} />
                  ))}
                </div>
                <div className="chart-row">
                  <div><div className="chart-num">2,400</div><div className="chart-lbl">Videos / month</div></div>
                  <div><div className="chart-num">17+</div><div className="chart-lbl">Active cities</div></div>
                  <div><div className="chart-num">+18%</div><div className="chart-lbl">Growth</div></div>
                </div>
              </div>
              <div className="plat-card-dark">
                <div className="plat-ct">Global community</div>
                <div className="plat-cd">Creators from every corner of the world sharing their cities.</div>
                <div className="int-rows">
                  {[
                    ['BCN','PAR','LON','AMS','MAD','ROM','NYC','BER','TKY','DXB'],
                    ['VIE','PRG','LIS','ATH','BUD','IST','SYD','DUB','SFO','MXC'],
                    ['WAR','CPH','OSL','HEL','BRU','ZRH','MLN','SEV','VAL','BKK'],
                  ].map((cities, row) => (
                    <div key={row} className={`int-track ${row % 2 === 0 ? 'int-track-l' : 'int-track-r'}`}>
                      {[...cities, ...cities].map((c, i) => (
                        <div key={i} className="int-badge">{c}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TON OF BENEFITS — sticky stacking (DashCore mechanism) */}
        <section className="benefits-s">
          <div className="wrap">
            <div className="benefits-grid">
              {/* LEFT — sticky heading */}
              <div className="benefits-left">
                <div className="pill">Benefits</div>
                <h2 className="sh">Ton of<br />benefits</h2>
                <p className="sp">Designed to help travelers discover better outcomes across exploration, content and community.</p>
              </div>
              {/* RIGHT — cards each sticky at same top → stacking effect */}
              <div className="benefits-cards">
                {BENEFITS.map((b, i) => (
                  <div key={b.title} className="ben-sticky" style={{ zIndex: i + 1 }}>
                    <div
                      className="ben-glass"
                      style={{ boxShadow: `0 ${15 - i * 2}px ${30 - i * 3}px rgba(0,0,0,${(0.15 - i * 0.02).toFixed(2)})` }}
                    >
                      {/* Large faded background icon */}
                      <div className="ben-bg-ico">{b.icon}</div>
                      <div className="ben-card-grid">
                        <div>
                          <div className="ben-title-row">
                            <div className="ben-ico">{b.icon}</div>
                            <div className="ben-t">{b.title}</div>
                          </div>
                          <div className="ben-d">{b.desc}</div>
                        </div>
                        <div className="ben-img">
                          <Image src={b.screen} alt={b.title} width={65} height={130} style={{ width: 65, height: 'auto', borderRadius: 8, display: 'block' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <div className="stats-bar-s">
          <div className="wrap">
            <h2 className="stats-bar-title rv">Millions of travelers<br />rely on Zoom City</h2>
            <p className="stats-bar-sub rv d1">Trusted worldwide by modern explorers discovering cities in a new way.</p>
            <div className="stats-row rv d2">
              {[
                { n: '105K', l: 'Active Users' },
                { n: '2,400+', l: 'Video Reels' },
                { n: '17+', l: 'Cities Live' },
                { n: '100%', l: 'Free to Download' },
              ].map(s => (
                <div key={s.l} className="stat-item">
                  <div className="stat-n">{s.n}</div>
                  <div className="stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* APP SCREENSHOTS — SWIPER */}
        <section className="swiper-s">
          <div className="swiper-head rv">
            <div className="pill" style={{ display:'inline-flex',marginBottom:16 }}>App Screenshots</div>
            <h2 className="sh">A quick look at<br />the experience</h2>
            <p className="swiper-sub">Tap to browse — swipe through the app</p>
          </div>
          <div className="swiper-c">
            <div className="sw-orb" />
            <div className="sw-ping sw-ping-1" />
            <div className="sw-ping sw-ping-2" />
            <div className="sw-ping sw-ping-3" />
            {SCREENSHOTS.map((s, i) => {
              const dist = wrappedDist(i)
              return (
                <div
                  key={s.src}
                  className={dist === 0 ? 'slide-active' : ''}
                  style={getSlideTransform(dist)}
                  onClick={() => { goTo(i); startAuto() }}
                >
                  <div className="slide-phone">
                    <Image src={s.src} alt={s.label} width={260} height={561} style={{ width:260,height:'auto',display:'block' }} />
                  </div>
                  <div className="slide-lbl">{s.label}</div>
                </div>
              )
            })}
          </div>
          <div className="swiper-nav">
            <button className="arr" onClick={() => { goTo(active-1); startAuto() }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="dots">
              {SCREENSHOTS.map((_,i) => <div key={i} className={`dot${i===active?' on':''}`} onClick={() => { goTo(i); startAuto() }} />)}
            </div>
            <button className="arr" onClick={() => { goTo(active+1); startAuto() }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          <div className="feat-flow">
            <div className="feat-row">
              {[
                ['🎬','Video Reels'],['📍','City Pins'],['⭐','Reviews'],['🗺️','Maps'],
                ['🏙️','Cities'],['📸','Photos'],['🚶','Walking Tours'],['💬','Comments'],
                ['❤️','Likes'],['📤','Share'],['🔔','Notifications'],['👥','Community'],
                ['🎬','Video Reels'],['📍','City Pins'],['⭐','Reviews'],['🗺️','Maps'],
                ['🏙️','Cities'],['📸','Photos'],['🚶','Walking Tours'],['💬','Comments'],
                ['❤️','Likes'],['📤','Share'],['🔔','Notifications'],['👥','Community'],
              ].map(([icon, label], idx) => (
                <div key={idx} className="feat-pill"><span>{icon}</span>{label}</div>
              ))}
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="mq-s">
          <div className="mq-row">
            {[0,1].map(c => (
              <div key={c} className="mq-track">
                {MARQUEE_CITIES.map(city => <div key={city+c} className="mpill"><div className="mpill-d"/>{city}</div>)}
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS — 3 columns auto-scroll up at different speeds */}
        <section className="testi-s">
          <div className="wrap">
            <div className="testi-head rv">
              <h2 className="sh">Traveler reviews</h2>
              <p className="sp" style={{ marginTop:10 }}>What explorers say after discovering cities with Zoom City.</p>
            </div>
            <div className="testi-cols">
              {tRows.map((col, ci) => (
                <div key={ci} className={`testi-col testi-track-${ci+1}`}>
                  {/* Duplicated for infinite scroll */}
                  {[...col, ...col].map((t, ti) => (
                    <div key={ti} className="testi-card">
                      <p className="testi-text">"{t.text}"</p>
                      <div style={{ display:'flex',alignItems:'center',gap:12 }}>
                        <div className="testi-av">{t.name[0]}</div>
                        <div>
                          <div className="testi-name">{t.name}</div>
                          <div className="testi-role">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOWNLOAD CTA */}
        <section className="dl-s">
          <h2 className="dl-h rv">Download the App</h2>
          <p className="dl-sub rv d1">Start free and discover the world from anywhere.</p>
          <div className="dl-btns rv d2">
            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="sbtl">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M7.63 28.55L20.29 15.82 7.84 3.3C7.35 3.62 7 4.17 7 4.83v22.33c0 .57.25 1.06.63 1.38z" fill="#1be2fa"/><path d="M30.05 14.4C31.32 15.1 31.32 16.9 30.05 17.6l-5.12 2.82-4.64-4.6 4.4-4.44 5.36 2.97z" fill="#ffea00"/><path d="M24.93 20.42L20.29 15.82 7.63 28.55c.56.48 1.39.62 2.12.18l15.18-8.31z" fill="#fe3944"/><path d="M7.84 3.3l12.45 12.52 4.4-4.44L9.76 3.23C9.11 2.88 8.39 2.95 7.84 3.3z" fill="#11d574"/></svg>
              <div><div className="sbtn-sub">GET IT ON</div><div className="sbtn-main">Google Play</div></div>
            </a>
            <a href="#" className="sbtl off">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#CDCDE0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div><div className="sbtn-sub">DOWNLOAD ON THE</div><div className="sbtn-main">App Store</div></div>
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ft">
          <div className="wrap" style={{ padding:0 }}>
            <div className="ft-inner">
              <div>
                <div className="ft-brand">
                  <Image src="/zoom-city-logo.png" alt="Zoom City" width={28} height={25} style={{ objectFit:'contain' }} />
                  <span className="ft-logo-t">Zoom City</span>
                </div>
                <p className="ft-tagline">Discover the world through authentic video reels from real local travelers.</p>
              </div>
              <div>
                <div className="ft-col-h">Platform</div>
                <div className="ft-links">
                  <a href="#" className="ft-a">Video Reels</a>
                  <a href="#" className="ft-a">City Map</a>
                  <a href="#" className="ft-a">GPS Tracking</a>
                  <a href="#" className="ft-a">Travel Journal</a>
                </div>
              </div>
              <div>
                <div className="ft-col-h">App</div>
                <div className="ft-links">
                  <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="ft-a">Google Play</a>
                  <a href="#" className="ft-a">App Store (soon)</a>
                  <a href="/downloads" className="ft-a">Downloads</a>
                </div>
              </div>
              <div>
                <div className="ft-col-h">Company</div>
                <div className="ft-links">
                  <a href="/" className="ft-a">Home</a>
                  <a href="#" className="ft-a">About</a>
                  <a href="#" className="ft-a">Contact</a>
                </div>
              </div>
            </div>
            <div className="ft-bottom">
              <span className="ft-copy">© 2026 Zoom City. All rights reserved.</span>
              <div style={{ display:'flex',gap:20 }}>
                <a href="#" className="ft-a">Privacy Policy</a>
                <a href="#" className="ft-a">Terms of Use</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
