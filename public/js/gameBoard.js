let clickedWrong = false;
function gameBoard(col, row){

    //populate the game board with piles
    let container = document.createElement("div");
    container.className="container";
    //dynamically allocate the size of the game board
    container.style.width = `${col * 50}px`;
    container.style.height = `${row * 50}px`;

    for (let i = 0; i < col * row; i++){
        let div = document.createElement("div");
        //adding a "custom index" to get around the issue
        //where after rotating, the index of tiles gets reset
        //to its by-then position
        let index = document.createTextNode(i);
        div.className = "tile";
        div.appendChild(index);
        container.appendChild(div);
    }
    document.body.appendChild(container);


    //call back chain to start the game set up
    //selectTile() selects random tiles as correct tiles
    //->
    //flipTile() displays the filpping animation for correct tiles
    //->
    //rotateTile() rotates the game board 90 degree to the right
    //->
    //mapTile() adds event listeners to correct and incorrect tiles

    setTimeout(function(){
        selectTile(col, row);
    }, 1500)
}

function selectTile(col, row){

    
    let boardSize = col * row;
    let tileCount = parseInt(document.getElementById("tileCount").textContent, 10);
    let correctTiles = new Array(tileCount);

    //update the highest tile count achieved.
    let record = parseInt(window.localStorage.getItem("tileCount"));
    if (tileCount >= record){
        window.localStorage.setItem("tileCount", tileCount);
    }

    let i = 0;
    //select random tiles to put into correctTiles array
    //disregard duplicate random results
    //loop til the array is filled up
    while (i < tileCount){
        let ranNum = Math.floor(Math.random()*(boardSize));
        if (!correctTiles.includes(ranNum)){
            correctTiles.push(ranNum);
            i+=1;
        } 
    }

    //-->flipTile()
    flipTile(correctTiles, col, row);
}

function flipTile(correctTiles, col, row){
    //flip all of the selected piles(animation)
    let tiles = document.getElementsByClassName("tile");
    let cheatMode = document.getElementById("cheat").checked;
    for (let i = 0; i < tiles.length; i++){
        if (correctTiles.includes(i)){
            if(cheatMode){
                tiles[i].id="correctCheat";
            } else if (!cheatMode){
                tiles[i].id="correct";
            }
        } else {
            tiles[i].id="wrong"
        }
    }

    //-->rotateTile()
    setTimeout(function(){rotateTile(col, row)}, 5500);
}

function rotateTile(col, row){
    //rotate all of the piles(animation)
    let container = document.getElementsByClassName("container")[0];
    container.id= "rotate";

    //-->mapTile()
    setTimeout(function(){ mapTile(col, row)}, 1100);
}

function mapTile(col, row){
    //add evenlistener
    let list = document.getElementsByClassName('tile');

    for (let n = 0; n < list.length; n++){
        if (list[n].id == "correct" || list[n].id == "correctCheat"){
            list[n].addEventListener('click', function(event){
                let n = event.path[0].textContent;
                correctClick(n, col, row);
            })
        }
         else if (list[n].id == "wrong"){
            list[n].addEventListener('click', function(event){
                let n = event.path[0].textContent;
                wrongClick(n, col, row);
            });

        }      
    }
}

function correctClick(n, col, row){

    let list = document.getElementsByClassName('tile');
    //preventing the already clicked correct tile from:
    //playing the animation again;
    //incrementing the score again;
    if (list[n].id!="corrected"){
        list[n].id = "corrected";
        let oldScore = parseInt(document.getElementById("score").textContent, 10);
        document.getElementById("score").textContent = oldScore+1;
    }

    //checking if all of the correct tiles are 
    //clicked into corrected
    //if there are still correct tiles yet to be clicked
    //return
    //else, preced to the rest of the code
    for (let m = 0; m < list.length; m++){
        if (list[m].id == "correct" || list[m].id == "correctCheat"){
            return;
        }
    }

    //incrementing the tile count
    let oldTile = parseInt(document.getElementById("tileCount").textContent, 10);
    setTimeout(function(){resetBoard()}, 1000);
    setTimeout(function(){
    document.body.removeChild(document.getElementsByClassName("container")[0]);
    }, 1500);


    //instantiating a new game board for next level
    //adding row or col, depending on which one is larger
    let next = row > col;
    let ding = new Audio("../sound/ding.mp3");
    ding.play();
    
    //if the user made a wrong click
    //the tile number goes down by 1, minimum 3 tiles
    //wont increase row or column
    if (clickedWrong){
        if(oldTile > 3){
            document.getElementById("tileCount").textContent = oldTile - 1;
        }
        setTimeout(function(){gameBoard(col, row)}, 1500);
        clickedWrong = false;
    } else {
        if (next){
            document.getElementById("tileCount").textContent = 1+oldTile;
            setTimeout(function(){gameBoard(col+1, row)}, 1500);
            clickedWrong = false;
        } else {
            document.getElementById("tileCount").textContent = 1+oldTile;
            setTimeout(function(){gameBoard(col, row+1)}, 1500);
            clickedWrong = false;
        }
    }
}


function wrongClick(n, col, row){
    let list = document.getElementsByClassName('tile');
    clickedWrong = true;

    //preventing the already clicked wrong tile from:
    //playing the animation again;
    //decrementing the score;
    if (list[n].id!="wronged"){
        list[n].id = "wronged";
    } else if (list[n].id == "wronged"){
        return;
    }

    //checking if the score is less than 0
    //if not, decrement the score
    //if the score is already 0, end game
    let oldScore = parseInt(document.getElementById("score").textContent, 10);
    if (oldScore > 0){
        document.getElementById("score").textContent = oldScore-1;
    } else if (oldScore -1 < 0){
        setTimeout(function(){endGame()}, 500);
        return;
    }
}




