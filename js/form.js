function Form(formSelector, submitSelector, submitCallback) {
  this.form = $(formSelector);
  this.submitButton = $(submitSelector);
  this.values = {};

  const getValues = (form) => {
    const formElements = Array.from(form);
    const values = {};

    formElements.forEach((el) => {
      if (el.tagName.toLowerCase() == 'button') return;
      
      values[el.name] = $(el).val();
    });

    return values;
  }

  const submitClickHandler = e => {
    const formHTMLElement = this.form.get(0);

    e.preventDefault();

    if (formHTMLElement.checkValidity()) {
      //If values of fields won't be needed this part can be deleted
      this.values = getValues(formHTMLElement);

      this.form.submit();
      submitCallback();
    }

    this.form.addClass('was-validated');
  }

  this.submitButton.on('click', submitClickHandler);
}