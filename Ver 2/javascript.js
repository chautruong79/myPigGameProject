let scores, roundsScore, activePlayer, gamePlaying, previousRoll;

function init()
{
    gamePlaying = true;
    scores = [0,0];
    roundsScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    let player1Name = prompt("Enter first player's name:");
    let player2Name = prompt("Enter second player's name:");
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = player1Name || 'Player 1';
    document.querySelector('#name-1').textContent = player2Name || 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer()
{
    previousRoll = 0;
    roundsScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundsScore;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0? activePlayer = 1: activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}


init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if (gamePlaying)
    {
        let dice1 = Math.floor(Math.random()*6 + 1);
        let diceDOM1 = document.querySelector('#dice-1');
        diceDOM1.style.display = 'block'; 
        diceDOM1.src = 'dice-' + dice1 + '.png';
        let dice2 = Math.floor(Math.random()*6 + 1);
        let diceDOM2 = document.querySelector('#dice-2');
        diceDOM2.style.display = 'block'; 
        diceDOM2.src = 'dice-' + dice2 + '.png';
        if (previousRoll===6 && (dice1 ===6 || dice2 === 6))
        {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            nextPlayer();
        }
        else if (dice1 !== 1 && dice2 !== 1) 
        {
            (dice1 ===6 || dice2 === 6)? previousRoll = 6: previousRoll = 0;
            roundsScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundsScore;
        }
        else
        {
            nextPlayer();
        }
    }
    else init();
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying)
    {
        scores[activePlayer] += roundsScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        let finalScoreInput = document.querySelector('.final-score').value || 100;
        if (scores[activePlayer] >=finalScoreInput)
        {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';            
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }
        else
        nextPlayer();
    }
    else init();
});

document.querySelector('.btn-new').addEventListener('click', init);