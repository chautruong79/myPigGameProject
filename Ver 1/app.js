let scores, roundsScore, activePlayer, gamePlaying;

function init()
{
    gamePlaying = true;
    scores = [0,0];
    roundsScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer()
{
    roundsScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundsScore;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0? activePlayer = 1: activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if (gamePlaying)
    {
        let dice = Math.floor(Math.random()*6 + 1);
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'; 
        diceDOM.src = 'dice-' + dice + '.png';
        if (dice > 1) 
        {
            roundsScore += dice;
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
        if (scores[activePlayer] >=100)
        {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }
        else
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);