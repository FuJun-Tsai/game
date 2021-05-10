let headerHeight = document.querySelector('header').getBoundingClientRect().height;
let main = document.querySelector('.game .container .row');
let gameset = document.querySelector('.gameset');
let renden = document.querySelectorAll('.gameset button');
let html = '';

// document.querySelector('body').style.paddingTop = headerHeight + 'px';
main.style.paddingTop = headerHeight + 'px';
gameset.style.paddingTop = headerHeight + 'px';

function rendenTable(){
    let side = parseInt(this.value);
    for(let i=0; i<=side ;i+=1){
        main.innerHTML+=`
            <div class="bar"></div>
            <div class="boxs"></div>
        `;
        if(i==side){
            main.innerHTML+=`
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
                <div class="line" data-row="${index}" data-num="${i}">
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
                <div class="line" data-row="${index}" data-num="${i}">
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
}

renden.forEach( item => {
    item.addEventListener('click',rendenTable);
});