const startBtn = document.getElementById("start-btn");
const countdownEl = document.getElementById("countdown");
const wrapper = document.getElementById("countdown-wrapper");
const mainContent = document.getElementById("main-content");
const audio = document.getElementById("birthday-audio");
const card = document.getElementById("birthday-card");
const nxt = document.getElementById("next-btn");
const ballonwrapper = document.getElementById("balloon-wrapper");
const confettiWrapper = document.getElementById("confetti-wrapper");
const sparkleWrapper = document.getElementById("sparkle-wrapper");
const cardSection = document.getElementById("card-wrapper");
const btnnxt = document.getElementById("next-btn1");

let isBoxOpened = false;
const box = document.getElementById("giftBox");
const lid = document.querySelector(".lid");
const giftboxcontainer = document.getElementById("giftboxcontainer");
const explosionSound = document.getElementById("explosion-sound");


const imagegallery = document.getElementById("imagegallery");




const ballonimages = [
  "b1.png",
  "b2.png",
  "b3.png",
  "b4.png",
  "b5.png",
  "b6.png",
  "b7.png",
];

let counter = 3;

function launchConfetti() {
  const colors = ["#b36eeb", "#ff66eb", "#ee4c6f", "#ffb3d9"];

  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 2 + 3 + "s";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.width = Math.random() * 8 + 4 + "px";
    confetti.style.height = confetti.style.width;

    confettiWrapper.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000);
  }
}

/* Balloons */
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon-container");

  const img = document.createElement("img");
  img.src = `images/${
    ballonimages[Math.floor(Math.random() * ballonimages.length)]
  }`;
  balloon.style.left = `${Math.random() * 100}vw`;
  balloon.style.animationDuration = `${4 + Math.random() * 4}s`;
  balloon.appendChild(img);

  ballonwrapper.appendChild(balloon);
  setTimeout(() => balloon.remove(), 10000);
}

/* Sparkles */
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.animationDuration = `${2 + Math.random() * 2}s`;

  sparkleWrapper.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 6000);
}

/* Celebration effects */
function startCelebrationEffects() {
  setInterval(createBalloon, 500);
  setInterval(launchConfetti, 1000);
  setInterval(createSparkle, 300);
}

/* ---------- COUNTDOWN ---------- */
function startCountdown() {
  wrapper.classList.remove("hidden");

  const t = setInterval(() => {
    counter--;
    countdownEl.textContent = counter;

    if (counter === 0) {
      clearInterval(t);
      wrapper.classList.add("hidden");
      mainContent.classList.remove("hidden");
      startCelebrationEffects();

      // 🔊 Play birthday music
      audio.play().catch((err) => {
        console.warn("Autoplay blocked. User interaction required.");
      });

      console.log("Countdown finished - HBD page and music started");
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden"); // hide start button
  startCountdown(); // start countdown
});

//card section

nxt.addEventListener("click", () => {
  cardContainer();
});
function cardContainer() {
  mainContent.classList.add("hidden");
  cardSection.classList.remove("hidden");
  ballonwrapper.classList.add("hidden");
  confettiWrapper.classList.add("hidden");

  setTimeout(() => {
    cardSection.classList.add("show");
  }, 50);
  setTimeout(() => {
    card.classList.add("opened");
  }, 5000);
}
// Allow user to manually flip the card by clicking
card.addEventListener("click", () => {
  card.classList.toggle("opened");
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.top = `${80 + Math.random() * 20}%`;
  heart.style.animationDuration = `${3 + Math.random() * 2}s`;
  document.querySelector(".card-inner").appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}

// Loop sparkles and hearts only when card is opened
setInterval(() => {
  if (card.classList.contains("opened")) {
    createHeart();
  }
}, 500);

// giftbox &image

btnnxt.addEventListener("click", () => {
  giftbox();
});
function giftbox() {
  cardSection.classList.add("hidden");
  giftboxcontainer.classList.remove("hidden");
  sparkleWrapper.classList.add("hidden");
  box.addEventListener("click", () => {
    if (isBoxOpened) return;
    const lid = document.querySelector(".lid");

    box.classList.add("shake");

    setTimeout(() => {
      box.classList.remove("shake");
      lid.style.transform = "rotate(-110deg)";
    }, 600);

    setTimeout(() => {
      confettiExplosion();
      explosionSound.play(); // Play explosion sound
    }, 600);
    setTimeout(() => {
      giftboxcontainer.classList.add("hidden");
      imagegallery.classList.remove("hidden");
      explosionSound.play(); // Play explosion sound
    }, 600);

    isBoxOpened = true;
  });
}
function confettiExplosion() {
  confetti({
    particleCount: 500,
    spread: 120,
    origin: { y: 0.7 },
  });
}

// Add additional animations when photos are clicked
document.querySelectorAll(".photo-box").forEach((box) => {
  box.addEventListener("click", function () {
    this.style.transform = "rotateY(180deg) rotateX(10deg) scale(1.2)";
    setTimeout(() => {
      this.style.transform = "rotateY(0deg) rotateX(10deg) scale(1.1)";
    }, 500);

    // Create confetti effect
    createsConfetti(
      this.getBoundingClientRect().left + 75,
      this.getBoundingClientRect().top + 75
    );
  });
});
function createsConfetti(x, y) {
  const colors = ["#ff66b2", "#b36eeb", "#ffff33", "#ffffff", "#ffeb3b"];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = x + "px";
    confetti.style.top = y + "px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const size = 5 + Math.random() * 10;

    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

    let posX = x;
    let posY = y;
    let opacity = 1;
    let scale = 1;
    let rotation = Math.random() * 360;
    let rotationSpeed = (Math.random() - 0.5) * 20;

    const animate = () => {
      posX += Math.cos(angle) * velocity;
      posY += Math.sin(angle) * velocity + 0.5; // gravity
      opacity -= 0.02;
      scale -= 0.01;
      rotation += rotationSpeed;

      confetti.style.left = posX + "px";
      confetti.style.top = posY + "px";
      confetti.style.opacity = opacity;
      confetti.style.transform = `rotate(${rotation}deg) scale(${scale})`;

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        confetti.remove();
      }
    };

    setTimeout(() => {
      confetti.style.opacity = 1;
      requestAnimationFrame(animate);
    }, 0);
  }
}
