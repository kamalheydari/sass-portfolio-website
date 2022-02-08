//! get element by id function
const getElement = (selector) => {
  const element = document.getElementById(selector);

  if (element) {
    return element;
  } else {
    throw new Error(
      `please check '${selector}' selector, no such element exist`
    );
  }
};

//! open nav-menu
const openBtn = getElement("open-menu");
const nav = getElement("header-nav");
const closeBtn = getElement("close-btn");

openBtn.addEventListener("click", () => {
  nav.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  nav.classList.remove("show");
});

//! change theme
const themeButton = getElement("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => {
  document.body.classList.contains(darkTheme) ? "dark" : "light";
};
const getCurrentIcon = () => {
  themeButton.querySelector("i").classList.contains(iconTheme)
    ? "uil-moon"
    : "uil-sun";
};

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton
    .querySelector("i")
    .classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.querySelector("i").classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

//! qualification handle
const tabBtns = document.querySelectorAll(".tabs__btn");
const tabContents = document.querySelectorAll(".qualification__section");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedTab = getElement(btn.dataset.target);

    tabBtns.forEach((item) => {
      item.classList.remove("tabs__btn--active");
    });
    btn.classList.add("tabs__btn--active");

    tabContents.forEach((content) => {
      content.classList.remove("qualification__section--active");
    });
    selectedTab.classList.add("qualification__section--active");
  });
});

//! skills card handle
const allSkillCards = document.querySelectorAll(".skills__card");
const allSkillContents = document.querySelectorAll(
  ".skills__card .card__content"
);
allSkillCards.forEach((skill) => {
  const skillHeader = skill.querySelector(".card__header");
  const skillContent = skill.querySelector(".card__content");
  const skillDatas = skill.querySelector(".skill-datas");

  skillHeader.addEventListener("click", () => {
    const contentHeight = skillContent.getBoundingClientRect().height;
    const datasHeight = skillDatas.getBoundingClientRect().height;

    if (contentHeight === 0) {
      allSkillContents.forEach((content) => {
        content.style.height = 0;
      });

      allSkillCards.forEach((card) => {
        card.classList.remove("skills__card--open");
      });

      skillContent.style.height = `${datasHeight}px`;
      skill.classList.add("skills__card--open");
    } else {
      skillContent.style.height = 0;
      skill.classList.remove("skills__card--open");
    }
  });
});

//! modal handle
const modalViews = document.querySelectorAll(".service__modal");
const modalBtns = document.querySelectorAll(".service__card .card__btn");
const modalCloses = document.querySelectorAll(".service__modal .modal__btn");

let modal = (modalClick) => {
  modalViews[modalClick].classList.add("service__modal--active");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("service__modal--active");
    });
  });
});

//! handle scroll header shadow
window.addEventListener("scroll", () => {
  const header = getElement("header");
  if (window.scrollY >= 80) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
});

//! active link on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    const navItem = document.querySelector(
      ".nav__item a[href*=" + sectionId + "]"
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navItem.classList.add("nav__item--active");
    } else {
      navItem.classList.remove("nav__item--active");
    }
  });
});

//! testimonial swiper
let swiperTestimonial = new Swiper(".testimonial__content", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
});

//! portfolio swiper
let swiperPortfolio = new Swiper(".portfolio__content", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});
