const themeButton = document.getElementById("themeButton");
const pageBody = document.body;
const revealItems = document.querySelectorAll(".reveal");

function applyTheme(theme) {
    const activeTheme = theme === "light" ? "light" : "dark";
    const nextTheme = activeTheme === "dark" ? "light" : "dark";

    pageBody.setAttribute("data-theme", activeTheme);
    localStorage.setItem("gladiator-theme", activeTheme);

    if (themeButton) {
        themeButton.textContent = activeTheme === "dark" ? "Dark Mode" : "Light Mode";
        themeButton.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
        themeButton.setAttribute("aria-pressed", String(activeTheme === "light"));
    }
}

if (themeButton) {
    themeButton.addEventListener("click", () => {
        const currentTheme = pageBody.getAttribute("data-theme") || "dark";
        applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
}

const storedTheme = localStorage.getItem("gladiator-theme") || "dark";
applyTheme(storedTheme);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18
    });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}
