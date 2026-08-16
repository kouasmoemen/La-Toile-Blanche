const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");
const heroVideo = document.querySelector("[data-hero-video]");
const videoName = document.querySelector("[data-video-name]");
const checkout = document.querySelector("[data-checkout]");
const openCheckout = document.querySelector("[data-open-checkout]");
const closeCheckout = document.querySelector("[data-close-checkout]");
const checkoutForm = document.querySelector(".checkout-form");
const toast = document.querySelector("[data-toast]");
const monaImage = document.querySelector("[data-mona-image]");
const monaCaption = document.querySelector("[data-mona-caption]");
const artworkImage = document.querySelector(".art-image-wrap img");

const playlist = [
  "./n1.mp4",
  "./n2.mp4",
  "./n3.mp4",
  "./n4.mp4",
  "./n5.mp4",
  "./n6.mp4",
  "./n7.mp4",
  "./n8.mp4",
  "./n9.mp4",
  "./n10.mp4"
];

const monaStates = [
  {
    src: "./3adeya.jpg",
    alt: "موناليزا في حالتها العادية",
    caption: "3adeya.jpg"
  },
  {
    src: "./mch 3adeya.jpg",
    alt: "موناليزا في حالتها غير العادية",
    caption: "mch 3adeya.jpg"
  }
];

let currentVideo = 0;
let currentMona = 0;
let toastTimer;
let missingVideoCount = 0;
let missingVideoNoticeShown = false;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4200);
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

function playVideo(index) {
  if (!heroVideo) return;

  currentVideo = (index + playlist.length) % playlist.length;
  const src = playlist[currentVideo];

  heroVideo.classList.remove("is-visible");
  videoName.textContent = src.replace("./", "");

  window.setTimeout(() => {
    heroVideo.src = src;
    heroVideo.load();

    const playRequest = heroVideo.play();
    if (playRequest && typeof playRequest.then === "function") {
      playRequest
        .then(() => {
          missingVideoCount = 0;
          heroVideo.classList.add("is-visible");
        })
        .catch(() => {
          handleMissingVideo();
        });
    }
  }, 180);
}

function playNextVideo() {
  playVideo(currentVideo + 1);
}

function handleMissingVideo() {
  missingVideoCount += 1;

  if (missingVideoCount >= playlist.length) {
    if (!missingVideoNoticeShown) {
      showToast("ضع ملفات الفيديو n1.mp4 إلى n10.mp4 بجانب index.html لتعمل الخلفية.");
      missingVideoNoticeShown = true;
    }
    return;
  }

  window.setTimeout(playNextVideo, 700);
}

function switchMona() {
  if (!monaImage) return;

  currentMona = (currentMona + 1) % monaStates.length;
  const nextState = monaStates[currentMona];

  monaImage.classList.add("is-changing");

  window.setTimeout(() => {
    monaImage.src = nextState.src;
    monaImage.alt = nextState.alt;
    monaCaption.textContent = nextState.caption;
    monaImage.classList.remove("is-changing");
  }, 320);
}

function createOrderText(formData) {
  return [
    "طلب شراء لوحة sisi",
    `الاسم: ${formData.get("firstName")}`,
    `اللقب: ${formData.get("lastName")}`,
    `الهاتف: ${formData.get("phone")}`,
    `المكان في تونس: ${formData.get("location")}`,
    `ملاحظة: ${formData.get("note") || "لا توجد"}`
  ].join("\n");
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) closeMenu();
});

heroVideo.addEventListener("ended", playNextVideo);
heroVideo.addEventListener("error", () => {
  handleMissingVideo();
});
playVideo(0);

window.setInterval(switchMona, 3000);

if (artworkImage) {
  artworkImage.addEventListener("error", () => {
    artworkImage.closest(".art-image-wrap").classList.add("is-missing");
  });

  artworkImage.addEventListener("load", () => {
    artworkImage.closest(".art-image-wrap").classList.remove("is-missing");
  });
}

if (monaImage) {
  monaImage.addEventListener("error", () => {
    monaImage.closest(".mona-frame").classList.add("is-missing");
  });

  monaImage.addEventListener("load", () => {
    monaImage.closest(".mona-frame").classList.remove("is-missing");
  });
}

openCheckout.addEventListener("click", () => {
  checkout.hidden = false;
  document.body.classList.add("modal-open");
  checkout.querySelector("input").focus();
});

function closeCheckoutModal() {
  checkout.hidden = true;
  document.body.classList.remove("modal-open");
}

closeCheckout.addEventListener("click", closeCheckoutModal);

checkout.addEventListener("click", (event) => {
  if (event.target === checkout) closeCheckoutModal();
});

checkoutForm.addEventListener("submit", (event) => {
  if (event.submitter && event.submitter.value === "cancel") return;

  event.preventDefault();
  const formData = new FormData(checkoutForm);
  const orderText = createOrderText(formData);
  const whatsappUrl = `https://wa.me/21625515396?text=${encodeURIComponent(orderText)}`;

  showToast("تم تجهيز الطلب. ستفتح رسالة واتساب لإرسال المعلومات.");
  window.open(whatsappUrl, "_blank", "noopener");
  closeCheckoutModal();
  checkoutForm.reset();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !checkout.hidden) closeCheckoutModal();
});
