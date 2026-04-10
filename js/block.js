const previewButton = document.getElementById("previewButton");
const lockScreen = document.getElementById("lock-screen");
const mainWrapper = document.getElementById("main-wrapper");
const blockThemeButton = document.getElementById("themeButton");
const blockTabs = document.querySelectorAll(".tab-btn");
const blockPanels = document.querySelectorAll(".tab-panel");
const blockRevealItems = document.querySelectorAll(".reveal");

function setBlockTheme(theme) {
    const activeTheme = theme === "light" ? "light" : "dark";
    const nextTheme = activeTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", activeTheme);
    localStorage.setItem("gladiator-theme", activeTheme);

    if (blockThemeButton) {
        blockThemeButton.textContent = activeTheme === "dark" ? "Dark Mode" : "Light Mode";
        blockThemeButton.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
        blockThemeButton.setAttribute("aria-pressed", String(activeTheme === "light"));
    }
}

function activateBlockTab(targetId) {
    blockTabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.tab === targetId);
    });

    blockPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === targetId);
    });
}

function unlockPreview() {
    if (lockScreen) {
        lockScreen.classList.add("is-hidden");
    }

    if (mainWrapper) {
        mainWrapper.classList.add("is-active");
    }
}

if (previewButton) {
    previewButton.addEventListener("click", unlockPreview);
}

if (blockThemeButton) {
    blockThemeButton.addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("data-theme") || "dark";
        setBlockTheme(currentTheme === "dark" ? "light" : "dark");
    });
}

blockTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        activateBlockTab(tab.dataset.tab);
    });
});

setBlockTheme(localStorage.getItem("gladiator-theme") || "dark");
activateBlockTab(document.querySelector(".tab-btn.active")?.dataset.tab || "strength");

if ("IntersectionObserver" in window) {
    const blockObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                blockObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18
    });

    blockRevealItems.forEach((item) => blockObserver.observe(item));
} else {
    blockRevealItems.forEach((item) => item.classList.add("is-visible"));
}
