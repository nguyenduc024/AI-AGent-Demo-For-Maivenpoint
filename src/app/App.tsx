import { useState } from "react";

const CSS = `
  .af * { box-sizing: border-box; }
  .af h1,.af h2,.af h3,.af h4,.af h5,.af h6 {
    font-family: 'Space Grotesk', ui-sans-serif, sans-serif;
  }
  .af {
    --bg-void: #050A12;
    --bg-surface: #0B1220;
    --bg-raised: #111C2F;
    --border-default: rgba(0,180,220,.12);
    --border-active: rgba(0,208,255,.35);
    --signal-cyan: #00D0FF;
    --signal-orange: #FF6B2B;
    --signal-green: #0DEB72;
    --signal-amber: #F59E0B;
    --signal-violet: #8B5CF6;
    --text-primary: #E8F0FF;
    --text-secondary: rgba(180,200,240,.65);
    --text-muted: rgba(140,165,210,.45);
    --text-data: #00D0FF;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    background: var(--bg-void);
    color: var(--text-primary);
    min-height: 100vh;
    position: relative;
  }
  .af::before {
    content: "";
    position: fixed; inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(0,180,220,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,180,220,.04) 1px, transparent 1px);
    background-size: 28px 28px;
    z-index: 0;
  }
  .af::after {
    content: "";
    position: fixed; left: 0; top: 0;
    width: 400px; height: 400px;
    pointer-events: none;
    background: radial-gradient(circle, rgba(0,150,200,.08), transparent 70%);
    z-index: 0;
  }

  /* Layout */
  .af-app {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 284px 1fr;
    position: relative;
    z-index: 1;
  }

  /* Sidebar */
  .af-sidebar {
    position: sticky; top: 0; height: 100vh;
    padding: 24px 18px;
    background: var(--bg-surface);
    border-right: 1px solid rgba(0,180,220,.15);
    display: flex; flex-direction: column; gap: 20px;
    z-index: 20; overflow: hidden;
  }
  .af-sidebar::after {
    content: "";
    position: absolute; right: 0; top: 0;
    width: 2px; height: 200px;
    background: linear-gradient(to bottom, var(--signal-cyan), transparent);
    opacity: .6; pointer-events: none;
  }
  .af-brand {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 12px 18px;
    border-bottom: 1px solid var(--border-default);
  }
  .af-brand-mark {
    width: 44px; height: 44px;
    clip-path: polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%);
    display: grid; place-items: center;
    color: #fff; font-weight: 900; letter-spacing: -.08em;
    background: linear-gradient(135deg, #0090C8, #00D0FF);
    filter: drop-shadow(0 0 12px rgba(0,208,255,.5));
    font-family: 'Space Grotesk', sans-serif; font-size: 20px;
  }
  .af-brand h1 {
    font-size: 20px; line-height: 1; margin: 0;
    letter-spacing: -.04em; font-weight: 700;
    color: var(--text-primary);
  }
  .af-brand p { font-size: 12px; margin: 3px 0 0; color: var(--text-muted); }

  /* Nav */
  .af-nav { display: grid; gap: 6px; }
  .af-nav button {
    border: 0; background: transparent; color: var(--text-secondary);
    padding: 11px 14px; border-radius: 10px;
    display: flex; align-items: center; gap: 10px; text-align: left;
    transition: .18s ease; font-size: 14px; font-weight: 600;
    border-left: 3px solid transparent; width: 100%; cursor: pointer;
  }
  .af-nav button:hover { background: rgba(0,208,255,.07); color: var(--text-primary); }
  .af-nav button.af-active {
    background: rgba(0,208,255,.10); color: var(--signal-cyan);
    border-left-color: var(--signal-cyan); padding-left: 11px;
  }
  .af-ico {
    width: 26px; height: 26px; display: grid; place-items: center;
    border-radius: 7px;
    background: rgba(0,208,255,.08); border: 1px solid var(--border-default);
    font-size: 13px; flex-shrink: 0;
  }
  .af-nav button.af-active .af-ico {
    background: rgba(0,208,255,.15); border-color: rgba(0,208,255,.3);
    color: var(--signal-cyan);
  }

  /* Side card */
  .af-side-card {
    margin-top: auto; border-radius: 20px; padding: 18px;
    background: linear-gradient(145deg, rgba(0,90,130,.6), rgba(0,180,220,.15));
    border: 1px solid var(--border-active);
    color: var(--text-primary); overflow: hidden; position: relative;
  }
  .af-side-card strong { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; }
  .af-side-card p { margin: 8px 0 14px; color: var(--text-secondary); font-size: 13px; line-height: 1.45; }
  .af-side-card::after {
    content: "";
    position: absolute; left: 0; right: 0; height: 1px;
    background: rgba(0,208,255,.35); top: -1px;
    animation: af-scanLine 4s ease-in-out infinite; pointer-events: none;
  }
  .af-small-btn {
    position: relative; z-index: 1;
    background: var(--signal-orange); color: #fff;
    border: 0; border-radius: 8px;
    padding: 10px 13px; font-weight: 700; font-size: 13px;
    font-family: 'Space Grotesk', sans-serif;
    box-shadow: 0 8px 24px rgba(255,107,43,.35);
    transition: .16s ease; cursor: pointer;
  }
  .af-small-btn:hover { transform: translateY(-1px); }

  /* Main */
  .af-main { padding: 26px 30px 40px; min-width: 0; position: relative; z-index: 1; }

  /* Topbar */
  .af-topbar {
    display: flex; align-items: center; justify-content: space-between; gap: 18px;
    margin-bottom: 24px;
  }
  .af-eyebrow {
    color: var(--signal-cyan); font-weight: 800; font-size: 11px;
    letter-spacing: .12em; text-transform: uppercase; margin: 0 0 7px;
    font-family: 'Space Grotesk', sans-serif;
    display: flex; align-items: center; gap: 6px;
  }
  .af-eyebrow::before {
    content: "●"; font-size: 8px;
    animation: af-pulse 2s ease-in-out infinite;
  }
  .af-topbar h2 {
    font-size: 30px; line-height: 1.05; margin: 0;
    letter-spacing: -.045em; color: var(--text-primary);
  }
  .af-topbar > div > p { margin: 8px 0 0; color: var(--text-secondary); }
  .af-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
  .af-pill {
    border: 1px solid var(--border-active); background: rgba(0,208,255,.06);
    border-radius: 999px; padding: 10px 14px; color: var(--signal-cyan);
    display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600;
  }
  .af-pill::before {
    content: "●"; font-size: 8px; color: var(--signal-green);
    animation: af-pulse 2s ease-in-out infinite;
  }

  /* Buttons */
  .af-btn-primary, .af-btn-secondary, .af-btn-ghost {
    border-radius: 8px; border: 0; padding: 11px 18px;
    font-weight: 700; font-size: 14px;
    display: inline-flex; align-items: center; gap: 8px;
    transition: .16s ease; font-family: 'Space Grotesk', sans-serif;
    cursor: pointer;
  }
  .af-btn-primary {
    background: var(--signal-orange); color: #fff;
    box-shadow: 0 8px 24px rgba(255,107,43,.35);
  }
  .af-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(255,107,43,.45); }
  .af-btn-secondary {
    background: transparent; border: 1px solid var(--signal-cyan); color: var(--signal-cyan);
  }
  .af-btn-secondary:hover { background: rgba(0,208,255,.1); transform: translateY(-1px); }
  .af-btn-ghost {
    background: var(--bg-raised); border: 1px solid var(--border-default); color: var(--text-secondary);
  }
  .af-btn-ghost:hover { border-color: var(--border-active); color: var(--text-primary); transform: translateY(-1px); }

  /* Hero */
  .af-hero {
    border: 1px solid var(--border-default); border-radius: 20px;
    background: transparent; overflow: hidden; position: relative;
    padding: 26px; margin-bottom: 22px;
    display: grid; grid-template-columns: 1fr 1.05fr; gap: 24px;
  }
  .af-hero-copy { position: relative; z-index: 1; }
  .af-badge-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
  .af-badge {
    clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
    padding: 7px 11px;
    background: rgba(0,208,255,.12); border: 1px solid rgba(0,208,255,.3);
    color: var(--signal-cyan); font-size: 12px; font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
  }
  .af-badge-warn { background: rgba(245,158,11,.12); border-color: rgba(245,158,11,.3); color: var(--signal-amber); }
  .af-badge-good { background: rgba(13,235,114,.1); border-color: rgba(13,235,114,.25); color: var(--signal-green); }
  .af-hero h3 {
    font-size: 44px; line-height: 1.02; letter-spacing: -.06em;
    margin: 0 0 14px; font-weight: 700; color: var(--text-primary);
  }
  .af-hero h3 span {
    background: linear-gradient(90deg, var(--signal-cyan), #5EC8F0);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .af-hero > .af-hero-copy > p {
    font-size: 15px; line-height: 1.65; color: var(--text-secondary); max-width: 720px; margin: 0 0 22px;
  }
  .af-searchbar {
    display: flex; align-items: center; gap: 10px; max-width: 620px;
    background: var(--bg-raised); border: 1px solid var(--border-default);
    border-radius: 14px; padding: 8px; transition: .2s ease;
  }
  .af-searchbar:focus-within { border-color: var(--border-active); box-shadow: 0 0 0 3px rgba(0,208,255,.1); }
  .af-searchbar input {
    border: 0; outline: 0; flex: 1; padding: 10px 8px; min-width: 140px;
    color: var(--text-primary); background: transparent;
  }
  .af-searchbar input::placeholder { color: var(--text-muted); }
  .af-searchbar button {
    border: 0; border-radius: 8px;
    background: var(--signal-cyan); color: var(--bg-void);
    padding: 10px 14px; font-weight: 800; font-size: 13px;
    font-family: 'Space Grotesk', sans-serif; transition: .16s ease; cursor: pointer;
  }
  .af-searchbar button:hover { opacity: .88; }

  /* Hero Panel */
  .af-hero-panel {
    position: relative; z-index: 1; min-height: 300px;
    border-radius: 20px; background: var(--bg-surface);
    border: 1px solid var(--border-active);
    color: var(--text-primary); padding: 20px; overflow: hidden;
  }
  .af-hero-panel::before {
    content: ""; position: absolute; inset: 0 0 auto 0;
    height: 2px; background: var(--signal-cyan); opacity: .8;
  }
  .af-hero-panel h4 {
    margin: 0 0 4px; font-size: 13px;
    font-family: 'JetBrains Mono', monospace; font-weight: 700;
    color: var(--text-primary);
  }
  .af-hero-panel h4::before { content: "> "; color: var(--signal-green); }
  .af-cursor {
    display: inline-block; width: 2px; height: 13px;
    background: var(--signal-cyan); margin-left: 2px; vertical-align: text-bottom;
    animation: af-pulse .9s ease-in-out infinite;
  }
  .af-hero-panel > p { color: var(--text-secondary); margin: 0 0 8px; font-size: 13px; }

  .af-orbit { position: absolute; inset: 76px 34px 32px 34px; }
  .af-orbit-svg {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; overflow: visible;
  }
  .af-node {
    position: absolute; border-radius: 14px;
    background: var(--bg-raised); border: 1px solid var(--border-default);
    padding: 13px; width: 176px;
    box-shadow: 0 0 0 1px var(--border-default), 0 8px 32px rgba(0,0,0,.4);
  }
  .af-node-esign { border-color: rgba(255,107,43,.35); }
  .af-node-status {
    position: absolute; right: 10px; top: 10px;
    width: 7px; height: 7px; border-radius: 999px;
    background: var(--signal-green);
    animation: af-pulse 2s ease-in-out infinite;
  }
  .af-node-status-orange { background: var(--signal-orange); }
  .af-node strong {
    display: block; font-size: 13px; margin-bottom: 5px;
    font-family: 'Space Grotesk', sans-serif; font-weight: 600;
    color: var(--text-primary);
  }
  .af-node small { color: var(--text-secondary); font-size: 11px; line-height: 1.4; }
  .af-n1 { left: 0; top: 0; }
  .af-n2 { right: 0; top: 56px; }
  .af-n3 { left: 52px; bottom: 4px; }
  .af-n4 { right: 46px; bottom: 0; }

  /* Grid & Card */
  .af-grid { display: grid; gap: 18px; }
  .af-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .af-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .af-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .af-card {
    border: 1px solid var(--border-default);
    background: var(--bg-surface); border-radius: 14px;
    box-shadow: 0 0 0 1px var(--border-default), 0 8px 32px rgba(0,0,0,.4);
    padding: 18px; min-width: 0;
  }

  /* Stat */
  .af-stat { position: relative; overflow: hidden; padding-bottom: 16px; }
  .af-stat::after {
    content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--signal-cyan), var(--signal-green));
  }
  .af-stat:nth-child(2)::after { background: linear-gradient(90deg, var(--signal-amber), var(--signal-orange)); }
  .af-stat:nth-child(3)::after { background: linear-gradient(90deg, var(--signal-violet), var(--signal-cyan)); }
  .af-stat:nth-child(4)::after { background: linear-gradient(90deg, var(--signal-green), var(--signal-cyan)); }
  .af-stat-label {
    color: var(--text-muted); font-size: 11px; margin: 0 0 10px;
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    text-transform: uppercase; letter-spacing: .08em;
    font-family: 'Space Grotesk', sans-serif; font-weight: 800;
  }
  .af-stat strong {
    font-size: 36px; letter-spacing: -.05em;
    font-family: 'JetBrains Mono', monospace; font-weight: 700;
    color: var(--text-data); display: block;
  }
  .af-stat small { display: block; color: var(--text-secondary); margin-top: 7px; font-size: 12px; }
  .af-trend {
    font-size: 11px; font-weight: 800;
    clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%);
    padding: 4px 8px; font-family: 'Space Grotesk', sans-serif;
    background: rgba(0,208,255,.12); color: var(--signal-cyan);
  }
  .af-trend-hot { background: rgba(245,158,11,.12); color: var(--signal-amber); }
  .af-trend-info { background: rgba(139,92,246,.12); color: var(--signal-violet); }

  /* Section head */
  .af-section-head {
    display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
    margin: 28px 0 15px;
  }
  .af-section-head h3 {
    font-size: 26px; letter-spacing: -.04em; margin: 0;
    font-weight: 600; color: var(--text-primary);
  }
  .af-section-head p { margin: 7px 0 0; color: var(--text-secondary); }

  /* Agent cards */
  .af-agent-card {
    position: relative; overflow: hidden; min-height: 285px;
    display: flex; flex-direction: column; gap: 16px;
  }
  .af-agent-card::before {
    content: ""; position: absolute; inset: 0 0 auto 0;
    height: 5px; background: linear-gradient(90deg, #0060A0, #00D0FF);
  }
  .af-agent-card:nth-child(2)::before { background: linear-gradient(90deg, #5B21B6, #8B5CF6); }
  .af-agent-card:nth-child(3)::before { background: linear-gradient(90deg, #065F46, #0DEB72); }
  .af-agent-top { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
  .af-agent-title { display: flex; gap: 12px; }
  .af-agent-ico {
    width: 46px; height: 46px; border-radius: 14px;
    display: grid; place-items: center;
    background: rgba(0,208,255,.08); border: 1px solid rgba(0,208,255,.25);
    color: var(--signal-cyan); font-size: 22px; flex-shrink: 0;
  }
  .af-agent-card:nth-child(2) .af-agent-ico {
    background: rgba(139,92,246,.1); border-color: rgba(139,92,246,.3); color: var(--signal-violet);
  }
  .af-agent-card:nth-child(3) .af-agent-ico {
    background: rgba(13,235,114,.08); border-color: rgba(13,235,114,.25); color: var(--signal-green);
  }
  .af-agent-title h4 {
    margin: 0; font-size: 17px; letter-spacing: -.03em;
    font-weight: 600; color: var(--text-primary);
  }
  .af-agent-title p { margin: 5px 0 0; color: var(--text-secondary); font-size: 13px; line-height: 1.4; }
  .af-status {
    font-size: 12px; font-weight: 600; color: var(--signal-green);
    white-space: nowrap; display: flex; align-items: center; gap: 5px;
  }
  .af-status::before { content: "●"; font-size: 8px; animation: af-pulse 2s ease-in-out infinite; }
  .af-status-wait { color: var(--signal-amber); }
  .af-status-draft { color: var(--signal-cyan); }
  .af-chips { display: flex; flex-wrap: wrap; gap: 7px; }
  .af-chip {
    padding: 6px 9px; border-radius: 6px;
    border: 1px solid rgba(0,208,255,.18); background: rgba(0,208,255,.06);
    color: var(--text-secondary); font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: .02em;
  }
  .af-metrics { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; margin-top: auto; }
  .af-mini {
    border-radius: 10px; background: var(--bg-void); padding: 10px;
    border: 1px solid var(--border-default); text-align: center;
  }
  .af-mini strong {
    display: block; font-size: 20px;
    font-family: 'JetBrains Mono', monospace; font-weight: 700;
    color: var(--text-data);
  }
  .af-mini span { font-size: 11px; color: var(--text-muted); }

  /* Workflow */
  .af-workflow { padding: 18px; display: grid; gap: 12px; }
  .af-flow-step {
    display: grid; grid-template-columns: 42px 1fr auto; gap: 12px; align-items: center;
    padding: 13px; border-radius: 14px;
    border: 1px solid var(--border-default); background: var(--bg-surface);
    border-left: 3px solid var(--border-default);
  }
  .af-flow-done { border-left-color: var(--signal-green); }
  .af-flow-active { border-left-color: var(--signal-orange); background: rgba(255,107,43,.04); }
  .af-step-num {
    width: 42px; height: 42px;
    clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
    background: var(--bg-raised); color: var(--text-muted);
    display: grid; place-items: center; font-weight: 900; font-size: 14px;
    font-family: 'Space Grotesk', sans-serif;
  }
  .af-flow-done .af-step-num { background: var(--signal-green); color: #050A12; }
  .af-flow-active .af-step-num { background: var(--signal-orange); color: #fff; }
  .af-flow-step h4 { margin: 0; font-size: 15px; font-weight: 600; color: var(--text-primary); }
  .af-flow-step p { margin: 3px 0 0; color: var(--text-secondary); font-size: 13px; }
  .af-time { font-size: 11px; color: var(--text-muted); white-space: nowrap; font-family: 'JetBrains Mono', monospace; }

  /* Table */
  .af-table-wrap {
    overflow: auto; border-radius: 14px;
    border: 1px solid var(--border-default); background: var(--bg-surface);
  }
  .af-table-wrap table { width: 100%; border-collapse: collapse; min-width: 760px; }
  .af-table-wrap th, .af-table-wrap td {
    text-align: left; padding: 14px 15px;
    border-bottom: 1px solid var(--border-default); font-size: 14px;
  }
  .af-table-wrap th {
    background: var(--bg-void); color: var(--text-muted);
    font-size: 10px; text-transform: uppercase; letter-spacing: .1em;
    font-family: 'Space Grotesk', sans-serif; font-weight: 800;
  }
  .af-table-wrap td { color: var(--text-primary); }
  .af-table-wrap tr:last-child td { border-bottom: 0; }
  .af-table-wrap tr:nth-child(even) td { background: rgba(0,208,255,.02); }
  .af-table-wrap tr:hover td { background: rgba(0,208,255,.04); }
  .af-school { display: flex; align-items: center; gap: 10px; }
  .af-avatar {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, rgba(0,80,120,.6), rgba(0,208,255,.2));
    display: grid; place-items: center;
    font-weight: 900; color: var(--signal-cyan);
    font-family: 'JetBrains Mono', monospace; font-size: 13px;
    border: 1px solid var(--border-default); flex-shrink: 0;
  }
  .af-score-wrap { display: flex; flex-direction: column; gap: 3px; }
  .af-score { font-weight: 700; color: var(--text-data); font-family: 'JetBrains Mono', monospace; font-size: 15px; }
  .af-score-bar { height: 3px; border-radius: 999px; background: var(--border-default); width: 48px; }
  .af-score-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--signal-cyan), var(--signal-green)); }
  .af-tag {
    display: inline-flex;
    clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%);
    padding: 5px 9px; font-size: 11px; font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }
  .af-tag-blue { background: rgba(0,208,255,.1); color: var(--signal-cyan); }
  .af-tag-orange { background: rgba(255,107,43,.12); color: var(--signal-orange); }
  .af-tag-green { background: rgba(13,235,114,.1); color: var(--signal-green); }
  .af-tag-red { background: rgba(255,60,80,.1); color: #FF3C50; }
  .af-tag-violet { background: rgba(139,92,246,.12); color: var(--signal-violet); }
  .af-link-btn {
    background: transparent; border: 0; padding: 4px 2px;
    color: var(--signal-cyan); font-size: 13px; font-weight: 600;
    text-decoration: underline; text-underline-offset: 3px;
    cursor: pointer; transition: .16s ease;
  }
  .af-link-btn:hover { opacity: .7; }

  /* Kanban */
  .af-kanban { display: grid; grid-template-columns: repeat(4, minmax(240px, 1fr)); gap: 14px; overflow: auto; padding-bottom: 4px; }
  .af-lane { border-radius: 20px; background: var(--bg-surface); border: 1px solid var(--border-default); padding: 13px; min-height: 430px; }
  .af-lane-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .af-lane-head h4 { margin: 0; font-size: 13px; font-weight: 600; color: var(--text-primary); }
  .af-count {
    background: var(--bg-void); border: 1px solid var(--border-default);
    color: var(--signal-cyan); border-radius: 999px;
    padding: 4px 8px; font-size: 12px; font-weight: 900;
    font-family: 'JetBrains Mono', monospace;
  }
  .af-candidate {
    border-radius: 8px; background: var(--bg-raised);
    border: 1px solid var(--border-default); padding: 13px; margin-bottom: 10px;
    transition: .18s ease; cursor: default;
  }
  .af-candidate:hover { border-color: var(--border-active); transform: translateY(-2px); }
  .af-candidate strong { display: block; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px; color: var(--text-primary); }
  .af-candidate p { font-size: 11px; color: var(--text-secondary); margin: 5px 0 10px; line-height: 1.45; }
  .af-cand-footer {
    display: flex; justify-content: space-between; align-items: center;
    gap: 8px; font-size: 11px; color: var(--text-muted);
    font-family: 'JetBrains Mono', monospace;
  }

  /* Timeline */
  .af-timeline { position: relative; padding-left: 22px; }
  .af-timeline::before {
    content: ""; position: absolute; left: 8px; top: 6px; bottom: 6px; width: 2px;
    background: linear-gradient(to bottom, rgba(0,208,255,.4), transparent);
  }
  .af-event {
    position: relative; margin: 0 0 14px; padding: 14px;
    border-radius: 14px; background: var(--bg-surface); border: 1px solid var(--border-default);
  }
  .af-event::before {
    content: ""; position: absolute; left: -20px; top: 18px;
    width: 12px; height: 12px; border-radius: 999px;
    background: var(--signal-cyan);
    box-shadow: 0 0 0 3px var(--bg-void), 0 0 0 5px rgba(0,208,255,.4);
  }
  .af-event h4 { margin: 0; font-size: 15px; font-weight: 600; color: var(--text-primary); }
  .af-event p { margin: 4px 0 0; color: var(--text-secondary); font-size: 13px; line-height: 1.45; }
  .af-event time {
    font-size: 12px; font-weight: 700; color: var(--signal-orange);
    font-family: 'JetBrains Mono', monospace; display: block; margin-bottom: 4px;
  }

  /* Knowledge */
  .af-knowledge { display: grid; grid-template-columns: 1fr .9fr; gap: 18px; }
  .af-doc-list { display: grid; gap: 10px; }
  .af-doc {
    display: flex; align-items: center; gap: 12px; padding: 13px;
    border-radius: 14px; border: 1px solid var(--border-default); background: var(--bg-surface);
  }
  .af-doc-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(139,92,246,.12); border: 1px solid rgba(139,92,246,.25);
    color: var(--signal-violet); display: grid; place-items: center; font-size: 16px; flex-shrink: 0;
  }
  .af-doc h4 { margin: 0; font-size: 14px; font-weight: 600; color: var(--text-primary); }
  .af-doc p { margin: 4px 0 0; color: var(--text-secondary); font-size: 12px; }
  .af-rag-box {
    border-radius: 20px; padding: 18px; background: var(--bg-surface);
    border: 1px solid rgba(139,92,246,.4); min-height: 100%; color: var(--text-primary);
  }
  .af-rag-box h4 { margin: 0 0 12px; font-weight: 600; font-size: 16px; }
  .af-rag-box h4::before { content: "[RAG] "; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--signal-violet); }
  .af-rag-blockquote {
    margin: 0 0 14px; padding: 14px 14px 14px 18px;
    border-left: 3px solid var(--signal-violet); background: rgba(139,92,246,.06);
    border-radius: 0 8px 8px 0; color: var(--text-secondary);
    font-style: italic; line-height: 1.6; font-size: 14px;
  }
  .af-source-card {
    border-radius: 8px; background: rgba(139,92,246,.08);
    border: 1px solid rgba(139,92,246,.2); padding: 13px; margin-top: 10px;
  }
  .af-source-card strong { font-weight: 600; color: var(--text-primary); font-size: 13px; }
  .af-source-card small { color: var(--text-secondary); font-size: 12px; }

  /* Toast */
  .af-toast {
    position: fixed; right: 24px; bottom: 24px; z-index: 60;
    transform: translateY(30px); opacity: 0; pointer-events: none;
    transition: .25s ease;
    background: var(--bg-raised); color: var(--text-primary);
    border-radius: 14px; padding: 14px 16px 14px 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,.5);
    max-width: 360px;
    border: 1px solid var(--border-active);
    border-left: 4px solid var(--signal-cyan);
  }
  .af-toast-show { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .af-toast strong { display: block; margin-bottom: 4px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; }
  .af-toast span { color: var(--text-secondary); font-size: 13px; }

  /* Mobile */
  .af-mobile-bar {
    display: none; position: sticky; top: 0; z-index: 30;
    padding: 12px 14px; background: var(--bg-surface);
    border-bottom: 1px solid var(--border-default);
    align-items: center; justify-content: space-between;
  }
  .af-hamb {
    border: 0; background: var(--signal-cyan); color: var(--bg-void);
    border-radius: 10px; padding: 9px 12px; font-weight: 700; cursor: pointer;
  }

  /* Keyframes */
  @keyframes af-pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes af-scanLine {
    0%{top:-1px;opacity:0} 10%{opacity:1} 90%{opacity:.6} 100%{top:calc(100% + 1px);opacity:0}
  }
  @keyframes af-signalFlow1 { 0%{stroke-dashoffset:360} 100%{stroke-dashoffset:0} }
  @keyframes af-signalFlow2 { 0%{stroke-dashoffset:280} 100%{stroke-dashoffset:0} }
  @keyframes af-signalFlow3 { 0%{stroke-dashoffset:220} 100%{stroke-dashoffset:0} }

  @media (prefers-reduced-motion: reduce) {
    .af * { animation: none !important; transition-duration: 100ms !important; }
  }
  @media (max-width: 1180px) {
    .af-hero { grid-template-columns: 1fr; }
    .af-cols-4 { grid-template-columns: repeat(2,1fr); }
    .af-cols-3 { grid-template-columns: 1fr; }
    .af-knowledge { grid-template-columns: 1fr; }
    .af-hero-panel { min-height: 330px; }
  }
  @media (max-width: 900px) {
    .af-app { display: block; }
    .af-mobile-bar { display: flex; }
    .af-sidebar {
      position: fixed; left: 14px; top: 68px; height: auto;
      max-height: calc(100vh - 88px);
      width: min(310px, calc(100vw - 28px));
      border: 1px solid var(--border-active); border-radius: 20px;
      box-shadow: 0 24px 70px rgba(0,0,0,.5);
      transform: translateX(-120%); transition: .22s ease;
    }
    .af-sidebar::after { display: none; }
    .af-sidebar-open { transform: translateX(0); }
    .af-main { padding: 18px 14px 34px; }
    .af-topbar { align-items: flex-start; flex-direction: column; }
    .af-actions { justify-content: flex-start; }
    .af-hero { padding: 18px; }
    .af-hero h3 { font-size: 34px; }
    .af-cols-4, .af-cols-2 { grid-template-columns: 1fr; }
    .af-searchbar { flex-direction: column; align-items: stretch; }
    .af-searchbar input { width: 100%; }
    .af-searchbar button { width: 100%; }
    .af-orbit { inset: 76px 14px 24px; }
    .af-orbit-svg { display: none; }
    .af-node { position: relative !important; left: auto !important; right: auto !important; top: auto !important; bottom: auto !important; width: 100%; margin-bottom: 10px; }
    .af-hero-panel { min-height: auto; }
    .af-orbit { position: relative; inset: auto; margin-top: 18px; }
    .af-kanban { grid-template-columns: repeat(4, 280px); }
  }
`;

const data = {
  agents: [
    {
      icon: "✉",
      name: "Outreach Agent",
      desc: "Quét lịch học/thi của các trường, gợi ý thời điểm vàng và soạn mail workshop.",
      status: "Đang đề xuất",
      statusClass: "",
      chips: [
        "School calendar",
        "Email template",
        "Approval flow",
      ],
      metrics: [
        ["7", "trường nóng"],
        ["12", "workshop"],
        ["83%", "fit score"],
      ],
    },
    {
      icon: "◌",
      name: "Screening & Concierge Agent",
      desc: "Tiếp nhận form, tự phân loại CV, tư vấn lộ trình bằng dữ liệu chuẩn MaivenPoint.",
      status: "Đang tư vấn",
      statusClass: "af-status-draft",
      chips: ["CV scoring", "ReAct loop", "RAG guardrail"],
      metrics: [
        ["186", "CV"],
        ["44", "cần gọi"],
        ["0", "claim sai"],
      ],
    },
    {
      icon: "☑",
      name: "Interview & Onboarding Agent",
      desc: "Tìm lịch trống, gửi kết quả, tạo thỏa thuận đào tạo và kích hoạt ký điện tử.",
      status: "Chờ slot",
      statusClass: "af-status-wait",
      chips: ["Calendar match", "Result email", "e-Sign"],
      metrics: [
        ["28", "lịch PV"],
        ["11", "slot trống"],
        ["9", "hợp đồng"],
      ],
    },
  ],
  workflow: [
    [
      "done",
      "Quét lịch học/thi",
      "Đã đọc lịch thi và kỳ nghỉ từ danh sách trường mục tiêu.",
      "08:15",
    ],
    [
      "done",
      "Gợi ý thời điểm vàng",
      "Ưu tiên sau thi 3-7 ngày, tránh tuần nhập điểm và lễ.",
      "08:30",
    ],
    [
      "active",
      "Chờ Hiệu trưởng duyệt",
      "3 workshop có điểm phù hợp trên 90 đang chờ duyệt.",
      "09:05",
    ],
    [
      "wait",
      "Gửi mail đặt lịch",
      "Sẽ gửi sau khi lịch được duyệt trong dashboard.",
      "Sắp chạy",
    ],
    [
      "wait",
      "Tư vấn & phân loại CV",
      "Form mới được đưa vào board sàng lọc.",
      "Liên tục",
    ],
    [
      "wait",
      "Phỏng vấn & ký điện tử",
      "Tự động kích hoạt khi ứng viên đồng ý.",
      "Theo lịch",
    ],
  ],
  schools: [
    [
      "ĐH Công nghệ Sài Gòn",
      "Thi cuối kỳ: 12–18/06",
      "22/06, 09:00",
      "94",
      "Chờ duyệt",
      "orange",
    ],
    [
      "FPT Polytechnic",
      "Bảo vệ dự án: 15–19/06",
      "24/06, 14:00",
      "91",
      "Có thể gửi mail",
      "green",
    ],
    [
      "ĐH Kinh tế TP.HCM",
      "Thi tập trung: 20–27/06",
      "02/07, 09:30",
      "88",
      "Cần xác minh",
      "blue",
    ],
    [
      "ĐH Văn Lang",
      "Tuần sinh hoạt CLB: 25–29/06",
      "28/06, 15:00",
      "85",
      "Đang trao đổi",
      "violet",
    ],
    [
      "ĐH Mở TP.HCM",
      "Thi online: 10–16/06",
      "21/06, 10:00",
      "82",
      "Chờ duyệt",
      "orange",
    ],
    [
      "ĐH Nguyễn Tất Thành",
      "Thi kết thúc môn: 18–24/06",
      "29/06, 08:30",
      "79",
      "Theo dõi",
      "blue",
    ],
  ],
  candidates: {
    "Form mới": [
      [
        "Minh Anh",
        "Data Analyst intern · GPA 3.4",
        "CV mới gửi 18 phút trước",
        "Mới",
      ],
      [
        "Hoàng Nam",
        "Business major · quan tâm workshop",
        "Cần xác minh số điện thoại",
        "Mới",
      ],
    ],
    "Ưu tiên cao": [
      [
        "Thanh Trúc",
        "Portfolio tốt · IELTS 6.5",
        "Phù hợp lộ trình chuyên sâu",
        "92 điểm",
      ],
      [
        "Quốc Bảo",
        "Backend intern · đã có project",
        "Nên tư vấn gói tăng tốc",
        "89 điểm",
      ],
    ],
    "Cần tư vấn": [
      [
        "Gia Hân",
        "Chưa rõ mục tiêu nghề nghiệp",
        "Agent đề xuất gọi 7 phút",
        "Cần gọi",
      ],
      [
        "Tuấn Kiệt",
        "Hỏi kỹ về cam kết đầu ra",
        "Dùng nguồn FAQ cam kết",
        "RAG",
      ],
    ],
    "Đã đặt phỏng vấn": [
      [
        "Mai Phương",
        "Đồng ý lịch 25/06",
        "Chuyên gia: Mr. Daniel",
        "09:30",
      ],
      [
        "Đức Huy",
        "Chờ xác nhận email",
        "Hiệu trưởng còn slot 14:00",
        "Tạm giữ",
      ],
    ],
  },
  interviews: [
    [
      "25/06 · 09:30",
      "Mai Phương · Phỏng vấn đầu vào",
      "Hiệu trưởng rảnh, Mr. Daniel rảnh 09:00–11:00.",
    ],
    [
      "25/06 · 14:00",
      "Đức Huy · Chờ xác nhận",
      "Slot được giữ 6 giờ, tự nhắc lại nếu chưa phản hồi.",
    ],
    [
      "26/06 · 10:30",
      "Thanh Trúc · Đề xuất lịch",
      "Phù hợp với lịch chuyên gia nước ngoài và tư vấn viên.",
    ],
    [
      "27/06 · 15:00",
      "Quốc Bảo · Technical check",
      "Chuẩn bị gửi rubric phỏng vấn trước 24 giờ.",
    ],
  ],
  onboarding: [
    [
      "done",
      "Gửi mail kết quả",
      "Ứng viên đạt được nhận email cá nhân hóa.",
      "Tự động",
    ],
    [
      "active",
      "Thỏa thuận đào tạo",
      "Mẫu thỏa thuận được điền mock data.",
      "Chờ OK",
    ],
    [
      "wait",
      "Ký hợp đồng điện tử",
      "Kích hoạt sau khi ứng viên đồng ý điều khoản.",
      "Sẵn sàng",
    ],
    [
      "wait",
      "Tạo checklist nhập học",
      "Gửi tài liệu chuẩn bị và lịch khai giảng.",
      "Kế tiếp",
    ],
  ],
  docs: [
    [
      "Chính sách khóa học v2.4",
      "Nguồn chính cho học phí, điều kiện cam kết, cấu trúc lộ trình.",
    ],
    [
      "FAQ cam kết đầu ra",
      "Các câu trả lời đã duyệt để tránh tư vấn quá mức.",
    ],
    [
      "Bộ mail workshop",
      "Template mời trường, xác nhận lịch và nhắc tham dự.",
    ],
    [
      "Rubric phỏng vấn",
      "Tiêu chí đánh giá đầu vào và gợi ý nhánh tư vấn.",
    ],
    [
      "Quy trình e-Sign",
      "Các bước kích hoạt ký điện tử và nhắc hoàn tất.",
    ],
  ],
};

const sections = [
  "overview",
  "outreach",
  "screening",
  "interview",
  "knowledge",
] as const;
type Section = (typeof sections)[number];

const navItems: { id: Section; icon: string; label: string }[] =
  [
    { id: "overview", icon: "⌂", label: "Tổng quan" },
    {
      id: "outreach",
      icon: "✉",
      label: "Đối ngoại & Thu hút",
    },
    { id: "screening", icon: "◌", label: "Sàng lọc & Tư vấn" },
    {
      id: "interview",
      icon: "☑",
      label: "Phỏng vấn & Onboarding",
    },
    { id: "knowledge", icon: "▤", label: "Kho dữ liệu RAG" },
  ];

function tagClass(color: string) {
  return `af-tag af-tag-${color}`;
}

function flowClass(state: string) {
  if (state === "done") return "af-flow-step af-flow-done";
  if (state === "active") return "af-flow-step af-flow-active";
  return "af-flow-step";
}

export default function App() {
  const [section, setSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{
    title: string;
    msg: string;
    show: boolean;
  }>({ title: "", msg: "", show: false });
  const [searchQuery, setSearchQuery] = useState("");

  function showToast(title: string, msg: string) {
    setToast({ title, msg, show: true });
    setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      3200,
    );
  }

  function switchSection(id: Section) {
    setSection(id);
    setSidebarOpen(false);
  }

  function handleSearch() {
    if (searchQuery.trim()) {
      showToast(
        `Tìm thấy kết quả cho "${searchQuery}"`,
        "Đây là tìm kiếm giả lập trên mock data, không gọi backend.",
      );
    } else {
      showToast(
        "Nhập từ khóa để tìm",
        "Ví dụ: Văn Lang, Thanh Trúc, workshop.",
      );
    }
  }

  return (
    <div className="af">
      <style>{CSS}</style>

      {/* Mobile bar */}
      <div className="af-mobile-bar">
        <div
          className="af-brand"
          style={{ border: 0, padding: 0 }}
        >
          <div className="af-brand-mark">M</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 18 }}>
              AgentFlow
            </h1>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: 12,
                color: "var(--text-muted)",
              }}
            >
              Frontend mock data
            </p>
          </div>
        </div>
        <button
          className="af-hamb"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      <div className="af-app">
        {/* Sidebar */}
        <aside
          className={`af-sidebar${sidebarOpen ? " af-sidebar-open" : ""}`}
        >
          <div className="af-brand">
            <div className="af-brand-mark">M</div>
            <div>
              <h1>MaivenPoint</h1>
              <p>AgentFlow Dashboard</p>
            </div>
          </div>
          <nav className="af-nav">
            {navItems.map((n) => (
              <button
                key={n.id}
                className={section === n.id ? "af-active" : ""}
                onClick={() => switchSection(n.id)}
              >
                <span className="af-ico">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="af-side-card">
            <strong>Tuần tuyển sinh</strong>
            <p>
              Đang mở 3 đợt workshop. Ưu tiên trường có lịch thi
              kết thúc trong 10 ngày tới.
            </p>
            <button
              className="af-small-btn"
              onClick={() =>
                showToast(
                  "Đã duyệt chiến dịch",
                  "3 workshop có điểm phù hợp cao được chuyển sang bước soạn mail.",
                )
              }
            >
              Duyệt đề xuất
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="af-main">
          {/* Topbar */}
          <div className="af-topbar">
            <div>
              <p className="af-eyebrow">
                Frontend mockup · không backend
              </p>
              <h2>
                Hệ thống Multi Agent & Workflow Automation
              </h2>
              <p>
                Giao diện vận hành tuyển sinh workshop: đối
                ngoại, sàng lọc CV, tư vấn, đặt lịch phỏng vấn
                và onboarding.
              </p>
            </div>
            <div className="af-actions">
              <span className="af-pill">
                Demo data đang chạy
              </span>
              <button
                className="af-btn-ghost"
                onClick={() =>
                  showToast(
                    "Làm mới demo",
                    "Toàn bộ số liệu đang dùng mock data trong file index.html.",
                  )
                }
              >
                Làm mới demo
              </button>
              <button
                className="af-btn-primary"
                onClick={() => {
                  switchSection("outreach");
                  showToast(
                    "Mail mẫu đã sẵn sàng",
                    'Chọn một trường và bấm "Soạn mail" để mô phỏng gửi lịch workshop.',
                  );
                }}
              >
                Gửi mail mẫu
              </button>
            </div>
          </div>

          {/* Hero */}
          <section className="af-hero">
            <div className="af-hero-copy">
              <div className="af-badge-row">
                <span className="af-badge">
                  3 Agent vận hành
                </span>
                <span className="af-badge af-badge-warn">
                  7 trường cần chốt lịch
                </span>
                <span className="af-badge af-badge-good">
                  RAG kiểm soát thông tin
                </span>
              </div>
              <h3>
                Từ lịch học của trường đến hợp đồng điện tử,{" "}
                <span>tất cả nằm trong một màn hình.</span>
              </h3>
              <p>
                Mockup này tập trung vào trải nghiệm của đội
                tuyển sinh và Hiệu trưởng: đề xuất thời điểm
                vàng, phân loại ứng viên, tư vấn theo dữ liệu
                chuẩn và điều phối phỏng vấn nhanh.
              </p>
              <div className="af-searchbar">
                <span
                  style={{
                    color: "var(--text-muted)",
                    padding: "0 4px",
                  }}
                >
                  ⌕
                </span>
                <input
                  placeholder="Tìm trường, ứng viên, workshop..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSearch()
                  }
                />
                <button onClick={handleSearch}>
                  Tìm nhanh
                </button>
              </div>
            </div>
            <div className="af-hero-panel">
              <h4>
                Workflow đang chạy
                <span className="af-cursor" />
              </h4>
              <p>
                Luồng demo được mô phỏng bằng dữ liệu tĩnh trong
                trình duyệt.
              </p>
              <div className="af-orbit">
                <svg
                  className="af-orbit-svg"
                  viewBox="0 0 400 200"
                  preserveAspectRatio="none"
                >
                  {/* Track lines */}
                  <path
                    d="M 88,30 C 180,30 220,86 312,86"
                    stroke="rgba(0,208,255,0.2)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 312,86 C 240,120 200,155 140,175"
                    stroke="rgba(0,208,255,0.2)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 140,175 C 185,178 220,183 266,185"
                    stroke="rgba(0,208,255,0.2)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Animated signals */}
                  <path
                    d="M 88,30 C 180,30 220,86 312,86"
                    stroke="#00D0FF"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 360"
                    strokeDashoffset="360"
                    style={{
                      animation:
                        "af-signalFlow1 2.2s linear infinite",
                    }}
                  />
                  <path
                    d="M 312,86 C 240,120 200,155 140,175"
                    stroke="#00D0FF"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 280"
                    strokeDashoffset="280"
                    style={{
                      animation:
                        "af-signalFlow2 3.1s linear infinite",
                      animationDelay: ".7s",
                    }}
                  />
                  <path
                    d="M 140,175 C 185,178 220,183 266,185"
                    stroke="#FF6B2B"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 220"
                    strokeDashoffset="220"
                    style={{
                      animation:
                        "af-signalFlow3 1.8s linear infinite",
                      animationDelay: "1.4s",
                    }}
                  />
                </svg>
                <div className="af-node af-n1">
                  <div className="af-node-status" />
                  <strong>Outreach</strong>
                  <small>
                    Quét lịch trường, đề xuất workshop
                  </small>
                </div>
                <div className="af-node af-n2">
                  <div className="af-node-status" />
                  <strong>Concierge</strong>
                  <small>
                    Tư vấn lộ trình, giải thích cam kết
                  </small>
                </div>
                <div className="af-node af-n3">
                  <div className="af-node-status" />
                  <strong>Interview</strong>
                  <small>
                    Ghép lịch Hiệu trưởng và chuyên gia
                  </small>
                </div>
                <div className="af-node af-n4 af-node-esign">
                  <div className="af-node-status af-node-status-orange" />
                  <strong>e-Sign</strong>
                  <small>
                    Kích hoạt ký hợp đồng khi ứng viên đồng ý
                  </small>
                </div>
              </div>
            </div>
          </section>

          {/* ── Section: Overview ── */}
          {section === "overview" && (
            <section>
              <div className="af-grid af-cols-4">
                <article className="af-card af-stat">
                  <p className="af-stat-label">
                    Workshop đề xuất{" "}
                    <span className="af-trend af-trend-hot">
                      +3 mới
                    </span>
                  </p>
                  <strong>12</strong>
                  <small>
                    5 lịch đang chờ Hiệu trưởng duyệt
                  </small>
                </article>
                <article className="af-card af-stat">
                  <p className="af-stat-label">
                    CV đã phân loại{" "}
                    <span className="af-trend">+24%</span>
                  </p>
                  <strong>186</strong>
                  <small>63 hồ sơ đạt mức ưu tiên cao</small>
                </article>
                <article className="af-card af-stat">
                  <p className="af-stat-label">
                    Lịch phỏng vấn{" "}
                    <span className="af-trend af-trend-info">
                      tuần này
                    </span>
                  </p>
                  <strong>28</strong>
                  <small>
                    11 slot còn trống với chuyên gia
                  </small>
                </article>
                <article className="af-card af-stat">
                  <p className="af-stat-label">
                    Tỉ lệ phản hồi{" "}
                    <span className="af-trend">ổn định</span>
                  </p>
                  <strong>71%</strong>
                  <small>Email + Zalo + gọi điện mock</small>
                </article>
              </div>

              <div className="af-section-head">
                <div>
                  <h3>Ba agent chính</h3>
                  <p>
                    Mỗi agent có nhiệm vụ rõ ràng, không cần
                    backend trong bản demo.
                  </p>
                </div>
                <button
                  className="af-btn-secondary"
                  onClick={() =>
                    showToast(
                      "Mô phỏng workflow",
                      "Luồng đối ngoại → sàng lọc → phỏng vấn → e-Sign đã được kích hoạt trên UI.",
                    )
                  }
                >
                  Chạy mô phỏng
                </button>
              </div>
              <div className="af-grid af-cols-3">
                {data.agents.map((a, i) => (
                  <article
                    key={i}
                    className="af-card af-agent-card"
                  >
                    <div className="af-agent-top">
                      <div className="af-agent-title">
                        <div className="af-agent-ico">
                          {a.icon}
                        </div>
                        <div>
                          <h4>{a.name}</h4>
                          <p>{a.desc}</p>
                        </div>
                      </div>
                      <span
                        className={`af-status ${a.statusClass}`}
                      >
                        {a.status}
                      </span>
                    </div>
                    <div className="af-chips">
                      {a.chips.map((c, j) => (
                        <span key={j} className="af-chip">
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="af-metrics">
                      {a.metrics.map((m, j) => (
                        <div key={j} className="af-mini">
                          <strong>{m[0]}</strong>
                          <span>{m[1]}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="af-section-head">
                <div>
                  <h3>Dòng công việc hôm nay</h3>
                  <p>
                    Các bước từ quét lịch, gửi mail đến
                    onboarding.
                  </p>
                </div>
              </div>
              <div className="af-card af-workflow">
                {data.workflow.map((w, i) => (
                  <div key={i} className={flowClass(w[0])}>
                    <div className="af-step-num">{i + 1}</div>
                    <div>
                      <h4>{w[1]}</h4>
                      <p>{w[2]}</p>
                    </div>
                    <span className="af-time">{w[3]}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Section: Outreach ── */}
          {section === "outreach" && (
            <section>
              <div className="af-section-head">
                <div>
                  <h3>Đối ngoại & Thu hút</h3>
                  <p>
                    Outreach Agent quét lịch học/thi của các
                    trường và gợi ý thời điểm vàng.
                  </p>
                </div>
                <button
                  className="af-btn-primary"
                  onClick={() =>
                    showToast(
                      "Đã duyệt 3 lịch tốt nhất",
                      "Outreach Agent sẽ mô phỏng gửi email mời workshop.",
                    )
                  }
                >
                  Duyệt 3 lịch tốt nhất
                </button>
              </div>
              <div className="af-card af-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Trường</th>
                      <th>Lịch thi</th>
                      <th>Thời điểm vàng</th>
                      <th>Điểm phù hợp</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.schools.map((s, i) => (
                      <tr key={i}>
                        <td>
                          <div className="af-school">
                            <div className="af-avatar">
                              {s[0].split(" ").slice(-1)[0][0]}
                            </div>
                            <strong>{s[0]}</strong>
                          </div>
                        </td>
                        <td
                          style={{
                            color: "var(--text-secondary)",
                          }}
                        >
                          {s[1]}
                        </td>
                        <td
                          style={{
                            color: "var(--text-secondary)",
                          }}
                        >
                          {s[2]}
                        </td>
                        <td>
                          <div className="af-score-wrap">
                            <span className="af-score">
                              {s[3]}/100
                            </span>
                            <div className="af-score-bar">
                              <div
                                className="af-score-fill"
                                style={{ width: `${s[3]}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={tagClass(s[5])}>
                            {s[4]}
                          </span>
                        </td>
                        <td>
                          <button
                            className="af-link-btn"
                            onClick={() =>
                              showToast(
                                `Đã soạn mail cho ${s[0]}`,
                                "Mail đặt lịch workshop đã được tạo bằng mock data.",
                              )
                            }
                          >
                            Soạn mail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Section: Screening ── */}
          {section === "screening" && (
            <section>
              <div className="af-section-head">
                <div>
                  <h3>Sàng lọc & Tư vấn</h3>
                  <p>
                    Concierge Agent tiếp nhận form, phân loại CV
                    và tư vấn bằng dữ liệu chuẩn MaivenPoint.
                  </p>
                </div>
                <button
                  className="af-btn-secondary"
                  onClick={() =>
                    showToast(
                      "Phân loại CV mock",
                      "Ứng viên được chia theo 4 cột: form mới, ưu tiên cao, cần tư vấn, đã đặt phỏng vấn.",
                    )
                  }
                >
                  Phân loại mock
                </button>
              </div>
              <div className="af-kanban">
                {Object.entries(data.candidates).map(
                  ([lane, cards]) => (
                    <div key={lane} className="af-lane">
                      <div className="af-lane-head">
                        <h4>{lane}</h4>
                        <span className="af-count">
                          {cards.length}
                        </span>
                      </div>
                      {cards.map((c, i) => (
                        <div key={i} className="af-candidate">
                          <strong>{c[0]}</strong>
                          <p>{c[1]}</p>
                          <div className="af-cand-footer">
                            <span>{c[2]}</span>
                            <b
                              style={{
                                color: "var(--signal-cyan)",
                              }}
                            >
                              {c[3]}
                            </b>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                )}
              </div>
            </section>
          )}

          {/* ── Section: Interview ── */}
          {section === "interview" && (
            <section>
              <div className="af-section-head">
                <div>
                  <h3>Phỏng vấn & Onboarding</h3>
                  <p>
                    Tự động kiểm tra lịch trống của Hiệu trưởng
                    và chuyên gia nước ngoài để xếp phỏng vấn.
                  </p>
                </div>
                <button
                  className="af-btn-primary"
                  onClick={() =>
                    showToast(
                      "Đặt slot đẹp nhất",
                      "Slot 25/06 lúc 09:30 được chọn vì trùng lịch rảnh của Hiệu trưởng và chuyên gia.",
                    )
                  }
                >
                  Đặt slot đẹp nhất
                </button>
              </div>
              <div className="af-grid af-cols-2">
                <div className="af-card">
                  <h3
                    style={{
                      margin: "0 0 14px",
                      letterSpacing: "-.03em",
                    }}
                  >
                    Lịch đề xuất
                  </h3>
                  <div className="af-timeline">
                    {data.interviews.map((e, i) => (
                      <div key={i} className="af-event">
                        <time>{e[0]}</time>
                        <h4>{e[1]}</h4>
                        <p>{e[2]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="af-card">
                  <h3
                    style={{
                      margin: "0 0 14px",
                      letterSpacing: "-.03em",
                    }}
                  >
                    Trạng thái onboarding
                  </h3>
                  <div className="af-workflow">
                    {data.onboarding.map((w, i) => (
                      <div key={i} className={flowClass(w[0])}>
                        <div className="af-step-num">
                          {i + 1}
                        </div>
                        <div>
                          <h4>{w[1]}</h4>
                          <p>{w[2]}</p>
                        </div>
                        <span className="af-time">{w[3]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Section: Knowledge ── */}
          {section === "knowledge" && (
            <section>
              <div className="af-section-head">
                <div>
                  <h3>Kho dữ liệu RAG</h3>
                  <p>
                    Mock nguồn dữ liệu để agent tư vấn đúng tài
                    liệu, hạn chế bịa thông tin.
                  </p>
                </div>
                <button
                  className="af-btn-ghost"
                  onClick={() =>
                    showToast(
                      "Nguồn RAG hợp lệ",
                      "Các câu trả lời tư vấn sẽ ưu tiên 5 tài liệu chuẩn trong kho dữ liệu.",
                    )
                  }
                >
                  Kiểm tra nguồn
                </button>
              </div>
              <div className="af-knowledge">
                <div className="af-card">
                  <h3
                    style={{
                      margin: "0 0 14px",
                      letterSpacing: "-.03em",
                    }}
                  >
                    Tài liệu chuẩn
                  </h3>
                  <div className="af-doc-list">
                    {data.docs.map((d, i) => (
                      <div key={i} className="af-doc">
                        <div className="af-doc-icon">▤</div>
                        <div>
                          <h4>{d[0]}</h4>
                          <p>{d[1]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="af-rag-box">
                  <h4>Câu trả lời mẫu của Concierge Agent</h4>
                  <blockquote className="af-rag-blockquote">
                    "Dựa trên tài liệu chương trình hiện tại, lộ
                    trình gồm 3 giai đoạn: nền tảng kỹ năng,
                    thực chiến dự án và chuẩn bị phỏng vấn. Cam
                    kết đầu ra chỉ được tư vấn theo đúng điều
                    kiện trong tài liệu đã duyệt."
                  </blockquote>
                  <div className="af-source-card">
                    <strong>Nguồn trích xuất</strong>
                    <br />
                    <small>
                      Chính sách khóa học v2.4 · FAQ cam kết đầu
                      ra · Bộ mail tư vấn
                    </small>
                  </div>
                  <div className="af-source-card">
                    <strong>Cơ chế an toàn</strong>
                    <br />
                    <small>
                      Nếu không tìm thấy dữ liệu trong kho RAG,
                      agent sẽ chuyển câu hỏi cho tư vấn viên
                      thay vì tự suy đoán.
                    </small>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Toast */}
      <div
        className={`af-toast${toast.show ? " af-toast-show" : ""}`}
      >
        <strong>{toast.title}</strong>
        <span>{toast.msg}</span>
      </div>
    </div>
  );
}