const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    nav.classList.toggle("open", open);
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }),
  );
}

// Shared tax-impact mission floater for every route outside the homepage,
// where the same component is rendered and controlled by app.js.
if (!document.querySelector("#impact-sticky")) {
  const currentImpact = 353000000;
  const impactGoal = 1000000000;
  const impactPercentage = (currentImpact / impactGoal) * 100;
  const formattedImpact = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(currentImpact);
  const impactSticky = document.createElement("aside");
  impactSticky.className = "impact-sticky";
  impactSticky.id = "impact-sticky";
  impactSticky.setAttribute("aria-label", "Tax-impact mission progress");
  impactSticky.style.setProperty(
    "--impact-progress",
    impactPercentage.toFixed(2),
  );
  impactSticky.innerHTML = `
    <div class="impact-sticky-inner">
      <div class="impact-sticky-label">
        <span>THE $1B TAX-IMPACT MISSION</span>
        <strong>${formattedImpact} verified</strong>
      </div>
      <div class="impact-sticky-meter" role="progressbar" aria-label="Verified tax-impact progress" aria-valuemin="0" aria-valuemax="${impactGoal}" aria-valuenow="${currentImpact}" aria-valuetext="${formattedImpact} verified — ${impactPercentage.toFixed(1)}% of goal">
        <div class="impact-sticky-fill"></div>
        <div class="impact-sticky-signal"></div>
        <div class="impact-sticky-thermometer" aria-hidden="true"><i></i><b>$</b></div>
      </div>
      <a class="impact-sticky-cta" href="/contact/">Become our next success story <span>↗</span></a>
      <button class="impact-sticky-close" type="button" aria-label="Dismiss tax-impact progress banner">×</button>
    </div>`;
  document.body.append(impactSticky);

  let impactDismissed = false;
  let impactScrollQueued = false;
  const updateSharedImpact = () => {
    const shortPage =
      document.documentElement.scrollHeight <= window.innerHeight * 1.4;
    const shouldShow =
      !impactDismissed &&
      (shortPage || window.scrollY > window.innerHeight * 0.4);
    impactSticky.classList.toggle("is-visible", shouldShow);
    impactScrollQueued = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!impactScrollQueued) {
        impactScrollQueued = true;
        window.requestAnimationFrame(updateSharedImpact);
      }
    },
    { passive: true },
  );
  impactSticky
    .querySelector(".impact-sticky-close")
    ?.addEventListener("click", () => {
      impactDismissed = true;
      impactSticky.classList.remove("is-visible");
    });
  impactSticky
    .querySelector(".impact-sticky-cta")
    ?.addEventListener("click", () =>
      impactSticky.classList.remove("is-visible"),
    );
  window.setTimeout(updateSharedImpact, 650);
}
