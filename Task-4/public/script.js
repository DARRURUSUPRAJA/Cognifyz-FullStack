const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const aboutInput = document.getElementById("about");
const termsInput = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const courseError = document.getElementById("courseError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const aboutError = document.getElementById("aboutError");
const termsError = document.getElementById("termsError");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const lengthRule = document.getElementById("lengthRule");
const upperRule = document.getElementById("upperRule");
const numberRule = document.getElementById("numberRule");
const specialRule = document.getElementById("specialRule");

const characterCount = document.getElementById("characterCount");
const formMessage = document.getElementById("formMessage");


// Password strength checker

passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;

    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    updateRule(lengthRule, hasLength, "At least 8 characters");
    updateRule(
        upperRule,
        hasUppercase,
        "At least one uppercase letter"
    );
    updateRule(
        numberRule,
        hasNumber,
        "At least one number"
    );
    updateRule(
        specialRule,
        hasSpecial,
        "At least one special character"
    );

    let score = 0;

    if (hasLength) score++;
    if (hasUppercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    if (password.length === 0) {

        strengthFill.style.width = "0%";
        strengthText.textContent =
            "Password strength: Not entered";

    } else if (score === 1) {

        strengthFill.style.width = "25%";
        strengthText.textContent =
            "Password strength: Weak";

    } else if (score === 2) {

        strengthFill.style.width = "50%";
        strengthText.textContent =
            "Password strength: Fair";

    } else if (score === 3) {

        strengthFill.style.width = "75%";
        strengthText.textContent =
            "Password strength: Good";

    } else {

        strengthFill.style.width = "100%";
        strengthText.textContent =
            "Password strength: Strong";
    }

    checkConfirmPassword();

});


// Update password rules dynamically

function updateRule(element, valid, text) {

    if (valid) {
        element.textContent = "✓ " + text;
        element.classList.add("valid");
    } else {
        element.textContent = "✗ " + text;
        element.classList.remove("valid");
    }
}


// Confirm password

confirmInput.addEventListener("input", checkConfirmPassword);

function checkConfirmPassword() {

    if (confirmInput.value === "") {

        confirmError.textContent = "";

        return;
    }

    if (confirmInput.value !== passwordInput.value) {

        confirmError.textContent =
            "Passwords do not match.";

    } else {

        confirmError.textContent =
            "Passwords match.";

        confirmError.classList.add("success-text");
    }
}


// Character counter

aboutInput.addEventListener("input", () => {

    const currentLength = aboutInput.value.length;

    characterCount.textContent = currentLength;

    if (currentLength >= 130) {

        characterCount.classList.add("limit-warning");

    } else {

        characterCount.classList.remove("limit-warning");

    }
});


// Real-time name validation

nameInput.addEventListener("input", () => {

    if (nameInput.value.trim().length >= 3) {

        nameError.textContent = "";

    } else {

        nameError.textContent =
            "Name must contain at least 3 characters.";
    }
});


// Real-time email validation

emailInput.addEventListener("input", () => {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailInput.value.trim())) {

        emailError.textContent = "";

    } else {

        emailError.textContent =
            "Please enter a valid email address.";
    }
});


// Course selection

courseInput.addEventListener("change", () => {

    if (courseInput.value !== "") {

        courseError.textContent = "";

        courseInput.classList.add("valid-input");

    } else {

        courseError.textContent =
            "Please select a course.";

        courseInput.classList.remove("valid-input");
    }
});


// Terms checkbox

termsInput.addEventListener("change", () => {

    if (termsInput.checked) {

        termsError.textContent = "";

    } else {

        termsError.textContent =
            "You must agree to the terms.";
    }
});


// Complete form validation

form.addEventListener("submit", (event) => {

    event.preventDefault();

    let isValid = true;

    clearErrors();


    // Name validation

    if (nameInput.value.trim().length < 3) {

        nameError.textContent =
            "Name must contain at least 3 characters.";

        isValid = false;
    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;
    }


    // Course validation

    if (courseInput.value === "") {

        courseError.textContent =
            "Please select a course.";

        isValid = false;
    }


    // Password validation

    const password = passwordInput.value;

    const strongPassword =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);

    if (!strongPassword) {

        passwordError.textContent =
            "Please satisfy all password requirements.";

        isValid = false;
    }


    // Confirm password validation

    if (
        confirmInput.value === "" ||
        confirmInput.value !== passwordInput.value
    ) {

        confirmError.textContent =
            "Passwords must match.";

        isValid = false;
    }


    // About validation

    if (aboutInput.value.trim().length < 10) {

        aboutError.textContent =
            "Please enter at least 10 characters.";

        isValid = false;
    }


    // Terms validation

    if (!termsInput.checked) {

        termsError.textContent =
            "You must agree to the terms.";

        isValid = false;
    }


    // Final result

    if (isValid) {

        formMessage.textContent =
            "Registration completed successfully!";

        formMessage.className =
            "form-message success";

        setTimeout(() => {

            window.location.href = "/profile";

        }, 1000);

    } else {

        formMessage.textContent =
            "Please correct the highlighted fields.";

        formMessage.className =
            "form-message error-message";
    }

});


// Clear all error messages

function clearErrors() {

    nameError.textContent = "";
    emailError.textContent = "";
    courseError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";
    aboutError.textContent = "";
    termsError.textContent = "";

    confirmError.classList.remove("success-text");
}