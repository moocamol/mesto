const popupButton = document.querySelector(".button__edit");
const closeButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const formElement = document.querySelector(".popup__input-container");
const nameInput = document.querySelector(".popup__input-item[placeholder=name]");
const professionInput = document.querySelector(".popup__input-item[placeholder=profession]");

function togglePopup() {
    event.stopPropagation();
    popup.classList.toggle("popup_is-opened");
    nameInput.value = profileName.textContent
    professionInput.value = profileProfession.textContent
}

popupButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
