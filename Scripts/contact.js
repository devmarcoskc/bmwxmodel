document.querySelector('.nav--bars ion-icon').addEventListener('click', () => {
    document.querySelector('.mobile--aside').style.right = '0';
    document.querySelector('.mobile--aside ion-icon').addEventListener('click', () => {
        document.querySelector('.mobile--aside').style.right = '-50vw';
    })
})