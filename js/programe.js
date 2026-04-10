const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");
const themeBtn = document.getElementById("themeButton");
const body = document.body;

function activateTab(target) {
    tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.tab === target);
    });

    panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === target);
    });
}

function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    themeBtn.textContent = theme === "dark" ? "Dark" : "Light";
    localStorage.setItem("gladiator-theme", theme);
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        activateTab(tab.dataset.tab);
    });
});

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme") || "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    });

    const savedTheme = localStorage.getItem("gladiator-theme") || "dark";
    setTheme(savedTheme);
}

const activeTab = document.querySelector(".tab-btn.active")?.dataset.tab || "strength";
activateTab(activeTab);
