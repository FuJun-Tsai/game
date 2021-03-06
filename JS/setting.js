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

let game = document.querySelector('.game .row');
let renden = document.querySelectorAll('.gameset button');
let html = '';
let totalLine = 0;

let nameBtn = document.querySelectorAll('.player button');
let colorBtn = [...document.querySelectorAll('.player .layout .color')];

main.style.paddingTop = headerHeight + 'px';

function rendenWindow(){

    let rendenName = document.querySelectorAll('.player .name');
    let rendenColor = document.querySelectorAll('.player .color');

    rendenName.forEach( (item,index) => {
        item.textContent = data[`player${index+1}`].playerName;
        item.style.colr = data[`player${index+1}`].playerColor;
    });

    rendenColor.forEach( (item,index) => {
        item.value = data[`player${index+1}`].playerColor;
    });

    document.querySelector('html').style.setProperty(`--player1Color`,data.player1.playerColor);
    document.querySelector('html').style.setProperty(`--player2Color`,data.player2.playerColor);

}

function changeName(){
    let playerName = this.parentElement.querySelector('.name');
    let inputName = this.parentElement.querySelector('.changename');
    let dataChange = this.dataset.change;

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
        this.innerText = '改名';

        data[`player${dataChange}`].playerName = inputName.value;
        localStorage.setItem('game',JSON.stringify(data));
    }
}

function changeColor(){
    let dataChange = this.dataset.change;
    
    document.querySelector('html').style.setProperty(`--player${dataChange}Color`,this.value);

    data[`player${dataChange}`].playerColor = this.value;
    localStorage.setItem('game',JSON.stringify(data));
    
}

function rendenTable(){
    side = parseInt(this.value);
    totalLine = (Math.pow(side,2)+side)*2;
    scores = [0,0];
    scoresBar.forEach(item=>{
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

    notice();
}

function lineHandler(){
    this.classList.add('selected');
    this.removeEventListener('click',lineHandler);

    let row = +this.dataset.row;
    let num = +this.dataset.num;
    let section = this.parentElement.className;
    continuous = false;

    boxJudge(row,num,section);

    if(!continuous){
        turn+=1;
        turn === 2 ? turn = 0 : 0 ;
    };

    totalLine-=1;

    if (totalLine == 0){
        scores[0] > scores[1] ? alert(`${data.player1.playerName} WIN!!`) : scores[0] < scores[1] ? alert(`${data.player1.playerName} WIN!!`) : alert('WOW TIE!! play again?') ;
    }
    notice();

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

function notice(){
    let notice = document.querySelector('.notice'); 
    notice.innerText = `${data[`player${turn+1}`].playerName} Draw!!`;
    notice.classList.remove(`player1`);
    notice.classList.remove(`player2`);
    notice.classList.add(`player${turn+1}`);
};

rendenWindow();

renden.forEach( item => {
    item.addEventListener('click',rendenTable);
});

nameBtn.forEach( item => {
    item.addEventListener('click',changeName);
});

colorBtn.forEach( item => {
    item.addEventListener('input',changeColor);
})