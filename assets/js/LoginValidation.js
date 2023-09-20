/* Handles all form validation on the LoginView template */

// Import validation functions from 'validation.js'
import { 
  checkName, 
  checkEmail, 
  checkPassword, 
  checkPasswordConfirm 
} from './validation.js';

// List of input fields and their respective validation functions
const fields = [
  { 
    id: 'first-name', 
    validator: checkName, 
    errorBlock: 'first-name-warnings',
    errorIds: { isEmpty: 'first-name-empty', failsRegex: 'first-name-formatting' }
  },
  { 
    id: 'last-name', 
    validator: checkName,
    errorBlock: 'last-name-warnings',
    errorIds: { isEmpty: 'last-name-empty', failsRegex: 'last-name-formatting' }
  },
  { 
    id: 'email', 
    validator: checkEmail,
    errorBlock: 'email-warnings',
    errorIds: { isEmpty: 'email-empty', failsRegex: 'email-formatting' }
  },
  { 
    id: 'new-password', 
    validator: checkPassword,
    errorBlock: 'new-password-warnings',
    errorIds: { isEmpty: 'password-empty', short: 'password-short', noMixedCase: 'password-case-formatting', noNumerals: 'password-numeral-formatting', noSymbols: 'password-symbol-formatting' }
  },
  {
    id: 'password-confirm',
    secondaryId: 'new-password',
    validator: checkPasswordConfirm,
    errorBlock: 'password-confirm-warnings',
    errorIds: { isEmpty: 'password-confirm-empty', mismatch: 'password-matches' }
  }
];

// Create object to store validity of field to evaluate overall state
let allValidities = {
  'first-name': false,
  'last-name': false,
  'email': false,
  'new-password': false,
  'password-confirm': false
};



// References to DOM elements
const registerSubmit = document.getElementById('admin-register-button');

// Function to validate a single field
try {
  const validateField = (id, secondaryId, validator, errorBlock, errorIds) => {
    let value;

    // Check if element with ID exists in the DOM
    if (!document.getElementById(id)) {
      throw new Error(`Element with id ${id} not found`);
    }

    // If secondary ID exists, verify that element exists in DOM
    if (secondaryId && !document.getElementById(secondaryId)) {
      throw new Error(`Secondary element with id ${secondaryId} not found`);
    }

    // Get values to check validity if secondaryId exists. Else, get single value
    if (secondaryId) {
      value = [document.getElementById(id).value, document.getElementById(secondaryId).value];
    } else {
      value = document.getElementById(id).value;
    }

    // If value is Array, validate it as separate arguments, otherwise, just do it normal
    const result = Array.isArray(value) ? validator(...value) : validator(value);

    // Flag to track field validity
    let isAllValid = true;

    // Loop through validation results and update error messages/visibility
    for (const [key, val] of Object.entries(result)) {
      const elementId = errorIds[key];
      const element = document.getElementById(elementId);

      // Check if the error message element exists in DOM
      if (!element) {
        throw new Error(`Element for error message with id ${elementId} not found`);
      }

      // Update visibility and validity based on result.
      if (val) {
        element.classList.remove('invisible');
        isAllValid = false;
      } else {
        element.classList.add('invisible');
      }
    }

    // Update page validity state tracker
    allValidities[id] = isAllValid;

    if (!document.getElementById(errorBlock)) {
      throw new Error(`Element with id ${errorBlock} not found`);
    }

    let errorElement = document.getElementById(errorBlock);

    if (isAllValid) {
      errorElement.classList.add('invisible');
    } else {
      errorElement.classList.remove('invisible');
    }

    // Update functionality of submit button
    if (Object.values(allValidities).every(value => value === true)) {
      registerSubmit.removeAttribute('disabled');
    } else {

      registerSubmit.setAttribute('disabled', 'true');
    }
  };

  // Attach focus and input event listeners to each field for triggering validiation
  fields.forEach(field => {
    const element = document.getElementById(field.id);

    if (element) {
      element.addEventListener('focus', () => {
        validateField(field.id, field.secondaryId, field.validator, field.errorBlock, field.errorIds);
      });

      element.addEventListener('input', () => {
        validateField(field.id, field.secondaryId, field.validator, field.errorBlock, field.errorIds);
      });
    } else {
      throw new Error(`Element with id ${field.id} not found`);
    }
  });

} catch (error) {
  // Hande any errors that occur
  console.error(`An error occurred: ${error.message}`);
}