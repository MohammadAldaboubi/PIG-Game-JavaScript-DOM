/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice;

init();

//We use an annoynmous function in the event listener to make the button do something when clicked
 document.querySelector('.btn-roll').addEventListener('click', function () {
 
 if (gamePlaying)
 {

 //1. random number
 var dice = Math.floor(Math.random() * 6 + 1);
 var dice2 = Math.floor(Math.random() * 6 + 1);
 //display the result
 var diceDOM =  document.querySelector('.dice');
 var diceDOM2 =  document.querySelector('.dice2');
 diceDOM.style.display = 'block';
 diceDOM2.style.display = 'block';
 diceDOM.src = 'dice-' + dice + '.png';
 diceDOM2.src = 'dice-' + dice2 + '.png';
 store = dice;
 console.log('Store : ' + previousDice);
 console.log('Dice : ' + dice);
 

 // If you roll two 6's in a row then you lose all your point
 if( dice === 6 && previousDice === 6){
    scores[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = '0';
    nextPlayer();
 }
 // update the round score if the rolled number is NOT 1
 if (dice !== 1 && dice2 !== 1){
     // Addscore
     roundScore += dice + dice2;
     document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';
    
 } else {
    nextPlayer();
 }
 previousDice = dice;

}});

 document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
    //Add current score to Global score
    scores[activePlayer] += roundScore;
    //Take the winning value the user input. 
   var value = document.getElementById('score').value;
    //Update the User interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //check if player won the game. 
    if (scores[activePlayer] >= value)
    {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        nextPlayer();
    }

    
 }});

 document.querySelector('.btn-new').addEventListener('click', init );
   

function nextPlayer()
{
    //Next Player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;
     previousDice = 0;
    // Updates the score
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';
    // Updates the 
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
 
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
};


function init(){
    scores = [0,0];
    roundScore = 0; 
    activePlayer = 0;
    gamePlaying = true;

 //it changes the style of the image if you wanna it or, in this case we set the image to not display anymore.
 document.querySelector('.dice').style.display = 'none';
 document.querySelector('.dice2').style.display = 'none';

 //intilizing the scores and the current in the screen.
 document.getElementById('score-0').textContent = '0';
 document.getElementById('score-1').textContent = '0';
 document.getElementById('current-0').textContent = '0';
 document.getElementById('current-1').textContent = '0';
 document.getElementById('name-0').textContent = 'SK';
 document.getElementById('name-1').textContent = 'PK';
 document.querySelector('.player-0-panel').classList.remove('winner');
 document.querySelector('.player-1-panel').classList.remove('winner');
 document.querySelector('.player-0-panel').classList.add('active');
 document.querySelector('.player-1-panel').classList.remove('active');


}
 //changing the content of an HTML element
 //document.querySelector('#current-' + activePlayer).textContent = dice;
 //document.querySelector('#current-' + activePlayer1).innerHTML = '<em>' + dice + '</em>';
