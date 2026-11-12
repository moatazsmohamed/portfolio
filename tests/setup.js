// ======================================================================
// portfolio
// Copyright (c) 2026 Moataz Mohamed <mtzm2225@gmail.com> — all rights reserved.
// Author: Moataz Mohamed  <https://github.com/moatazsmohamed>
// Fingerprint: e8fa428b72fc0e43a2632e36723784d1
// This notice is part of the work and must not be removed.
// ======================================================================
import { beforeEach, vi } from "vitest";

/* ---------------------------------------------------------------------------
 * jsdom ships a working localStorage, but it is shared between tests unless we
 * clear it. script.js also reads localStorage at module-evaluation time, so a
 * dirty store would leak state from one test file into the next.
 * ------------------------------------------------------------------------- */
beforeEach(() => {
  localStorage.clear();
});

/* ---------------------------------------------------------------------------
 * Not implemented by jsdom — script.js calls both of these.
 * `scrollBy` is needed by the certificates slider, `scrollIntoView` by search.
 * ------------------------------------------------------------------------- */
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {};
}
if (!Element.prototype.scrollBy) {
  Element.prototype.scrollBy = function scrollBy() {};
}

/* spy-able, silent no-ops for the same two APIs */
export function mockLayoutApis() {
  const scrollIntoView = vi.fn();
  const scrollBy = vi.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
  Element.prototype.scrollBy = scrollBy;
  return { scrollIntoView, scrollBy };
}

/* ---------------------------------------------------------------------------
 * script.js defines load / DOMContentLoaded / error listeners on `window`.
 * jsdom already fired DOMContentLoaded, so we fake the timers instead of
 * dispatching real events — this keeps the tests deterministic.
 * ------------------------------------------------------------------------- */
export function useFakeClock() {
  vi.useFakeTimers();
  return {
    advance: (ms) => vi.advanceTimersByTime(ms),
    restore: () => vi.useRealTimers(),
  };
}

/* Minimal markup that mirrors the ids/classes script.js looks up in index.html */
export const MINIMAL_DOM = `
 <header class="header">
    <nav class="nav-links">
      <a href="#home" class="active" data-i18n="home">Home</a>
      <a href="#about" data-i18n="about">About Me</a>
    </nav>
    <div class="search-box">
      <input type="text" class="search-input" data-i18n-placeholder="search" />
      <button class="search-btn"></button>
    </div>
    <button class="lang-btn" data-lang="ar"></button>
    <button class="lang-btn" data-lang="en"></button>
    <button class="night-mode-btn"><span></span></button>
    <button class="signin-btn"></button>
 </header>

 <div class="section-title">Portfolio</div>

 <div id="signin-modal" class="hidden" aria-hidden="true">
    <form id="signin-form">
      <input id="signin-identifier" />
      <p id="signin-message"></p>
    </form>
    <button class="signin-close"></button>
 </div>

 <button id="developer-toggle" class="hidden"></button>
 <div id="developer-panel" class="hidden" aria-hidden="true">
    <ul id="developer-list"></ul>
    <button class="developer-close"></button>
    <button class="developer-clear"></button>
 </div>

 <article class="project-card">
    <div class="preview-window"></div>
    <img class="project-preview-image" />
    <span class="project-tag"></span>
    <div class="project-info"><h3></h3><p></p></div>
    <a class="project-btn primary" href="#"></a>
    <a class="project-btn secondary" href="#"></a>
    <button class="project-btn change"></button>
    <button class="project-nav-btn prev"></button>
    <button class="project-nav-btn next"></button>
 </article>

 <ul class="certificates-list"></ul>
 <button class="scroll-left"></button>
 <button class="scroll-right"></button>

 <div id="preloader"></div>
`;
