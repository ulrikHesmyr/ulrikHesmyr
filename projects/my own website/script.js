window.addEventListener('load', init);

function init() {
    hentNavn();
    

}


function hentNavn() {

    const name = prompt("Skriv inn navnet ditt!", "f.eks. Ulrik");

    if (name.match(/^[A-Za-z]+$/)) {
        console.log('vi er set!');
    } else {
        console.log('prøv på nytt');
        hentNavn();
    }


}