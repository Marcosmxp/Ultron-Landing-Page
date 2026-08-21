"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const capabilities = [
  { index: "01", title: "Research", copy: "Turn scattered sources into a decision-ready brief." },
  { index: "02", title: "Create", copy: "Move from rough intent to copy, code, specs and deliverables." },
  { index: "03", title: "Analyze", copy: "Extract what matters from files, data and dense project context." },
  { index: "04", title: "Automate", copy: "Push recurring work forward without rebuilding the process every time." },
];

const storyScenes = [
  {
    label: "01 / UNDERSTAND",
    title: "It reads the work before it answers.",
    copy: "Ultron starts with context: files, objectives, constraints and the decisions already made.",
  },
  {
    label: "02 / REASON",
    title: "It turns ambiguity into a plan.",
    copy: "Instead of another wall of text, Ultron identifies priorities, risks and the shortest route to an outcome.",
  },
  {
    label: "03 / EXECUTE",
    title: "It produces work you can use.",
    copy: "Drafts, code, research, structured tasks and next actions are created inside the same workflow.",
  },
  {
    label: "04 / CONTINUE",
    title: "It keeps the context alive.",
    copy: "The next task starts where the last one ended, reducing repetition and constant tool switching.",
  },
];

const roles = ["Developer", "Founder", "Researcher", "Analyst", "Creator"];

const valuePoints = [
  ["01", "One place for high-context work"],
  ["02", "Outputs shaped around the next action"],
  ["03", "Less switching between disconnected tools"],
  ["04", "A workflow that gets smarter with context"],
] as const;

export function LandingPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 75, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 75, damping: 22 });
  const orbX = useTransform(smoothX, [-0.5, 0.5], [-34, 34]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [-24, 24]);
  const orbRotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const orbRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });
  const storyScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1.08, 0.86]);
  const storyRotate = useTransform(scrollYProgress, [0, 1], [-12, 18]);
  const storyGlow = useTransform(scrollYProgress, [0, 0.55, 1], [0.28, 0.7, 0.34]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [demoStep, setDemoStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(storyScenes.length - 1, Math.floor(latest * storyScenes.length));
    setSceneIndex(next);
  });

  const demoLines = useMemo(
    () => [
      "I found the launch-critical decisions and removed the noise.",
      "I turned them into a sequence: validate → build → launch → measure.",
      "Your next three actions are ready. I can draft the assets now.",
    ],
    [],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDemoStep((current) => (current + 1) % demoLines.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [demoLines.length]);

  return (
    <main
      onPointerMove={(event) => {
        mouseX.set(event.clientX / window.innerWidth - 0.5);
        mouseY.set(event.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="page-noise" aria-hidden="true" />
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Ultron home">
          <span className="brand-mark" />
          ULTRON
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#system">System</a>
          <a href="#demo">Demo</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className="button button-small button-ghost" href="#pricing">
          Get early access
        </a>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />

        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="status-dot" />
            AI FOR PEOPLE WITH REAL WORK TO FINISH
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.78 }}
          >
            Stop asking AI.
            <span>Start delegating.</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.72 }}
          >
            Ultron is an AI assistant designed to understand context, make a plan and move work forward — from research and analysis to code, content and recurring workflows.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7 }}
          >
            <a className="button button-primary" href="#pricing">
              Join founding access <span>↗</span>
            </a>
            <a className="text-link" href="#demo">
              Watch the workflow <span>↓</span>
            </a>
          </motion.div>

          <motion.div
            className="trust-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42, duration: 0.8 }}
          >
            One workspace. High-context work. Fewer dead-end chats.
          </motion.div>
        </div>

        <motion.div
          className="core-stage"
          style={{ x: orbX, y: orbY, rotateX: orbRotateX, rotateY: orbRotateY }}
          aria-hidden="true"
        >
          <div className="core-halo halo-a" />
          <div className="core-halo halo-b" />
          <div className="orbit orbit-one"><i /></div>
          <div className="orbit orbit-two"><i /></div>
          <div className="orbit orbit-three" />
          <div className="core-shell">
            <div className="core-glow" />
            <div className="core-center"><span>U</span></div>
          </div>
          <div className="data-chip chip-one"><b>CONTEXT</b><span>SYNCED</span></div>
          <div className="data-chip chip-two"><b>MODE</b><span>EXECUTION</span></div>
          <div className="data-chip chip-three"><b>STATE</b><span>READY</span></div>
        </motion.div>

        <div className="hero-side-label">ULTRON / INTELLIGENT WORKSPACE / 0.2</div>
        <div className="scroll-cue">SCROLL TO ENTER <span>↓</span></div>
      </section>

      <section className="pressure-strip shell" aria-label="Common AI workflow friction">
        <span>THE OLD LOOP</span>
        <div>Open tool</div><i>→</i><div>Rewrite context</div><i>→</i><div>Get generic answer</div><i>→</i><div>Move it elsewhere</div><i>→</i><div>Repeat</div>
      </section>

      <section className="statement shell">
        <p className="section-kicker">THE SHIFT</p>
        <motion.h2
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.75 }}
        >
          A chatbot waits for the next prompt.
          <span>An assistant carries the work forward.</span>
        </motion.h2>
        <div className="statement-rule" />
        <p className="statement-copy">
          Ultron is positioned around outcomes, not novelty. The product should feel like a capable operator inside your workflow — fast to understand, easy to direct and useful after the answer appears.
        </p>
      </section>

      <section className="story" id="system" ref={storyRef}>
        <div className="story-sticky shell">
          <div className="story-copy">
            <p className="section-kicker">HOW ULTRON THINKS</p>
            <div className="story-progress" aria-hidden="true">
              {storyScenes.map((scene, index) => (
                <span key={scene.label} className={index <= sceneIndex ? "active" : ""} />
              ))}
            </div>
            <motion.div
              key={sceneIndex}
              className="story-text"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <small>{storyScenes[sceneIndex].label}</small>
              <h2>{storyScenes[sceneIndex].title}</h2>
              <p>{storyScenes[sceneIndex].copy}</p>
            </motion.div>
          </div>

          <div className="story-visual" aria-hidden="true">
            <div className="visual-grid" />
            <motion.div className="story-orb-wrap" style={{ scale: storyScale, rotate: storyRotate }}>
              <motion.div className="story-orb-glow" style={{ opacity: storyGlow }} />
              <div className="story-orb">
                <span>U</span>
                <i className="story-ring ring-a" />
                <i className="story-ring ring-b" />
              </div>
            </motion.div>
            <div className="story-console">
              <span>ULTRON CORE</span>
              <b>{String(sceneIndex + 1).padStart(2, "0")}/04</b>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities shell" id="capabilities">
        <div className="section-heading">
          <div>
            <p className="section-kicker">ONE SYSTEM / MULTIPLE JOBS</p>
            <h2>Use the same intelligence across the workday.</h2>
          </div>
          <p>Ultron adapts to the task while keeping the product experience consistent: understand the goal, shape the work, deliver something useful.</p>
        </div>

        <div className="capability-list">
          {capabilities.map((capability) => (
            <motion.article
              className="capability-row"
              key={capability.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.55 }}
            >
              <span>{capability.index}</span>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
              <span className="cap-arrow">↗</span>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="demo shell" id="demo">
        <div className="demo-copy">
          <p className="section-kicker">PRODUCT BEFORE PROMISES</p>
          <h2>Show the outcome before asking for the card.</h2>
          <p>
            The interactive demo is a conversion device: visitors see Ultron transform a vague goal into organized work instead of reading another feature list.
          </p>
          <div className="role-strip" aria-label="Example Ultron roles">
            {roles.map((role) => <span key={role}>{role}</span>)}
          </div>
        </div>

        <motion.div
          className="demo-window"
          initial={{ opacity: 0, y: 40, rotateX: 7 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.75 }}
        >
          <div className="window-bar">
            <div className="window-dots"><span /><span /><span /></div>
            <span>ultron / launch workspace</span>
            <span className="secure-label">LIVE FLOW</span>
          </div>
          <div className="demo-layout">
            <aside className="demo-sidebar">
              <span>WORKSPACE</span>
              <button className="active" type="button">Launch plan</button>
              <button type="button">Research</button>
              <button type="button">Assets</button>
              <button type="button">Tasks</button>
            </aside>
            <div className="conversation">
              <div className="message user-message">
                <span>YOU</span>
                I need to launch this product faster. Tell me what matters first and move the work forward.
              </div>
              <motion.div
                className="message ai-message"
                key={demoStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <span>ULTRON</span>
                {demoLines[demoStep]}
              </motion.div>
              <div className="action-preview">
                <div><span>01</span><b>Priority map</b><small>3 decisions</small></div>
                <div><span>02</span><b>Launch sequence</b><small>4 stages</small></div>
                <div><span>03</span><b>Next actions</b><small>ready</small></div>
              </div>
            </div>
          </div>
          <div className="prompt-bar">
            <span>Ask, attach or delegate...</span>
            <div><kbd>⌘</kbd><kbd>K</kbd><button type="button" aria-label="Send prompt">↑</button></div>
          </div>
        </motion.div>
      </section>

      <section className="value shell">
        <div className="value-lead">
          <p className="section-kicker">WHY THIS IS WORTH PAYING FOR</p>
          <h2>The value is not more text. It is less friction between intent and finished work.</h2>
        </div>
        <div className="value-grid">
          {valuePoints.map(([index, point]) => (
            <motion.div
              className="value-card"
              key={point}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <span>{index}</span>
              <p>{point}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="conversion-band shell">
        <span>FOR PEOPLE WHO ALREADY USE AI — BUT WANT IT TO FIT THE WORK</span>
        <div className="conversion-roles">
          <b>BUILD</b><b>RESEARCH</b><b>WRITE</b><b>ANALYZE</b><b>OPERATE</b>
        </div>
      </section>

      <section className="pricing shell" id="pricing">
        <div className="pricing-copy">
          <p className="section-kicker">FOUNDING ACCESS</p>
          <h2>Make the first paid decision easy.</h2>
          <p>A single plan keeps the offer clear while Ultron is early. The page can expand into usage tiers once the product has real customer behavior to price around.</p>
          <div className="pricing-note"><span>01</span><p>Early customers help shape the product.</p></div>
          <div className="pricing-note"><span>02</span><p>Founding pricing remains simple and memorable.</p></div>
        </div>

        <motion.div
          className="pricing-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
        >
          <div className="pricing-topline">
            <span>ULTRON PRO</span>
            <span>FOUNDING PLAN</span>
          </div>
          <div className="price-row"><strong>€19</strong><span>/ month</span></div>
          <p className="price-copy">One intelligent workspace for professionals who want AI to move beyond chat.</p>
          <ul>
            <li>Research, writing and analysis workflows</li>
            <li>Project and file context</li>
            <li>Multi-role workspace</li>
            <li>Automation-ready task flows</li>
            <li>Priority access to new capabilities</li>
          </ul>
          <a className="button button-primary button-full" href="mailto:hello@ultron.ai?subject=Ultron%20founding%20access">
            Reserve founding access <span>↗</span>
          </a>
          <small>No long-term commitment. Founding plan shown for launch positioning.</small>
        </motion.div>
      </section>

      <section className="final-cta shell">
        <div className="final-grid" aria-hidden="true" />
        <div className="final-core" aria-hidden="true"><span>U</span></div>
        <p className="section-kicker">THE WORK IS ALREADY WAITING</p>
        <h2>Give it to Ultron.</h2>
        <p>Less switching. Less repetition. More finished work.</p>
        <a className="button button-primary" href="#pricing">Get early access <span>↗</span></a>
      </section>

      <footer className="footer shell">
        <a className="brand" href="#top"><span className="brand-mark" /> ULTRON</a>
        <p>AI that moves work forward.</p>
        <div><a href="#system">System</a><a href="#demo">Demo</a><a href="#pricing">Pricing</a></div>
      </footer>
    </main>
  );
}
