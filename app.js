//buttons
const color = document.querySelector('.tool.color');
const rainbow = document.querySelector('.tool.rainbow');
const eraser = document.querySelector('.tool.eraser');
const clear = document.querySelector('.tool.clear');
//board contents
const board = document.querySelector('.boardheight');
const boardheight = document.querySelector('.board');
//sliders
const sliderValue = document.querySelector('span');
const inputSlider = document.querySelector('input');
//tools
const tools = document.querySelectorAll('.tool');

//initialization
let value = 32;
draw();

const blocks = document.querySelectorAll('.block');

let mouseStatus = false;
board.onmousedown = function(){
    mouseStatus = true;
    console.log(mouseStatus);
    blocks.forEach(block => block.addEventListener('mousemove', function(){
        this.style.background = 'yellow';
    }));
}
board.onmouseup = function(){
    mouseStatus = false;
    console.log(mouseStatus);
    blocks.forEach(block => block.removeEventListener('mousemove', function(){
        this.style.background = 'yellow';
    }));
}

//draw
color.addEventListener('click', function(){
    lighten();
    allowDraw();
    //darken
    this.classList.add('selected');
});

//eraser
eraser.addEventListener('click', function(){
    lighten();
    const blocks = document.querySelectorAll('.block');
    allowDraw('white');
    //darken
    this.classList.add('selected');
});

//clear screen
clear.addEventListener('click', function(){
    clearScreen();
    let value = inputSlider.value;
    draw();
    allowDraw();
    //darken
    this.classList.add('selected');
    //temporary darken
    setTimeout(() => {
        this.classList.remove('selected');;
    }, 1000);
});
//

//for range slider display
inputSlider.oninput = (()=>{
    let value = inputSlider.value;
    sliderValue.textContent = value;
    sliderValue.style.left = ((value/64 * 100)- 9) + "%";
    sliderValue.classList.add('show');
});

inputSlider.onblur = (()=>{
    sliderValue.classList.remove('show');
})
//

//change size
inputSlider.onchange = (()=>{
    clearScreen();
    draw();
    allowDraw();
});
//

//functions
function lighten(){
    tools.forEach(tool => tool.classList.remove('selected'));
}

/*function allowDraw(color){
    const blocks = document.querySelectorAll('.block');
    
    let mouseStatus = false;
    board.onmousedown = function () {
        mouseStatus = true;
        blocks.forEach(block => block.addEventListener('mouseover', function(){
            this.style.background = color;
        }));
        console.log(mouseStatus);
    };
    board.onmouseup = function () {
        mouseStatus = false;
        blocks.forEach(block => block.removeEventListener('mouseover', function(){
            this.style.background = color;
        }));
        console.log(mouseStatus);
    };
}*/

function clearScreen(){
    let value = inputSlider.value;

    while(board.firstChild){
        const lastElement = board.lastChild;
        board.removeChild(lastElement);
    } 
}

function draw(){
    const height = boardheight.offsetHeight;
    let value = inputSlider.value;
    const magicnum = (height/value);

    for(let i = 0; i < value**2; i++){
        const newBoard = document.createElement('div');
        newBoard.className = 'block';

        newBoard.style.cssText = `height: ${magicnum}px; width: ${magicnum}px; border: 1px solid black`;
        board.appendChild(newBoard);
    }
}




