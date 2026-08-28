// -------------------------
// REGISTER GSAP
// -------------------------

gsap.registerPlugin(ScrollTrigger);

// -------------------------
// ABOUT FOLD OUT
// -------------------------

const aboutButton = document.querySelector("#about-button");
const closeAbout = document.querySelector("#close-about");
const aboutSection = document.querySelector(".about-section");

let aboutOpen = false;

function openAbout() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  gsap.to(aboutSection, {
    maxHeight: aboutSection.scrollHeight,
    duration: 0.8,
    ease: "power3.inOut",
  });

  aboutOpen = true;
}

function closeAboutSection() {
  gsap.to(aboutSection, {
    maxHeight: 0,
    duration: 0.5,
    ease: "power3.inOut",

    onComplete: () => {
      ScrollTrigger.refresh();
    },
  });

  aboutOpen = false;
}

function toggleAbout() {
  if (aboutOpen) {
    closeAboutSection();
  } else {
    openAbout();
  }
}

if (aboutButton) {
  aboutButton.addEventListener("click", toggleAbout);
}

if (closeAbout) {
  closeAbout.addEventListener("click", closeAboutSection);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && aboutOpen) {
    closeAboutSection();
  }
});

// -------------------------
// PROJECT INFO FOLD OUT
// -------------------------

const projectButtons = document.querySelectorAll(".project-button");

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const info = button.nextElementSibling;
    const isOpen = info.classList.contains("open");

    if (isOpen) {
      // CLOSE
      gsap.to(info, {
        maxHeight: 0,
        duration: 0.5,
        ease: "power3.inOut",

        onComplete: () => {
          info.classList.remove("open");
          ScrollTrigger.refresh();
        },
      });

    } else {
      // OPEN
      info.classList.add("open");

      gsap.fromTo(
        info,
        {
          maxHeight: 0,
        },
        {
          maxHeight: info.scrollHeight,
          duration: 0.8,
          ease: "power3.inOut",

          onComplete: () => {
            ScrollTrigger.refresh();
          },
        }
      );
    }
  });
});

// -------------------------
// IMAGE PARALLAX
// -------------------------

const images = document.querySelectorAll(".current img");

images.forEach((image) => {
  gsap.to(image, {
    y: -20,

    ease: "none",

    scrollTrigger: {
      trigger: image,

      scrub: true,
    },
  });
});
// -------------------------
// IMAGE CLICK GALLERY
// -------------------------

const galleries = document.querySelectorAll(".project-gallery");

galleries.forEach((gallery) => {
  const images = gallery.querySelectorAll("img");

  if (images.length === 0) return;

  let currentImage = 0;

  // Show first image
  images[currentImage].classList.add("active");

  // Single-image project = no navigation
  if (images.length === 1) return;

  // Previous button
  const previousButton = document.createElement("button");

  previousButton.type = "button";
  previousButton.className = "gallery-prev";
  previousButton.setAttribute("aria-label", "Previous image");

  // Next button
  const nextButton = document.createElement("button");

  nextButton.type = "button";
  nextButton.className = "gallery-next";
  nextButton.setAttribute("aria-label", "Next image");

  gallery.appendChild(previousButton);
  gallery.appendChild(nextButton);

  // Previous
  previousButton.addEventListener("click", () => {
    images[currentImage].classList.remove("active");

    currentImage--;

    if (currentImage < 0) {
      currentImage = images.length - 1;
    }

    images[currentImage].classList.add("active");
  });

  // Next
  nextButton.addEventListener("click", () => {
    images[currentImage].classList.remove("active");

    currentImage++;

    if (currentImage >= images.length) {
      currentImage = 0;
    }

    images[currentImage].classList.add("active");
  });
});
