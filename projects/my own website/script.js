window.addEventListener('load', init);

const getIntroBoxes = document.querySelectorAll('#startskjerm .intro');
const getRegistrerKnapper = document.querySelectorAll('#startskjerm .intro')[2].querySelectorAll('div.registrerKnapper');

const getSamlerRegistreringsFelt = document.querySelector("#registrerSamler");
const getRegistrerSamlerInputsEl = document.querySelectorAll('#registrerSamler input');
const getRegistrerSamlerSubmitEl = document.querySelector('#submitSamler');

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
        getSamlerRegistreringsFelt.scrollIntoView({ behavior: 'smooth', block: 'center'});
    });
        //vis registrering for russ

    
        //vis loginn for samler
        //vis loginn for russ

    //Registrer bruker eller loginn
        //registrer samler
        getRegistrerSamlerSubmitEl.addEventListener('click', (event)=>{
            event.preventDefault();
            if(getRegistrerSamlerInputsEl[0].value.toString().match(format) || getRegistrerSamlerInputsEl[1].value.toString().match(format)){
                alert('Brukernavn eller passord kan ikke inneholde spesielle tegn, kun bokstaver og tall.');
            } else {
                registrerBruker("samler", getRegistrerSamlerInputsEl[0].value, getRegistrerSamlerInputsEl[1].value);
            }//fortsett her!
        })

    console.log(JSON.parse(localStorage.getItem("brukere")));

}

function visibility(element, eventTarget) {
    element.classList.toggle('visibility');
    element.children[0].classList.toggle('currentVisible');
    element.children[1].classList.toggle('currentVisible');
    eventTarget.classList.toggle('active');
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