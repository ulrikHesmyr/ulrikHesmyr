window.addEventListener('load', init);
const getSamlerRegistreringsFelt = document.querySelector("#registrerSamler");
const getRegistrerSamlerInputsEl = document.querySelectorAll('#registrerSamler input');
const getRegistrerSamlerSubmitEl = document.querySelector('#submitSamler');

const getLoginnSamlerKnapp = document.querySelector('#logInnSamlerKnapp');
const getLoginnSamlerFelt = document.querySelector('#logInnSamler');
const getLoginnSamlerInputsEl = document.querySelectorAll('#logInnSamler input');
const getLoginnSubmitEl = document.querySelector('#loginnSamlerSubmit');

const getBrukerSideEl = document.querySelector('#brukerSide');
const getRemoveEls = document.querySelectorAll('.remove');
const getBUTTONS = document.querySelectorAll('header .material-icons-two-tone');

let loggInnVises;
let registrerVises

//Brukere 
let nyeBrukere = [];
const eksisterendeBrukere = JSON.parse(window.localStorage.getItem('brukere'));
nyeBrukere = eksisterendeBrukere || [];
let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

function init() {
//EVENTLISTENERS
    //Vis beskrivelse for ikonene
    for (let icon of getBUTTONS) {
        icon.addEventListener('mouseover', (event) => {
            hovering(icon.getAttribute('data-text'), event.type);
        })

        icon.addEventListener('mouseout', (event) => {
            hovering(icon.getAttribute('data-text'), event.type)
        })
    }

    //Vis registreringsfelt
    getBUTTONS[1].addEventListener('click', () => {
        if(registrerVises !== true){
            showBox(getSamlerRegistreringsFelt);
            registrerVises = true;
        }
        if (loggInnVises == true) {
            showBox(getLoginnSamlerFelt);
            loggInnVises = false;
        } 
        getSamlerRegistreringsFelt.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });


    //Vis loginnfelt
    getBUTTONS[0].addEventListener('click', () => {
    
        if (loggInnVises !== true) {
            showBox(getLoginnSamlerFelt);
            loggInnVises = true;
        }
        if(registrerVises == true){
            showBox(getSamlerRegistreringsFelt);
            registrerVises = false;
        }
        getLoginnSamlerFelt.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    })
    
    //registrer samler
    getRegistrerSamlerSubmitEl.addEventListener('click', (event) => {
        event.preventDefault();
        if (getRegistrerSamlerInputsEl[0].value.toString().match(format) || getRegistrerSamlerInputsEl[1].value.toString().match(format)) {
            alert('Brukernavn eller passord kan ikke inneholde spesielle tegn, kun bokstaver og tall.');
        } else {
            registrerBruker("samler", getRegistrerSamlerInputsEl[0].value, getRegistrerSamlerInputsEl[1].value);
        }
    })

    //loginn samler
    getLoginnSubmitEl.addEventListener('click', (event) => {
        event.preventDefault();
        loginnSamler(getLoginnSamlerInputsEl[0].value, getLoginnSamlerInputsEl[1].value);
    })


    console.log(JSON.parse(localStorage.getItem("brukere")));

}

function loginnSamler(brukernavn, passord) {

    let loginn = false;
    if (brukernavn === "" || passord === "") {
        alert('Du må skrive inn både brukernavn og passord!')
    } else {

        if (brukernavn.match(format) || passord.match(format)) {
            alert('Brukernavn og passord kan bare inneholde bokstaver og tall!');
        } else {
            for (let bruker of JSON.parse(localStorage.getItem("brukere"))) {
                if (brukernavn.toString().toUpperCase() == bruker.brukernavn && passord.toString() == bruker.passord) {
                    loginn = true;
                    showBox(getBrukerSideEl);
                    for (let rEl of getRemoveEls) {
                        showBox(rEl);
                        document.body.style.height = "fit-content";
                    }
                }
            }
            if (loginn == false) {
                alert('Brukernavn eller passord er feil, prøv på nytt!');
            }
        }
    }
}

function hovering(string = "", event) {

    let hoverEl = document.querySelector('#hovering');
    if (event == "mouseover") {
        hoverEl.classList.toggle('hovering');
        hoverEl.innerText = string;
    } else if (event == "mouseout") {
        hoverEl.classList.toggle('hovering');
    }

}

//function visibility(element, eventTarget) {
//    if (eventTarget.classList.contains('material-icons-two-tone')) {
//        element.classList.toggle('visibility');
//        element.children[0].classList.toggle('currentVisible');
//        element.children[1].classList.toggle('currentVisible');
//        eventTarget.parentElement.classList.toggle('active');
//    } else {
//
//        element.classList.toggle('visibility');
//        element.children[0].classList.toggle('currentVisible');
//        element.children[1].classList.toggle('currentVisible');
//        eventTarget.classList.toggle('active');
//    }
//}
//

function showBox(element) {
    element.classList.toggle('showBox');
}

function registrerBruker(bruker = "russ" || "samler", brukernavn = "", passord = "") {
    let brukernavnet = brukernavn.toUpperCase();
    let registrer = true;
    if (window.localStorage.length == 0 && registrer == true) {
        nyeBrukere.push({
            "brukerstatus": bruker,
            "brukernavn": brukernavnet,
            "passord": passord
        });
    } else {
        for (let i = 0; i < (JSON.parse(window.localStorage.getItem('brukere'))).length; i++) {
            if (JSON.parse(window.localStorage.getItem('brukere'))[i].brukernavn === brukernavnet) {
                alert('Det eksisterer allerede en bruker med dette brukernavnet.');
                registrer = false;
            }

        }
        if (registrer === true) {

            nyeBrukere.push({
                "brukerstatus": bruker,
                "brukernavn": brukernavnet,
                "passord": passord
            });
        }
    }

    window.localStorage.setItem("brukere", JSON.stringify(nyeBrukere));
    console.log(JSON.parse(window.localStorage.getItem('brukere')));


}