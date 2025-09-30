gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// ScrollSmoother init
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.2,
  effects: true
});

// Enhanced Header scroll effect
window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Enhanced Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function () {
  navLinks.classList.toggle('active');
  if (navLinks.classList.contains('active')) {
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Enhanced Smooth scrolling to sections
document.querySelectorAll('.nav-links a, .footer-links a, .logo').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute('data-section') || 'home';
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      navLinks.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      const smoother = ScrollSmoother.get();
      smoother.scrollTo(targetSection, true, "top 70px");
    }
  });
});

// HERO ANIMATION
const heroText = document.querySelector(".hero h1");
const heroPara = document.querySelector(".hero p");
const splitHero = new SplitText(heroText, { type: "chars" });

gsap.set(splitHero.chars, { y: 100, opacity: 0 });
gsap.set(heroPara, { x: 50, opacity: 0 });

gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top center",
    toggleActions: "play reverse play reverse"
  }
})
  .to(splitHero.chars, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.05
  })
  .to(heroPara, {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
  }, "-=0.8");

// IMAGE HOVER ANIMATION
const defaultTitle = document.querySelector(".default");
const hoverTitle = document.querySelector(".red");
const boxes = document.querySelectorAll(".img-box");
let hovering = false;

boxes.forEach(box => {
  box.addEventListener("mouseenter", () => {
    hovering = true;
    const name = box.dataset.name;
    hoverTitle.textContent = name;
    const splitHover = new SplitText(hoverTitle, { type: "chars" });
    gsap.set(splitHover.chars, { yPercent: 40 });
    gsap.to(splitHover.chars, {
      yPercent: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.out"
    });
    gsap.to(defaultTitle, { opacity: 0, duration: 0.2 });
    gsap.to(hoverTitle, { opacity: 1, duration: 0.3 });
    gsap.to(box.querySelector("img"), {
      scale: 1.2,
      filter: "grayscale(0)",
      duration: 0.5
    });
  });

  box.addEventListener("mouseleave", () => {
    hovering = false;
    const splitHover = new SplitText(hoverTitle, { type: "chars" });
    gsap.to(splitHover.chars, {
      yPercent: 40,
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.in"
    });
    gsap.to(hoverTitle, { opacity: 0, duration: 0.3 });
    setTimeout(() => {
      if (!hovering) {
        const splitDefault = new SplitText(defaultTitle, { type: "chars" });
        gsap.set(splitDefault.chars, { yPercent: -20 });
        gsap.to(splitDefault.chars, {
          yPercent: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out"
        });
        gsap.to(defaultTitle, { opacity: 1, duration: 0.3 });
      }
    }, 50);
    gsap.to(box.querySelector("img"), {
      scale: 1,
      filter: "grayscale(1)",
      duration: 0.5
    });
  });
});

// HORIZONTAL SCROLL ANIMATION
 const horizontalWrapper = document.querySelector(".horizontal-wrapper");
    const sections = gsap.utils.toArray(".card");

    // Determine xPercent based on screen size
    const getXPercent = () => {
      return window.innerWidth <= 600 ? -9 * (sections.length - 1) : -6 * (sections.length - 1);
    };

    gsap.to(horizontalWrapper, {
      xPercent: getXPercent,
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-section",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `+=${horizontalWrapper.scrollWidth - window.innerWidth + 30}`,
        invalidateOnRefresh: true // Recalculate on resize
      }
    });


// FINAL BATTLE TITLE & PARAGRAPH ZOOM
gsap.timeline({
  scrollTrigger: {
    trigger: ".final-battle",
    start: "top center",
    toggleActions: "play reverse play reverse"
  }
})
  .to(".final-battle h2", {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power3.out"
  })
  .to(".final-battle p", {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power3.out"
  }, "-=0.6");

// ZOOM-IN ANIMATION FOR IMAGES
gsap.utils.toArray(".battle-gallery img").forEach((img, i) => {
  gsap.fromTo(img,
    { opacity: 0, scale: 0.7, y: 80 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: img,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function () {
  gsap.to('.brief-title', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out"
  });

  const briefSections = document.querySelectorAll('.brief-section');
  const briefDividers = document.querySelectorAll('.brief-divider');

  briefSections.forEach((section, index) => {
    gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    const image = section.querySelector('.brief-image');
    gsap.to(image, {
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => section.classList.add('active'),
      onLeave: () => section.classList.remove('active'),
      onEnterBack: () => section.classList.add('active'),
      onLeaveBack: () => section.classList.remove('active')
    });
  });

  briefDividers.forEach(divider => {
    gsap.to(divider, {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: divider,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  gsap.to('.element-1', {
    y: -80,
    scrollTrigger: {
      trigger: '.movie-brief',
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to('.element-2', {
    y: 80,
    scrollTrigger: {
      trigger: '.movie-brief',
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// NEW ANIMATION SECTION ANIMATIONS
document.addEventListener('DOMContentLoaded', function () {
  gsap.to('.animation-title', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: '.animation-title',
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  gsap.utils.toArray('.animation-card').forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: i * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  gsap.utils.toArray('.animation-feature').forEach((feature, i) => {
    gsap.to(feature, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: feature,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
  });

  gsap.utils.toArray('.message-item').forEach((message, i) => {
    gsap.to(message, {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: i * 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '.sweet-messages',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  gsap.utils.toArray('.animation-card').forEach(card => {
    const content = card.querySelector('.animation-card-content');

    card.addEventListener('mouseenter', () => {
      gsap.to(content, {
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(content, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in"
      });
    });
  });
});