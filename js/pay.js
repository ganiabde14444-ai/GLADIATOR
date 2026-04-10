const payForm = document.getElementById("payForm");
const tierButtons = document.querySelectorAll(".p-btn");
const tierCards = document.querySelectorAll("[data-tier-card]");
const cardPreview = document.getElementById("card-viz");
const tierLabel = document.getElementById("tier-label");
const tierPrice = document.getElementById("tier-price");
const cardNameDisplay = document.getElementById("card-name-disp");
const cardNumberDisplay = document.getElementById("card-num-disp");
const cardExpDisplay = document.getElementById("card-exp-disp");
const nameInput = document.getElementById("in-name");
const numberInput = document.getElementById("in-num");
const expInput = document.getElementById("in-exp");
const cvvInput = document.getElementById("in-cvv");
const errorMessage = document.getElementById("errorMessage");
const successLayer = document.getElementById("success-layer");
const submitButton = document.getElementById("submitButton");

const tierConfig = {
    gold: {
        label: "GOLD ACCESS",
        price: "$69 / MONTH",
        accentColor: "var(--gold)",
        goldMode: true
    },
    elite: {
        label: "ELITE ACCESS",
        price: "$129 / MONTH",
        accentColor: "var(--accent)",
        goldMode: false
    }
};

let selectedTier = "gold";

function setTier(tier) {
    const config = tierConfig[tier] || tierConfig.gold;
    selectedTier = tier in tierConfig ? tier : "gold";

    tierButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.tier === selectedTier);
    });

    tierCards.forEach((card) => {
        card.classList.toggle("active", card.dataset.tierCard === selectedTier);
    });

    tierLabel.textContent = config.label;
    tierLabel.style.color = config.accentColor;
    tierPrice.textContent = config.price;
    cardPreview.classList.toggle("gold-mode", config.goldMode);

    localStorage.setItem("gladiator-tier", selectedTier);
}

function formatCardNumber(value) {
    return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length < 3) {
        return digits;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function syncCardPreview() {
    const cardName = nameInput.value.trim().toUpperCase() || "YOUR NAME";
    const cardNumber = formatCardNumber(numberInput.value);
    const cardExpiry = formatExpiry(expInput.value) || "MM/YY";

    numberInput.value = cardNumber;
    expInput.value = cardExpiry;

    cardNameDisplay.textContent = cardName;
    cardNumberDisplay.textContent = cardNumber || "#### #### #### ####";
    cardExpDisplay.textContent = cardExpiry;
}

function showError(message, fields = []) {
    errorMessage.hidden = false;
    errorMessage.textContent = message;

    [nameInput, numberInput, expInput, cvvInput].forEach((field) => {
        field.classList.remove("input-error");
    });

    fields.forEach((field) => field.classList.add("input-error"));
}

function clearError() {
    errorMessage.hidden = true;
    errorMessage.textContent = "";
    [nameInput, numberInput, expInput, cvvInput].forEach((field) => {
        field.classList.remove("input-error");
    });
}

function isValidExpiry(value) {
    const match = /^(\d{2})\/(\d{2})$/.exec(value);
    if (!match) {
        return false;
    }

    const month = Number(match[1]);
    const year = Number(match[2]);

    if (month < 1 || month > 12) {
        return false;
    }

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    return year > currentYear || (year === currentYear && month >= currentMonth);
}

function validateForm() {
    const nameValue = nameInput.value.trim();
    const numberValue = numberInput.value.replace(/\s/g, "");
    const expiryValue = expInput.value.trim();
    const cvvValue = cvvInput.value.replace(/\D/g, "");

    if (nameValue.length < 3) {
        showError("Enter the full name shown on the card.", [nameInput]);
        return false;
    }

    if (!/^\d{16}$/.test(numberValue)) {
        showError("Enter a 16-digit card number.", [numberInput]);
        return false;
    }

    if (!isValidExpiry(expiryValue)) {
        showError("Enter a valid expiry date that has not passed.", [expInput]);
        return false;
    }

    if (!/^\d{3,4}$/.test(cvvValue)) {
        showError("Enter a valid 3 or 4 digit security code.", [cvvInput]);
        return false;
    }

    clearError();
    return true;
}

tierButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setTier(button.dataset.tier);
    });
});

[nameInput, numberInput, expInput].forEach((input) => {
    input.addEventListener("input", syncCardPreview);
});

[nameInput, numberInput, expInput, cvvInput].forEach((input) => {
    input.addEventListener("input", clearError);
});

payForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Processing...";
    localStorage.setItem("gladiator-tier", selectedTier);

    setTimeout(() => {
        successLayer.classList.add("show");

        setTimeout(() => {
            window.location.href = "programe.html";
        }, 1700);
    }, 900);
});

const queryTier = new URLSearchParams(window.location.search).get("tier");
const storedTier = localStorage.getItem("gladiator-tier");

setTier(queryTier || storedTier || "gold");
syncCardPreview();
