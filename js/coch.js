const themeButton = document.getElementById("themeButton");
const body = document.body;

function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    themeButton.textContent = theme === "dark" ? "Dark" : "Light";
    localStorage.setItem("gladiator-coach-theme", theme);
}

if (themeButton) {
    const savedTheme = localStorage.getItem("gladiator-coach-theme") || "dark";
    setTheme(savedTheme);

    themeButton.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme") || "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    });
}
