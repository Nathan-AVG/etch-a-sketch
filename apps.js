//buttons
const pallette = document.querySelector('.tools input');
const color = document.querySelector('.tool.color');
const rainbow = document.querySelector('.tool.rainbow');
const eraser = document.querySelector('.tool.eraser');
const clear = document.querySelector('.tool.clear');
//board contents
const board = document.querySelector('.boardheight');
const boardheight = document.querySelector('.board');
//sliders
const sliderValue = document.querySelector('span');
const inputSlider = document.querySelector('.size');
//tools
const tools = document.querySelectorAll('.tool');

//initialization
let clickstatus = false;//simulating not clicking()

let value = 32;
drawgrids();
let colorUser = 'white';


//to detect click and hold
board.addEventListener('mousedown', ()=>{clickstatus = true});
board.addEventListener('mouseup', ()=>{clickstatus = false});

//color button
color.addEventListener('click', function(){
    lighten();
    this.classList.add('selected'); //to darken
    let colorUser = pallette.value;
    changecolor(colorUser);
    pallette.oninput = (()=>{
        let colorUser = pallette.value;
        changecolor(colorUser);
    });
});

rainbow.addEventListener('click', function(){
    lighten();
    this.classList.add('selected'); //to darken
    window.addEventListener('mouseover', ()=>{ //to change everytime we change position
        randomnumber = Math.random() * 360;
        console.log(randomnumber);
        changecolor(`hsl(${randomnumber}, 100%, 50%)`);
    })
});

//eraser button
eraser.addEventListener('click', function(){
    lighten();
    this.classList.add('selected'); //to darken
    changecolor('white');
});

//clear button
clear.addEventListener('click', function(){
    clearScreen();
    let value = inputSlider.value;
    drawgrids();
});

//range slider display
inputSlider.oninput = (()=>{
    let value = inputSlider.value;
    sliderValue.textContent = value;
    sliderValue.style.left = ((value/64 * 100)- 9) + "%";
    sliderValue.classList.add('show');
});

inputSlider.onblur = (()=>{
    sliderValue.classList.remove('show');
})

//change grid size
inputSlider.onchange = (()=>{
    clearScreen();
    drawgrids();
});

//function
function lighten(){ //lightens every other tool button
    tools.forEach(tool => tool.classList.remove('selected'));
}

function clearScreen(){
    let value = inputSlider.value;

    while(board.firstChild){
        const lastElement = board.lastChild;
        board.removeChild(lastElement);
    } 
}

function drawgrids(){
    const height = boardheight.offsetHeight;
    let value = inputSlider.value;
    const magicnum = (height/value);

    for(let i = 0; i < value**2; i++){
        const newBoard = document.createElement('div');
        newBoard.addEventListener('mouseover', drawcolor); //important
        newBoard.className = 'block';

        newBoard.style.cssText = `height: ${magicnum}px; width: ${magicnum}px`;
        board.appendChild(newBoard);
    }
}

function drawcolor(){
    if(clickstatus){
        this.style.background = colorUser; //IMPORTANT
    } 
}

function changecolor(choice){
    colorUser = choice;
}


