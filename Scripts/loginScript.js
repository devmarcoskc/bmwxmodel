let loginFORM = {
    preventSubmit:(e) => {
        e.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');

        loginFORM.clearErros();

        for(let i in inputs) {
            let input = inputs[i];   
            let check = loginFORM.checkInputs(input);
            
            if(check !== true) {
                send = false;
                loginFORM.errorMSG(input, check);
            }    
        }

        if(send) {
            form.submit();
        }
    },

    checkInputs: (input) => {
        let rulesAttributes = input.getAttribute('data-rules');     
        if(rulesAttributes !== null) {
            rulesAttributes = rulesAttributes.split('|');       
            for(let k in rulesAttributes) {
                let rules = rulesAttributes[k].split('=');
                console.log(rules[0]);
                switch (rules[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Deve preencher este campo*';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rules[1]) {
                            console.log(rules[1]);
                            return `Deve possuir no mínimo ${rules[1]} caracteres`;
                        }
                    break;
                }
            }
        }
        return true;
    },

    errorMSG: (input, error) => {
        input.style.border = '1px solid red';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },

    clearErros: () => {
        let inputs = form.querySelectorAll('input');
        for(let k in inputs) {
            inputs[k].style = '';
        }

        let clearElements = document.querySelectorAll('.error');
        for(i=0;i<clearElements.length;i++) {
            clearElements[i].remove();
        }
    }
    
}

let form = document.querySelector('.form--login');
form.addEventListener('submit', loginFORM.preventSubmit);

document.querySelector('.nav--bars ion-icon').addEventListener('click', () => {
    document.querySelector('.mobile--aside').style.right = '0';
    document.querySelector('.mobile--aside ion-icon').addEventListener('click', () => {
        document.querySelector('.mobile--aside').style.right = '-50vw';
    })
})