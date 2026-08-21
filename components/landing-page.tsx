"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const capabilities = [
  { index: "01", title: "Research", copy: "Turn scattered information into clear answers, briefs and decisions." },
  { index: "02", title: "Create", copy: "Draft copy, product specs, code and structured content from one prompt." },
  { index: "03", title: "Analyze", copy: "Understand files, data and complex context without switching tools." },
  { index: "04", title: "Automate", copy: "Delegate repeatable work and keep important tasks moving forward." },
];

const roles = ["Developer", "Researcher", "Analyst", "Writer", "Operator"];

const proofPoints = [
  "One workspace instead of five tools",
  "Context that follows your work",
  "Fast answers with action-oriented output",
  "Built for daily professional workflows",
];

export function LandingPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 24 });
  const orbX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const [demoStep, setDemoStep] = useState(0);

  const demoLines = useMemo(
    () => [
      "Analyze the brief and identify the fastest path to launch.",
      "I found 3 blockers, 2 quick wins and a launch sequence.",
      "I can turn this into tasks, owners and a release checklist.",
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
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Ultron home">
          <span className="brand-mark" />
          ULTRON
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#capabilities">Capabilities</a>
          <a href="#demo">Demo</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className="button button-small button-ghost" href="#pricing">
          Get early access
        </a>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-grid" />
        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="status-dot" />
            AI WORKSPACE / PRIVATE BETA
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            Stop asking AI.
            <span>Start delegating.</span>
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
          >
            Ultron researches, creates, analyzes and moves work forward from one intelligent workspace built for people who need outcomes — not another chatbot.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7 }}
          >
            <a className="button button-primary" href="#pricing">
              Start with Ultron <span>↗</span>
            </a>
            <a className="text-link" href="#demo">
              See how it works <span>↓</span>
            </a>
          </motion.div>
          <motion.div
            className="trust-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.8 }}
          >
            No setup maze. No prompt library required. Start with the work in front of you.
          </motion.div>
        </div>

        <motion.div className="core-stage" style={{ x: orbX, y: orbY }} aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="core-shell">
            <div className="core-glow" />
            <div className="core-center">
              <span>U</span>
            </div>
          </div>
          <div className="data-chip chip-one">CONTEXT 98%</div>
          <div className="data-chip chip-two">TASKS ACTIVE</div>
          <div className="data-chip chip-three">READY</div>
        </motion.div>

        <div className="scroll-cue">SCROLL TO ENTER <span>↓</span></div>
      </section>

      <section className="statement shell">
        <p className="section-kicker">THE DIFFERENCE</p>
        <h2>
          Most AI gives you an answer.
          <span>Ultron gives you momentum.</span>
        </h2>
        <div className="statement-rule" />
        <p className="statement-copy">
          The product is designed around a simple idea: reduce the distance between intent and finished work.
        </p>
      </section>

      <section className="capabilities shell" id="capabilities">
        <div className="section-heading">
          <div>
            <p className="section-kicker">ONE AI / MULTIPLE ROLES</p>
            <h2>Work with one system that adapts to the job.</h2>
          </div>
          <p>Ultron changes how it works based on what you need — without making you rebuild context every time.</p>
        </div>

        <div className="capability-list">
          {capabilities.map((capability) => (
            <motion.article
              className="capability-row"
              key={capability.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
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
          <p className="section-kicker">NOT A CONCEPT / TRY THE FLOW</p>
          <h2>Give Ultron a goal. Watch it turn ambiguity into action.</h2>
          <p>
            The page should demonstrate the product before asking for money. This interaction is the first conversion layer: show the visitor what "delegating" actually feels like.
          </p>
          <div className="role-strip" aria-label="Example Ultron roles">
            {roles.map((role) => <span key={role}>{role}</span>)}
          </div>
        </div>

        <div className="demo-window">
          <div className="window-bar">
            <div className="window-dots"><span /><span /><span /></div>
            <span>ultron / workspace</span>
            <span className="secure-label">SECURE SESSION</span>
          </div>
          <div className="conversation">
            <div className="message user-message">
              <span>YOU</span>
              I need to launch this product faster. Analyze the brief and tell me what matters first.
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
              <div><span>01</span> PRIORITY MAP</div>
              <div><span>02</span> EXECUTION PLAN</div>
              <div><span>03</span> NEXT ACTIONS</div>
            </div>
          </div>
          <div className="prompt-bar">
            <span>Ask, attach or delegate...</span>
            <button type="button" aria-label="Send prompt">↑</button>
          </div>
        </div>
      </section>

      <section className="proof shell">
        <div className="proof-card proof-lead">
          <p className="section-kicker">WHY PEOPLE PAY</p>
          <h2>Time saved is nice. Mental bandwidth is the product.</h2>
        </div>
        {proofPoints.map((point, index) => (
          <div className="proof-card" key={point}>
            <span>0{index + 1}</span>
            <p>{point}</p>
          </div>
        ))}
      </section>

      <section className="pricing shell" id="pricing">
        <div className="pricing-copy">
          <p className="section-kicker">EARLY ACCESS</p>
          <h2>One subscription. A lot less busywork.</h2>
          <p>Start simple, prove value quickly, then expand pricing around usage and advanced automation.</p>
        </div>
        <div className="pricing-card">
          <div className="pricing-topline">
            <span>ULTRON PRO</span>
            <span>FOUNDING PLAN</span>
          </div>
          <div className="price-row">
            <strong>€19</strong>
            <span>/ month</span>
          </div>
          <p className="price-copy">For professionals who want one AI workspace for daily execution.</p>
          <ul>
            <li>Unlimited workspaces</li>
            <li>Research, writing and analysis</li>
            <li>File and project context</li>
            <li>Automation-ready workflows</li>
            <li>Priority access to new capabilities</li>
          </ul>
          <a className="button button-primary button-full" href="mailto:hello@ultron.ai?subject=Ultron%20early%20access">
            Join early access <span>↗</span>
          </a>
          <small>Cancel anytime. Founding pricing stays locked while subscribed.</small>
        </div>
      </section>

      <section className="final-cta shell">
        <div className="final-core" aria-hidden="true"><span>U</span></div>
        <p className="section-kicker">THE WORK IS ALREADY WAITING</p>
        <h2>Give it to Ultron.</h2>
        <p>Less tool switching. Less prompt engineering. More finished work.</p>
        <a className="button button-primary" href="#pricing">Get early access <span>↗</span></a>
      </section>

      <footer className="footer shell">
        <a className="brand" href="#top"><span className="brand-mark" /> ULTRON</a>
        <p>AI that gets the work done.</p>
        <div><a href="#capabilities">Product</a><a href="#pricing">Pricing</a><a href="mailto:hello@ultron.ai">Contact</a></div>
      </footer>
    </main>
  );
}
