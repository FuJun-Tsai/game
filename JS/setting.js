let headerHeight = document.querySelector('header').getBoundingClientRect().height;
let main = document.querySelector('main');
let gameset = document.querySelector('.gameset');

let side = 0;
let players = ['player1','player2'];
let player = ["O","X"];
let turn = 0;
let continuous = false;

let game = document.querySelector('.game .container .row');
let renden = document.querySelectorAll('.gameset button');
let html = '';

let nameBtn = document.querySelectorAll('.player button');

// document.querySelector('body').style.paddingTop = headerHeight + 'px';
main.style.paddingTop = headerHeight + 'px';

function changeName(){
    console.log(this.dataset.status);
}

function rendenTable(){
    side = parseInt(this.value);
    game.innerHTML = '';
    for(let i=0; i<=side ;i+=1){
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

    console.log(bars);
    console.log(boxs);
    // bars[0].innerHTML = `
    //     <div class="doc"></div>
    //     <div class="line" data-row="0" data-num="0">
    //         <div></div>
    //     </div>
    //     <div class="doc"></div>
    //     `;
    bars.forEach((item,index) => {
        for(let i=0; i<=side ;i+=1){
            // console.log(item,index);
            item.innerHTML+= `
                <div class="doc"></div>
                <div class="line" data-row="${index*2}" data-num="${i}">
                    <div></div>
                </div>
            `;

            if(i==side){
                item.innerHTML+= `
                <div class="doc"></div>
                `;
            }
        }
    });

    boxs.forEach((item,index) => {
        for(let i=0; i<=side ;i+=1){
            // console.log(item,index);
            item.innerHTML+= `
                <div class="line" data-row="${1+index*2}" data-num="${i}">
                    <div></div>
                </div>
                <div class="box" data-box="${index}${i}">
                    <p></p>
                </div>
            `;

            if(i==side){
                item.innerHTML+= `
                <div class="line" data-row="${index}" data-num="${i+1}">
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
        turn === players.length ? turn = 0 : 0 ;
    };
    
};

function boxJudge(row,num,section){
    let condition1 = [false,false,false,"target"];
    let condition2 = [false,false,false,"target"];

    if(section === 'boxs'){

        if(num!==0){

            console.log(row,num);
            console.log(document.querySelector(`[data-row="${row}"][data-num="${num-1}"]`));
            console.log(document.querySelector(`[data-row="${row-1}"][data-num="${num-1}"]`));
            console.log(document.querySelector(`[data-row="${row+1}"][data-num="${num-1}"]`));

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

//////////////////////////////////////////////////////

renden.forEach( item => {
    item.addEventListener('click',rendenTable);
});

nameBtn.forEach( item => {
    item.addEventListener('click',changeName);
});