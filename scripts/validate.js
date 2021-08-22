const validFormKeys = {
    formSelector: '.popup__input-container',
    inputSelector: '.popup__input-item',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    errorSelector: '.popup__input-error',
    errorClass: 'popup__input-error_active',
    inputErrorClass: 'popup__input-item_error',
    popupSelector: '.popup'
};

function showInputError(inputElement, errorTextArea, formKeys) {
    errorTextArea.textContent = inputElement.validationMessage
    errorTextArea.classList.add(formKeys.errorClass);
    inputElement.classList.add(formKeys.inputErrorClass);
};

function hideInputError(inputElement, errorTextArea, formKeys) {
    errorTextArea.classList.remove(formKeys.errorClass);
    inputElement.classList.remove(formKeys.inputErrorClass);
};

function hasValid(formElement, formKeys) {
    const inputFields = formElement.querySelectorAll(formKeys.inputSelector);
    return !Array.from(inputFields).some(el => {
        return !el.validity.valid
    });
};

function checkInputValidity(inputElement, formKeys) {
    const errorTextArea = inputElement.parentElement.querySelector(formKeys.errorSelector)

    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorTextArea, formKeys);
    } else {
        hideInputError(inputElement, errorTextArea, formKeys);
    }
};

const toggleButtonState = (formElement, formKeys) => {  
    const buttonElement = formElement.querySelector(formKeys.submitButtonSelector)
    if (hasValid(formElement, formKeys)) {
        buttonElement.classList.remove(formKeys.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    } else {
        buttonElement.classList.add(formKeys.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }
};

function checkValid(element, formKeys) {
    const formElement = element.closest(formKeys.formSelector)
    checkInputValidity(element, formKeys)
    toggleButtonState(formElement, formKeys)
}


function enableValidation(formKeys) {
    document.querySelectorAll('.popup__input-container').forEach(form => {
        form.addEventListener('input', evt => {
            checkValid(evt.target, formKeys )
        });
    });
};

enableValidation(validFormKeys);