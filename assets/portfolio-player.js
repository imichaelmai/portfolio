(() => {
  if (document.getElementById('portfolio-music-player')) return;
  const base = new URL('../', document.currentScript.src);
  const tracks = [
    {title: 'Freeway Shooting', file: 'assets/audio/freeway-shooting.mp3'},
    {title: 'Tripp', file: 'assets/audio/tripp.mp3'}
  ];
  const key = 'michael-portfolio-player-v1';
  let saved = {};
  try { saved = JSON.parse(sessionStorage.getItem(key) || '{}'); } catch (_) {}
  let index = Number.isInteger(saved.index) && saved.index >= 0 && saved.index < tracks.length ? saved.index : 0;
  let lastSaved = 0;
  const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = new URL('assets/portfolio-player.css', base); document.head.append(css);
  const player = document.createElement('aside');
  player.id = 'portfolio-music-player'; player.setAttribute('aria-label', 'Michael Mai music player');
  player.innerHTML = `<div class="pm-heading"><a class="pm-library" href="${new URL('music.html',base)}">MICHAEL MAI / MUSIC ↗</a><label for="pm-track">Track</label><select id="pm-track" aria-label="Choose a track"></select></div><div class="pm-controls"><button type="button" id="pm-prev" aria-label="Previous track">‹</button><audio controls preload="metadata" aria-label="Music playback controls"></audio><button type="button" id="pm-next" aria-label="Next track">›</button></div><p id="pm-status" role="status" aria-live="polite">Press play to listen.</p>`;
  const select = player.querySelector('select'), audio = player.querySelector('audio'), status = player.querySelector('#pm-status');
  tracks.forEach((t,i)=>select.add(new Option(t.title,String(i))));
  audio.volume = Number.isFinite(saved.volume) ? Math.max(0,Math.min(1,saved.volume)) : .7;
  audio.muted = saved.muted === true;
  document.body.append(player);
  const reserve = () => document.documentElement.style.setProperty('--pm-height', `${Math.ceil(player.getBoundingClientRect().height)}px`);
  new ResizeObserver(reserve).observe(player); reserve();
  function save() { try { sessionStorage.setItem(key,JSON.stringify({index,time:audio.currentTime||0,playing:!audio.paused&&!audio.ended,volume:audio.volume,muted:audio.muted})); } catch (_) {} }
  async function play() { try {await audio.play();} catch (_) {status.textContent = 'Ready — press play to continue.';} }
  function load(next, shouldPlay=false, time=0) {
    index = (next + tracks.length) % tracks.length; select.value=String(index);
    audio.src = new URL(tracks[index].file,base).href;
    audio.setAttribute('aria-label',`${tracks[index].title} — playback controls`);
    status.textContent = `${tracks[index].title} · listening copy from final master`;
    audio.onloadedmetadata = () => {if(Number.isFinite(time)&&time>0)audio.currentTime=Math.min(time,Math.max(0,audio.duration-.1)); if(shouldPlay)play();};
    audio.load();
  }
  select.addEventListener('change',()=>{const wasPlaying=!audio.paused;load(Number(select.value),wasPlaying);save();});
  player.querySelector('#pm-prev').addEventListener('click',()=>load(index-1,true));
  player.querySelector('#pm-next').addEventListener('click',()=>load(index+1,true));
  audio.addEventListener('play',()=>{status.textContent=`Playing · ${tracks[index].title}`;save();});
  audio.addEventListener('pause',()=>{status.textContent=`Paused · ${tracks[index].title}`;save();});
  audio.addEventListener('volumechange',save);
  audio.addEventListener('seeked',save);
  audio.addEventListener('timeupdate',()=>{if(Date.now()-lastSaved>1000){save();lastSaved=Date.now();}});
  audio.addEventListener('ended',()=>load(index+1,true));
  audio.addEventListener('error',()=>{status.textContent='Audio could not load. Try another track or refresh.';});
  window.addEventListener('pagehide',save);
  document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a)save();const button=e.target.closest('[data-music-track]');if(button){const n=Number(button.dataset.musicTrack);if(Number.isInteger(n)&&n>=0&&n<tracks.length)load(n,true);}});
  load(index,saved.playing===true,Number(saved.time)||0);
})();
