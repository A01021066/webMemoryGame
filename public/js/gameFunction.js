function endGame(){
    //save the score to localStorage for later use,
    //terminate the game, 
    //redirect the window to summary page
    const score = document.getElementById("score").textContent;
    const tile = parseInt(localStorage.getItem('tileCount'));
    let rankingscore = parseInt(score) * parseInt(tile);
    window.localStorage.setItem("rawScore", score);
    window.localStorage.setItem("score", rankingscore);
    document.getElementById("score").textContent = "";
    document.getElementsByClassName("gameHeader")[2].textContent = "GAME OVER!"
    resetBoard();
    setTimeout(function(){window.location.replace("/summary")}, 450);
}

function updateHighestTile(){
    window.localStorage.getItem()

}

function resetBoard(){
    //setting the tiles to ending animation
    let list = document.getElementsByClassName("tile");
    for (let i = 0; i < list.length; i++){
        list[i].id = "endingTile";
    }
}