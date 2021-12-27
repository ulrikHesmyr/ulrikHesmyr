window.addEventListener('load', init);

const getIntroBoxes = document.querySelectorAll('#startskjerm .intro');
const getRegistrerKnapper = document.querySelectorAll('#startskjerm .intro')[2].querySelectorAll('div');

//Brukere
let nyeBrukere = [];
const eksisterendeBrukere = JSON.parse(window.localStorage.getItem('brukere'));
nyeBrukere = eksisterendeBrukere || [];


function init() {
    getIntroBoxes[0].children[0].addEventListener('click', (event) => {
        visibility(getIntroBoxes[1], event.target);
    });
    getIntroBoxes[0].children[1].addEventListener('click', (event) => {
        visibility(getIntroBoxes[2], event.target);
    });
    getRegistrerKnapper[0].addEventListener('click', () => {
        registrerBruker("russ", "Helle", "bosse123");
    });



    console.log(window.localStorage);

}

function visibility(element, eventTarget) {
    element.classList.toggle('visibility');
    eventTarget.classList.toggle('active');
}
//localStorage.clear();
function registrerBruker(bruker = "russ" || "samler", brukernavn = "", passord = "") {
    let brukernavnet = brukernavn.toUpperCase();
    if (window.localStorage.length == 0) {
        nyeBrukere.push({
            "brukerstatus": bruker,
            "brukernavn": brukernavnet,
            "passord": passord
        });
        window.localStorage.setItem("brukere", JSON.stringify(nyeBrukere));
        console.log(window.localStorage);
    } else {
        for (let i = 0; i < (JSON.parse(window.localStorage.getItem('brukere'))).length; i++) {
            if (JSON.parse(window.localStorage.getItem('brukere'))[i].brukernavn === brukernavnet) {
                alert('Det eksisterer allerede en bruker med dette brukernavnet.');
            } else {
                nyeBrukere.push({
                    "brukerstatus": bruker,
                    "brukernavn": brukernavnet,
                    "passord": passord
                });
                
        window.localStorage.setItem("brukere", JSON.stringify(nyeBrukere));
        console.log(JSON.parse(window.localStorage.getItem('brukere')));

                
            }
        }

    }

}