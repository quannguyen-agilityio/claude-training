// Drive headless Chrome over CDP and screenshot practice-one pages.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = process.argv[2];
const BASE = 'http://localhost:3000';
const BOOK = '54a7e10e-f3f7-48b7-85a4-92b6363ad7aa';
mkdirSync(OUT, { recursive: true });

const chrome = spawn('google-chrome', [
  '--headless=new', '--remote-debugging-port=9333', '--no-first-run', '--no-default-browser-check',
  `--user-data-dir=${OUT}/profile`, 'about:blank',
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try { targets = await (await fetch('http://127.0.0.1:9333/json')).json(); break; } catch { await sleep(200); }
}
const page = targets.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = expr => send('Runtime.evaluate', { expression: expr, awaitPromise: true });

const viewport = (width, height, mobile = false) =>
  send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
const go = async url => { await send('Page.navigate', { url }); await sleep(2500); };
const shot = async name => {
  const { result } = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(result.data, 'base64'));
  console.log('saved', name);
};
const theme = async t => { await evaluate(`localStorage.setItem('theme','${t}')`); };
const clickBtnWithIcon = icon => evaluate(`document.querySelector('img[src*="${icon}"]').closest('button').click()`);
const clickText = txt => evaluate(`[...document.querySelectorAll('button')].find(b => b.textContent.trim() === '${txt}').click()`);

await send('Page.enable');
await send('Runtime.enable');

for (const t of ['light', 'dark']) {
  await viewport(1440, 900);
  await go(BASE); await theme(t); await go(BASE);
  await shot(`01-home-grid-${t}`);
  await clickText('Filter'); await sleep(400);
  await shot(`02-home-filter-popover-${t}`);
  await clickBtnWithIcon('list.svg'); await sleep(400);
  await clickText('Filter'); await sleep(400);
  await shot(`03-home-list-${t}`);
  await go(`${BASE}/${BOOK}`);
  await shot(`04-detail-${t}`);
  await clickBtnWithIcon('delete.svg'); await sleep(400);
  await shot(`05-delete-modal-${t}`);
  await go(`${BASE}/add-new-book`);
  await shot(`06-add-form-${t}`);
}

await viewport(390, 844, true);
await theme('light');
await go(BASE);
await shot('07-mobile-home');
await clickBtnWithIcon('hamburger-menu.svg'); await sleep(400);
await shot('08-mobile-categories');
await go(`${BASE}/${BOOK}`);
await shot('09-mobile-detail');
await clickBtnWithIcon('delete.svg'); await sleep(400);
await shot('10-mobile-delete-modal');

ws.close();
chrome.kill();
process.exit(0);
