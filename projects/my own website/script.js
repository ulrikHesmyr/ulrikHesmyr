window.addEventListener('load', init);

function init() {
    hentNavn();
    console.log('vi er set!')


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