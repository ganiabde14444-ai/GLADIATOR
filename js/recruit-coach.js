const inputIds = ["name", "title", "experience", "photo", "tags", "bio"];
const elements = {};

inputIds.forEach((id) => {
    elements[id] = document.getElementById(id);
});

const previews = {
    name: document.getElementById("previewName"),
    meta: document.getElementById("previewMeta"),
    tags: document.getElementById("previewTags"),
    bio: document.getElementById("previewBio"),
    media: document.getElementById("previewMedia")
};

const themeButton = document.getElementById("themeButton");
const body = document.body;

function updatePreview() {
    previews.name.textContent = elements.name.value.trim() || "Marcus Vela";
    previews.meta.textContent = `${elements.title.value.trim() || "Head Strength Coach"} | ${elements.experience.value.trim() || "12 Years"}`;
    previews.bio.textContent = elements.bio.value.trim() || "Builds powerful athletes through technical lifting and smart progression.";

    if (elements.photo.value.trim()) {
        previews.media.style.backgroundImage = `url('${elements.photo.value.trim()}')`;
    }

    const tags = elements.tags.value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

    previews.tags.innerHTML = tags.length
        ? tags.map((tag) => `<span class="tag">${tag}</span>`).join("")
        : '<span class="tag">Strength</span><span class="tag">Conditioning</span>';
}

function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    themeButton.textContent = theme === "dark" ? "Dark" : "Light";
    localStorage.setItem("gladiator-recruit-theme", theme);
}

inputIds.forEach((id) => {
    elements[id].addEventListener("input", updatePreview);
});

document.getElementById("coachForm").addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("notice").textContent = "Coach staged successfully for the roster.";
});

if (themeButton) {
    const savedTheme = localStorage.getItem("gladiator-recruit-theme") || "dark";
    setTheme(savedTheme);

    themeButton.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme") || "dark";
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
}

updatePreview();
