const form = document.getElementById("onboardingForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const domain = document.getElementById("domain");
const radios = document.querySelectorAll('input[name="chronotype"]');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const story = document.getElementById("story");
const counter = document.getElementById("counter");
const fullnameError = document.getElementById("fullnameError");
const emailError = document.getElementById("emailError");
const domainError = document.getElementById("domainError");
const radioError = document.getElementById("radioError");
const checkboxError = document.getElementById("checkboxError");
const storyError = document.getElementById("storyError");
const container = document.getElementById("contenu")
const userCardContainer = document.getElementById("userCardContainer");


// validation nom
function validateFullname() {

    const value = fullname.value.trim();

    if (value.length < 3) {

        fullname.classList.add("is-invalid");

        fullname.classList.remove("is-valid");

        fullnameError.textContent =
            "Le nom doit contenir au moins 3 caractères.";

        return false;
    }

    fullname.classList.remove("is-invalid");

    fullname.classList.add("is-valid");

    fullnameError.textContent = "";

    return true;
}
// validation email
function validateEmail() {

    const value = email.value.trim();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(value)) {

        email.classList.add("is-invalid");
        email.classList.remove("is-valid");

        emailError.textContent =
            "Veuillez saisir une adresse email valide.";

        return false;
    }

    email.classList.remove("is-invalid");
    email.classList.add("is-valid");

    emailError.textContent = "";

    return true;
}
//validation select
function validateDomain() {

    if (domain.value === "") {

        domain.classList.add("is-invalid");
        domain.classList.remove("is-valid");

        domainError.textContent =
            "Veuillez sélectionner un domaine.";

        return false;
    }

    domain.classList.remove("is-invalid");
    domain.classList.add("is-valid");

    domainError.textContent = "";

    return true;
}
// validation radio
function validateRadio() {

    let checked = false;

    for (const radio of radios) {

        if (radio.checked) {
            checked = true;
            break;
        }
    }

    if (!checked) {

        radioError.textContent =
            "Veuillez choisir une option.";

        return false;
    }

    radioError.textContent = "";

    return true;
}

// validation checkbox
function validateCheckboxes() {

    let count = 0;

    for (const checkbox of checkboxes) {

        if (checkbox.checked) {
            count++;
        }
    }

    if (count < 2) {

        checkboxError.textContent =
            "Veuillez sélectionner au moins 2 centres d'intérêt.";

        return false;
    }

    checkboxError.textContent = "";

    return true;
}
// Pour informer à l'utilisateur le nombre de mot qui lui reste à saisir
function updateCounter() {

    const remaining =
        255 - story.value.length;

    counter.textContent =
        `${remaining} caractères restants`;

}
story.addEventListener("input", updateCounter);
// Pour controller le nombre de caratère saisie et si le formulaire est vide

function validateStory() {

    const value =
        story.value.trim();

    if (value.length < 25) {

        story.classList.add("is-invalid");
        story.classList.remove("is-valid");

        storyError.textContent =
            "Le texte doit contenir au moins 25 caractères.";

        return false;
    }

    story.classList.remove("is-invalid");
    story.classList.add("is-valid");

    storyError.textContent = "";

    return true;
}
// cette fonction affiche et récupère les données dans la carte
function displayUserCard() {

    const interests = [];

    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            interests.push(checkbox.value);
        }
    }

    let chronotype = "";

    for (const radio of radios) {
        if (radio.checked) {
            chronotype = radio.nextElementSibling.textContent;
        }
    }

    userCardContainer.innerHTML = `
        <div class="card shadow-lg border-0">
            <div class="card-header bg-primary text-white">
                <h3 class="mb-0">
                    Profil de l'apprenant
                </h3>
            </div>
            <div class="card-body">

                <h4 class="card-title mb-4">
                    ${fullname.value}
                </h4>

                <p>
                    <strong>📧 Email :</strong>
                    ${email.value}
                </p>

                <p>
                    <strong>💻 Domaine :</strong>
                    ${domain.options[domain.selectedIndex].text}
                </p>

                <p>
                    <strong>⏰ Chronotype :</strong>
                    ${chronotype}
                </p>

                <p>
                    <strong>🎯 Centres d'intérêt :</strong>
                </p>

                <div class="mb-3">
                    ${interests.map(interest =>
                        `<span class="badge bg-primary me-2">${interest}</span>`
                    )}
                </div>

                <hr>

                <h5>🚀 Présentation</h5>

                <p class="text-muted">
                    ${story.value}
                </p>

            </div>
        </div>
    `;
}

fullname.addEventListener("blur", validateFullname);
email.addEventListener("blur", validateEmail);
domain.addEventListener("blur", validateDomain);
story.addEventListener("blur", validateStory);

form.addEventListener("submit", function(event){

    event.preventDefault();

    const isFullnameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isDomainValid = validateDomain();
    const isRadioValid = validateRadio();
    const isCheckboxesValid = validateCheckboxes();
    const isStoryValid = validateStory();
    if (isFullnameValid && isEmailValid && isDomainValid && isRadioValid &&
        isCheckboxesValid && isStoryValid) {
        displayUserCard()
        const msg = document.getElementById("success-message");
        msg.style.display = "flex";

        setTimeout(() => {
            msg.style.display = "none";
        }, 3000);
        form.reset();
    }
});