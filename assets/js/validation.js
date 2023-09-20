// Validate email input
export function checkEmail(emailValue) {
  // Check for empty value
  const isEmpty = emailValue.length === 0;
  
  // Check formatting
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
  const failsRegex = !regexEmail.test(emailValue);

  return { isEmpty, failsRegex }; 
}

// Validate name input
export function checkName(nameValue) {   
  // Check for empty value
  const isEmpty = nameValue.length === 0;

  // Check formatting
  const regexName = /^[a-zA-ZÀ-ÿ\s]+$/;
  const failsRegex = !regexName.test(nameValue); 

  return { isEmpty, failsRegex };
}

// Validate collection input from radios and checkboxes
export function checkSelections(selectionValues) {
  // Check for empty selections
  const isEmpty = !selectionValues.some(val => val === true);

  return { isEmpty };
}

// Validate password input
export function checkPassword(passwordValue) {  
  // Check for empty value
  const isEmpty = passwordValue.length === 0;

  // Check if password length is less than 8 characters
  const short = passwordValue.length < 8;

  // Check for both uppercase letters
  const noMixedCase = !(/[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue));

  // Check for numbers
  const noNumerals = !/[0-9]/.test(passwordValue);

  // Check for symbols
  const noSymbols =!/[!@#%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/.test(passwordValue);

  return { isEmpty, short, noMixedCase, noNumerals, noSymbols };
}

// Validate password confirmation input
export function checkPasswordConfirm(passwordConfirmValue, passwordValue) {
  // Check for empty value
  const isEmpty = passwordConfirmValue.length === 0;

  // Check for mismatched passwords
  const mismatch = passwordConfirmValue !== passwordValue;

  return { isEmpty, mismatch }; 
}

