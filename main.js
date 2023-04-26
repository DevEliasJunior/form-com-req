
let B7validator = {
    handleSubmit: (event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        B7validator.clearError()

        for(let i = 0; i < inputs.length; i++){
           let input = inputs[i];
           let check = B7validator.checkInput(input);
           if(check !== true){
                send = false;
                B7validator.showError(input, check)
           }
        }

        if(send){
            form.submit()
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split('/')
            for(let k in rules){
                let Rdetails = rules[k].split('=');
                switch(Rdetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'este campo é obrigatório!!!';
                        }   
                    break;
                    case 'min':
                        if(input.value.length < Rdetails[1]){
                            return `mínimo de ${Rdetails[1]} caractéris*`
                        }
                    break;
                    case 'email':
                        if(input.value != ''){
                        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if(!regex.test(input.value.ToLowerCase())){
                            return 'E-mail digitado inválido*'
                        }
                        }
                    break;
                }
            }
        }
        return true;
  
    },
    showError:(input, error)=>{
        input.style.borderColor = '#ff0000';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.elementSibling);
    },
    clearError: () =>{
        let errorElements = document.querySelectorAll('.error')
        let inputs = form.querySelectorAll('input');
        for(let i =0; i< inputs.length; i++){
            inputs[i].style = '';
        }
        
        for(let i =0; i <errorElements.length; i++){
            errorElements[i].remove();
        }
    }
};

const form = document.querySelector('.B7validator');
form.addEventListener('submit', B7validator.handleSubmit)