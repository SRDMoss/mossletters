/* Handles all form validation on the LoginView template */

// Import validation functions from 'validation.js'
import { 
  checkEmail, 
  checkName, 
  checkSelections
} from './validation.js';

// List of input fields and their respective validation functions
const fields = [
  { 
    id: '#first-name', 
    validator: checkName, 
    errorIds: { isEmpty: 'first-name-empty', failsRegex: 'first-name-formatting' }
  },
  { 
    id: '#last-name', 
    validator: checkName,
    errorIds: { isEmpty: 'last-name-empty', failsRegex: 'last-name-formatting' }
  },
  { 
    id: '#email', 
    validator: checkEmail,
    errorIds: { isEmpty: 'email-empty', failsRegex: 'email-formatting' }
  },
  { 
    name: 'projects',
    validator: checkSelections,
    errorIds: { isEmpty: 'projects-messages' }
  },
  { 
    name: 'frequency',
    validator: checkSelections,
    errorIds: { isEmpty: 'frequency-messages' }
  }
];

// Create object to store validity of field to evaluate overall state
let allValidities = {
  '#first-name': false,
  '#last-name': false,
  '#email': false,
  'projects': false, 
  'frequency': false
}

// References to DOM elements
const updateButton = document.getElementById('update-button');
const xmlButton = document.getElementById('xml-button');
const jsonButton = document.getElementById('json-button');

// Function to validate a single text field or collection from checkboxes/radios
const validateField = (fieldInfo) => {
  const { id, name, validator, errorIds } = fieldInfo;
  let value;
  
  try {
    // Determine the value based on whether it's an input field or a collection of checkboxes/radios
    if (id) {
      const element = document.querySelector(id);
      if (!element) {
        throw new Error(`Element with id ${id} not found`);
      }
      value = element.value;
    } else if (name) {
      const nodeList = document.getElementsByName(name);
      if (nodeList.length === 0) {
        throw new Error(`No elements with name ${name} found`);
      }
      value = Array.from(nodeList).map(node => node.checked);
    } else {
      throw new Error('Field does not have id or name');
    }

    // Validate with provided validator
    const result = validator(value);

    // Flag to track field validity
    let isAllValid = true;

    // Loop through validation results and update error messages/visibility
    for (const [key, val] of Object.entries(result)) {
      const elementId = errorIds[key];
      const element = document.getElementById(elementId);

      if (id && element) {
        if (val) {
          element.classList.remove('invisible');
          isAllValid = false;
        } else {
          element.classList.add('invisible');
        }
      }

      if (name) {
        if (val) {
          isAllValid = false;
        } 
      }
    }   

    // Determine if id or name is key to update validity state
    const key = id || name;

    // Update page validity state tracker
    allValidities[key] = isAllValid;

    // Update visibility of whole validity block and function of submit button
    if (allValidities['#first-name'] && allValidities['#last-name']) {
      const nameMessages = document.getElementById('name-messages');
      if (!nameMessages) {
        throw new Error(`Element with id 'name-messages' not found`);
      }
      nameMessages.classList.add('invisible');
    } else {
      const nameMessages = document.getElementById('name-messages');
      if (!nameMessages) {
        throw new Error(`Element with id 'name-messages' not found`);
      }
      nameMessages.classList.remove('invisible');
    }

    if (allValidities['#email']) {
      const emailMessages = document.getElementById('email-messages');
      if (!emailMessages) {
        throw new Error(`Element with id 'email-messages' not found`);
      }
      emailMessages.classList.add('invisible');
    } else {
      const emailMessages = document.getElementById('email-messages');
      if (!emailMessages) {
        throw new Error(`Element with id 'email-messages' not found`);
      }
      emailMessages.classList.remove('invisible');
    }

    // Enable/disable buttons based on overall validity
    if (Object.values(allValidities).every(value => value === true)) {
      updateButton.removeAttribute("disabled");
      xmlButton.removeAttribute("disabled");
      jsonButton.removeAttribute("disabled");
    } else {
      updateButton.setAttribute("disabled", "true");
      xmlButton.setAttribute("disabled", "true");
      jsonButton.setAttribute("disabled", "true");
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
};

// Add focus and input event listener to each field to trigger validation
fields.forEach(field => {
  if (field.id) {
    const element = document.querySelector(field.id);
    if (element) {
      element.addEventListener('input', () => validateField(field));
    } else {
      console.log(`Element with id ${field.id} not found`);
    }
  } else if (field.name) {
    const nodeList = document.getElementsByName(field.name);
    nodeList.forEach((element) => {
      element.addEventListener('change', () => validateField(field));
    });
  } else {
    console.log(`Neither id nor name found for field.`);
  }
});

// run validator for all fields on load
window.onload = () => {
  fields.forEach(field => validateField(field));
};
