import "./css-reset.css";
import "./template.css";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData);
        console.log(formDataObj);
    });
});