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
    disable = false;  
}

function flip(card) {
    if (disable) {
        clearTimeout(); 
    }
    else {
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
        pair();     
        clicks++; 
        displayClicks(); 
    }
}

function pair() {
    var count = 0; 
    cardPair = []; 
    for (var i = 0; i < backSides.length; ++i) {
        var visibility = getComputedStyle(backSides[i]).visibility; 
        if (visibility == "visible") {
            count++;  
            cardPair.push(backSides[i]); 
        }
    }
    if (count >= 2) {
        disable = true; 
        compare();   
    }
}

function compare() {
    if (cardPair[0].innerHTML == cardPair[1].innerHTML) {
        displayPair();  
    }
    else {
        wrong();
        cardPair[0].style.visibility = "hidden"; 
        cardPair[1].style.visibility = "hidden";  
    }
    disable = false; 
}

function displayPair() {
    cardPair[0].style.backgroundColor = "#67F350";
    cardPair[1].style.backgroundColor = "#67F350";
    
}

function wrong() {
    cardPair[0].style.backgroundColor =  "#F35550";
    cardPair[1].style.backgroundColor =  "#F35550";
}

  
  
function displayClicks() {
    numClicks = document.getElementById("score"); 
    numClicks.innerHTML = clicks; 
}

