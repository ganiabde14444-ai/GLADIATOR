 const form = document.getElementById("resForm");
        const msg = document.getElementById("msg");
        const btn = document.getElementById("subBtn");
        const dateInput = document.getElementById("date");

        // Set min date to today
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;

        form.addEventListener("submit", e => {
            e.preventDefault();
            btn.textContent = "Processing...";
            btn.disabled = true;

            // Simulate API logic
            setTimeout(() => {
                msg.textContent = "SUCCESS: Your reservation is locked in. Check your email for confirmation.";
                msg.className = "success";
                btn.textContent = "Spot Secured";
                form.reset();
                dateInput.min = today;
            }, 1200);
        });