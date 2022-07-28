import Blocks from './components/Blocks.js'
import User from './components/User.js'
import Ball from './components/Ball.js'
import {blocks_container, container} from './components/DOMcontainers.js'

// ===========================  blocks  ====================================
//  забыла создать экземпляр класса и пихала значения в методы прям из прототипа /*facepalm*/
let blocks = new Blocks

// создаем двумерный массив с координатами каждого блока
blocks.addBlocks(3, 7, 10, 10, 30, 110)

// засунула блоки в ДОМ
blocks.flatBlocks()
blocks.drawBlocksInDOM()

// =================================  user  ==============================
// ========= creating user instance -----------------
let user = new User  //ничего не передаю в конструктор, потому что здесь мне нужны его дефолтные координаты
// ========= просто создала блок "div" в контейнере и вернула его в переменную
user.createUserInDOM()
// ======== задала блоку начальные координаты

// ========== moving user on keypress ---------------
let userTemp // нужно для хранения координаты столкновения с границей контейнера
const controller = new AbortController()
const {signal} = controller
document.addEventListener('keydown', event => {
    if(!['a', 'A', 'd', 'D', 'ArrowRight', 'ArrowLeft'].includes(event.key) /*|| message.style.display !== 'none'*/)
    {
        event.preventDefault()
    }
    else
    {
        switch(event.key)
        {
            case 'a':
            case 'A':
            case 'ArrowLeft':
            {
                userTemp = user.x
                user.x -= user.OffsetX
                if (user.x <= -5) {
                    user.x = userTemp  // если начинает выходить за границу контейнера, возвращем в предыдущее положение
                    event.preventDefault()
                } else {
                    requestAnimationFrame(() => user.drawUser()) // нельзя вызывать функцию сразу при передаче
                }                                                                 // нужно завернуть ее в колбек,
                break                                                           // который будет выполняться внутри главной функции
            }
            case 'd':
            case 'D':
            case 'ArrowRight':
            {
                userTemp = user.x
                user.x += user.OffsetX
                if (user.x >= 705) {
                    user.x = userTemp // если начинает выходить за границу контейнера, возвращем в предыдущее положение
                    event.preventDefault()
                } else {
                    requestAnimationFrame(() => user.drawUser())
                }
                break
            }
        }
    }
}, {signal})

// //  ==============================  ball  ======================================
// ============== creating ball instance
let ball = new Ball
// =============== creating div ball
// let ballOnBoard = ball.createBallInDOM()
// =============== putting div ball in DOM
ball.createBallInDOM()
// ball.drawBall()

let child_nodes = blocks_container.childNodes

let id
function animate() {
    userCollisionCheck()
    if (wallsCollisionCheck() || child_nodes.length === 0) {
        cancelAnimationFrame(id)
        controller.abort()
        return
    }
    blocksCollisionCheck()
    ball.x += ball.OffsetX
    ball.y += ball.OffsetY
    ball.ballOnBoard.style.left = ball.x + 'px'
    ball.ballOnBoard.style.top = ball.y + 'px'
    id = window.requestAnimationFrame(animate)

}

function wallsCollisionCheck() {

    if (ball.x <= 0 || ball.x >= container.getBoundingClientRect().width - ball.width) {
        console.log('WALL COLLISION X')
        ball.OffsetX = -ball.OffsetX   // здесь я просто меняю направление, а мне еще нужно присваивать
        return 0                               // эту смену самим координатам, чтобы мяч двигался
    }
    if (ball.y <= 0) {
        console.log('WALL COLLISION Y')
        ball.OffsetY = -ball.OffsetY
        return 0
    }
    if (ball.y >= container.getBoundingClientRect().height - ball.height) {
        console.log('COLLISION END GAME')
        return 1
    }
}

function userCollisionCheck() {
    if (ball.x >= user.x && ball.x <= user.x + user.width && ball.y === user.y - ball.height) {
        ball.OffsetY = -ball.OffsetY
    }
}

function blocksCollisionCheck() {

    for (let i = 0; i < child_nodes.length; i++) {

        if (ball.x >= child_nodes[i].offsetLeft && ball.x <= child_nodes[i].offsetLeft + child_nodes[i].offsetWidth && ball.y === child_nodes[i].offsetTop + child_nodes[i].offsetHeight
            || ball.x >= child_nodes[i].offsetLeft && ball.x <= child_nodes[i].offsetLeft + child_nodes[i].offsetWidth && ball.y + ball.height === child_nodes[i].offsetTop) {
            console.log('COLLISION WITH BLOCK')
            console.log('to remove', i, child_nodes[i])
            blocks_container.removeChild(child_nodes[i])
            ball.OffsetY = -ball.OffsetY
        } else if (ball.x + ball.width === child_nodes[i].offsetLeft && ball.y <= child_nodes[i].offsetTop + child_nodes[i].offsetHeight && ball.y + ball.height >= child_nodes[i].offsetTop
            || ball.x === child_nodes[i].offsetLeft + child_nodes[i].offsetWidth && ball.y <= child_nodes[i].offsetTop + child_nodes[i].offsetHeight && ball.y + ball.height >= child_nodes[i].offsetTop) {
            console.log('COLLISION WITH BLOCK')
            console.log('to remove', i, child_nodes[i])
            blocks_container.removeChild(child_nodes[i])
            ball.OffsetY = -ball.OffsetY
            ball.OffsetX = -ball.OffsetX
        }
    }
    console.log('length', child_nodes.length)
    // ball.centerX = ball.x + ball.width / 2
    // ball.centerY = ball.y + ball.width / 2
    // let testX = ball.centerX
    // let testY = ball.centerY
    // if (ball.centerX < child_nodes[i].offsetLeft) {
    //     testX = child_nodes[i].offsetLeft
    // } else if (ball.centerX > child_nodes[i].offsetLeft + child_nodes[i].offsetWidth) {
    //     testX = child_nodes[i].offsetLeft + child_nodes[i].offsetWidth
    // }
    // if (ball.centerY < child_nodes[i].offsetTop) {
    //     testY = child_nodes[i].offsetTop
    // } else if (ball.centerY > child_nodes[i].offsetTop + child_nodes[i].offsetHeight) {
    //     testY = child_nodes[i].offsetTop + child_nodes[i].offsetHeight
    // }
    // let disX = ball.centerX - testX
    // let disY = ball.centerY - testY
    //
    // let distance = Math.sqrt(disX * disX + disY * disY)
    // if (distance < ball.height / 2) {
    //     console.log('-----COLLISION-----')
    //     blocks_container.removeChild(child_nodes[i])
    //     ball.OffsetY = -ball.OffsetY
    // }
}

container.addEventListener('click', animate, {once:true})

// function getRandomBetween(min, max) {
//      return Math.floor(Math.random() * (max - min + 1) + min)
// }


//
// if (ball.x + ball.height === user.x) {
//     ball.y -= ball.OffsetY
// }

// // adding blur and button before game start
// let blurBeforeGame = document.createElement('div')
// blurBeforeGame.classList.add('blurBlock')
// body.appendChild(blurBeforeGame)
// let startButton = document.createElement('a')
// startButton.classList.add('start-button')
// startButton.textContent = 'Start a game'
// blurBeforeGame.appendChild(startButton)

// function getRandomBetween(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min)
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));     //// !!!! ========= РАЗОБРАТЬСЯ С ASYNC AWAIT И PROMISE !!!! ======= ////
// }

// const someStupidIdioticSolution = ['Game starts in', '3', '2', '1', 'Go']
// const message = document.createElement('span')
// container.appendChild(message)

// async function countdown() {         
//     for(let i = 0; i < someStupidIdioticSolution.length; i++) {
//         message.textContent = someStupidIdioticSolution[i]
//         await sleep(1300)
//     }
//     message.style.display = 'none'
// }

// // function customSetinterval(func, time) {         // рывки при анимации, сделанной с помощью setInterval
// //     setTimeout(function() {                      // происходят, потому что время для вызова функции, указанное 
// //         func()                                   // в setInterval, расходится со временем, за которое браузер   
// //         customSetinterval(func, time)            // отрисовывает один фрейм (16,6 миллисекунд)
// //     }, time)                                     // поэтому для анимации лучше использовать браузерное API 
// // }                                                // requestAnimationFrame, которое знает частоту обновления фрейма браузером
 
// async function launch(func) {         
//     await sleep(7000)
//     globalId = requestAnimationFrame(func)
//     if (flag) {
//         cancelAnimationFrame(globalId)                /// doesn't work, can't figure out the reason 
//     }
//     // customSetinterval(func, time)
// }

// startButton.addEventListener('click', () => {
//     startButton.style.opacity = 0 
//     blurBeforeGame.style.opacity = 0  

//     // function sleep1(ms) {
//     //     const date = Date.now()
//     //     let currentDate
//     //     do {
//     //         currentDate = Date.now()
//     //     } while (currentDate - date < ms)
//     // }

//     switch (getRandomBetween(0, 1)) {
//         case 1: 
//         countdown()
//         launch(launchOnRight)
//         break
//         case 0: 
//         countdown()
//         launch(launchOnLeft)
//         break
//     }
// })

