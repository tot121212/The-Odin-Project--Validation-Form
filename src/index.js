import "./css-reset.css";
import "./template.css";

const emailConstraints = {
    "^[a-zA-Z0-9._%+-]+": "Email must start with letters, numbers, or special characters like '.', '_', '%', '+', or '-'.", 
    "@": "Email must contain the '@' symbol.", 
    "[a-zA-Z0-9.-]+": "Email domain must contain valid characters (letters, numbers, dots, hyphens).", 
    "\\.[a-zA-Z]{2,}$": "Email must end with a valid top-level domain (e.g., '.com', '.org')."
};

const validateEmail = ()=>{
    const emailElement = document.querySelector("#email");
    const email = emailElement.value;

    for (const [key, value] of Object.entries(emailConstraints)) {
        const constraint = new RegExp(key, "");
        if (!constraint.test(email)) {
            emailElement.setCustomValidity(value);
            emailElement.reportValidity();
            return;
        }
    }
    emailElement.setCustomValidity("");
    emailElement.reportValidity();
    console.log("Email is valid: ", email);
}

const postalCodeConstraints =  {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
};

const validateCountry = () => {
    const countryElement = document.querySelector("#country");
    const country = countryElement.value;
    console.log("Country:", country);
    if (Object.keys(postalCodeConstraints).includes(country)){
        countryElement.setCustomValidity("");
        countryElement.reportValidity();
        console.log("Country is valid: ", country);
        return true;
    } else {
        countryElement.setCustomValidity("Cannot leave country empty");
        countryElement.reportValidity();
        return false;
    }
};

const validatePostalCode = ()=>{
    const countryElement = document.querySelector("#country");
    const country = countryElement.value;
    const postalCodeElement = document.querySelector("#postal-code");
    const postalCode = postalCodeElement.value;

    const constraint = new RegExp(postalCodeConstraints[country][0], "");
    console.log("Constraint used:",constraint);

    // if postalcode matches the countries regex
    if (constraint.test(postalCode)) {
        postalCodeElement.setCustomValidity("");
        console.log("Postal code is valid: ",postalCode);
    } else {
        postalCodeElement.setCustomValidity(postalCodeConstraints[country][1]);
    }
    postalCodeElement.reportValidity();
}

const passwordConstraints = {
    "^(?=.*[a-z])": "Password must contain at least one lowercase letter",
    "^(?=.*[A-Z])": "Password must contain at least one uppercase letter",
    "^(?=.*\\d)": "Password must contain at least one digit",
    "^(?=.*[@$!%*?&])": "Password must contain at least one special character",
    ".{8,}": "Password must be at least 8 characters long",
};

const validatePassword = ()=>{
    const passwordElement = document.querySelector("#password");
    const password = passwordElement.value;
    for (const [key, value] of Object.entries(passwordConstraints)) {
        const constraint = new RegExp(key, "");
        if (!constraint.test(password)) {
            passwordElement.setCustomValidity(value);
            passwordElement.reportValidity();
            return;
        }
    }
    passwordElement.setCustomValidity("");
    passwordElement.reportValidity();

    const isInput = false;
    validatePasswordConfirmation(isInput);
}

const validatePasswordConfirmation = (isInput)=>{
    const passwordElement = document.querySelector("#password");
    const password = passwordElement.value;
    const passwordConfirmationElement = document.querySelector("#password-confirmation");
    const passwordConfirmation = passwordConfirmationElement.value;
    if (password === passwordConfirmation) {
        passwordConfirmationElement.setCustomValidity("");
        console.log("Passwords match: ", password, passwordConfirmation);
    } else {
        passwordConfirmationElement.setCustomValidity("Passwords do not match");
    }
    if (isInput){
        passwordConfirmationElement.setCustomValidity("");
    } else {
        console.log("Reporting password confirmation validity");
        passwordConfirmationElement.reportValidity();
    }
}

const validateForm = (e)=>{
    e.preventDefault();
    validateEmail();
    validateCountry();
    validatePostalCode();
    validatePassword();
    const isInput = false;
    validatePasswordConfirmation(isInput);

    const form = document.querySelector("form");
    if (form.checkValidity()){
        console.log("Form is valid");
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;  // Add the key-value pair to the object
        });
        console.log("Form data as object:", formObject);
    } else {
        console.log("Form is invalid");
    }
}

window.onload = () => {
    document.querySelector("#email").onchange = validateEmail;
    document.querySelector("#country").onchange = validateCountry;
    document.querySelector("#postal-code").onchange = validatePostalCode;
    document.querySelector("#password").onchange = validatePassword;
    document.querySelector("#password-confirmation").onchange = ()=>{
        const isInput = false;
        validatePasswordConfirmation(isInput);
    }
    document.querySelector("#password-confirmation").oninput = ()=>{
        const isInput = true;
        validatePasswordConfirmation(isInput);
    }

    document.querySelector("#submit").onclick = validateForm;

    document.querySelector("#email").value = "name@email.com";
    document.querySelector("#country").value = "ch";
    document.querySelector("#postal-code").value = "1234";
    document.querySelector("#password").value = "Abc1234!";
    document.querySelector("#password-confirmation").value = "Abc1234!";
};

