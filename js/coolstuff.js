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
  console.log('Tiles found:', tiles.length);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('Intersecting:', entry.target, entry.isIntersecting);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.2
  });

  tiles.forEach(tile => observer.observe(tile));
});
