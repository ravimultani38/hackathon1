document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Gather form data
        const formData = new FormData(registerForm);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            college: formData.get("college"),
            mobile: formData.get("mobile"),
            preference: formData.getAll("preference")
        };

        try {
            // Send POST request to /register
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Registration successful:", result);
                alert("Registration successful!");
                registerForm.reset(); // Clear the form after successful registration
            } else {
                const error = await response.json();
                console.error("Registration error:", error);
                alert("Registration failed: " + error.error);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed: " + error.message);
        }
    });
});
