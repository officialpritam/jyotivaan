document.addEventListener("DOMContentLoaded", () => {
  // ---------- Scroll animations (AOS) ----------
  AOS.init({ duration: 800, once: true, offset: 60 });

  // ---------- Hero typing effect (Typed.js) ----------
  new Typed("#typed", {
    strings: ["your Stars", "your Destiny", "your Future", "your Stars"],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1400,
    startDelay: 400,
    loop: false,
    showCursor: true,
    onComplete: (self) => setTimeout(() => self.cursor && self.cursor.remove(), 1500),
  });

  // ---------- Stat counters (CountUp.js) ----------
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const counter = new countUp.CountUp(el, Number(el.dataset.end), {
        duration: 2.5,
        separator: el.dataset.separator || "",
      });
      if (!counter.error) counter.start();
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".counter").forEach((el) => counterObserver.observe(el));

  // ---------- Testimonials slider (Swiper) ----------
  new Swiper(".testimonial-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    autoplay: { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: {
      700: { slidesPerView: 2, slidesPerGroup: 2 },
      1024: { slidesPerView: 3, slidesPerGroup: 3 },
    },
  });

  // ---------- Date picker (Flatpickr) ----------
  flatpickr("#datePicker", {
    dateFormat: "d-m-Y",
    minDate: "today",
    disableMobile: true,
  });

  // ---------- Header shadow, back-to-top & active nav link ----------
  const header = document.getElementById("header");
  const backToTop = document.getElementById("backToTop");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = [...navLinks].map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 10);
    backToTop.classList.toggle("show", y > 600);

    let current = sections[0];
    sections.forEach((s) => { if (s.offsetTop - 120 <= y) current = s; });
    navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current.id));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav ----------
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
  }));

  // ---------- Booking form ----------
  const form = document.getElementById("bookingForm");
  const msg = document.getElementById("formMsg");
  const select = form.querySelector("select");
  select.addEventListener("change", () => select.classList.add("has-value"));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const ok = field.value.trim() !== "" && field.checkValidity();
      field.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      msg.className = "form-msg err";
      msg.textContent = "Please fill in all fields correctly.";
      return;
    }
    msg.className = "form-msg ok";
    msg.textContent = "Thank you! We will contact you shortly to confirm your consultation.";
    form.reset();
    select.classList.remove("has-value");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
