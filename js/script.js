const canvas = document.getElementById('vortex');
const ctx = canvas.getContext('2d');

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

let particles = [];

for(let i=0;i<400;i++){
    particles.push({
        angle: Math.random()*Math.PI*2,
        radius: Math.random()*window.innerWidth/2 * 1.3
    });
}

let lastScroll = window.scrollY;
let scrollVelocity = 0;

window.addEventListener('scroll', ()=>{
    let current = window.scrollY;
    scrollVelocity = current - lastScroll;
    lastScroll = current;
});

function draw(){

const autoSpeed = 0.0008;
let pulse = Math.sin(Date.now() * 0.001) * 0.2;

ctx.fillStyle = 'rgba(0,0,0,0.25)';
ctx.fillRect(0,0,canvas.width,canvas.height);

let cx = canvas.width / 2;
let cy = canvas.height / 2;

particles.forEach(p => {

    let speedFactor = scrollVelocity * 0.0002;
    p.angle += speedFactor + autoSpeed;

    p.radius *= (1 - Math.abs(scrollVelocity) * 0.00002 + pulse * 0.0005);

    if (p.radius < 5 || p.radius > canvas.width / 2 * 1.3) {
        p.radius = Math.random() * canvas.width / 2 * 1.3;
    }

    let x = cx + Math.cos(p.angle) * p.radius;
    let y = cy + Math.sin(p.angle) * p.radius;

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'cyan';
    ctx.fill();
});

scrollVelocity *= 0.95;

requestAnimationFrame(draw);
}

draw();

/* 글래스 효과 */
const card = document.getElementById('glassCard');

card.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');

    const rotateX = (y - 50) / 10;
    const rotateY = (50 - x) / 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener('mouseleave', ()=>{
    card.style.transform = 'rotateX(0) rotateY(0)';
});

/* 커서 */
const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (e)=>{
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const button = document.querySelector('.login-right button');

button.addEventListener('mousemove', (e)=>{
    const rect = button.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    button.style.setProperty('--bx', x + '%');
    button.style.setProperty('--by', y + '%');
});