// adminScript.js: Allows multiple buttons to send the same form data to different endpoints.

function submitForm(button, action, target = '_self') {
  const form = button.form;
  form.action = action;
  form.method = 'get';
  form.target = target;
  form.submit();
}

