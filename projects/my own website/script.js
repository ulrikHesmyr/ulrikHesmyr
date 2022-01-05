window.addEventListener('load', init);

const getIntroBoxes = document.querySelectorAll('#startskjerm .intro');

const getRegistrerKnapper = document.querySelectorAll('#startskjerm .intro')[2].querySelectorAll('div.registrerKnapper');
const getSamlerRegistreringsFelt = document.querySelector("#registrerSamler");
const getRegistrerSamlerInputsEl = document.querySelectorAll('#registrerSamler input');
const getRegistrerSamlerSubmitEl = document.querySelector('#submitSamler');

const getLoginnSamlerKnapp = document.querySelector('#logInnSamlerKnapp');
const getLoginnSamlerFelt = document.querySelector('#logInnSamler');
const getLoginnSamlerInputsEl = document.querySelectorAll('#logInnSamler input');
const getLoginnSubmitEl = document.querySelector('#loginnSamlerSubmit');

const getBrukerSideEl = document.querySelector('#brukerSide');
const getRemoveEls = document.querySelectorAll('.remove');

//Brukere 
let nyeBrukere = [];
const eksisterendeBrukere = JSON.parse(window.localStorage.getItem('brukere'));
nyeBrukere = eksisterendeBrukere || [];
let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

function init() {
    getIntroBoxes[0].children[0].addEventListener('click', (event) => {
        visibility(getIntroBoxes[1], event.target);
    });
    getIntroBoxes[0].children[1].addEventListener('click', (event) => {
        visibility(getIntroBoxes[2], event.target);
    });

    //Vis registrerings- og loginn-felt
    //vis registrering for samler
    getRegistrerKnapper[1].addEventListener('click', () => {
        showBox(getSamlerRegistreringsFelt);
        getSamlerRegistreringsFelt.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
    //vis registrering for russ


    //vis loginn for samler
    getLoginnSamlerKnapp.addEventListener('click', () => {
        showBox(getLoginnSamlerFelt);
        getLoginnSamlerFelt.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    })
    //vis loginn for russ
    //Registrer bruker eller loginn
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
                    for(let rEl of getRemoveEls){
                        showBox(rEl);
                        document.body.style.height = "fit-content";
                    }
                } 
            }
            if(loginn == false){
                alert('Brukernavn eller passord er feil, prøv på nytt!');
            }
        }
    }
}

function visibility(element, eventTarget) {
    if (eventTarget.classList.contains('material-icons')) {
        element.classList.toggle('visibility');
        element.children[0].classList.toggle('currentVisible');
        element.children[1].classList.toggle('currentVisible');
        eventTarget.parentElement.classList.toggle('active');
    } else {

        element.classList.toggle('visibility');
        element.children[0].classList.toggle('currentVisible');
        element.children[1].classList.toggle('currentVisible');
        eventTarget.classList.toggle('active');
    }
}

function showBox(element) {
    element.classList.toggle('showBox');
}
//localStorage.clear();
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