function initialize() {
    emojis = ["🍎","🍎","🍕","🍕","🍣","🍣","🌮","🌮","🌭","🌭","☕️","☕️","🍩","🍩","🥡","🥡"];
    cardBacks = document.getElementsByClassName('card-back');
    backSides = Array.from(cardBacks);  
    for (var i = 0; i < backSides.length; ++i) {
        var num = Math.floor(Math.random() * emojis.length); 
        backSides[i].innerHTML = emojis[num];
        emojis.splice(num, 1);  
        backSides[i].style.backgroundColor = "#C5FFFD"; 
        backSides[i].style.visibility = "hidden"; 
    }
    clicks = 0; 
    displayClicks();   
}

function flip(card) {
    cards = document.getElementsByClassName("card");
    var back = cards[card-1].getElementsByClassName("card-back")[0]; 
    var tmp = getComputedStyle(back).visibility; 
    if (tmp == "hidden") {
        cards[card-1].getElementsByClassName("card-back")[0].style.visibility = "visible";
    }
    else {
        cards[card-1].getElementsByClassName("card-back")[0].style.visibility = "hidden";
    } 

    check();
    if (count == 2) {
        pair();
    }   
    clicks++; 
    displayClicks();  
}

function check() {
    count = 0; 
    for (var i = 0; i < backSides.length; ++i) {
        var visibility = getComputedStyle(backSides[i]).visibility; 
        var color = getComputedStyle(backSides[i]).backgroundColor; 
        if (visibility == "visible" || color == "#C5FFFD") {  
            count++;  
        }
    }
}

function pair() {
    cardPair = []; 
    for (var i = 0; i < backSides.length; ++i) {
        var visibility = getComputedStyle(backSides[i]).visibility; 
        var color = getComputedStyle(backSides[i]).backgroundColor; 
        if (visibility == "visible" || color == "#C5FFFD") {  
            cardPair.push(backSides[i]); 
        }
    }
    compare();   
}

function compare() {
    if (cardPair[0].innerHTML == cardPair[1].innerHTML) {
        displayPair();  
        for (var i = 0; i < backSides.length; ++i) {
            if (backSides[i] == cardPair[0] || backSides[i] == cardPair[1]) {
                backSides.splice(i, 1); 
                i--; 
            }
        } 
    }
    else { 
        disable(); 
        wrong();  
        cardPair[0].style.backgroundColor = "#C5FFFD"; 
        cardPair[1].style.backgroundColor = "#C5FFFD"; 
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function displayPair() {
    cardPair[0].style.backgroundColor = "#67F350";
    cardPair[1].style.backgroundColor = "#67F350";
    
}

function wrong() {
    delay(1000).then(() => cardPair[0].style.visibility = "hidden");
    delay(1000).then(() => cardPair[1].style.visibility = "hidden"); 
    delay(1000).then(() => enable()); 
}

function displayClicks() {
    numClicks = document.getElementById("score"); 
    numClicks.innerHTML = clicks; 
}

var holder; 
function disable() {
    if (!holder) holder = window.flip; 
    window.flip = function(){}; 
}

function enable() {
    window.flip = holder; 
}
