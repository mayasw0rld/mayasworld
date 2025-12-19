const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--x", `${e.clientX - rect.left}px`);
    btn.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});


// ARROW
const arrow = document.querySelector(".aboutarrow img");
const aboutSection = document.querySelector(".aboutme");

window.addEventListener("scroll", () => {
  const rect = aboutSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Move start a bit higher and end lower to finish earlier
  const start = windowHeight * 0.75; // starts rotating sooner
  const end = windowHeight * 0.2; // finishes rotation earlier

  // Calculate scroll progress in the section
  const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

  // Rotate from -100° → 0°
  const rotation = -100 + 100 * progress;
  arrow.style.transform = `rotate(${rotation}deg)`;
});

// TILES
document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  
  const observerOptions = {
    root: null, // use the viewport
    rootMargin: '0px 0px -50px 0px', // triggers 50px before the element enters the bottom
    threshold: 0.1 // lower threshold is more reliable for large items
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Optional: stop observing once it has shown
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  tiles.forEach(tile => observer.observe(tile));
});

// FOOTER
document.addEventListener('DOMContentLoaded', () => {
    // 1. BUTTON INK SPREAD
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.addEventListener("mousemove", e => {
            const rect = btn.getBoundingClientRect();
            btn.style.setProperty("--x", `${e.clientX - rect.left}px`);
            btn.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
    });

    // 2. FOOTER REVEAL LOGIC
    const wrapper = document.querySelector('.reveal-wrapper');
    const footer = document.querySelector('.footer');

    const handleFooterReveal = () => {
        if (!wrapper || !footer) return;

        const wrapperRect = wrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress goes from 0 to 1 as we scroll past the contact section
        // wrapperRect.top will be 0 when we reach contact, and -windowHeight when finished
        let progress = Math.abs(wrapperRect.top) / windowHeight;
        
        // Only start calculating when contact section is pinned (top <= 0)
        if (wrapperRect.top <= 0) {
            progress = Math.min(Math.max(progress, 0), 1);
            footer.style.transform = `translateY(${(1 - progress) * 100}%)`;
            footer.style.visibility = 'visible';
        } else {
            footer.style.transform = `translateY(100%)`;
            footer.style.visibility = 'hidden';
        }
    };

    window.addEventListener('scroll', handleFooterReveal);
});