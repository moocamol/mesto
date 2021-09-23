import { openPopup } from "../pages/index.js";

const popupBigImage = document.querySelector('.popup_type_big-img')
const popupBigImgFigure = document.querySelector('.popup__figure-img');
const popupCapture = document.querySelector('.popup__figcaption');

export class Card {
    constructor(data, template) {
        this.name = data.name;
        this.link = data.link;

        this.element = this._createCard(template)
        this._setEventListeners()
    }

    getElement() {
        return this.element
    }

    _createCard(template) {
        const element = document
            .getElementById(template)
            .content
            .firstElementChild
            .cloneNode(true);

        this._titleElement = element.querySelector('.place__title');
        this._imageElement = element.querySelector('.place__image');
        this._likeButton = element.querySelector('.place__like');
        this._deleteButton = element.querySelector('.place__remove');

        this._titleElement.innerText = this.name;
        this._imageElement.src = this.link;
        this._imageElement.alt = this.name;

        return element
    }

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => this._remove());
        this._likeButton.addEventListener('click', (evt) => this._like(evt));
        this._imageElement.addEventListener('click', () => this._openBigImgPopup());
    }

    _remove() {
        this.element.remove()
    }


    _like(evt) {
        evt.target.classList.toggle('place__like_active');
    }

    _openBigImgPopup() {

        popupBigImgFigure.alt = this.name;
        popupBigImgFigure.src = this.link;
        popupCapture.textContent = this.name;
        openPopup(popupBigImage);
    }
}


