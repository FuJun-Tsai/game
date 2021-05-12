let headerHeight = document.querySelector('header').getBoundingClientRect().height;
let main = document.querySelector('main');
let gameset = document.querySelector('.gameset');

let side = 0;
let players = {
    player1:{
        playerName: 'player1',
        playerColor: '#ff0000'
    },
    player2:{
        playerName: 'player2',
        playerColor: '#0000ff'
    }
};
let data = JSON.parse(localStorage.getItem('game')) || players;

let player = ["O","X"];
let turn = 0;
let scoresBar = document.querySelectorAll('.player .layout .score');
let scores = [0,0];
let continuous = false;

let game = document.querySelector('.game .container .row');
let renden = document.querySelectorAll('.gameset button');
let html = '';
let totalLine = 0;

let nameBtn = document.querySelectorAll('.player button');
let colorBtn = [...document.querySelectorAll('.player .layout .color')];

main.style.paddingTop = headerHeight + 'px';

function rendenWindow(){
    console.log(data);
    let name1 = document.querySelector('.player1 .name');
    let name2 = document.querySelector('.player2 .name');
    let color1 = document.querySelector('.player1 .color');
    let color2 = document.querySelector('.player2 .color');
    let score1 = document.querySelector('.player1 .layout .score');
    let score2 = document.querySelector('.player2 .layout .score');


    name1.textContent = data.player1.playerName;
    name2.textContent = data.player2.playerName;
    color1.value = data.player1.playerColor;
    color2.value = data.player2.playerColor;
    name1.style.color = data.player1.playerColor;
    name2.style.color = data.player2.playerColor;
    score1.style.color = data.player1.playerColor;
    score2.style.color = data.player2.playerColor;

}

rendenWindow();


function changeName(){
    let playerName = this.parentElement.querySelector('.name');
    let inputName = this.parentElement.querySelector('.changename');
    let dataChange = this.dataset.change;

    console.log(dataChange);
    console.log(data);

    if(this.dataset.status=='0'){
        playerName.style.display = 'none';
        inputName.style.display = 'inline';
        inputName.value = playerName.innerText;
        this.dataset.status = '1';
        this.innerText = '確認';
        
    }else{
        playerName.style.display = 'inline';
        inputName.style.display = 'none';
        playerName.innerText = inputName.value;
        this.dataset.status = '0';
        this.innerText = '修改';

        data[`player${dataChange}`].playerName = inputName.value;
        localStorage.setItem('game',JSON.stringify(data));
    }
}

function changeColor(){
    let playerColor = this.parentElement.parentElement.querySelector('.name');
    let playerScore = this.parentElement.querySelector('.score');
    let dataChange = this.dataset.change;

    this.value == '#ffffff' ? playerColor.style.background = '#000' : playerColor.style.background = '' ;
    playerColor.style.color = this.value;
    playerScore.style.color = this.value;

    data[`player${dataChange}`].playerColor = this.value;
    localStorage.setItem('game',JSON.stringify(data));
    
}

function rendenTable(){
    side = parseInt(this.value);
    totalLine = (Math.pow(side,2)+side)*2;
    scores = [0,0];
    scoresBar.forEach(item=>{
        console.log(item)
        item.textContent = '0'
    });
    game.innerHTML = '';
    for(let i=1; i<=side ;i+=1){
        game.innerHTML+=`
            <div class="bar"></div>
            <div class="boxs"></div>
        `;
        if(i==side){
            game.innerHTML+=`
                <div class="bar"></div>
            `;
        }
    }
    let bars = document.querySelectorAll('.bar');
    let boxs = document.querySelectorAll('.boxs');

    bars.forEach((item,index) => {
        for(let i=0; i<side ;i+=1){
            item.innerHTML+= `
                <div class="doc"></div>
                <div class="line" data-row="${index*2}" data-num="${i}">
                    <div></div>
                </div>
            `;

            if(i==side-1){
                item.innerHTML+= `
                <div class="doc"></div>
                `;
            }
        }
    });

    boxs.forEach((item,index) => {
        for(let i=0; i<side ;i+=1){
            item.innerHTML+= `
                <div class="line" data-row="${1+index*2}" data-num="${i}">
                    <div></div>
                </div>
                <div class="box" data-box="${index}${i}">
                    <p></p>
                </div>
            `;

            if(i==side-1){
                item.innerHTML+= `
                <div class="line" data-row="${1+index*2}" data-num="${i+1}">
                    <div></div>
                </div>
                `;
            }
        }
    });

    let lines = document.querySelectorAll('.line');

    lines.forEach( line => {
        line.addEventListener('click',lineHandler);
    });
}

//////////////////////////////////////////////////////
function lineHandler(){
    this.classList.add('selected');
    this.removeEventListener('click',lineHandler);

    let row = parseInt(this.dataset.row);
    let num = parseInt(this.dataset.num);
    let section = this.parentElement.className;
    continuous = false;

    boxJudge(row,num,section);

    if(!continuous){
        turn+=1;
        turn === 2 ? turn = 0 : 0 ;
    };

    totalLine-=1;

    if (totalLine == 0){
        scores[0] > scores[1] ? alert('player1 WIN!!') : scores[0] < scores[1] ? alert('player2 WIN!!') : alert('WOW TIE!! play again?') ;
    }

};

function boxJudge(row,num,section){
    let condition1 = [false,false,false,"target"];
    let condition2 = [false,false,false,"target"];

    if(section === 'boxs'){

        if(num!==0){

            condition1 = [
                document.querySelector(`[data-row="${row}"][data-num="${num-1}"]`).classList.contains('selected'),
                document.querySelector(`[data-row="${row-1}"][data-num="${num-1}"]`).classList.contains('selected'),
                document.querySelector(`[data-row="${row+1}"][data-num="${num-1}"]`).classList.contains('selected'),
                document.querySelector(`[data-box="${(row-1)/2}${num-1}"]`)
            ];

            
        };

        if(num!==side){

            condition2 = [
                document.querySelector(`[data-row="${row}"][data-num="${num+1}"]`).classList.contains('selected'),
                document.querySelector(`[data-row="${row+1}"][data-num="${num}"]`).classList.contains('selected'),
                document.querySelector(`[data-row="${row-1}"][data-num="${num}"]`).classList.contains('selected'),
                document.querySelector(`[data-box="${(row-1)/2}${num}"]`)
            ];

        };

    }else{

        if(row!==0){

            condition1 = [
                document.querySelector(`[data-row="${row-2}"][data-num="${num}"]`).classList.contains('selected'),
                document.querySelector(`[data-row="${row-1}"][data-num="${num}"]`).classList.contains('selected'),
                document.querySelector(`[data-row="${row-1}"][data-num="${num+1}"]`).classList.contains('selected'),
                document.querySelector(`[data-box="${row/2-1}${num}"]`)
            ];

        };

        if(row!==side*2){

            condition2 = [
                document.querySelector(`[data-row="${row+1}"][data-num="${num}"]`).classList.contains('selected'),
                document.querySelector(`[data-row="${row+1}"][data-num="${num+1}"]`).classList.contains('selected'),
                document.querySelector(`[data-row="${row+2}"][data-num="${num}"]`).classList.contains('selected'),
                document.querySelector(`[data-box="${row/2}${num}"]`)
            ];

        };

    };

    boxWrite(condition1);
    boxWrite(condition2);

};

function boxWrite(arr){
    let all = arr[0] && arr[1] && arr[2];
    
    if (all) {
        arr[3].innerHTML = `<p class="player${turn+1}">${player[turn]}</p>`;
        continuous = true;
        scores[turn]+=1;
        scoresBar[turn].innerText = scores[turn];
    };

};

//////////////////////////////////////////////////////

renden.forEach( item => {
    item.addEventListener('click',rendenTable);
});

nameBtn.forEach( item => {
    item.addEventListener('click',changeName);
});

colorBtn.forEach( item => {
    item.addEventListener('change',changeColor);
    item.addEventListener('input',changeColor);
})