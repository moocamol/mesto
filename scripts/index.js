const popupButton = document.querySelector(".profile__button-edit");
const closeButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const formElement = document.querySelector(".popup__input-container");
const nameInput = document.querySelector(".popup__input-item[placeholder=name]");
const professionInput = document.querySelector(".popup__input-item[placeholder=profession]");

function clickEditButton() {
    event.stopPropagation();
    popup.classList.add("popup_is-opened");
    nameInput.value = profileName.textContent
    professionInput.value = profileProfession.textContent
}

function clickCloseButton() {
    popup.classList.remove("popup_is-opened");
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    clickCloseButton();
}

popupButton.addEventListener("click", clickEditButton);
closeButton.addEventListener("click", clickCloseButton);
formElement.addEventListener('submit', formSubmitHandler);
