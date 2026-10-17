const differenceStage = document.querySelector(".coordination-stage");
const differenceStatus = document.querySelector(".coordination-status");
const differenceSteps = [
  [
    "01",
    "Begin with your priorities.",
    "Every professional works from the life you are actually building.",
  ],
  [
    "02",
    "DWP organizes the whole picture.",
    "Questions, decisions, and responsibilities meet at one central point.",
  ],
  [
    "03",
    "The right specialists move together.",
    "Each expert keeps their role while the advice stays connected.",
  ],
];

if (
  differenceStage &&
  differenceStatus &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  let activeDifferenceStep = 0;
  const setDifferenceStep = (step) => {
    activeDifferenceStep = step;
    differenceStage.dataset.active = String(step);
    const [number, title, copy] = differenceSteps[step];
    differenceStatus.innerHTML = `<span>${number}</span><p><strong>${title}</strong> ${copy}</p>`;
  };
  setDifferenceStep(0);
  const differenceObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      setDifferenceStep(0);
      window.setTimeout(() => setDifferenceStep(1), 900);
      window.setTimeout(() => setDifferenceStep(2), 1800);
    },
    { threshold: 0.45 },
  );
  differenceObserver.observe(differenceStage);
}
