/* ============================================================
   BEYOND NICHE — LOCATIONS CONFIG
   ------------------------------------------------------------
   This is the ONLY part you need to touch to add, remove, or
   edit a shop location. Each object below is one location.

   name        -> shown on the button + inside the map popup
   gate        -> small label next to the mall name in the popup
   photo       -> path to the shop photo (shown in the carousel)
   floormap    -> path to the floor map image (shown in the popup)
   directions  -> a Google Maps link people can tap for turn-by-turn
                  directions to the mall itself
   ============================================================ */

const LOCATIONS = [
  {
    name: "Bawadi Mall",
    gate: "Gate 3",
    photo: "assets/bawadi-photo.jpg",
    floormap: "assets/bawadi-floormap.jpg",
    directions: "https://www.google.com/maps/search/?api=1&query=Bawadi+Mall+Al+Ain"
  },
  {
    // TODO: swap in the real photo + floor map once ready
    name: "Mall of Al Ain",
    gate: "Gate —",
    photo: "assets/placeholder-photo.jpg",
    floormap: "assets/placeholder-floormap.jpg",
    directions: "https://www.google.com/maps/search/?api=1&query=Mall+of+Al+Ain"
  },
  {
    // TODO: rename this to your 3rd branch and swap in real assets
    name: "Third Location",
    gate: "Gate —",
    photo: "assets/placeholder-photo.jpg",
    floormap: "assets/placeholder-floormap.jpg",
    directions: "https://www.google.com/maps"
  }
];

/* ============================================================
   Everything below this line runs the carousel + popup.
   No need to edit unless you're changing how it behaves.
   ============================================================ */

let current = 0;

const photoEl = document.getElementById("locationPhoto");
const locationBtn = document.getElementById("locationBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsEl = document.getElementById("dots");

const modal = document.getElementById("mapModal");
const closeModalBtn = document.getElementById("closeModal");
const modalMallName = document.getElementById("modalMallName");
const modalGateName = document.getElementById("modalGateName");
const modalMapImg = document.getElementById("modalMapImg");
const modalDirections = document.getElementById("modalDirections");

function buildDots() {
  dotsEl.innerHTML = "";
  LOCATIONS.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === current ? " active" : "");
    dotsEl.appendChild(dot);
  });
}

function render() {
  const loc = LOCATIONS[current];
  photoEl.src = loc.photo;
  photoEl.alt = loc.name + " — Beyond Niche shop front";
  locationBtn.textContent = loc.name;
  buildDots();
}

function goTo(index) {
  current = (index + LOCATIONS.length) % LOCATIONS.length; // wraps around
  render();
}

prevBtn.addEventListener("click", () => goTo(current - 1));
nextBtn.addEventListener("click", () => goTo(current + 1));

function openModal() {
  const loc = LOCATIONS[current];
  modalMallName.textContent = loc.name;
  modalGateName.textContent = loc.gate;
  modalMapImg.src = loc.floormap;
  modalMapImg.alt = loc.name + " floor map";
  modalDirections.href = loc.directions;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

locationBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

// Close popup when tapping the dark backdrop (not the card itself)
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Close popup with the Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// Basic swipe support so mobile visitors can swipe the photo too
let touchStartX = 0;
const frame = document.querySelector(".carousel-frame");
frame.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
frame.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 40) {
    dx > 0 ? goTo(current - 1) : goTo(current + 1);
  }
}, { passive: true });

render();
