import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Github, Linkedin, Mail, ArrowUpRight, ArrowDown, Menu, X, Code2,
  Database, Layers3, Sparkles, MapPin, GraduationCap, Terminal,
  ArrowRight, Download, Sun, Moon, Clock3, Gamepad2, Play, RotateCcw,
  Trophy, Zap, MousePointer2
} from 'lucide-react';
import './style.css';

const projects = [
  {
    num: '01', title: 'SEO Rank Tracker', type: 'FULL-STACK / AI',
    description: 'A full-stack SEO platform for automated website audits and Google keyword rank tracking, turning website data into practical recommendations.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Gemini AI'],
    icon: '◎', tone: 'purple',
    details: 'Playwright + Browserbase scraping · JWT authentication · Daily rank updates with Node-Cron'
  },
  {
    num: '02', title: 'AI Fitness Tracker', type: 'AI / WEB APP',
    description: 'A responsive fitness companion for monitoring workouts and daily metrics, with AI-powered insights and personalized recommendations.',
    tags: ['React', 'Tailwind CSS', 'Firebase', 'Gemini AI'],
    icon: '↗', tone: 'blue',
    details: 'Firebase data management · Intelligent fitness insights · Vercel deployment'
  },
  {
    num: '03', title: 'MoodFlix', type: 'FRONTEND / API',
    description: 'A responsive movie discovery platform with fast search, dynamic trending movies, and a polished browsing experience.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'OMDb API', 'Appwrite'],
    icon: '▷', tone: 'pink',
    details: 'Debounced search · Search popularity tracking · Async loading and error states'
  },
  {
    num: '04', title: 'React Chatbot', type: 'FULL-STACK',
    description: 'An interactive rule-based chatbot with a conversational interface, keyboard interactions, and useful utility-based responses.',
    tags: ['React', 'JavaScript', 'Node.js', 'Express.js'],
    icon: '⌘', tone: 'teal',
    details: 'Dynamic messages · Auto-scrolling · Date, time, dice rolls and coin tosses'
  }
];

const groups = [
  { title: 'Languages', icon: Code2, items: ['Java', 'Python', 'C', 'C#', 'JavaScript', 'HTML5', 'CSS3'] },
  { title: 'Frontend', icon: Layers3, items: ['React', 'Vite', 'jQuery', 'Tailwind CSS', 'TypeScript'] },
  { title: 'Backend & Data', icon: Database, items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'Supabase', 'MySQL', 'Firebase'] },
  { title: 'Tools & Platforms', icon: Terminal, items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel', 'WordPress', 'Godot'] }
];

function useBengaluruClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return {
    time: new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(now),
    date: new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).format(now)
  };
}

function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = -100, y = -100, rx = -100, ry = -100, frame;
    const move = e => { x = e.clientX; y = e.clientY; };
    const animate = () => {
      rx += (x - rx) * .18; ry += (y - ry) * .18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      frame = requestAnimationFrame(animate);
    };
    const over = e => { if (e.target.closest('a,button,[role="button"]')) document.body.classList.add('cursor-hover'); };
    const out = e => { if (e.target.closest('a,button,[role="button"]')) document.body.classList.remove('cursor-hover'); };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out); document.body.classList.remove('cursor-hover'); };
  }, []);
  return <><div className="cursor-dot" ref={dot}/><div className="cursor-ring" ref={ring}/></>;
}

function PongGame() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(105);
  const [ball, setBall] = useState({ x: 145, y: 130, vx: 3, vy: 2 });
  const area = useRef(null);
  const paddleRef = useRef(playerY);
  useEffect(() => { paddleRef.current = playerY; }, [playerY]);
  useEffect(() => {
    if (!running) return;
    let raf, b = { ...ball }, enemy = 100, points = score;
    const tick = () => {
      const w = area.current?.clientWidth || 320, h = 220;
      b.x += b.vx; b.y += b.vy;
      if (b.y < 8 || b.y > h - 8) b.vy *= -1;
      enemy += ((b.y - 32) - enemy) * .045;
      if (b.x < 26 && b.y > paddleRef.current && b.y < paddleRef.current + 70) b.vx = Math.abs(b.vx) * 1.04;
      if (b.x > w - 26 && b.y > enemy && b.y < enemy + 70) b.vx = -Math.abs(b.vx);
      if (b.x < 0) { points = 0; setScore(0); b = { x: w / 2, y: h / 2, vx: 3, vy: 2 }; }
      if (b.x > w) { points += 1; setScore(points); b = { x: w / 2, y: h / 2, vx: -3, vy: 2 }; }
      setBall({ ...b }); raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);
  const move = e => {
    const rect = area.current?.getBoundingClientRect();
    if (!rect) return;
    setPlayerY(Math.max(0, Math.min(150, e.clientY - rect.top - 35)));
  };
  return <div className="game-card">
    <div className="game-top"><span className="game-index">01 / ARCADE</span><span className="game-score">SCORE {score}</span></div>
    <h3>Neon Pong</h3><p>Keep the rally alive. Move your pointer over the arena to control the left paddle.</p>
    <div className="pong-arena" ref={area} onMouseMove={move} onTouchMove={e => { const t = e.touches[0]; if (t) move({ clientY: t.clientY }); }}>
      <div className="pong-centerline"/><div className="pong-paddle player" style={{ top: playerY }}/><div className="pong-paddle cpu" style={{ top: Math.max(0, Math.min(150, ball.y - 32)) }}/><div className="pong-ball" style={{ left: ball.x, top: ball.y }}/>
      {!running && <button className="game-overlay" onClick={() => { setBall({ x: 145, y: 110, vx: 3, vy: 2 }); setRunning(true); }}><Play size={16}/> START GAME</button>}
    </div>
    <div className="game-actions"><button onClick={() => { setRunning(false); setScore(0); setBall({ x: 145, y: 110, vx: 3, vy: 2 }); setPlayerY(75); }}><RotateCcw size={14}/> RESET</button><span>Mouse / touch control</span></div>
  </div>;
}

function BreakerGame() {
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [paddle, setPaddle] = useState(42);
  const [ball, setBall] = useState({ x: 50, y: 55, vx: 1.1, vy: 1.2 });
  const [bricks, setBricks] = useState(Array.from({ length: 15 }, (_, i) => i));
  const ref = useRef(null);
  const paddleRef = useRef(paddle);
  useEffect(() => { paddleRef.current = paddle; }, [paddle]);
  useEffect(() => {
    if (!active) return;
    let raf, b = { ...ball }, remaining = [...bricks], pts = score;
    const tick = () => {
      const w = ref.current?.clientWidth || 320;
      b.x += b.vx; b.y += b.vy;
      if (b.x < 2 || b.x > 98) b.vx *= -1;
      if (b.y < 3) b.vy = Math.abs(b.vy);
      if (b.y > 88 && b.x * w / 100 > paddleRef.current - 8 && b.x * w / 100 < paddleRef.current + 55) b.vy = -Math.abs(b.vy);
      if (b.y < 33 && remaining.length) {
        const col = Math.floor(b.x / 20), row = Math.floor((b.y - 8) / 8), idx = row * 5 + col;
        if (remaining.includes(idx)) { remaining = remaining.filter(n => n !== idx); pts += 10; setScore(pts); b.vy *= -1; setBricks(remaining); }
      }
      if (b.y > 100 || remaining.length === 0) { setActive(false); return; }
      setBall({ ...b }); raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  const start = () => { setScore(0); setBricks(Array.from({ length: 15 }, (_, i) => i)); setBall({ x: 50, y: 55, vx: 1.1, vy: 1.2 }); setActive(true); };
  return <div className="game-card">
    <div className="game-top"><span className="game-index">02 / ARCADE</span><span className="game-score">SCORE {score}</span></div>
    <h3>Neon Breaker</h3><p>Break the glowing blocks. Move the paddle with your pointer and clear the board.</p>
    <div className="breaker-arena" ref={ref} onMouseMove={e => { const r = ref.current.getBoundingClientRect(); setPaddle(Math.max(0, Math.min(80, (e.clientX - r.left) / r.width * 100 - 25))); }} onTouchMove={e => { const r = ref.current.getBoundingClientRect(); setPaddle(Math.max(0, Math.min(80, (e.touches[0].clientX - r.left) / r.width * 100 - 25))); }}>
      {bricks.map(i => <span key={i} className="brick" style={{ left: `${(i % 5) * 20 + 2}%`, top: `${Math.floor(i / 5) * 10 + 5}%` }}/>)}
      <span className="breaker-ball" style={{ left: `${ball.x}%`, top: `${ball.y}%` }}/><span className="breaker-paddle" style={{ left: `${paddle}%` }}/>
      {!active && <button className="game-overlay" onClick={start}><Play size={16}/> {bricks.length === 0 ? 'PLAY AGAIN' : 'START GAME'}</button>}
    </div>
    <div className="game-actions"><button onClick={start}><RotateCcw size={14}/> RESTART</button><span>Mouse / touch control</span></div>
  </div>;
}

function TrafficGame() {
  const [playing, setPlaying] = useState(false);
  const [lane, setLane] = useState(1);
  const [obstacle, setObstacle] = useState({ lane: 0, y: -20 });
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setObstacle(o => {
        const y = o.y + 7;
        if (y > 100) { setScore(s => s + 1); return { lane: Math.floor(Math.random() * 3), y: -18 }; }
        return { ...o, y };
      });
    }, 120);
    return () => clearInterval(timer);
  }, [playing, lane]);
  useEffect(() => {
    const key = e => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') setLane(v => Math.max(0, v - 1));
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') setLane(v => Math.min(2, v + 1));
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  useEffect(() => { if (playing && obstacle.y > 77 && obstacle.y < 98 && obstacle.lane === lane) setPlaying(false); }, [obstacle, playing, lane]);
  const start = () => { setScore(0); setLane(1); setObstacle({ lane: Math.floor(Math.random() * 3), y: -18 }); setPlaying(true); };
  return <div className="game-card">
    <div className="game-top"><span className="game-index">03 / ARCADE</span><span className="game-score">DISTANCE {score}</span></div>
    <h3>2D Traffic Racer</h3><p>Dodge the traffic and survive as long as you can. Use the arrow keys or buttons.</p>
    <div className="traffic-arena">
      <div className="road-lines"/>
      <span className="traffic-car enemy" style={{ left: `${obstacle.lane * 33.33 + 8}%`, top: `${obstacle.y}%` }}/>
      <span className="traffic-car player-car" style={{ left: `${lane * 33.33 + 8}%` , top: '78%' }}/>
      {!playing && <button className="game-overlay" onClick={start}><Play size={16}/> {score ? `CRASHED · ${score} POINTS · RETRY` : 'START RACE'}</button>}
    </div>
    <div className="game-actions"><div className="traffic-controls"><button onClick={() => setLane(v => Math.max(0, v - 1))}>←</button><button onClick={() => setLane(v => Math.min(2, v + 1))}>→</button></div><span>← → / A D controls</span></div>
  </div>;
}

function ReactionGame() {
  const [state, setState] = useState('idle');
  const [start, setStart] = useState(0);
  const [result, setResult] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const begin = () => { setResult(null); setState('wait'); timer.current = setTimeout(() => { setStart(performance.now()); setState('go'); }, 1000 + Math.random() * 2500); };
  const hit = () => {
    if (state === 'wait') { clearTimeout(timer.current); setState('early'); }
    else if (state === 'go') { setResult(Math.round(performance.now() - start)); setState('done'); }
  };
  return <div className="game-card reaction-card">
    <div className="game-top"><span className="game-index">04 / ARCADE</span><span className="game-score">REFLEX TEST</span></div>
    <h3>Reaction Sprint</h3><p>Wait for the signal to turn green, then click as fast as you can.</p>
    <button className={`reaction-zone ${state}`} onClick={state === 'idle' || state === 'done' || state === 'early' ? begin : hit}>
      {state === 'idle' && 'START TEST'}{state === 'wait' && 'WAIT FOR GREEN…'}{state === 'go' && 'CLICK NOW!'}{state === 'early' && 'TOO SOON — TRY AGAIN'}{state === 'done' && `${result} MS · TRY AGAIN`}
    </button>
    <div className="game-actions"><span>Quick reflexes. One click.</span><Trophy size={15}/></div>
  </div>;
}

function Games() {
  return <section className="section games" id="arcade">
    <div className="section-heading"><span className="section-number">05 / TAKE A BREAK</span><h2>Developer <span className="gradient-text">arcade.</span></h2><p>Four tiny games. Built into the portfolio. Go on, take a break.</p></div>
    <div className="games-grid"><PongGame/><BreakerGame/><TrafficGame/><ReactionGame/></div>
  </section>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [light, setLight] = useState(false);
  const clock = useBengaluruClock();
  return <div className={light ? 'site light-theme' : 'site'}>
    <CustomCursor/>
    <div className="ambient a1"/><div className="ambient a2"/>
    <header className="header">
      <a className="logo" href="#home">Y<span>.</span></a>
      <nav className={menu ? 'nav open' : 'nav'}>
        { [['About','#about'],['Projects','#projects'],['Skills','#skills'],['Arcade','#arcade'],['Education','#education']].map(([t,h]) => <a key={t} href={h} onClick={() => setMenu(false)}>{t}</a>)}
        <a className="nav-contact" href="mailto:yashas.hk06@gmail.com">Let's talk <ArrowUpRight size={15}/></a>
      </nav>
      <button className="theme-toggle" onClick={() => setLight(v => !v)} aria-label="Toggle light and dark theme">{light ? <Moon size={17}/> : <Sun size={17}/>}</button>
      <button className="menu" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
    </header>
    <main>
      <section className="hero section" id="home">
        <div className="hero-inner">
          <div className="availability"><span className="live-dot"/> OPEN TO OPPORTUNITIES</div>
          <p className="eyebrow">HEY, I'M YASHAS HK <span className="wave">✳</span></p>
          <h1>Building digital<br/>experiences that<br/><span className="gradient-text">make an impact.</span></h1>
          <p className="hero-copy">Aspiring Software Engineer crafting thoughtful full-stack applications, exploring AI, and turning ideas into useful digital experiences.</p>
          <div className="hero-actions"><a className="primary" href="#projects">Explore my work <ArrowUpRight size={18}/></a><a className="secondary" href="./resume.pdf" download="Yashas_HK_CV.pdf"><Download size={17}/> Download CV</a></div>
          <div className="hero-footer">
            <div className="socials"><a href="https://github.com/YashasHK-06" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19}/></a><a href="https://www.linkedin.com/search/results/people/?keywords=Yashas%20HK" target="_blank" rel="noreferrer" aria-label="Search LinkedIn for Yashas HK"><Linkedin size={19}/></a><a href="mailto:yashas.hk06@gmail.com" aria-label="Email"><Mail size={19}/></a></div>
            <a className="scroll" href="#about">SCROLL TO EXPLORE <ArrowDown size={15}/></a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-core"><span>&lt;/&gt;</span></div><div className="float-tag tag-one"><Sparkles size={16}/> AI-POWERED</div><div className="float-tag tag-two"><Code2 size={16}/> FULL-STACK</div><div className="art-glow"/></div>
        <div className="blr-clock"><div className="clock-heading"><span className="live-dot"/> LIVE LOCAL TIME</div><div className="clock-time"><Clock3 size={17}/>{clock.time}</div><div className="clock-date">{clock.date}</div><div className="clock-place"><MapPin size={13}/> BENGALURU, INDIA · IST</div></div>
      </section>

      <section id="about" className="section about">
        <div className="section-heading"><span className="section-number">01 / ABOUT</span><h2>Curious mind.<br/><span className="muted">Builder at heart.</span></h2></div>
        <div className="about-grid">
          <div className="about-main"><p>I'm <strong>Yashas HK</strong>, a Computer Science student at <strong>Bangalore Institute of Technology</strong>, graduating in 2027. I love turning ideas into functional, polished products.</p><p>My focus is on building responsive full-stack web applications, integrating APIs and databases, and experimenting with AI to solve real problems. From Java and Python to React, Node.js, and MongoDB, I enjoy learning by building.</p><a className="text-link cv-link" href="./resume.pdf" download="Yashas_HK_CV.pdf"><Download size={17}/> Download my CV <ArrowUpRight size={15}/></a></div>
          <div className="about-stats"><div><strong>12<span>+</span></strong><small>PROJECTS COMPLETED</small></div><div><strong>2027</strong><small>EXPECTED GRADUATION</small></div><div className="location"><MapPin size={17}/> Bengaluru, India</div></div>
        </div>
      </section>

      <section id="projects" className="section projects">
        <div className="section-heading"><span className="section-number">02 / COMPLETED PROJECTS</span><div className="heading-line"><h2>Things I've <span className="gradient-text">built.</span></h2><div className="project-count"><strong>12+</strong><span>COMPLETED PROJECTS</span></div></div><p>Four projects from my resume. More experiments and code live on GitHub.</p></div>
        <div className="project-grid">{projects.map(p => <article className={'project-card ' + p.tone} key={p.num}><div className="project-visual"><div className="visual-grid"/><div className="visual-orb"/><span className="project-symbol">{p.icon}</span><span className="visual-label">PROJECT / {p.num}</span></div><div className="project-content"><span className="project-type">{p.type}</span><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div><div className="project-detail">{p.details}</div></div></article>)}</div>
        <div className="github-cta">Explore more of my work and repositories. <a href="https://github.com/YashasHK-06?tab=repositories" target="_blank" rel="noreferrer">View all repositories <ArrowUpRight size={16}/></a></div>
      </section>

      <section id="skills" className="section skills">
        <div className="section-heading"><span className="section-number">03 / MY TOOLKIT</span><h2>Tools of the <span className="gradient-text">trade.</span></h2><p>Technologies I use to bring ideas to life.</p></div>
        <div className="skills-grid">{groups.map(g => { const Icon = g.icon; return <div className="skill-card" key={g.title}><div className="skill-icon"><Icon/></div><h3>{g.title}</h3><div className="skill-list">{g.items.map(item => <span key={item}>{item}</span>)}</div></div>; })}</div>
      </section>

      <Games/>

      <section id="education" className="section education">
        <div className="section-heading"><span className="section-number">06 / BACKGROUND</span><h2>Always <span className="gradient-text">learning.</span></h2></div>
        <div className="education-card"><div className="edu-icon"><GraduationCap size={27}/></div><div><span className="project-type">EDUCATION</span><h3>Bachelor's in Computer Science</h3><p>Bangalore Institute of Technology</p></div><span className="edu-year">EXPECTED 2027</span></div>
        <div className="interest-line"><span>BEYOND THE CODE</span><p>Gym <b>✳</b> Gaming <b>✳</b> Music</p></div>
      </section>

      <section className="section contact" id="contact"><span className="section-number">07 / LET'S CONNECT</span><div className="contact-inner"><div className="availability"><span className="live-dot"/> OPEN TO OPPORTUNITIES</div><h2>Have something<br/><span className="gradient-text">in mind?</span></h2><p>Whether it's a project, an opportunity, or just a conversation about tech, my inbox is open.</p><a className="contact-button" href="mailto:yashas.hk06@gmail.com">Say hello <ArrowUpRight size={24}/></a></div></section>
    </main>
    <footer><a className="logo" href="#home">Y<span>.</span></a><span>© {new Date().getFullYear()} Yashas HK · Built with curiosity.</span><div><a href="https://github.com/YashasHK-06" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="mailto:yashas.hk06@gmail.com">EMAIL ↗</a><a href="#home">BACK TO TOP ↑</a></div></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
