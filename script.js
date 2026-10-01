const pages = [...document.querySelectorAll(".page")];
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const music = document.getElementById("music");
const musicToggle = document.getElementById("musicToggle");
const finalVideo = document.querySelector(".final-video");
const finalPage = document.getElementById("page6");

let current = 1;
let popupTimer = null;

function goTo(number){
  if(number < 1 || number > pages.length) return;
  pages[current - 1].classList.remove("active");
  current = number;
  pages[current - 1].classList.add("active");
  window.scrollTo(0,0);
  if(number === 6) burstConfetti();
}

function showPopup(title, text, nextPage, delay=950){
  popupTitle.textContent = title;
  popupText.textContent = text;
  popup.classList.add("show");
  clearTimeout(popupTimer);
  popupTimer = setTimeout(()=>{
    popup.classList.remove("show");
    setTimeout(()=>goTo(nextPage), 180);
  }, delay);
}

function yesAndNext(next){
  showPopup("Aww... you said yes! 💚", "That made me smile.", next);
}

function finalYes(){
  showPopup("You said YES! ✨", "Okay... this just made my whole day.", 6, 1250);
}

function openFinalVideo(){
  if(!finalVideo || !finalPage) return;
  finalPage.classList.add("video-mode");
  if(!finalVideo) return;
  finalVideo.muted = false;
  finalVideo.defaultMuted = false;
  finalVideo.volume = 1;
  finalVideo.currentTime = 0;
  finalVideo.play().catch(()=>{});
  burstConfetti();
}

function moveNo(id){
  const btn = document.getElementById(id);
  const parent = btn.closest(".actions");
  if(!btn || !parent) return;

  const rect = parent.getBoundingClientRect();
  const maxX = Math.max(0, rect.width - btn.offsetWidth);
  const maxY = 34;
  const x = Math.random() * maxX - maxX/2;
  const y = (Math.random() * maxY) - maxY/2;

  btn.style.transform = `translate(${x}px, ${y}px) rotate(${(Math.random()*8)-4}deg)`;
  btn.style.transition = "transform .28s cubic-bezier(.2,.8,.2,1)";
}

["trustNo","loveNo"].forEach(id=>{
  const b = document.getElementById(id);
  if(!b) return;
  b.addEventListener("mouseenter", ()=>moveNo(id));
  b.addEventListener("touchstart", (e)=>{ e.preventDefault(); moveNo(id); }, {passive:false});
});

function restart(){
  document.querySelectorAll(".no-btn").forEach(b=>b.style.transform="");
  finalPage.classList.remove("video-mode");
  finalVideo.pause();
  finalVideo.currentTime = 0;
  goTo(1);
}

function burstConfetti(){
  const colors = ["#56e0c0","#ffd48a","#ff8c8c","#8ba7ff","#ffffff"];
  for(let i=0;i<105;i++){
    const el = document.createElement("span");
    el.className = "confetti";
    el.style.left = (Math.random()*100) + "vw";
    el.style.top = (-8 - Math.random()*12) + "vh";
    el.style.width = (5 + Math.random()*6) + "px";
    el.style.height = (9 + Math.random()*10) + "px";
    el.style.opacity = (.72 + Math.random()*.28).toFixed(2);
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.setProperty("--x", ((Math.random()-.5)*100) + "vw");
    el.style.setProperty("--r", ((Math.random()-.5)*1440) + "deg");
    el.style.animationDelay = (Math.random()*.8) + "s";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 4800);
  }
}

musicToggle.addEventListener("click", async ()=>{
  try{
    if(music.paused){
      await music.play();
      musicToggle.querySelector("span").textContent = "ON";
    }else{
      music.pause();
      musicToggle.querySelector("span").textContent = "OFF";
    }
  }catch(e){
    musicToggle.querySelector("span").textContent = "ADD MP3";
  }
});

// Soft background particles
const particleBox = document.getElementById("particles");
for(let i=0;i<85;i++){
  const p=document.createElement("i");
  p.className="particle";
  p.style.left=Math.random()*100+"%";
  p.style.top=Math.random()*100+"%";
  p.style.setProperty("--d",(2+Math.random()*5)+"s");
  p.style.animationDelay=(-Math.random()*6)+"s";
  p.style.opacity=(.18+Math.random()*.55);
  particleBox.appendChild(p);
}

for(let i=0;i<9;i++){
  const meteor = document.createElement("i");
  meteor.className = "meteor";
  meteor.style.left = (55 + Math.random()*55) + "%";
  meteor.style.top = (-15 + Math.random()*45) + "%";
  meteor.style.setProperty("--meteor-duration", (5 + Math.random()*5) + "s");
  meteor.style.animationDelay = (-Math.random()*9) + "s";
  particleBox.appendChild(meteor);
}

//Add confetti styles dynamically so the main CSS stays easy to edit
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
.confetti{
  position:fixed;z-index:30;width:9px;height:14px;border-radius:2px;
  pointer-events:none;animation:confettiFly 4s cubic-bezier(.16,.72,.24,1) forwards;
}
@keyframes confettiFly{
  to{transform:translate(var(--x),${105+Math.random()*25}vh) rotate(var(--r));opacity:0}
}`;
document.head.appendChild(confettiStyle);
