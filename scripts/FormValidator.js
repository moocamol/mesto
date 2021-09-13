
export class FormValidator {
    constructor(formKeys, form) {
        this.formKeys = formKeys;
        this.form = form;
        this._buttonElement = this.form.querySelector(this.formKeys.submitButtonSelector);
        this._inputList = Array.from(this.form.querySelectorAll(this.formKeys.inputSelector));
    }

    _showInputError(inputElement, errorTextArea) {
        errorTextArea.textContent = inputElement.validationMessage
        errorTextArea.classList.add(this.formKeys.errorClass);
        inputElement.classList.add(this.formKeys.inputErrorClass);
    }

    _hideInputError(inputElement, errorTextArea) {
        errorTextArea.classList.remove(this.formKeys.errorClass);
        inputElement.classList.remove(this.formKeys.inputErrorClass);
    }

    _hasValid() {
       return !this._inputList.some(el => {
           return !el.validity.valid
       })
    }

    _checkInputValidity(inputElement) {
        const errorTextArea = inputElement.parentElement.querySelector(this.formKeys.errorSelector)
    
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorTextArea);
        } else {
            this._hideInputError(inputElement, errorTextArea);
        }
    }

    toggleButtonState() {
        const buttonElement = this.form.querySelector(this.formKeys.submitButtonSelector)
        if (this._hasValid()) {
            this._buttonElement.classList.remove(this.formKeys.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        } else {
            this._buttonElement.classList.add(this.formKeys.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        }
    }

    checkValid(element) {
        this._checkInputValidity(element)
        this.toggleButtonState()
    }

    enableValidation() {
        this.form.addEventListener('input', evt => this.checkValid(evt.target))
    }
    
};