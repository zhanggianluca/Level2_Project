function initialize() {
    emojis = ["🍎","🍎","🍕","🍕","🍣","🍣","🌮","🌮","🌭","🌭","☕️","☕️","🍩","🍩","🥡","🥡"];
    backSides = document.getElementsByClassName('card-back'); 
    for (var i = 0; i < backSides.length; ++i) {
        var num = Math.floor(Math.random() * emojis.length); 
        var side = backSides[i]; 
        side.innerHTML = emojis[num];
        emojis.splice(num, 1);  
    }
    clicks = 0; 
}

function flip(card) {
    cards = document.getElementsByClassName("card");
    var backSide = cards[card-1].getElementsByClassName("card-back")[0];  
    var css = getComputedStyle(backSide); 
    var tmp = css.visibility; 
    if (tmp == "hidden") {
        cards[card-1].getElementsByClassName("card-back")[0].style.visibility = "visible";
    }
    else {
        cards[card-1].getElementsByClassName("card-back")[0].style.visibility = "hidden";
    }    
    clicks++; 
    displayClicks(); 
}

function compare() {
    if (clicks % 2 == 0 && clicks != 0) {

    }
}

function displayClicks() {
    numClicks = document.getElementById("score"); 
    numClicks.innerHTML = clicks; 
}

