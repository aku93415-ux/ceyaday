const btn = document.getElementById('openBtn');
const container = document.getElementById('messageContainer');
const messageText = document.getElementById('messageText');

const message = `Hari ini semua orang mungkin bakal bilang hal yang sama: semoga bahagia, semoga sehat, semoga sukses. 
Tapi ada satu hal yang nggak semua orang bisa bilang… semoga hari ini ada momen kecil yang bikin kamu senyum sendiri, salting, atau bahkan sedikit deg-degan. 
Hal-hal itu biasanya muncul dari perhatian kecil yang diam-diam, tapi bikin hati hangat lebih lama dari yang kamu kira. ❤`;

let currentIndex = 0;
let isPaused = false;

function typeMessage(text, element) {
    if (currentIndex >= text.length) return;

    // tampilkan karakter
    element.textContent += text.charAt(currentIndex);

    // Dramatis: pause di kata salting atau deg-degan
    const lastWord = element.textContent.slice(-12); // cek 12 huruf terakhir
    if (lastWord.includes('salting') || lastWord.includes('deg-degan') || lastWord.includes('❤')) {
        createHearts(); // hati muncul tepat di kata penting
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
            currentIndex++;
            typeMessage(text, element);
        }, 600); // pause 600ms
        return;
    }

    currentIndex++;
    if (!isPaused) setTimeout(() => typeMessage(text, element), 30);
}

// Tombol buka surprise
btn.addEventListener('click', () => {
    container.style.display = 'block';
    btn.style.display = 'none';
    typeMessage(message, messageText);
    createConfetti();
    createStars();
});

// Confetti sederhana
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const conf = document.createElement('div');
        conf.textContent = '🎉';
        conf.style.position = 'fixed';
        conf.style.left = Math.random() * window.innerWidth + 'px';
        conf.style.top = '-50px';
        conf.style.fontSize = Math.random() * 24 + 12 + 'px';
        conf.style.opacity = Math.random();
        conf.style.pointerEvents = 'none';
        document.body.appendChild(conf);

        let top = -50;
        const speed = 1 + Math.random() * 3;
        const fall = setInterval(() => {
            top += speed;
            conf.style.top = top + 'px';
            if (top > window.innerHeight) {
                conf.remove();
                clearInterval(fall);
            }
        }, 20);
    }
}

// Hati muncul bertahap
function createHearts() {
    for (let i = 0; i < 7; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤';
            heart.className = 'floating-heart';
            heart.style.left = 150 + Math.random() * 300 + 'px';
            heart.style.top = 180 + Math.random() * 100 + 'px';
            heart.style.fontSize = 12 + Math.random() * 20 + 'px';
            heart.style.animationDuration = 3 + Math.random() * 2 + 's';
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }, i * 200); // muncul bertahap
    }
}

// Bintang di background
function createStars() {
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.textContent = '★';
        star.className = 'star';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';
        star.style.fontSize = 5 + Math.random() * 10 + 'px';
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 8000);
    }
}