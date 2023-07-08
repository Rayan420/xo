let gameState = "new";
let player = 0;
var startBtn = document.getElementById("start");
let endBtn = document.getElementById("end");
endBtn.style.display = "none";
let turns = document.getElementById("turns");
let player1Score = 0;
let player2Score = 0;
var winner = -1;
let board = [
    [-1, -1, -1], 
    [-1, -1, -1], 
    [-1, -1, -1]
];
let tile = document.getElementsByClassName("tile");


function startGame() {
    gameState = "playing";
    startBtn.style.display = "none"; 
    let x = document.createElement("span");
    x.style.color = "red";
    x.innerHTML = "X's";
    turns.innerText = `Player `;
    turns.appendChild(x);
    turns.innerHTML += ` turn`;      
    document.getElementById("player1Score").textContent = player1Score.toString();
    document.getElementById("player2Score").textContent = player2Score.toString();
    
}
function restart()
{
    gameState = "playing";
    startBtn.style.display = "none";
    let x = document.createElement("span");
    x.style.color = "red";
    x.innerHTML = "X's";
    turns.innerText = `Player `;
    turns.appendChild(x);
    turns.innerHTML += ` turn`;
    endBtn.style.removeProperty("display");
    player = 0;
    winner = -1;
    board = [
        [-1, -1, -1], 
        [-1, -1, -1], 
        [-1, -1, -1]
    ];
    for (let i = 0; i < tile.length; i++) {
        tile[i].innerText = ""; // Clear text content of each tile element
    }
   console.log(board);
}

endBtn.addEventListener("click", restart)
startBtn.addEventListener("click", gameState = "over" ? restart : startGame);

function checkWin()
{
    console.log("checking winner")
    console.log(board)
    //check rows
    for(let i = 0; i < 3; i++)
    {
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== -1)
        {
            gameState = "over";
            winner = board[i][0];
            return true;
        }
    }
    //check columns
    for(let i = 0; i < 3; i++)
    {
        if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== -1)
        {
            gameState = "over";
            winner = board[0][i];
            return true;
        }
    }
    //check diagonals
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== -1)
    {
        gameState = "over";
        winner = board[0][0];
        return true;
    }
    if(board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== -1)
    {
        gameState = "over";
        winner = board[2][0];
        return true;
    }
  
    
    return false;
}

function allTilesFilled()
{
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] === -1)
            {
                return false;
            }
        }
    }
    return true;
}

function makeMove() {
    if(gameState === "playing")
    {
        if(this.innerText === "")
        {
            if(player === 0)
            {
                this.innerText = "X";
                this.style.color = "red";
                let id = this.dataset.index;
                let indx = id.split("-");
                board[indx[0]][indx[1]] = 0;
                if(checkWin())
                {
                    console.log("game over");
                    winner = player;
                    checkWinner(winner);
                    return;
                }
                if(allTilesFilled())
                {
                    turns.innerText = "It's a tie!";
                    startBtn.style.removeProperty("display");
                    startBtn.innerText = "Play Again";
                    endBtn.style.display = "none";

                    return;
                }
                console.log(`move made at ${indx[0]}, ${indx[1]}`)
                player = 1;
                let o = document.createElement("span");
                o.style.color = "#FED338";
                o.innerHTML = "O's";
                turns.innerText = `Player `;
                turns.appendChild(o);
                turns.innerHTML += ` turn`;
               
            }
            else
            {
                this.innerText = "O";
                this.style.color = "#FED338";

                let id = this.dataset.index;
                let indx = id.split("-");
                board[indx[0]][indx[1]] = 1;
                if(checkWin())
                {
                    console.log("game over");
                    winner = player;
                    checkWinner(winner);
                    return;
                }
                if(allTilesFilled())
                {
                    turns.innerText = "It's a tie!";
                    startBtn.style.removeProperty("display");
                    startBtn.innerText = "Play Again";
                    endBtn.style.display = "none";

                    return;
                }
                
                console.log(`move made at ${indx[0]}, ${indx[1]}`)
                console.log(`winner is ${winner}`)
                player = 0;
                let x = document.createElement("span");
                x.style.color = "red";
                x.innerHTML = "X's";
                turns.innerText = `Player `;
                turns.appendChild(x);
                turns.innerHTML += ` turn`;

            }
            
        }
    }
}


function checkWinner(winner)
{
    if(winner === 0)
        {
            let x = document.createElement("span");
            x.style.color = "red";
            x.innerHTML = " X";
            turns.innerText = "Player";
            turns.appendChild(x);
            turns.innerHTML += " wins!";
            player1Score += 1;
            document.getElementById("player1Score").textContent = player1Score.toString();
            startBtn.style.removeProperty("display");
            startBtn.innerText = "Play Again";
            endBtn.style.display = "none";
        }
        else
        {
            let o = document.createElement("span");
            o.style.color = "#FED338";
            o.innerHTML = " O";
            turns.innerText = "Player";
            turns.appendChild(o);
            turns.innerHTML += " wins!";
            player2Score += 1;
            document.getElementById("player2Score").textContent = player2Score.toString();
            startBtn.style.removeProperty("display");
            startBtn.innerText = "Play Again";
            endBtn.style.display = "none";
        }
       
        
}
for(let i = 0; i < tile.length; i++)
{
   
    tile[i].addEventListener("click", makeMove);
   
    
}
