


// ーーーーーーーーーーーーーースライダーの点々ーーーーーーーーーーーーーーー
const eventSwiper = new Swiper(".event-swiper", {
  loop: true,
  speed: 600,

  navigation: {
    nextEl: ".event-next",
    prevEl: ".event-prev"
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});


// ーーーーーーーーーーースクロールでヘッダーの大きさ変えるーーーーーーーーー



$(function () {

  function updateHeader() {

    if (window.innerWidth <= 880) {
      $("header").removeClass("scrolled");
      $("header").toggleClass("shadow-only", $(window).scrollTop() > 50);
      return;
    }

    $("header").removeClass("shadow-only");

    const mainVisual = $(".main-visual, .circuit-area");

    if (mainVisual.length === 0) return;

    const mainBottom =
      mainVisual.offset().top + mainVisual.outerHeight();

    $("header").toggleClass(
      "scrolled",
      $(window).scrollTop() >= mainBottom
    );

  }

  $(window).on("scroll resize", updateHeader);
  updateHeader();

});

 // ーーーーーー スクロールアニメーション ーーーーーー

const animationTargets = document.querySelectorAll(
  "#kaisya h2, #zigyou h2, #zinzai h2, #donna img, #contact img, #watasi, #zigyou .d_card, #zigyou .r_card, #kaisya .company-table, #contact .contact-form, #donna p, #zigyou h3, #zigyou .setumei, #zinzai > div:not(.event-slider)"
);

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      animationObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: "0px",
  threshold: 0
});

animationTargets.forEach((target) => {
  animationObserver.observe(target);
});









// ーーーーー スクロールアニメーション ーーーーー

// 動かす要素
const revealGroups = [
  ["#watasi h1", "#watasi p"],
  ["#donna h2", "#donna p"],
  ["#sekou h2", "#sekou > p"],
  ["#sekou .gakubuti"],
  ["#aisatu > img", "#aisatu h3"],
  ["#aisatu h4", "#aisatu .p1", "#aisatu .p2",
   "#aisatu .p3", "#aisatu .p4"],
  ["#contact > h2", "#contact .denwa",
   "#contact .nayami"],
  ["#reform-contact h2", "#reform-contact .form-group",
   "#reform-contact .reform-submit"]
];

const revealTargets = [];

revealGroups.forEach((group) => {
  group.forEach((selector, index) => {
    document.querySelectorAll(selector).forEach((element, i) => {

      element.classList.add("reveal");

      const delay = Math.min(index + i, 3);

      if (delay > 0) {
        element.classList.add(`reveal-delay-${delay}`);
      }

      revealTargets.push(element);
    });
  });
});

// スクロールで表示
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  revealTargets.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
}









/* ーーーーー ペンドラ・ペンチ アニメーション ーーーーー */

const toolSections = document.querySelectorAll(
  "#donna, #contact"
);

const toolObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {

      entry.target.querySelectorAll("h2, img").forEach((element) => {
        element.classList.add("show");
      });

      toolObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: "0px",
  threshold: 0
});

toolSections.forEach((section) => {
  toolObserver.observe(section);
});

/* ーーーーー 施工事例アニメーション ーーーーー */

const sekou = document.querySelector("#sekou");

if (sekou) {
  const title = sekou.querySelector("h2");
  const description = sekou.querySelector(":scope > p");
  const frames = sekou.querySelectorAll(".gakubuti");

  const sekouObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        element.classList.add("is-visible");
        sekouObserver.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  function animate(element, className, delay) {
    if (!element) return;

    element.classList.add(className);
    element.style.transitionDelay = `${delay}ms`;
    sekouObserver.observe(element);
  }

  animate(title, "sekou-fade", 0);
  animate(description, "sekou-fade", 350);

  frames.forEach((frame, index) => {
    animate(frame, "sekou-frame", 500 + index * 150);
  });
}
