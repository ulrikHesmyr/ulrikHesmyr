window.addEventListener('load', init);

const getAnimertCanvas = document.querySelector('#canvasAnimert');
const getPoengEl = document.querySelector('#poengtelling');
const getLevelEl = document.querySelector('#level');
//const getForsokEl = document.querySelector('#antallLiv');
const getStatsEl = document.querySelector('#stats');
const getPauseEl = document.querySelector('#pause');
const getPengerEl = document.querySelector('#penger');

const levels = [{
        stepY: 7,
        stepX: 3,
        posUp: 50,
        points: 10,
        level: 1
    },
    {
        stepY: 10,
        stepX: 3,
        posUp: 55,
        points: 20,
        level: 2
    },
    {
        stepY: 14,
        stepX: 4,
        posUp: 60,
        points: 35,
        level: 3
    },
    {
        stepY: 18,
        stepX: 5,
        posUp: 60,
        points: 60,
        level: 4
    },
    {
        stepY: 25,
        stepX: 5,
        posUp: 60,
        points: 70,
        level: 5
    },
    {
        stepY: 28,
        stepX: 6,
        posUp: 60,
        points: 100,
        level: 6
    }
]
let penger = 0;
let level = 0;
let forsokIgjen = 3;
let ctx;
let rectX = 100;
let rectY = 0;
let posX = 350;
let posY = 480;
let stepX = levels[level].stepX;
let stepY = levels[level].stepY;
let poeng = 0;
let spill = true; //fortsett


let eksisterendeMynter = JSON.parse(localStorage.getItem("mynter"));
if (eksisterendeMynter) {

    penger += parseInt(eksisterendeMynter);
}

window.addEventListener('keydown', (event) => {
    if (event.key == "ArrowLeft" || "ArrowRight" || "ArrowUp" || "ArrowDown") {
        event.preventDefault();
    }
    if (event.key == "Enter") {
        if (spill == true) {
            spill = false;
            display(getPauseEl);
        } else if (spill == false) {
            display(getPauseEl);
            spill = true;
            window.requestAnimationFrame(anim);
        }
    }

    event.key == "ArrowLeft" ? posX -= levels[level].posUp : posX;
    event.key == "ArrowRight" ? posX += levels[level].posUp : posX;
    //Paden går helt rundt
    if (posX >= getAnimertCanvas.width) {
        posX = -10;
    } else if (posX <= -100) {
        posX = getAnimertCanvas.width;
    }
    //console.log(posX);

})


function init() {
    ctx = getAnimertCanvas.getContext('2d');

    blank();
    drawSquare();

    window.requestAnimationFrame(anim);
    updateScore();

}

function display(element) {
    element.classList.toggle('visible');
}

function fremhev(element, farge = "red") {
    element.style.transition = "ease all 0.2s";
    if (farge == "green") {
        element.style.backgroundColor = "var(--gronn)";
    } else {
        element.style.backgroundColor = `${farge}`;
    }
    setTimeout(() => {
        element.style.backgroundColor = "";
    }, 200)
}

function updateScore() {
    if (poeng == levels[level].points) {
        if (level > levels.length + 1) {
            penger += 180;
            level = 0;
            fremhev(getPengerEl, "yellow");
            fremhev(getLevelEl, "black");
        } else {
            level++;
            penger += 20;
            fremhev(getPengerEl, "yellow");
            fremhev(getLevelEl, "lightblue");
        }
    }
    getPoengEl.innerText = `Poeng: ${poeng}`;
    getLevelEl.innerText = `Level: ${levels[level].level}`;
    getPengerEl.innerHTML = `<span class="material-icons">
    savings
    </span>${penger} mynter`;
    getStatsEl.innerText = `Ballens fart: ${levels[level].stepY}\nPadens fart: ${levels[level].posUp}`;
}

function randomNumber(max) {
    return parseInt(Math.ceil(Math.random() * max));
}

function blank() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, getAnimertCanvas.width, getAnimertCanvas.height);

}

function drawSquare() {

    //ctx.drawImage(DVDbilde, rectX, rectY, 50, 50);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(rectX, rectY, 20, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fillRect(posX, posY, 100, 10);
    ctx.stroke();

}

function anim() {
    blank();


    rectX += stepX;
    rectY += stepY;

    rectX > getAnimertCanvas.width - 20 ? stepX *= -1 : rectX;
    rectX < 20 ? stepX *= -1 : rectX;

    if (rectY > getAnimertCanvas.height) {
        stepY *= -1;
        rectY = 0;
        if (poeng > 0) {
            poeng = 0;
            level = 0;
            updateScore();
            fremhev(getPoengEl);
            fremhev(getLevelEl);
        }
    }
    rectY < -30 ? stepY *= -1 : rectY;
    if (posX - 10 < rectX && posX + 139 > rectX && rectY > 460 && rectY < 480) { //&& rectY == posY - 20 && rectY < posY
        poeng++;
        penger++;
        window.localStorage.setItem("mynter", JSON.stringify(penger));
        fremhev(getPengerEl, "yellow");
        fremhev(getPoengEl, "green");
        stepY *= -1;
        updateScore();
    }

    //if (rectY > 800 || rectY < 0) {
    //    rectX = -50;
    //    rectY = 250;
    //    stepX = 5;
    //    stepY = 0;
    //
    //
    //}

    //if(rectX > getAnimertCanvas.width || rectX < -50){
    //stepX *= -1;
    //}  
    drawSquare();

    if (spill == true) {

        window.requestAnimationFrame(anim);
    }
}