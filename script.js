//API ESTADOS E CIDADES:
const apiIBGEURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';
const city = document.getElementById('city');
const uf = document.getElementById('uf');

jsonBMW.map((item, index) => {
    //Responsividade do site:
    let matchResultMobile = window.matchMedia('(max-width: 840px)');
    function mobileScreen() {
        return window.matchMedia('(max-width: 840px)').matches;
    }

    //Menu mobile:
    document.querySelector('.nav--bars ion-icon').addEventListener('click', () => {
        document.querySelector('.mobile--aside').style.right = '0';
        document.querySelector('.mobile--aside ion-icon').addEventListener('click', () => {
            document.querySelector('.mobile--aside').style.right = '-50vw';
        })
    })
    
    //Variáveis para cálculo:
    let priceNun = parseInt(item.price);
    let discount = (((priceNun)*12)/100);
    let totalValor = priceNun - discount;

    //Clonando à area que irá aparecer:
    let bmwItem = document.querySelector('.main--container .context--container').cloneNode(true);
        bmwItem.style.display = 'flex';
        bmwItem.style.backgroundImage = `url('${item.img}')`;
        //Preenchendo informações na tela:
        bmwItem.setAttribute('data-key',index);
        bmwItem.querySelector('.context--container .desc--container h1').innerHTML = item.name;
        if(mobileScreen()) {
            bmwItem.querySelector('.desc--container span').innerHTML = item.resum;
        } else {
            bmwItem.querySelector('.desc--container span').innerHTML = item.resum;
        }
        document.querySelector('.main--container').appendChild(bmwItem);

        //Evento de click no carro selecionado:
        bmwItem.querySelector('.desc--container span').addEventListener('click', (e) => {
            let target = e.target.closest('.context--container').getAttribute('data-key');
            let newtarget = parseInt(target);

            //Estilisando a página a ser aberta:
            document.querySelector('.main--container').style.display = 'none'
            document.querySelector('.info--container').style.display = 'flex'
            document.querySelector('header').style.position = 'static';

            //Jogando informações na tela:
            document.querySelector('.info--left h1').innerHTML = item.name;
            document.querySelector('.info--left span').innerHTML = item.description;
            document.getElementById('s-2').innerHTML = item.fabrication;
            document.getElementById('s-3').innerHTML = item.motors;
            document.getElementById('s-4').innerHTML = item.large;
            document.getElementById('s-5').innerHTML = `${item.price}`;
            document.getElementById('i-1').src = item.img1;
            document.getElementById('i-2').src = item.img2;
            document.getElementById('i-3').src = item.img3;
            document.getElementById('i-4').src = item.img4;

            //Modal das imagens:
            document.querySelectorAll('.images--grid img').forEach((item) => {
                item.addEventListener('click', (e) => {
                if(mobileScreen()) {
                    document.querySelector('.fade').style.display = 'flex';
                    let targetIMG = e.currentTarget;

                    targetIMG.style.position = 'fixed';
                    targetIMG.style.left = '28%';
                    targetIMG.style.top = '30%'
                    targetIMG.style.transform = 'translate(-25%, -25%)';
                    targetIMG.style.height = '250px';
                    targetIMG.style.width = '390px';
                    targetIMG.style.zIndex = '10';
                    targetIMG.style.borderRadius = '15px';
                    document.querySelector('.fade').addEventListener('click', (e) => {
                        targetIMG.style.position = '';
                        targetIMG.style.left = '';
                        targetIMG.style.top = ''
                        targetIMG.style.transform = '';
                        targetIMG.style.height = '140px';
                        targetIMG.style.width = '190px';
                        targetIMG.style.zIndex = '';
                        targetIMG.style.borderRadius = ''
                        document.querySelector('.fade').style.display = 'none';
                    }); 

                } else {  
                    document.querySelector('.fade').style.display = 'flex';
                    let targetIMG = e.currentTarget;

                    targetIMG.style.position = 'fixed';
                    targetIMG.style.left = '40%';
                    targetIMG.style.top = '30%'
                    targetIMG.style.transform = 'translate(-25%, -25%)';
                    targetIMG.style.height = '500px';
                    targetIMG.style.width = '700px';
                    targetIMG.style.zIndex = '10';
                    targetIMG.style.borderRadius = '15px';
                    document.querySelector('.fade').addEventListener('click', (e) => {
                        targetIMG.style.position = '';
                        targetIMG.style.left = '';
                        targetIMG.style.top = ''
                        targetIMG.style.transform = '';
                        targetIMG.style.height = '220px';
                        targetIMG.style.width = '300px';
                        targetIMG.style.zIndex = '';
                        targetIMG.style.borderRadius = ''
                        document.querySelector('.fade').style.display = 'none';
                    }); 
                    }    
                })    
            });

            //Abrindo a loja:
            document.querySelector('.info--left a').addEventListener('click', (e)=> {
                e.preventDefault();
                reqFetch();
                document.querySelector('.info--container').style.display = 'none';
                document.querySelector('.buyinfo--container').style.display = 'flex';
                document.querySelector('.last--footer').style.display = 'flex';
                document.querySelector('.car--infos img').src = item.img;
                document.getElementById('name-1').innerHTML = item.name;
                document.getElementById('name-2').innerHTML = item.motors;
                document.querySelector('.total--valor span').innerHTML = item.large;

                //Selecionando o cartão:
                document.querySelectorAll('.payment img').forEach((item) => {
                    item.addEventListener('click', (e) => {
                        document.querySelector('.payment--valors').style.display = 'flex';
                        if(mobileScreen() == true) {
                            document.querySelector('.buyinfo--container').overflowX = 'hidden'
                            document.querySelector('.buyinfo--container ').style.height = '110vh';
                            document.querySelector('.payment--valors').style.marginBottom = '25px';
                            document.querySelector('.car--infos img').style.display = 'none';
                            document.querySelector('#finalizar').style.width = '100%'
                            
                        } else {
                            document.querySelector('.buyinfo--container ').style.height = '110vh';
                            document.querySelector('.buyinfo--container').overflowX = 'hidden'
                        }

                        //Calculando o valor das parcelas:
                        let parcelas12 = (priceNun + (priceNun * 0.10))/12
                        document.getElementById('o-1').innerHTML = `12x${parcelas12.toFixed(0)}$`;
                        let parcelas6 = (priceNun + (priceNun * 0.05))/6
                        document.getElementById('o-2').innerHTML = `6x${parcelas6.toFixed(0)}$`;
                        let parcelas24 = (priceNun + (priceNun * 0.15))/24
                        document.getElementById('o-3').innerHTML = `24x${parcelas24.toFixed(0)}$`;
                        document.getElementById('o-4').innerHTML = `A vista: ${totalValor.toFixed(0)}$`; 
 
                        //Parando o submit:
                        let formSub = document.querySelector('.main--form--validator');
                        formSub.addEventListener('submit', formValidator.deniedSubmit);
                        
                    })
                })

            })

        })

    });

    //Functions:
    async function reqFetch() {
        const request = await fetch(apiIBGEURL);
        let result = await request.json();
        let options = document.createElement("optgroup");
        options.setAttribute('label', 'UFs');
        result.forEach( (item)=> {
            options.innerHTML += `<option>${item.sigla}</option>`;
        })
        uf.append(options);

        uf.addEventListener('click', async (e) => {
            let target = uf.value
            const apiCITYURL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${target}/municipios`;
            const requestCity = await fetch(apiCITYURL);
            const resultCity = await requestCity.json();

            let options ='';

            resultCity.forEach( (city) => {
                options += `<option>${city.nome}</option>`
            });
            city.innerHTML = options;
        })
    };

    //Funções para submit da loja:
    let formValidator = {
        deniedSubmit: (e) => {
            e.preventDefault();

            let send = true;
            let inputs = document.querySelectorAll('.main--form--validator input');
            formValidator.clearErrors();

            for(let i in inputs) {
                let input = inputs[i];
                let check = formValidator.checkinput(input);
                         
                if(check !== true) {
                    send = false;
                    formValidator.showError(input, check); 
                } 
                
            }   
        },

        checkinput: (input) => {
            let rules = input.getAttribute('data-rules');
            if(rules !== null) {
                rules = rules.split('|')
                for(let i in rules) {
                    let rulesdetails = rules[i].split('=');
                    switch(rulesdetails[0]) {
                        case 'required':
                            if(input.value == '') {
                                return 'Campo obrigatório**'
                            }
                        break;
                        case 'min':
                            if(input.value.length < rulesdetails[1]) {
                                return `Campo deve ter no mínimo ${rulesdetails[1]} caracteres`;
                            }
                        break;
                        case 'cep':
                            if(input.value != '') {
                               let regexCEP = /^\d{5}-?\d{3}$/;
                               if(!regexCEP.test(input.value)) {
                                    return 'Formato de CEP não válido!';
                               }
                            }
                        break;
                        case 'cpf':
                            if(input.value != '') {
                                let regexCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
                                if(!regexCPF.test(input.value)) {
                                    return 'Formato de CPF não válido!'
                                }
                            }
                        break;
                        case 'rg':
                            if(input.value != '') {
                                let regexRG = /\d{8}/
                                if(!regexRG.test(input.value)) {
                                    return 'Formato de RG não válido!'
                                }
                            }
                    }
                }
            }
            return true;
        },

        showError: (input, error) => {
            input.style.borderColor = 'red';

            let errorElement = document.createElement('div');
            errorElement.classList.add('error');
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '11px';
            
            errorElement.innerHTML = error;
            input.parentElement.insertBefore(errorElement, input);
        },
        clearErrors: () => {
            let inputsBorder = document.querySelectorAll('.main--form--validator input');
            for(let i=0;i<inputsBorder.length;i++) {
                inputsBorder[i].style = '';
            };

            let clearErrorsElements = document.querySelectorAll('.error');
            for(let i=0;i<clearErrorsElements.length;i++) {
                clearErrorsElements[i].remove();
            };
        }
    };




