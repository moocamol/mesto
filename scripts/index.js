import { Card } from "./Card.js";
import { initialCards } from "./initial-сards.js";
import { validFormKeys } from "./validFormKeys.js";
import { FormValidator } from "./FormValidator.js";

const popups = document.querySelectorAll('.popup')

const popupButtonEdit = document.querySelector('.profile__button-edit');
const popupButtonAdd = document.querySelector('.profile__button-add');

const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const profileForm = popupProfile.querySelector('.popup__input-container');
const nameInput = profileForm.querySelector('.popup__input-item[name=name]');
const professionInput = profileForm.querySelector('.popup__input-item[name=profession]');

const popupNewPlace = document.querySelector('.popup_type_new-place');
const placeTemplate = document.getElementById('place__template');
const placeList = document.querySelector('.place');
const placeForm = popupNewPlace.querySelector('.popup__input-container')
const placeNameInput = placeForm.querySelector('.popup__input-item[name=name]');
const placeUrlInput = placeForm.querySelector('.popup__input-item[name=url]');

document.addEventListener("DOMContentLoaded", () => {
    popups.forEach(popup => {
        setTimeout(() => {
            popup.classList.remove('popup_display-none')
        },
        1000)
    })
});

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
};

popups.forEach((popup) => {                                     
    popup.addEventListener('click', (evt) => {                   
        if (evt.target.classList.contains('popup_is-opened')) {     
            closePopup(popup)                                    
        }                                                        
        if (evt.target.classList.contains('popup__close')) {     
          closePopup(popup)                                      
        }
    })
})

function hendleUserSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    closePopup(popupProfile);
};



function createPlace(name, link) {
    const newPlace = new Card(name, link, 'place__template')
    return newPlace.getElement()
};

function addNewPlace(newPlace, toStart=false) {
    if (toStart ) {
        placeList.prepend(newPlace);
    } else {
        placeList.append(newPlace);
    };
};

popupButtonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;


    profileFormValidator.checkValid(nameInput)
    profileFormValidator.checkValid(professionInput)
    
    openPopup(popupProfile)
});

popupButtonAdd.addEventListener('click', () => {
    openPopup(popupNewPlace)
    placeFormValidator.toggleButtonState(placeForm, validFormKeys)
});

profileForm.addEventListener('submit', hendleUserSubmit);

placeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closePopup(popupNewPlace);
    addNewPlace(
        createPlace(placeNameInput.value, placeUrlInput.value), 'true'
    );
    placeForm.reset();
});

initialCards.forEach(place => {    
        addNewPlace(
        createPlace(place.name, place.link, place.alt)
    );
});

const placeFormValidator = new FormValidator(validFormKeys, placeForm);
placeFormValidator.enableValidation()

const profileFormValidator = new FormValidator(validFormKeys, profileForm);
profileFormValidator.enableValidation()
