/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//roll a random number and show it on dice in middle
var scores, roundScore, activePlayer, gamePlaying;

init();

var dice = Math.floor(Math.random()*6)+1;

console.log(dice);


function btn() {
    //do something here
}
btn();

document.querySelector('.btn-roll').addEventListener('click', function() {
    //do something here annonymous function
    if(gamePlaying) {
         // 1. random number
    var dice = Math.floor(Math.random()*6)+1;

    //2. display result - set the CSS property
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';


    //3. update the round score IF the rolled number was not a 1
    if(dice !== 1){  //double equal does not do type coercion 
        //single equal does do type coercion
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else {
        //next player
        nextPlayer();
        }
    }
});

    //because i use an anyonmymous function the paratheses is stiil open from event listener
    //becuase im defining the function right there.'


document.querySelector('.btn-hold').addEventListener('click', function(){
   if (gamePlaying){
         // add Current score to global score
         scores[activePlayer] += roundScore;
         //update UI
         //query selector when using an ID gets a #
         document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
     
         //check if player won the game
         if(scores[activePlayer] >= 10){
             document.querySelector('#name-' + activePlayer).textContent = 'Winner';
             document.querySelector('.dice').style.display = 'none';
             document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
             document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
             gamePlaying = false; 

             //this is not how it was but I think it's better to remove the button instead of turning it off
             document.querySelector('.btn-roll').style.display = 'none';
         } else {
             nextPlayer();

        }
    }

    //next player
  
    

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
            //These werent best solution       
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    
    //best way to do this is to actually creat a class and change to it
    // and not switch to none
    document.querySelector('.dice').style.display = 'none';
    
    document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer +'-panel').classList.remoce('active');
}

document.querySelector('.btn-new').addEventListener('click', init); 

function init() {
    scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;

// active player is just a 1 or 0 with string concatenation here which is html/css element

//document.querySelector('#current-'+ activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-1').textContent;
//console.log(x);

//using DOM manipulation to change CSS values
document.querySelector('.dice').style.display = 'none';

//could have used queery selector but we can do this becuase its an id
//this is faster for id
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');

document.querySelector('.player-0-panel').classList.add('active');


}