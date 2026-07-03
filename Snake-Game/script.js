const board = document.querySelector(".board");
const blockheight = 30;
const blockwidth = 30;

const rows = Math.floor(board.clientHeight/blockheight);
const cols = Math.floor(board.clientWidth/blockwidth);
const blocks = [];
const snake = [{x:1,y:3},{x:1,y:4},{x:1,y:5}];
const food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
let d = "down";
for(let row = 0;row< rows;row++);
{
    for(let col=0;col< cols;col++);
    {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}_${col}`] = block;
    }
}

function render(){
snake.forEach(segment=>{
    blocks[`${segment.x}_${segment.y}`].classList.add("fill");
})
}

setInterval(
()=>{
    let head = null;

   blocks[`${food.x}_${food.y}`].classList.add('food')

    if(d =="left"){
        head = {x:snake[0].x,y:snake[0].y-1}
    }else if(d =="right"){
     head = {x:snake[0].x,y:snake[0].y+1}
    }else if(d =="up"){
     head = {x:snake[0].x-1,y:snake[0].y}
    }else if(d =="down"){
     head = {x:snake[0].x+1,y:snake[0].y}
    }
    if(head.x<0||head.y<0||head.x>=rows||head.y>=cols){
        alert("Game over");

    }
    if(head.x == food.x && head.y == food.y){
         blocks[`${food.x}_${food.y}`].classList.remove('food');
          food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
           blocks[`${food.x}_${food.y}`].classList.add('food');

    }
    snake.unshift(head);
    snake.pop();

    snake.forEach(segment=>{
    blocks[`${segment.x}_${segment.y}`].classList.remove("fill");
})

snake.unshift(head);
    snake.pop();

    render();
},300);

addEventListener(keydown,(event)=>{
    if(event.key=="ArrowUp"){
        d = up;
    }
     if(event.key=="ArrowDown"){
        d = down;
    }
     if(event.key=="ArrowRight"){
        d = right;
    }
     if(event.key=="ArrowLeft"){
        d = left;
    }
});
