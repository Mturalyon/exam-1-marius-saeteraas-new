const contactForm = document.querySelector(".contact-form");                //targeting The Whole contact form

const nameInput = document.querySelector("#name");                          //targeting the NAME field.
const nameError = document.querySelector("#name-error");

const subjectInput = document.querySelector("#subject");                    //targeting the SUBJECT field.
const subjectError = document.querySelector("#subject-error");

const emailInput = document.querySelector("#email");                        //targeting the EMAIL field.
const emailError = document.querySelector("#email-error");

const textArea = document.querySelector("#message");                        //targeting TEXTAREA
const textError = document.querySelector("#message-error")

const submitButton = document.querySelector(".submit-btn");                 //targeting the SUBMIT button.

function formValidation(event) {
    event.preventDefault();                                                 //Prevent Default Behaviour of form

    let nameConfirm;
    let emailConfirm;
    let subjectConfirm;
    let messageConfirm;

    if (checkError(nameInput.value, 5)) {                                   //Name Error Check
        nameError.style.display = "none";
        nameConfirm = true;
    } else {
        nameError.style.display = "block";
        nameConfirm = false;
    };

    if (checkError(subjectInput.value, 15)) {                                //Subject Error Check
        subjectError.style.display = "none";
        subjectConfirm = true;
    } else {
        subjectError.style.display = "block";
        subjectConfirm = false;
    };

    if (checkError(textArea.value, 25)) {                                   //Textarea Error Check
        textError.style.display = "none";
        messageConfirm = true;
    } else {
        textError.style.display = "block";
        messageConfirm = false;
    };

    if (checkEmail(emailInput.value)) {                                     //Valid Email check
        emailError.style.display = "none";
        emailConfirm = true;
    } else {
        emailError.style.display = "block";
        emailConfirm = false;
    };

    if (nameConfirm & subjectConfirm & emailConfirm & messageConfirm) {                      //checking if all form passes validation
        contactForm.classList.add("complete-container");
        contactForm.innerHTML = `<div>
                                    <span class="fa-stack fa-5x">
                                        <i class="fas fa-circle fa-stack-1x check-b"></i>
                                        <i class="fas fa-check-circle fa-stack-1x fa-inverse check-a"></i>
                                    </span>
                                    <h1>Thank you!</h1>
                                    <p>We will shortly be back to you on:</p>
                                    <p><b>${emailInput.value}</b></p>
                                    <a href="../index.html" class="back-btn">DONE</a>
                                </div>`;//convert form to complete message
    };

};

function checkError(value, length) {                                        //returns a true or false statement if value is greater than length
    if (value.trim().length > length) {
        return true;
    } else {
        return false;
    };
};

function checkEmail(email) {                                                //checking if email is written correct.
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
};


contactForm.addEventListener("submit", formValidation);