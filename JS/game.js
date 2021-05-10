let players = ['player1','player2'];
let player = ["O","X"];
let turn = 0;
let continuous = false;

let game = {
    square: 2
};

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
        turn === players.length ? turn = 0 : 0 ;
    };
    
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

        if(num!==game.square){

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

        if(row!==game.square*2){

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
        arr[3].innerHTML = `<p>${player[turn]}</p>`;
        continuous = true;
    };
};

let lines = document.querySelectorAll('.line');

lines.forEach( line => {
    line.addEventListener('click',lineHandler);
});