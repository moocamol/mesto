const popupButtonEdit = document.querySelector('.profile__button-edit');
const popupButtonAdd = document.querySelector('.profile__button-add');
const closeButtons = document.querySelectorAll('.popup__close');

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

const popupBigImage = document.querySelector('.popup_type_big-img')
const popupBigImgFigure = document.querySelector('.popup__figure-img');
const popupCapture = document.querySelector('.popup__figcaption');

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
};

function hendleUserSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    closePopup(popupProfile);
};

function openBigImgPopup(evt) {
    popupBigImgFigure.alt = evt.target.alt;
    popupBigImgFigure.src = evt.target.src;
    popupCapture.textContent = evt.target.alt;
    openPopup(popupBigImage);
};

function createPlace(name, link, alt) {
    const newPlace = placeTemplate.content.firstElementChild.cloneNode(true);
    newPlace.querySelector('.place__title').innerText = name;
    newPlace.querySelector('.place__image').src = link;
    newPlace.querySelector('.place__image').alt = name;

    newPlace.querySelector('.place__remove').addEventListener('click', evt => {
        evt.target.closest('.place__item').remove();
    });

    newPlace.querySelector('.place__like').addEventListener('click', evt => {
        evt.target.classList.toggle('place__like_active');
    });

    newPlace.querySelector('.place__image').addEventListener('click', (evt) => openBigImgPopup(evt));

    return newPlace
};

function addNewPlace(newPlace) {
    const firstPlaceItem = document.querySelector('.place__item');
    if (!firstPlaceItem) {
        placeList.append(newPlace);
    } else {
        firstPlaceItem.before(newPlace);
    };
}

popupButtonEdit.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;
    openPopup(popupProfile)
});
popupButtonAdd.addEventListener('click', () => openPopup(popupNewPlace));

profileForm.addEventListener('submit', hendleUserSubmit);

closeButtons.forEach(closeButton => {
    const popup = closeButton.closest('.popup');
    closeButton.addEventListener('click', () => closePopup(popup));
});

placeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closePopup(popupNewPlace);
    addNewPlace(
        createPlace(placeNameInput.value, placeUrlInput.value)
    );
    placeForm.reset();
});

initialCards.reverse().forEach(place => {
    addNewPlace(
        createPlace(place.name, place.link, place.alt)
    );
});


