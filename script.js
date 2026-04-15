const SUPABASE_URL = window.SUPABASE_URL || "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const COLORS = ["#FFF59D", "#FFCDD2", "#BBDEFB", "#C8E6C9"];
const BOARD_ID = "main";

const boardEl = document.getElementById("board");
const formEl = document.getElementById("wishForm");
const nameEl = document.getElementById("name");
const textEl = document.getElementById("text");

init();

async function init() {
  if (SUPABASE_URL.includes("YOUR_PROJECT") || SUPABASE_ANON_KEY.includes("YOUR_SUPABASE")) {
    showNotice("Укажите SUPABASE_URL и SUPABASE_ANON_KEY в script.js или через window.*");
    return;
  }

  await fetchMessages();
}

async function fetchMessages() {
  const { data, error } = await supabaseClient
    .from("messages")
    .select("*")
    .eq("board_id", BOARD_ID)
    .order("id", { ascending: false });

  if (error) {
    showNotice("Не удалось загрузить сообщения");
    return;
  }

  renderMessages(data || []);
}

async function addMessage(content, authorName) {
  const newMessage = {
    board_id: BOARD_ID,
    content,
    author_name: authorName || "Anonymous",
    x: Math.random() * 70,
    y: Math.random() * 70,
    rotation: Math.random() * 20 - 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };

  const { error } = await supabaseClient.from("messages").insert(newMessage);

  if (error) {
    showNotice("Не удалось добавить сообщение");
    return;
  }

  await fetchMessages();
}

function renderMessages(messages) {
  boardEl.innerHTML = "";

  messages.forEach((msg) => {
    const sticker = document.createElement("article");
    sticker.className = "sticker";
    sticker.style.left = `${msg.x}%`;
    sticker.style.top = `${msg.y}%`;
    sticker.style.transform = `rotate(${msg.rotation}deg)`;
    sticker.style.backgroundColor = msg.color || COLORS[0];

    const content = document.createElement("p");
    content.className = "sticker__content";
    content.textContent = msg.content;

    const author = document.createElement("p");
    author.className = "sticker__author";
    author.textContent = `— ${msg.author_name || "Anonymous"}`;

    sticker.append(content, author);
    boardEl.appendChild(sticker);
  });
}

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const content = textEl.value.trim();
  const author = nameEl.value.trim();

  if (!content) {
    return;
  }

  await addMessage(content, author);
  textEl.value = "";
});

function showNotice(text) {
  const existing = document.querySelector(".notice");
  if (existing) {
    existing.remove();
  }

  const notice = document.createElement("div");
  notice.className = "notice";
  notice.textContent = text;
  document.body.appendChild(notice);
}
