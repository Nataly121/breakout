import Blocks from './components/Blocks.js'
import User from './components/User.js'
import Ball from './components/Ball.js'
import {blocks_container, container} from './components/DOMcontainers.js'
import {blurBeforeGame as blurBlock, startButton} from "./components/StartGameBlock.js";

console.log(container.getBoundingClientRect())

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
    if(!['a', 'A', 'd', 'D', 'ArrowRight', 'ArrowLeft'].includes(event.key) || blurBlock.style.opacity !== '0' || message.style.display === 'block')
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
                user.x -= user.OffsetX
                if (user.x < 0) {
                    user.x = 0
                }
                requestAnimationFrame(() => user.drawUser())
                break
            }
            case 'd':
            case 'D':
            case 'ArrowRight':
            {
                user.x += user.OffsetX
                if (user.x + user.width > container.getBoundingClientRect().width) {
                    user.x =  container.getBoundingClientRect().width - user.width
                }
                requestAnimationFrame(() => user.drawUser())
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

let child_nodes = blocks_container.childNodes

let id
function animate() {
    ball.x += ball.OffsetX
    ball.y += ball.OffsetY
    ball.ballOnBoard.style.left = ball.x + 'px'
    ball.ballOnBoard.style.top = ball.y + 'px'
    id = window.requestAnimationFrame(animate)
    if (wallsCollisionCheck()) {
        cancelAnimationFrame(id)
        controller.abort()
        message.style.display = 'block'
        message.textContent = 'You touched the ground! You lost!'
        return
    } else if (child_nodes.length === 0) {
        cancelAnimationFrame(id)
        controller.abort()
        message.style.display = 'block'
        message.textContent = 'All blocks destroyed! You won!'
        return
    }
    userCollisionCheck()
    blocksCollisionCheck()
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

function  startGame() {
    startButton.style.opacity = '0'
    blurBlock.style.opacity = '0'
    if (getRandomBetween(0, 1)) {
        ball.OffsetX = 5
    } else {
        ball.OffsetX = -5
    }
    setTimeout(countdown, 1000)
    setTimeout(animate, 6500)
}

startButton.addEventListener('click', startGame, {once:true})

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));     //// !!!! ========= РАЗОБРАТЬСЯ С ASYNC AWAIT И PROMISE !!!! ======= ////
}

const count = ['Game starts in', '3', '2', '1', 'Go']
const message = document.createElement('span')
container.appendChild(message)
message.style.display = 'block'

async function countdown() {
    for(let i = 0; i < count.length; i++) {
        message.textContent = count[i]
        await sleep(1000)
    }
    message.style.display = 'none'
}

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

    // function sleep1(ms) {
    //     const date = Date.now()
    //     let currentDate
    //     do {
    //         currentDate = Date.now()
    //     } while (currentDate - date < ms)
    // }


