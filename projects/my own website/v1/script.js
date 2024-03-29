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

//Russeapplikasjon
const getDinProfilKnapp = document.querySelector('#dinProfil');
const getLoggUtKnapp = document.querySelector('#loggUtKnapp');
const getRusseSeksjon = document.querySelector('#russe_seksjon');
const getBrukerSideIkoner = document.querySelectorAll('#brukerSide .material-icons-two-tone');
const getRussesideIkoner = document.querySelectorAll('#russe_seksjon .material-icons-two-tone');
const getRussesider = document.querySelectorAll('.russeside');

const getAdresseInput = document.querySelector('#adresse_input');
const getTlfInput = document.querySelector('#tlf_input');
const getGruppeInput = document.querySelector('#gruppe_input');
const getSkoleInput = document.querySelector('#skole_input');
const getNavnInput = document.querySelector('#navn_input');

const getSitatselect = document.querySelector('select');
const getTilfeldigSitatKnapp = document.querySelector('#tilfeldigsitater label button');
const getTilfeldigSitatOmraade = document.querySelector('#tilfeldigsitater');
const getTilfeldigSitatFelt = document.querySelector('.tilfeldigSitat');
const getEgne = document.querySelector('#egnesitater');
const getFooter = document.querySelector('.footer');


let getMidstill = document.querySelector('#midtstill');
let getAngre = document.querySelectorAll('.angre');
let getFjernRussegruppe = document.querySelector('#fjernRussegruppe');
let getRussegreier = document.querySelectorAll('.russe');





const getRussebilde = document.querySelector('#russebilde');
const getRussekort = document.querySelector('.container');



//RusseINFO
//Tekst
let getSkole = document.querySelector('.header');
let getRussetekst = document.querySelector('.russ');
let getNavn = document.querySelector('.navn');
let getAdresse = document.querySelector('.adresse');
let getTlf = document.querySelector('.tlf');
let getGruppe = document.querySelector('.gruppe');
//Bilder
let getRusselogoen = document.querySelector('#russelogoen');


let russekorthentet = false;

const printButton = document.querySelector('#buttonPrint');

//Russekort SAMLINGEN og EGET KORT
let getKortKode = document.querySelector('#deleRussekort');
let getHentRussekort = document.querySelector('#lagretRussekort');

//alert
const getAlertBox = document.querySelector('#alerted');

//display loginn og registrer
let loggInnVises;
let registrerVises


//Brukere 
let nyeBrukere = [];
const eksisterendeBrukere = JSON.parse(window.localStorage.getItem('brukere'));
if (eksisterendeBrukere) {
    nyeBrukere = eksisterendeBrukere || [];
}
let aktivBruker;
let aktivBrukerObjekt;
const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function init() {
    //EVENTLISTENERS
    //Vis beskrivelse for ikonene med sånn alert greie
    smoothAnimation(document.querySelector("#top"));
    for (let icon of getBUTTONS) {
        icon.addEventListener('mouseover', (event) => {
            hovering(icon.getAttribute('data-text'), event.type);
        })

        icon.addEventListener('mouseout', (event) => {
            hovering(icon.getAttribute('data-text'), event.type)
        })
    }
    for (let icon of getBrukerSideIkoner) {
        icon.addEventListener('mouseover', (event) => {
            hovering(icon.getAttribute('data-text'), event.type)
        })

        icon.addEventListener('mouseout', (event) => {
            hovering(icon.getAttribute('data-text'), event.type)
        })
    }
    for (let icon of getRussesideIkoner) {
        icon.addEventListener('mouseover', (event) => {
            hovering(icon.getAttribute('data-text'), event.type)
        })

        icon.addEventListener('mouseout', (event) => {
            hovering(icon.getAttribute('data-text'), event.type)
        })
    }
    getSaveButton.addEventListener('mouseover', (event) => {
        hovering(getSaveButton.getAttribute('data-text'), event.type);
    })
    getSaveButton.addEventListener('mouseout', (event) => {
        hovering(getSaveButton.getAttribute('data-text'), event.type);
    })

    printButton.addEventListener('mouseover', (event) => {
        hovering(printButton.getAttribute('data-text'), event.type);
    })
    printButton.addEventListener('mouseout', (event) => {
        hovering(printButton.getAttribute('data-text'), event.type);
    })



    //Vis registreringsfelt
    getBUTTONS[1].addEventListener('click', () => {
        if (registrerVises !== true) {
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
        if (registrerVises == true) {
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
        registrerBruker("samler", getRegistrerSamlerInputsEl[0].value, getRegistrerSamlerInputsEl[1].value);
        
    })

    //loginn samler
    getLoginnSubmitEl.addEventListener('click', (event) => {
        event.preventDefault();
        loginn(getLoginnSamlerInputsEl[0].value, getLoginnSamlerInputsEl[1].value);
    })

    //vis sider på "din side"
    for (let i = 0; i < getBrukerSideIkoner.length; i++) {
        getBrukerSideIkoner[i].addEventListener('click', () => {
            russeSide(i);
        })
    }
    console.log('%c Brukere', "color:green;")
    console.log(JSON.parse(localStorage.getItem("brukere")));

}

//Funksjoner------------ -------------------- ------------------------ ------------------

function russeSide(index) {
    if (index == 0) {
        getRussesider[index].classList.remove('showBox');
        getRussesider[1].classList.add('showBox');
        getRussesider[2].classList.add('showBox');
    } else if (index == 1) {
        getRussesider[index].classList.remove('showBox');
        getRussesider[0].classList.add('showBox');
        getRussesider[2].classList.add('showBox');
    } else if (index == 2) {
        getRussesider[index].classList.remove('showBox');
        getRussesider[0].classList.add('showBox');
        getRussesider[1].classList.add('showBox');
    }
}
function loginn(brukernavn, passord) {

    let loginn = false;
    if (brukernavn === "" || passord === "") {
        alert('Du må skrive inn både brukernavn og passord!')
    } else if(brukernavn.match(format) || passord.match(format)){
            alert('Brukernavn og passord kan bare inneholde bokstaver og tall!');
    } else {
            for (let bruker of JSON.parse(localStorage.getItem("brukere"))) {
                if (brukernavn.toString().toUpperCase() == bruker.brukernavn && passord.toString() == bruker.passord) {
                    loginn = true;
                    aktivBruker = bruker.brukernavn;
                    aktivBrukerObjekt = bruker;
                    showBox(getBrukerSideEl);
                    showBox(getDinProfilKnapp);
                    showBox(getLoggUtKnapp); //fortsett her
                    for (let rEl of getRemoveEls) {
                        showBox(rEl);
                        document.body.style.height = "fit-content";
                    }
                    alerted("Du er nå logget inn!");
                    console.log('%c Aktiv bruker:', "color:green;")
                    console.log(aktivBruker);
                    hentRussekortet();
                    hentDittRussekortSide();
                    hentRussekortSamlingen();
                }
            }
            if (loginn == false) {
                alert('Brukernavn eller passord er feil, prøv på nytt!');
            }
        }
}


function hovering(string = "", event, farge = "") {

    let hoverEl = document.querySelector('#hovering');
    if (event == "mouseover") {
        hoverEl.classList.toggle('hovering');
        hoverEl.innerText = string;
    } else if (event == "mouseout") {
        hoverEl.classList.toggle('hovering');

        hoverEl.style.backgroundColor = "";
    }
    if (farge !== "") {
        hoverEl.style.backgroundColor = farge;
    }

}

function smoothAnimation(element) {
    element.style.opacity = "0";
    element.style.transform = "translateX(-30px)";
    element.style.transition = "0.4s ease all";
    setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "";
    }, 700)
}

function showBox(element) {
    element.classList.toggle('showBox');
}

function registrerBruker(bruker = "russ" || "samler", brukernavn = "", passord = "") {
    let brukernavnet = brukernavn.toUpperCase();
    let registrer = true;

    let brukerID = [];
    for (let i = 0; i < brukernavnet.length; i++) {
        brukerID.push(brukernavnet.charCodeAt(i));
    }
    brukerID = brukerID.toString().replace(/,/gi, "");
    if (format.test(getRegistrerSamlerInputsEl[0].value) || format.test(getRegistrerSamlerInputsEl[1].value)) {
        alert('Brukernavn eller passord kan ikke inneholde spesielle tegn eller æøå, kun bokstaver og tall.');
    } else if (/\s/.test(getRegistrerSamlerInputsEl[0].value) || /\s/.test(getRegistrerSamlerInputsEl[1].value)) {
        alert('Du kan ikke ha mellomrom i brukernavnet eller passordet ditt!');
    } else {

        if (window.localStorage.length == 0 && registrer == true) {
            nyeBrukere.push({
                "brukerstatus": bruker,
                "brukernavn": brukernavnet,
                "passord": passord,
                "id": brukerID
            });
            alerted(`Brukeren er registrert! \nDu kan nå logge inn med brukernavn:\n ${getRegistrerSamlerInputsEl[0].value}`);
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
                    "passord": passord,
                    "id": brukerID
                });
                alerted(`Brukeren er registrert! \nDu kan nå logge inn med brukernavn:! ${getRegistrerSamlerInputsEl[0].value}`);
            }
        }

        window.localStorage.setItem("brukere", JSON.stringify(nyeBrukere));
        console.log(JSON.parse(window.localStorage.getItem('brukere')));


    }
}

function alerted(string = "") {
    getAlertBox.innerText = string;
    showBox(getAlertBox);
    getAlertBox.style.opacity = "0";
    setTimeout(() => {
        getAlertBox.style.opacity = "1";
        setTimeout(() => {
            getAlertBox.style.opacity = "0";
            setTimeout(() => {
                showBox(getAlertBox);
            }, 1000)
        }, 2000)
    }, 100)
}







//Russekort-applikasjonen

//----------------------------------------------------------------------------------------------------

function hentRussekortet() {

    if (window.localStorage.getItem(`${aktivBruker}-kort`) && window.localStorage.getItem(`${aktivBruker}-farge`) && russekorthentet == false) {
        //TODO: radio input checked
        console.log(JSON.parse(window.localStorage.getItem(`${aktivBruker}-farge`)));
        getRussekort.innerHTML = JSON.parse(window.localStorage.getItem(`${aktivBruker}-kort`));
        getRussekort.style.backgroundColor = JSON.parse(window.localStorage.getItem(`${aktivBruker}-farge`));
        if (JSON.parse(window.localStorage.getItem(`${aktivBruker}-farge`)) == "black" || JSON.parse(window.localStorage.getItem(`${aktivBruker}-farge`)) == "blue") {
            getRussekort.style.color = "white";
        }
        russekorthentet = true;
    } else if (russekorthentet == true) {
        getRussekort.innerHTML;
    }

}

function hentDittRussekortSide() {
    getKortKode.innerHTML = aktivBrukerObjekt.id;
    if (window.localStorage.getItem(`${aktivBruker}-kort`) && window.localStorage.getItem(`${aktivBruker}-farge`)) {
        //TODO: radio input checked
        console.log(JSON.parse(window.localStorage.getItem(`${aktivBruker}-farge`)));
        getHentRussekort.innerHTML = JSON.parse(window.localStorage.getItem(`${aktivBruker}-kort`));
        getHentRussekort.style.backgroundColor = JSON.parse(window.localStorage.getItem(`${aktivBruker}-farge`));
        if (JSON.parse(window.localStorage.getItem(`${aktivBruker}-farge`)) == "black" || JSON.parse(window.localStorage.getItem(`${aktivBruker}-farge`)) == "blue") {
            getHentRussekort.style.color = "white";
        } else{
            getHentRussekort.style.color = "black";
        }
        russekorthentet = true;
    } else if (russekorthentet == true) {
        getRussekort.innerHTML;
    }
}

function hentRussekortSamlingen() {
    console.log('hh');
}


function printDiv() {
    duplicate(document.querySelector('.container'), 10); //funksjon som er hentet fra modul

    window.print();
    afterPrint();
}

function duplicate(element, amount) {
    let newArray = Array(amount);
    for (let index = 0; index < amount; index++) {
        newArray[index] = element.cloneNode(true);
        document.body.appendChild(newArray[index]);
        newArray[index].classList.add('container');
        newArray[index].style.gridRow = `${index}/ span 1`;
        if (index > 5) {
            newArray[index].style.gridColumn = `2/ span 1`;
            newArray[index].style.gridRow = `${index -4}/ span 1`;
        }

    }

}

function randomNumber(max) {
    let rnd = Math.floor(Math.random() * max);
    return rnd;
}
//let lagredeRussekortArray = [];
//let eksisterendeRussekort = JSON.parse(window.localStorage.getItem('lagredeRussekort'))
//lagredeRussekortArray = eksisterendeRussekort || [];

function lagreRussekort(russekortet, farge) {
    window.localStorage.setItem(`${aktivBruker}-kort`, JSON.stringify(russekortet.innerHTML));
    window.localStorage.setItem(`${aktivBruker}-farge`, JSON.stringify(farge));

    alerted("Lagret russekort!");
    console.log("%c Lagret kort og css", "color:green;");
    console.log(JSON.parse(window.localStorage.getItem(`${aktivBruker}-kort`)));
    console.log(JSON.parse(window.localStorage.getItem(`${aktivBruker}-farge`)));
    
    hentDittRussekortSide();
}

function visibility(element) {
    element.classList.toggle('lagredeRussekort');
    element.classList.toggle('visible');
}

function updateRusseaar() {
    if(getEndreAar_input.value.match(format)){
        alert('Skriv inn et årstall');
    } else {
        getRussetekst = document.querySelector('.russ');
        getRussetekst.innerHTML = `${russ}russ ${getEndreAar_input.value}`;
    }
};


const getSaveButton = document.querySelector('#buttonSave');


const getLagredeRussekortBox = document.querySelector('#lagredeRussekort');
getSaveButton.addEventListener('click', () => {
    //let dennefargen = `${getRussekort.getAttribute('data')}`;
    let dennefargen = getRussekort.style.backgroundColor;

    console.log(dennefargen);
    lagreRussekort(getRussekort, dennefargen);
});


//function hentLagredeRussekort() {
//    console.log(lagredeRussekortArray);
//    for (let i = 0; i < lagredeRussekortArray.length; i++) {
//        let newCarddesign = document.createElement('div');
//        newCarddesign.classList.add('container');
//        newCarddesign.innerHTML = lagredeRussekortArray[i];
//        newCarddesign.style.transform = "scale(0.5)";
//        getLagredeRussekortBox.appendChild(newCarddesign);
//
//    }
//}

document.body.style.opacity = "1";

function afterPrint() {

    document.addEventListener('scroll', () => {
        let russekorta = document.querySelectorAll('.container');
        for (let i = 0; i < russekorta.length; i++) {
            if (i !== 0) {
                russekorta[i].style.display = "none";
            }
        }

    })
    alerted("Handling utført!");
}
const getBilde = document.querySelector('#bilde');
const getLogo = document.querySelector('#logoFile');

getLogo.addEventListener('change', function () {
    try {

        if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(this.files[0]);
            reader.addEventListener("load", () => {
                localStorage.setItem("gruppeBilde", reader.result);

                let currentRecentImage = localStorage.getItem("myRecentImage");
                if (currentRecentImage) {
                    document.querySelector('#russelogoen').setAttribute("src", currentRecentImage);
                }
            })
        }
        alerted("Handling utført!");

    } catch (error) {
        console.log(error);

    }

    if (this.files && this.files[0]) {
        getRusselogoen.src = URL.createObjectURL(getLogo.files[0]);
    };
});


getBilde.addEventListener('change', function () {
    try {

        if (this.files && this.files[0]) {

            const reader = new FileReader();

            reader.readAsDataURL(this.files[0]);
            reader.addEventListener("load", () => {
                try {

                    localStorage.setItem("myRecentImage", reader.result);

                } catch (error) {
                    alert("Bilde var for stort til å lagres for neste gang, \n så du må bare laste det opp på nytt før du bruker det");

                    localStorage.setItem("myRecentImage", reader.result);
                }
                let currentRecentImage = localStorage.getItem("myRecentImage");
                if (currentRecentImage) {
                    document.querySelector('#russebilde').setAttribute("src", currentRecentImage);
                }

            })
        }
        alerted("Handling utført!");
    } catch (error) {
        console.log(error);
    }

    if (this.files && this.files[0]) {
        document.querySelector("#russebilde").src = URL.createObjectURL(getBilde.files[0]);
    };
});

getNavnInput.addEventListener('input', () => {
    getNavn = document.querySelector('.navn');
    if(getNavnInput.value.match(format)){
        alert('Kun bokstaver og tall!');
    } else {
        
    getNavn.setAttribute('data-text', getNavnInput.value)
    getNavn.innerHTML = "<br>" + getNavn.getAttribute('data-text');
    if (getNavnInput.value.length > 15) {
        getNavn.style.fontSize = "1.1rem";
    } else {
        getNavn.style.fontSize = "";
    }
    }
})


getSkoleInput.addEventListener('input', () => {
    getSkole = document.querySelector('.header');
    if (getSkoleInput.value.length > 31) {
        getSkole.style.letterSpacing = "0.001rem";
        getSkole.innerHTML = getSkole.getAttribute('data-text');
    } else {
        getSkole.style.letterSpacing = "";
        getSkole.setAttribute('data-text', getSkoleInput.value);
        getSkole.innerHTML = getSkole.getAttribute('data-text');
    }
})

const getFargeVelger = document.getElementsByName('farge');

const getEndreAar_input = document.querySelector('#endreAar input');
let russ = "Rød";

for (let f of getFargeVelger) {
    f.addEventListener('change', () => {
        //getRussekort.style.background = `${f.value}`
        getRussekort.setAttribute('style', `background:${f.value};`);
        if (f.value == "red") {
            russ = "Rød";
        } else if (f.value == "blue") {
            russ = "Blå";
        } else if (f.value == "black") {
            russ = "Sort";
        }
        updateRusseaar();
        if (f.value === "black") {
            getRussekort.removeAttribute("style");
            getRussekort.setAttribute("style", "background:black; color:white;");
        } else if(f.value === "blue"){
            getRussekort.removeAttribute("style");
            getRussekort.setAttribute("style", "background:blue; color:white;");
        }
    })
}

let sitater = ["Shut the f*** up Sondre!", "🤑", "😛", "Etter sølvet kommer gulvet, etter gulvet kommer kjellern, etter kjellern kommer hølet", "Saturdays are for the boys", "2cool4school", "joiner du mc?",
    "Dette russekortet skulle heller vært en NFT..."
];

getSitatselect.addEventListener('change', () => {
    if (getFooter.style.visibility !== "hidden") {
        getFooter.style.visibility = "hidden";
        getEgne.style.visibility = "hidden";
        getEgne.style.height = "1px";

        getTilfeldigSitatOmraade.style.visibility = "visible";
        getTilfeldigSitatOmraade.style.height = "";
        getTilfeldigSitatFelt.style.visibility = "visible";
    } else if (getFooter.style.visibility == "hidden") {

        getFooter.style.visibility = "visible";
        getEgne.style.visibility = "visible";
        getEgne.style.height = "";

        getTilfeldigSitatOmraade.style.visibility = "hidden";
        getTilfeldigSitatFelt.style.visibility = "hidden";
    }
})
getTilfeldigSitatKnapp.addEventListener('click', () => {
    getTilfeldigSitatFelt.innerHTML = `${sitater[randomNumber(sitater.length)]}`;
})

getAdresseInput.addEventListener('input', () => {
    getAdresse = document.querySelector('.adresse');
    if (getAdresseInput.value.length > 25) {
        alert(`"${getAdresseInput.value}" er for langt`);
    } else {
        getAdresse.innerHTML = `Adresse: ${getAdresseInput.value}`;
    }

});


getTlfInput.addEventListener('input', () => {
    getTlf = document.querySelector('.tlf');
    if (getTlfInput.value.length > 29) {
        alert(`${getTlfInput.value} er for langt`);
    } else {
        getTlf.innerHTML = `Tlf.: ${getTlfInput.value}`;
    }

});


getGruppeInput.addEventListener('input', () => {
    getGruppe = document.querySelector('.gruppe');
    if (getGruppeInput.value.length > 28) {
        alert(`"${getGruppeInput.value}" er for langt`);
    } else {
        getGruppe.innerHTML = `Russegruppe: ${getGruppeInput.value}`;
    }

});
let getSitater = document.querySelectorAll('.footer p');
const getSitatInputer = document.querySelectorAll('.sitat_input');

for (let i = 0; i < getSitatInputer.length; i++) {

    getSitatInputer[i].addEventListener('input', () => {
        getSitater = document.querySelectorAll('.footer p');
        if (getSitatInputer[i].value.length <= 48) {
            getSitater[i].innerHTML = `${getSitatInputer[i].value}`;
        } else {
            alert('Skriv videre på neste linje, maks lengde pr. linje er 48 tegn' + "\nLengden på ditt sitat er: " + getSitatInputer[i].value.length);
            let msg = "";
            for (let index = 0; index <= 48; index++) {
                msg += getSitatInputer[i].value[index];
            }
            getSitater[i].innerHTML = msg;
        }
    });
}



printButton.addEventListener('click', printDiv);
//____________________________________________________________ekstra kode for innstillinger




let getSettings = document.querySelector('#settings');
let getSettingsChildren = document.querySelectorAll('#settings p');
let getTannhjul = document.querySelector('header #tannhjul');
let settingsVisibility = false;
getTannhjul.addEventListener('click', () => {

    if (settingsVisibility === false) {

        getSettings.style.display = "block";
        setTimeout(() => {
            getSettings.style.opacity = "1";
            getSettings.style.right = "2rem";
        }, 200);
        settingsVisibility = true;


    } else if (settingsVisibility === true) {
        for (let p of getSettingsChildren) {
            p.style.backgroundColor = "lightgreen";
            setTimeout(() => {
                p.style.backgroundColor = "";
            }, 1500)
        }
    }
});

const getExit = document.querySelectorAll('.exit');
getExit[0].addEventListener('click', () => {
    getSettings.style.opacity = "0";
    getSettings.style.right = "1rem";
    setTimeout(() => {
        getSettings.style.display = "none";
    }, 200)
    settingsVisibility = false;
});

getFjernRussegruppe.addEventListener('mouseover', () => {
    getRussegreier = document.querySelectorAll('.russe');
    for (let i = 0; i < getRussegreier.length; i++) {
        getRussegreier[i].style.display = "none";
    }
});

getFjernRussegruppe.addEventListener('mouseout', () => {
    getRussegreier = document.querySelectorAll('.russe');
    if (fjernRussegruppeClicked == false) {

        for (let i = 0; i < getRussegreier.length; i++) {
            getRussegreier[i].style.display = "";
        }
    }
});

getFjernRussegruppe.addEventListener('click', () => {
    getRussegreier = document.querySelectorAll('.russe');
    if (fjernRussegruppeClicked == false) {

        for (let i = 0; i < getRussegreier.length; i++) {
            getRussegreier[i].style.display = "none";
        }
        getAngre[0].style.display = "block";
        fjernRussegruppeClicked = true;
    }
});


let midtstillClicked = false;

getMidstill.addEventListener('mouseover', () => {
    getRussebilde.style.position = "absolute";
    getRussebilde.style.left = "-90%";
});

getMidstill.addEventListener('mouseout', () => {
    if (midtstillClicked == false) {
        getRussebilde.style.position = "";
        getRussebilde.style.left = "";
    }
});


getMidstill.addEventListener('click', () => {
    getRussebilde.style.position = "absolute";
    getRussebilde.style.left = "-90%";
    midtstillClicked = true;
    getAngre[1].style.display = "block";
})

getEndreAar_input.addEventListener('input', () => {
    if (getEndreAar_input.value.length < 5) {
        updateRusseaar();
        getAngre[2].style.display = "block";
    }
})


let fjernRussegruppeClicked = false;

getAngre[0].addEventListener('click', () => {
    if (fjernRussegruppeClicked == true) {

        for (let i = 0; i < getRussegreier.length; i++) {
            getRussegreier[i].style.display = "";
        }
        getAngre[0].style.display = "none";
        fjernRussegruppeClicked = false;
    }
});
getAngre[1].addEventListener('click', (e) => {
    if (midtstillClicked == true) {
        getRussebilde.style.position = "";
        getRussebilde.style.left = "";
        midtstillClicked = false;
        e.target.style.display = "none";
    }
});

getAngre[2].addEventListener('click', () => {
    getEndreAar_input.value = "2022";
    updateRusseaar(); //lage en funksjon for dette?
    getAngre[2].style.display = "none";
})