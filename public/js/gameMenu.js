function terminate(){
    //show confirmation window if the player wants to end the game, 
    //if Yes, redirect to summary page, if No, game continues
    let confirmation = confirm("Are you sure you want to end the the current game?");
    if(confirmation){
        setTimeout(function(){endGame()}, 500);
    } else {
        return;
    }
}

function restart(){
    //going from summary page back to game page
    window.location.replace("/");
}

function summaryPage(){
    let score = document.createTextNode(window.localStorage.getItem("score"));
    
    let scoreText = document.getElementById("scoreText");
    scoreText.appendChild(score);
}


function submitScore(){
    let userName = document.getElementById("inputName").value;
    if (userName.length== 0){
        alert("please give us a name before submitting.")
    } else {
    //binding postAddUser to the button.
    fetch("/summary", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'username': document.getElementById("inputName").value,
            'score': document.getElementById("scoreText").textContent
        })
    }).then((response) => {
        window,location.replace("/ranking");
    }).catch((err) => {
        console.log("fetch failed");
    });
}
}

