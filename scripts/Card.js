import { openPopup } from "./index.js";

const popupBigImage = document.querySelector('.popup_type_big-img')
const popupBigImgFigure = document.querySelector('.popup__figure-img');
const popupCapture = document.querySelector('.popup__figcaption');

export class Card {
    constructor(name, link, template) {
        this.name = name;
        this.link = link;

        this.element = this._createCard(template)
        this._removeListener()
        this._likeListener()
        this._zoomListener()
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

        element.querySelector('.place__title').innerText = this.name;
        element.querySelector('.place__image').src = this.link;
        element.querySelector('.place__image').alt = this.name;

        return element
    }

    _removeListener() {

        const _remove = () => {
            this.element.remove()
        }

        this.element.querySelector('.place__remove').addEventListener('click', _remove);
    }

    _likeListener() {
        this.element.querySelector('.place__like').addEventListener('click', evt => {
            evt.target.classList.toggle('place__like_active');
        });
    }

    _zoomListener() {
        const _openBigImgPopup = () => {
            popupBigImgFigure.alt = this.name;
            popupBigImgFigure.src = this.link;
            popupCapture.textContent = this.name;
            openPopup(popupBigImage);
        };

        this.element.querySelector('.place__image').addEventListener('click', _openBigImgPopup);
    }
}


