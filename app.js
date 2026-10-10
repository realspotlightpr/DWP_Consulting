const config = window.DWP_CONFIG || {};
for (const [selector, key] of [['[data-book]', 'bookingUrl'], ['[data-linkedin]', 'linkedinUrl']]) {
  if (config[key]) document.querySelectorAll(selector).forEach(a => a.href = config[key]);
}
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.querySelector('#nav').classList.toggle('open', open);
});
document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  document.querySelector('#nav').classList.remove('open');
}));
const dialog = document.querySelector('#newsletter-dialog');
document.querySelectorAll('[data-newsletter]').forEach(button => button.addEventListener('click', () => {
  if (config.newsletterUrl) window.open(config.newsletterUrl, '_blank', 'noopener');
  else dialog.showModal();
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); }});
const details = {
  wealth: 'Keep investment conversations connected to your cash flow, priorities, and wider financial plan.',
  tax: 'Give your tax strategist visibility into the decisions, timing, and life changes that matter to your plan.',
  cpa: 'Help your CPA stay connected to the wider team, with clear responsibilities and a shared understanding of next steps.',
  estate: 'Keep conversations about your legacy connected to your family priorities and the work of your estate attorney.',
  insurance: 'Connect protection reviews with changes in your family, practice, assets, and long-term priorities.'
};
document.querySelectorAll('[data-specialist]').forEach(button => {
  button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-specialist]').forEach(b => {b.classList.remove('active');b.setAttribute('aria-pressed','false');});
    button.classList.add('active'); button.setAttribute('aria-pressed','true');
    document.querySelector('#specialist-detail').textContent = details[button.dataset.specialist];
  });
});
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const video = document.querySelector('#hero-video');
const toggle = document.querySelector('#motion-toggle');
let paused = reduced.matches;
function updateMotion() {
  document.body.classList.toggle('motion-paused', paused);
  if (video) {if (paused) video.pause(); else video.play().catch(() => {});}
  if(toggle) {toggle.textContent = paused ? '▷' : 'Ⅱ'; toggle.setAttribute('aria-label',paused ? 'Play background motion' : 'Pause background motion');}
}
if(toggle) toggle.addEventListener('click',()=>{paused=!paused;updateMotion();});
reduced.addEventListener('change',()=>{paused=reduced.matches;updateMotion();});
updateMotion();
if ('IntersectionObserver' in window && !reduced.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);} }), {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});
}
const social = document.querySelector('#social-links');
if(social) (config.socialLinks || []).forEach(item=>{
  if(!/^https:\/\//.test(item.url)) return;
  const a=document.createElement('a');a.href=item.url;a.textContent=item.label+' ↗';a.target='_blank';a.rel='noopener';social.append(a);
});

const processScenes = [...document.querySelectorAll('[data-scene]')];
const processDots = [...document.querySelectorAll('[data-process]')];
const processProgress = document.querySelector('.process-progress');
function setProcess(index) {
  processScenes.forEach((scene, i) => scene.classList.toggle('active', i === index));
  processDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.setAttribute('aria-current', i === index ? 'step' : 'false');
  });
  if (processProgress) {
    const value = ((index + 1) / Math.max(processScenes.length, 1)) * 100;
    if (matchMedia('(max-width: 720px)').matches) processProgress.style.width = `${value}%`;
    else processProgress.style.height = `${value}%`;
  }
}
processDots.forEach((dot, index) => dot.addEventListener('click', () => {
  processScenes[index]?.scrollIntoView({behavior: reduced.matches ? 'auto' : 'smooth', block: 'center'});
  setProcess(index);
}));
if (processScenes.length && 'IntersectionObserver' in window) {
  const processObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setProcess(Number(visible.target.dataset.scene));
  }, {rootMargin: '-32% 0px -32%', threshold: [0.15, 0.45, 0.75]});
  processScenes.forEach(scene => processObserver.observe(scene));
  setProcess(0);
}

const impactMeter = document.querySelector('.impact-meter');
if (impactMeter) {
  const current = Math.max(0, Number(config.verifiedTaxImpact ?? impactMeter.dataset.current));
  const goal = Math.max(1, Number(config.taxImpactGoal ?? impactMeter.dataset.goal));
  const percentage = Math.min(100, current / goal * 100);
  impactMeter.style.setProperty('--impact-progress', percentage.toFixed(2));
  const value = document.querySelector('#impact-value');
  if (value && current > 0) value.textContent = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(current);
}

const discoveryForm = document.querySelector('#discovery-form');
if (discoveryForm) discoveryForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!discoveryForm.reportValidity()) return;
  const destination = config.bookingUrl || '/';
  window.location.assign(destination);
});
