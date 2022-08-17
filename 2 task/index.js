var formElement = document.forms['formElement'];

formElement.addEventListener('focusin', () => {

    var activeElement = formElement.querySelector('.focused');
  
	if (activeElement) {
	    activeElement.classList.remove('focused');
    }
    event.target.classList.add('focused');

});

formElement.addEventListener('focusout', () => {
	var activeElement = formElement.querySelector('.focused');
    if (activeElement) {
     	activeElement.classList.remove('focused');   
    }
});