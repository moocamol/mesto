
export class FormValidator {
    constructor(formKeys, form) {
        this.formKeys = formKeys;
        this.form = form;
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
        const inputFields = this.form.querySelectorAll(this.formKeys.inputSelector);
        return !Array.from(inputFields).some(el => {
            return !el.validity.valid
        });
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
            buttonElement.classList.remove(this.formKeys.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        } else {
            buttonElement.classList.add(this.formKeys.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        }
    }

    checkValid(element) {
       this._checkInputValidity(element)
        this.toggleButtonState()
    }

    enableValidation() {
        const _checkValid = (element) => {
            this.checkValid(element)
        }
        this.form.addEventListener('input', evt => {_checkValid(evt.target)});
    }
    
};