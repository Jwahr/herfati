# Project1 - *MARIO GAME*

* What is Mario Game?
<br>
Mario is a game where a character have to move and pass obstacles to reach the end and win.

## How to play?
<br>
1. the game start when you click on 'start game' or click on *enter* from your keyboard.
2. Use the arrows to move in the game (up, right, and left).
    * up -> jump
    * right -> move right
    * left -> move left
3. To win, you only have not to touch any obstacle! Good luck with that.

## Technologies used?
1. html => to structure the game
2. css => to style the elements
3. Javascript => to add functionality and for manipulation.
4. jQuery => used along with js for functionality and dom manipulation.

## Link to wireframe:
[Wireframe Link] (https://www.figma.com/file/s8pGrb3sp2bANn8vR0YmFJ/SEI04-Project1?type=design&node-id=0%3A1&t=aQ17lol0wNAOoNbN-1)

## Link to user story:
[Wireframe Link] (https://trello.com/b/TxopdcL1/project01)

## My Journey
<br>
I started the game by looking at the original game and see how it works. I then started by html and css part to get the an initial view of the game and how would it look like. after getting the concept, I started on JS to animate my objects and allow Mario to move. Then, I started working on the function that is going to detect if Mario hit an obstacle to stop the game. I also added a function to start a stopwatch while you play, a function to calculate your score, and a function that count how many lives are left to you after you lose. There is also a function that allow the user to change themes before the game starts.

## Unsolved Problems
1. jump is not smooth (because I'm using animate() only)
2. Mario doesn't do double jump
3. add a pause function to pause the game and continue from where you stopped.
4. if you pass level 1, you move to level 2. (create another level)


## Problem-Solving Technique?
console.logging everything =)! (as advised by the instructors).
I try to break down the code and check where the problem started (where did the code break). + a lot of searchin on '**how to**' and trying sevreal ways of doing the same thing until it works for you, and understand the code I am writing because otherwise you will not know how you can only use the parts that you need, and asking instructors and friends.

## Favorite Functions?
1. I like the time function (because it is new to me and I learned how to increate the time from seconds to minutes to hours.)
2. I like the movment functions (up, right, left), although they are not quite smooth.
3. I like that when you start the game, an audio is played, same as when you jump, lose, or win.
4. Changing the theme from day to nigtht using JS
5. using Local storage to decrease the number of lives you have every time you lose.
6. Function to detect collision between Mario and other obstacles. (same used to detect if you reach the princess for winning condition). the function is:
```js
function getObstacleBound() {
    for (i = 0; i < arrayOfObstacles.length; i++) {
        //get position of the obstacle
        pos = arrayOfObstacles[i][0].getBoundingClientRect();

        //get Mario's position
        getBound()

        //check if Mario hits the first mystery-box
        if ((getBound().x < (mysteryBox.x + mysteryBox.width)) && (getBound().x + getBound().width > mysteryBox.x) && (getBound().y < mysteryBox.y + mysteryBox.height) && (getBound().y + getBound().height > mysteryBox.y)) {
            hideAll()
            $('#game-over-text').show()
            // $('#results-div').show()
            $('#bomb-img').fadeIn()
            $('#start-again').show()
            clearInterval(int)
            clearInterval(sv)
            clearInterval(myInterval)
            scoreValue.innerHTML = '0'
            timerRef.innerHTML = '00:00'
            // toggleClasses()
        }

        //check for collision
        if ((getBound().x < (pos.x + pos.width)) && (getBound().x + getBound().width > pos.x) && (getBound().y < pos.y + pos.height) && (getBound().y + getBound().height > pos.y)) {
            //PLAY AUDIO
            $('#game-over')[0].play()
            //HIDE ALL OBSTACLES            
            hideAll()
            $('#game-over-text').show()
            $('#start-again').show()
            //SAVE DATA IN VARIABLES
            let obstacleHit = arrayOfObstacles[i][0].id
            let scoreReached = scoreValue.innerText
            //CHECK WHICH OBSTACLE IS HIT, SHOW RESULTS ACCORDINGLY
            if (obstacleHit === 'pipe1') {
                $('#laugh-img').show()
            }
            else if (obstacleHit === 'monster') {
                $('#laugh2-img').show()
            }
            else if (obstacleHit === 'pipe2') {
                $('#loser-img').show()
            }
            else if (obstacleHit === 'plant') {
                $('#neverwin-img').show()
            }
            else if (obstacleHit === 'pipe3') {
                $('#laugh3-img').show()
            }

            clearInterval(int)
            clearInterval(sv)
            clearInterval(myInterval)
            scoreValue.innerHTML = '0'
            timerRef.innerHTML = '00:00'
        }
    }

}
```