window.addEventListener('load', init);

function init() {
    hentNavn();


}


function hentNavn() {

    const name = prompt("Skriv inn navnet ditt!", "f.eks. Ulrik");

    if (name.match(/^[A-Za-z]+$/)) {
        alert('ayo!');
    } else {
        console.log('prøv på nytt');
        hentNavn();
    }

}