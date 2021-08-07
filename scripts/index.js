const popupButtonEdit = document.querySelector('.profile__button-edit');
const popupButtonAdd = document.querySelector('.profile__button-add');
const closeButtons = document.querySelectorAll('.popup__close');
const likeButtons = document.querySelectorAll('.place__like');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = document.querySelector('.popup__input-container[name=profile]');
const nameInput = document.querySelector('.popup__input-item[name=name]');
const professionInput = document.querySelector('.popup__input-item[name=profession]');

const placeTemplate = document.getElementById('place__template');
const placeList = document.querySelector('.place');
const placeForm = document.querySelector('.popup__input-container[name=place]')
const placeNameInput = document.querySelector('.popup__input-item[name=place-name]');
const placeUrlInput = document.querySelector('.popup__input-item[name=url]');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];

const popupBigImg = document.querySelector('.popup__figure-img');
const popupCapture = document.querySelector(".popup__figcaption");

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
};

function closePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_is-opened');
};

function formSubmitUser(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    closePopup(evt);
};

function lookPlace(evt) {
    const picAlt = evt.target.getAttribute('alt');
    const picSrc = evt.target.getAttribute('src');
    popupBigImg.setAttribute('alt', picAlt);
    popupBigImg.setAttribute('src', picSrc);
    popupCapture.textContent = picAlt;
    openPopup(document.querySelector('#popup__big-img'));
};

function createPlace(name, link, alt) {
    const newPlace = placeTemplate.content.firstElementChild.cloneNode(true);
    newPlace.querySelector('.place__title').innerText = name;
    newPlace.querySelector('.place__image').src = link;
    newPlace.querySelector('.place__image').alt = name;
    const firstPlaceItem = document.querySelector('.place__item');
    if (!firstPlaceItem) {
        placeList.append(newPlace);
    } else {
        firstPlaceItem.before(newPlace);
    };

    newPlace.querySelector('.place__remove').addEventListener('click', evt => {
        evt.target.closest('.place__item').remove();
    });

    newPlace.querySelector('.place__like').addEventListener('click', evt => {
        evt.target.classList.toggle('place__like_active');
    });

    newPlace.querySelector('.place__image').addEventListener('click', (evt) => {
        openPopup(document.querySelector('#popup__big-img'));
        lookPlace(evt);
    });
};

popupButtonEdit.addEventListener('click', () => openPopup(document.querySelector('#popup__profile')));
popupButtonAdd.addEventListener('click', () => openPopup(document.querySelector('#popup__new-place')));

formElement.addEventListener('submit', formSubmitUser);

closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', (evt) => closePopup(evt));
});

placeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createPlace(placeNameInput.value, placeUrlInput.value);
    closePopup(evt);
});

initialCards.reverse().forEach(place => {
    createPlace(place.name, place.link, place.alt);
});


