// //keep calling the getObstacleBound() function to know if Mario hits any obstacle.
// myInterval = setInterval(getObstacleBound, 100)
const b = $('body')[0].getBoundingClientRect()

//hide
$('#results-div').hide()
$('#you-won').hide()
$('.buttons').hide()
$('.images').hide()
$('#game-over-text').hide()
$('#start-again').hide()
$('#congrats-img').hide()

//START GAME BUTTON STYLE---------------------------------------------------------
$('#start-game').on('mouseenter', function () {
    $('#start-game').css('font-size', '30px')
})
$('#start-game').on('mouseleave', function () {
    $('#start-game').css('font-size', '20px')
})

// Variables declaration*************************************************************
let runningMario = $('#running-mario')
let arrayOfObstacles = []
let rect = runningMario[0].getBoundingClientRect();
let cv = $('#mystery-box')
let sv = null
let count
const princessL = $('#princess')
if (localStorage.getItem("lives") == 0) {
    count = 3
    localStorage.setItem("lives", count)
} else {
    count = localStorage.getItem("lives")
    // theScoreValue = localStorage.getItem("score")
}
$('#noOfLives').text(count)
// $('#scoreValue').text(scoreValue)


let mysteryBox = cv[0].getBoundingClientRect();
//start with mario facing right side
$('#running-mario').css({ 'transform': 'scaleX(1)' }) //always start with scale1

//GAME STARTED-------------------------------------------------------------
$(document).on('keydown', function (e) {
    checkKey(e)
})

$('#start-game').on('click', function () {
    enterGame()
})
$('#start-again').on('click', function () {
    // This will refresh everything.

    let lives = parseInt(localStorage.getItem("lives")) - 1
    $('#noOfLives').text(lives)
    localStorage.setItem("lives", lives)

    scoreValue = scoreValueHTML

    window.location.reload()
})

//ENTER GAME FUNCTION************************************************
function enterGame() {

    //keep calling the getObstacleBound() function to know if Mario hits any obstacle.
    myInterval = setInterval(getObstacleBound, 100)
    winInterval = setInterval(reachPrincess, 100)
    //PLAY AUDIO
    let audio1 = document.getElementById("game-start");
    audio1.play();
    //START CALCULATING SCORE
    sv = setInterval(score, 1000)

    $('#running-mario').animate({ left: '500px' }, 3000)
    //START STOPWATCH
    int = setInterval(displayTimer, 1000);

    //REMOVE INTRO-SIGN
    $('#intro-sign').fadeOut()

    //MOVING ELEMENTS
    arrayOfObstacles.push($('#pipe1'), $('#monster'), $('#pipe2'), $('#plant'), $('#pipe3'))
    console.log(arrayOfObstacles)
    let a = -100
    let b = 12000
    for (i = 0; i < arrayOfObstacles.length; i++) {
        arrayOfObstacles[i].animate({ left: a }, b)
        a -= 100
        b += 6000
    }
    $('#princess').animate({ left: 1300 }, b-4000)
}

//KEYBOARD ARROWS*******************
let checkKeyx = false
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {// up arrow
        if (!checkKeyx) {
            goUp()
        }
    }
    else if (e.keyCode == '40') {// down arrow
        goDown()
    }
    else if (e.keyCode == '37') {// left arrow
        goLeft()
    }

    else if (e.keyCode == '39') {// right arrow
        e.preventDefault()

        goRight()
    }
    else if (e.keyCode == '13') {
        enterGame()
    }
}

//MOVEMENT FUNCTIONS*************************************************
function goUp() {
    checkKeyx = true
    //play audio
    $('#small-jump')[0].play()
    $('#running-mario').stop()
    //check if it's facing right or left
    let value = document.getElementById("running-mario").style.transform;
    if (value === 'scaleX(1)') {
        $('#running-mario').animate({ left: "+=80px", top: "-=250px" });
        $('#running-mario').animate({ top: "+=250px", left: "+=80px" }, 'swing', function () {
            checkKeyx = false
        });
        // $('#running-mario').css({ 'bottom': '1000px' })
    }
    else {
        $('#running-mario').animate({ left: "-=80px", top: "-=250px" }, 'slow');
        $('#running-mario').animate({ top: "+=250px", left: "-=80px" }, 'slow', 'swing', function () {
            checkKeyx = false
        });
        $('#running-mario').css({ 'bottom': '50px' })

    }
}
function goRight() {
    checkKeyx = true

    $('#running-mario').css({ 'transform': 'scaleX(1)' })
    $('#running-mario').stop()
    $('#running-mario').animate({ left: "+=50px" }, 'fast', 'swing', function () {
        checkKeyx = false
    });
    $('#running-mario').css({ 'bottom': '50px' })

}
function goLeft() {
    checkKeyx = true
    if (getBound().x < b.x) {
        $('#running-mario').stop()
    }
    else {
        $('#running-mario').css({ 'transform': 'scaleX(-1)' })
        console.log(getBound().right)
        $('#running-mario').stop()
        $('#running-mario').css({ 'bottom': '50px' })
        $('#running-mario').animate({ left: "-=50px" }, 'fast', 'swing', function () {
            checkKeyx = false
        });
    }


}
function goDown() {
    $('#running-mario').css({ 'bottom': '50px' })
}
//TIME FUNCTION****************************************************
let [seconds, minutes] = [0, 0];
let timerRef = document.querySelector('.timerDisplay'); //Select the div of the timer
let int = null;

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(int)
    [seconds, minutes] = [0, 0]
    timerRef.innerHTML = '00:00'
})

function displayTimer() {
    seconds += 1;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
        }
    }
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    timerRef.innerHTML = `${m}:${s}`;
}

//GET BOUND FUNCTION******************************************
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
function reachPrincess() {
    //check if Mario reaches the princess
    getBound()
    const princessLoc = princessL[0].getBoundingClientRect()
    if ((getBound().x < (princessLoc.x + princessLoc.width)) && (getBound().x + getBound().width > princessLoc.x) && (getBound().y < princessLoc.y + princessLoc.height) && (getBound().y + getBound().height > princessLoc.y)) {
        {
            hideAll()
            $('#stage-clear')[0].play()
            $('#congrats-img').show()
            $('#clapping-img').show()
            $('#you-won').show()
            clearInterval(int)
            clearInterval(sv)
            clearInterval(myInterval)
            scoreValue.innerHTML = '0'
            timerRef.innerHTML = '00:00'

        }
    }
}

function getBound() {
    rect = runningMario[0].getBoundingClientRect();
    // console.log(rect)
    return rect
}

//UPDATE SCORE FUNCTION
let theScoreValue = 0
let scoreValueHTML = document.getElementById('scoreValue')

function score() {

    scoreValueHTML.innerText = theScoreValue
    theScoreValue += 100
    return theScoreValue
}

//HIDE ALL OBSTACLES            
function hideAll() {
    $('.moving-clouds').hide()
    $('#pipe1').hide()
    $('#pipe2').hide()
    $('#pipe3').hide()
    $('#plant').hide()
    $('#monster').hide()
    $('#mystery-box').hide()
    $('#running-mario').hide()
    $('.moving-class').hide()
    $('#princess').hide()
}
function showAll() {
    $('.moving-clouds').show()
    $('#pipe1').show()
    $('#pipe2').show()
    $('#pipe3').show()
    $('#plant').show()
    $('#monster').show()
    $('#mystery-box').show()
    $('#running-mario').show()
    $('.moving-class').show()
    $('#princess').show()

}

//toggleClasses function to add the styling again to the obstacles and start from where they were
function toggleClasses() {
    $('#pipe1').removeClass()
    $('#pipe1').addClass()
    $('#pipe2').removeClass()
    $('#pipe2').addClass()
    $('#pipe3').removeClass()
    $('#pipe3').addClass()
    $('#plant').removeClass()
    $('#plant').addClass()
    $('#monster').removeClass()
    $('#monster').addClass()
}

let morningTheme = document.querySelector('#morningTheme')
morningTheme.addEventListener('click', handleClickEvent)
function handleClickEvent() {
    $('body').css('background-color', '#85a5e4')
    $('.moving-clouds').css('background-image', 'url(./images/moving-clouds.gif)')
    $('.intro-sign').css('background-color', 'rgb(192, 58, 58)')
    $('#intro-text').css('color', 'rgb(238, 146, 146)')

}

let nightTheme = document.querySelector('#nightTheme')
nightTheme.addEventListener('click', handleClickEvent2)
function handleClickEvent2() {
    $('body').css('background-color', '#0e1c38')
    $('.moving-clouds').css('background-image', 'url(./images/nightStars.gif)')
    $('.intro-sign').css('background-color', 'white')
    $('#intro-text').css('color', 'rgb(192, 58, 58)')
}

//NOT USED FUNCTION. check the position of Mario when it moves
// function update() {
//     const controls = document.getElementById("controls");
//     // const rect = runningMario[0].getBoundingClientRect();
//     controls.innerHTML = ''
//     for (const key in rect) {
//         if (typeof rect[key] !== "function") {
//             let para = document.createElement("p");
//             para.textContent = `${key} : ${rect[key]}`;
//             controls.appendChild(para);

//             for (i = 0; i < arrayOfObstacles.length; i++) {
//                 let obst = arrayOfObstacles[i][0]
//                 console.log(obst) //pipe
//                 let obstInfo = obst.getBoundingClientRect()
//                 for (const key in rect) {
//                     console.log(rect[key]) //
//                     console.log(obstInfo[i][0][key])
//                     if (rect[key] === obstInfo[i][key]) {
//                         alert('game over')
//                     }
//                 }
//             }
//         }
//     }
// }

