const wishes = [
  {
    name: "Юлий Герба",
    text: "Желаю, чтобы все правки были финальными, а финальные - действительно финальными. С праздничком!",
  },
  {
    name: "Роман Губин",
    text: "Желаю крутых идей, такого же запала на работе, но не забывай про work-live-balance. И, конечно, чтобы всё, что ты делаешь, приносило результат и удовольствие.",
  },
  {
    name: "Никита Зайцев",
    text: "Желаю, чтобы твоя жизнь была как идеальный UI: чёткая сетка, выверенные отступы и ни одного кривого пикселя ))",
  },
  {
    name: "Кристина Суховерхова",
    text: "От всей души желаю тебе, чтобы все твои «кринжи» оборачивались «вайбами», чтобы ты никогда не ловил «фейлы», а только «сладкие моменты». Пусть то, что сегодня для всех «рофл», завтра станет твоим «лайфхаком». А счастья желаю ровно столько, сколько говна за баней — то есть до**я и везде, даже там, где не ждал.",
  },
  {
    name: "Алина Рихтер",
    text: "Желаю неиссякаемого потока идей и проектов которые будут радовать. Что бы твой талант ценился по достоинству, а так же энергии для новых свершений, верных друзей и безграничного личного счастья 🥳",
  },
  {
    name: "Яна Черкай",
    text: "Рома, с твоим днём! 🎉  Очень ценю твою драйвовость и то, как ты увлечён — это очень чувствуется и заряжает. Плюс твоё любопытство — редкое и крутое качество! Желаю его не растерять. Пусть дальше всё складывается так, как ты хочешь, и даже лучше ✨",
  },
  {
    name: "Кристина Батухтина",
    text: "С днём рождения, Рома! :heart: Конечно же всего самого наилучшего, здоровья побольше, денег и исполнения твоих заветных мечт. Ценю тебя за твою энергичность, отзывчивость и лёгкость! Пусть твои идеи реализуются, приносят результат, и кайфовой работы в команде)))",
  },
];

const stickerRotations = ["-8deg", "7deg", "-6deg", "9deg", "-5deg"];
const stickerDelays = ["0.09s", "0.15s", "0.21s", "0.27s", "0.33s"];

const stickersEl = document.getElementById("stickers");
const wishesPanel = document.getElementById("wishesPanel");
const celebrateButton = document.getElementById("celebrateButton");
const confettiLayer = document.getElementById("confettiLayer");
const wishesNote = document.getElementById("wishesNote");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let isCelebrated = false;

renderStickers();

celebrateButton.addEventListener("click", () => {
  if (isCelebrated) {
    return;
  }

  isCelebrated = true;
  document.body.classList.add("is-celebrated");
  celebrateButton.classList.add("is-exploding");
  celebrateButton.disabled = true;
  wishesNote.hidden = true;
  wishesPanel.hidden = false;

  window.requestAnimationFrame(() => {
    wishesPanel.classList.add("is-revealed");
  });

  window.setTimeout(
    () => {
      celebrateButton.hidden = true;
    },
    reducedMotion ? 0 : 390
  );

  if (!reducedMotion) {
    launchConfetti(celebrateButton);
  }
});

function renderStickers() {
  stickersEl.innerHTML = wishes
    .map(
      (wish, index) => `
        <article
          class="sticker"
          style="--rotation: ${stickerRotations[index % stickerRotations.length]}; --delay: ${stickerDelays[index % stickerDelays.length]};"
        >
          <p class="sticker__message">${wish.text}</p>
          <p class="sticker__author">${wish.name}</p>
        </article>
      `
    )
    .join("");
}

function launchConfetti(trigger) {
  const rect = trigger.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const colors = ["#ffffff", "#ffe3ff", "#ff8bdd", "#ff72cb", "#d78dff", "#9d6dff", "#ffd66e"];
  const layers = [
    {
      count: 36,
      distance: [220, 420],
      gravity: [40, 160],
      size: [12, 22],
      duration: [600, 900],
      delay: [0, 30],
      glow: [16, 26],
      blur: [0, 0.4],
      opacity: [0.96, 1],
      stretch: [1.8, 2.4],
      endScale: [1.2, 1.45],
    },
    {
      count: 44,
      distance: [340, 680],
      gravity: [90, 240],
      size: [9, 17],
      duration: [720, 1050],
      delay: [10, 55],
      glow: [12, 20],
      blur: [0.2, 0.9],
      opacity: [0.86, 0.95],
      stretch: [1.6, 2.2],
      endScale: [0.95, 1.12],
    },
    {
      count: 52,
      distance: [480, 940],
      gravity: [140, 340],
      size: [6, 13],
      duration: [880, 1300],
      delay: [20, 95],
      glow: [8, 16],
      blur: [0.5, 1.6],
      opacity: [0.72, 0.86],
      stretch: [1.4, 2.05],
      endScale: [0.72, 0.94],
    },
  ];

  layers.forEach((layer, layerIndex) => {
    for (let index = 0; index < layer.count; index += 1) {
      const piece = document.createElement("span");
      const angle =
        (Math.PI * 2 * index) / layer.count +
        randomBetween(-0.34, 0.34) +
        layerIndex * 0.08;
      const distance = randomBetween(layer.distance[0], layer.distance[1]);
      const gravity = randomBetween(layer.gravity[0], layer.gravity[1]);
      const size = randomBetween(layer.size[0], layer.size[1]);
      const duration = randomBetween(layer.duration[0], layer.duration[1]);
      const delay = randomBetween(layer.delay[0], layer.delay[1]);
      const glow = randomBetween(layer.glow[0], layer.glow[1]);
      const blur = randomBetween(layer.blur[0], layer.blur[1]);
      const peakOpacity = randomBetween(layer.opacity[0], layer.opacity[1]);
      const stretch = randomBetween(layer.stretch[0], layer.stretch[1]);
      const endScale = randomBetween(layer.endScale[0], layer.endScale[1]);
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance + gravity;
      const spin = `${randomBetween(-760, 760)}deg`;
      const randomType = Math.random();

      piece.className =
        randomType > 0.74
          ? "confetti confetti--dot"
          : randomType > 0.38
            ? "confetti confetti--wide"
            : "confetti";

      piece.style.setProperty("--origin-x", `${originX}px`);
      piece.style.setProperty("--origin-y", `${originY}px`);
      piece.style.setProperty("--target-x", `${targetX}px`);
      piece.style.setProperty("--target-y", `${targetY}px`);
      piece.style.setProperty("--spin", spin);
      piece.style.setProperty("--size", `${size}px`);
      piece.style.setProperty("--duration", `${duration}ms`);
      piece.style.setProperty("--delay", `${delay}ms`);
      piece.style.setProperty("--color", colors[(index + layerIndex) % colors.length]);
      piece.style.setProperty("--glow", `${glow}px`);
      piece.style.setProperty("--blur", `${blur}px`);
      piece.style.setProperty("--peak-opacity", peakOpacity);
      piece.style.setProperty("--stretch", stretch);
      piece.style.setProperty("--end-scale", endScale);
      piece.style.setProperty("--spawn-scale", randomBetween(0.16, 0.28));
      piece.style.setProperty("--radius", randomType > 0.74 ? "50%" : "999px");

      confettiLayer.appendChild(piece);
      piece.addEventListener("animationend", () => piece.remove(), { once: true });
    }
  });
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
