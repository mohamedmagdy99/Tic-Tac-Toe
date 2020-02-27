const Board = Array.from(document.getElementsByClassName("box"));
const name1 = document.getElementById("playerOne");
const name2 = document.getElementById("playerTwo");
const btn = document.getElementById("start");
const gameBox = document.getElementById("gameBoard");
let player1;
let player2;
let curGame;
let curPlayer = true;

const player = (name)=>
{
    if(typeof player.ids == "undefined"){
        player.ids = 0;
    }else{
        player.ids++;
    }
    
    let _name = name;
    let _id = player.ids;
    return{
        getName:()=> _name,
        getId:()=>_id
    };
}
const game = (player1,player2)=>
{
    const playing = "playing" , 
    finished = "finished" , 
    TIE = "tie";
    let _gameBoardArray = new Array(3);
    for(let i = 0;i<3;i++){
        _gameBoardArray[i] = new Array(3);
    }
    let _player1 = player1;
    let _player2 = player2;
    let _winner = TIE;
    let _stat = playing;

    const play = (player,x,y)=>{
        if(_gameBoardArray[x][y] != undefined){
            return -1;
        }
        else if(player.getName === _player1.getName){
            _gameBoardArray[x][y] = "x";
        }
        else {
            _gameBoardArray[x][y] = "o";
        }
        return _check();
    }
    
    const _checkI = (i,j) => {
        if(_gameBoardArray[i-1][j] === _gameBoardArray[i+1][j] && _gameBoardArray[i+1][j] === _gameBoardArray[i][j] && _gameBoardArray[i][j] != undefined){
            _stat = finished;
            if(_gameBoardArray[i][j] === "x"){
                _winner = _player1;
                return 1;
            }
            else {
                _winner = _player2;
                return 2;
            }
        }
        return 0;
    }

    const _checkJ = (i,j) => {
        if(_gameBoardArray[i][j-1] === _gameBoardArray[i][j+1] && _gameBoardArray[i][j+1] === _gameBoardArray[i][j] && _gameBoardArray[i][j] != undefined){
            _stat = finished;
            if(_gameBoardArray[i][j] === "x"){
                _winner = _player1;
                return 1;
            }
            else {
                _winner = _player2;
                return 2;
            }
        }
        return 0;
    }

    const _checkIj = (i,j) => {
        if(_gameBoardArray[i+1][j+1] === _gameBoardArray[i-1][j-1] && _gameBoardArray[i-1][j-1] === _gameBoardArray[i][j] || _gameBoardArray[i+1][j-1] === _gameBoardArray[i-1][j+1] && _gameBoardArray[i-1][j+1] === _gameBoardArray[i][j]){
            if(_gameBoardArray[i][j] === undefined){
                return 0;
            }
            _stat = finished;
            if(_gameBoardArray[i][j] === 'x'){
                _winner = _player1;  
                return 1;
            }else{
                _winner = _player2;
                return 2;
            }  
        }
        return 0;
    }

    const _check = () => {
        for(let i = 0 ; i<3 ; i++){
            for(let j = 0 ; j<3 ; j++){
                if(i === 1){
                    let result = _checkI(i,j);
                    if(result != 0){
                        return result;
                    }
                }
                else if (j === 1){
                    let result = _checkJ(i,j);
                    if(result != 0){
                        return result;
                    }
                }
                else if (i===j && j===1){
                    let result = _checkIj(i,j);
                    if(result != 0){
                        return result;
                    }
                } 
            }
        }
        return 0;
    }
    return {
        play ,
        getStat : ()=> _stat ,
        getWinner : ()=> _winner ,
        getBoard : ()=> _gameBoardArray
    }
}

btn.addEventListener('click', ()=>{
    if(name1.value.length && name2.value.length){
        player1 = player(name1.value);
        player2 = player(name2.value);
        curGame = game(player1, player2);
        btn.disabled = true;
        gameBox.style.visibility = 'visible';
    }
});

const clearListeners = ()=>{
    Board.forEach(key=>{
        key.removeEventListener('click' , clickHandle);
    });
};

const clickHandle = (e)=>{
    let curColor;
    let ans;
    let key = e.target;
    const x = key.attributes["data-pos"].value[0].charCodeAt() - '0'.charCodeAt();
    const y = key.attributes["data-pos"].value[1].charCodeAt() - '0'.charCodeAt();
    if(curPlayer){
        ans = curGame.play(player1 ,x , y);
        curColor = "green";
    }else{
        ans = curGame.play(player2 , x , y);
        curColor = "red";
    }
    if(ans == -1){
        return;
    }
    curPlayer = !curPlayer;
    key.style.background = curColor;
    if(ans){
        if(ans == 1){
            console.log(player1.getName());
        }else{
            console.log(player2.getName());
        }
        clearListeners();
    }
};

Board.forEach(key=>{
    key.addEventListener("click",clickHandle);
});