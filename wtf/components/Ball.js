import {container} from './DOMcontainers.js'

//creating ball
export default class Ball {
    constructor(coordX = 390, coordY = 445) {
        this.x = coordX
        this.y = coordY
        this.OffsetX = 5
        this.OffsetY = 5
        this.height = 20
        this.width = 20
        this.centerX //= this.x + this.width / 2
        this.centerY // = this.y + this.height / 2
    }

    createBallInDOM() {
        this.ballOnBoard = document.createElement('div')
        this.ballOnBoard.classList.add('ball')
        this.ballOnBoard.style.height = this.height + 'px'
        this.ballOnBoard.style.width = this.width + 'px'
        this.ballOnBoard.style.left = this.x + 'px'
        this.ballOnBoard.style.top = this.y + 'px'
        container.appendChild(this.ballOnBoard)
        console.log('ball in DOM created')
       // return ballOnBoard // nahuya retutnit esli mojno pryamo v klasse ego ispolsovat?????
    }

    drawBall() {
        // console.log('animationStart = ', animationStart)
        // console.log('timeStamp = ', timeStamp)
        // if (!animationStart) {  // проблема в undefined animationStart
        //                              // начался какой-то пиздец с глобальным хуком
        //     animationStart = timeStamp  / / проблема в том, что timestamp почему то undefined, хотя вроде и нет
        //     this.ballOnBoard.style.left = this.x + 'px'
        //     this.ballOnBoard.style.top = this.y + 'px'
        //     requestId = requestAnimationFrame(this.drawBall)
        //     console.log('ball drawn for the first time')
        // }
        // else {
        //     this.x += this.OffsetX
        //     this.y += this.OffsetY
        //     this.ballOnBoard.style.left = this.x + 'px'
        //     this.ballOnBoard.style.top = this.y + 'px'
        //     requestAnimationFrame(this.drawBall)                // получится, что id будет перезаписываться каждый раз
          //  console.log('ball drawn NOT for the first time')   // возможно стоит вынести его куда-то в другое место
        //}
    }

    // moveBall(offSetX, offSetY, user, Blocks) {
    //     let id
    //     this.x += offSetX
    //     this.y += offSetY
    //
    //     let res = this.collisionCheck(user)
    //     let res2 = this.checkforBlockCollision(Blocks)
    //     if (res2 === 6) {
    //         this.moveBall(offSetX, -offSetY, user, Blocks)
    //     }
    //     if (res === 0) {
    //         this.drawBall()
    //          id = requestAnimationFrame(() => {this.moveBall(offSetX, offSetY, user, Blocks)})
    //     }
    //     if (res === 1) {
    //         this.moveBall(-offSetX, offSetY, user, Blocks)
    //     }
    //     if (res === 3) {
    //         this.moveBall(offSetX, -offSetY, user, Blocks)
    //     }
    //     if (res === 5) {
    //         this.moveBall(offSetX, -offSetY, user, Blocks)
    //     }
    //     if (res === 4) {
    //         console.log('END GAME')
    //         cancelAnimationFrame(id)
    //     }
    // }

    // wallsCollisionCheck() {
    //     console.log('entering wallsCollisionCheck')
    //     if (this.x <= 0 || this.x >= container.getBoundingClientRect().width - this.width) {
    //         console.log('WALL COLLISION X')
    //         this.OffsetX = -this.OffsetX   // здесь я просто меняю направление, а мне еще нужно присваивать
    //                                        // эту смену самим координатам, чтобы мяч двигался
    //     }
    //     if (this.y <= 0) {
    //         console.log('WALL COLLISION Y')
    //         this.OffsetY = -this.OffsetY
    //     }
    //     if (this.y >= container.getBoundingClientRect().height - this.height) {
    //         console.log('COLLISION END GAME')
    //         cancelAnimationFrame(requestId)
    //     }
    // }
    //
    // userCollisionCheck(User) {
    //     console.log('entering userCollisionCheck')
    //     console.log('OffsetY before', this.OffsetY)
    //     if (this.x >= User.x && this.x <= User.x + User.width && this.y === User.y - this.height) {
    //         console.log('USER COLLISION')
    //         this.OffsetY = -this.OffsetY
    //     }console.log('OffsetY after', this.OffsetY)
    //
    // }
    //
    // blocksCollisionCheck(Blocks) {
    //     console.log('entering blocksCollisionCheck')
    //     for (let i = 0; i < Blocks.blocks.length; i++) {
    //         if (this.x >= Blocks.blocks[i].x && this.x <= Blocks.blocks[i].x + Blocks.blocks[i].width && this.y === Blocks.blocks[i].y + Blocks.blocks[i].height) {
    //             console.log('COLLISION WITH BLOCK')
    //             Blocks.discardBlock(i)
    //             this.OffsetY = -this.OffsetY
    //             // console.log('array after collision', Blocks.blocks)
    //             //Blocks.drawBlocksInDOM() // рисует новые блокт поверх старых --- не нужна здесь
    //             // так как нодЛист childNodes живой и обновляется автоматически
    //             // console.log('nodelist after collision', blocks_container.childNodes)
    //         }
    //     }
    // }
        // this.centerX = this.x + this.width / 2
        // this.centerY = this.y + this.height / 2
        // let testX = this.centerX
        // let testY = this.centerY
        // if (this.centerX < user.x) {
        //     testX = user.x
        // }
        // else if (this.centerX > user.x + user.width) {
        //     testX = user.x + user.width
        // }
        // if (this.centerY < user.y) {
        //     testY = user.y
        // }
        // else if (this.centerY > user.y + user.height) {
        //     testX = user.y + user.height
        // }
        // let disX = this.centerX - testX
        // let disY = this.centerY - testY
        //
        // let distance = 0.5 * (disX * disX + disY * disY)
        // if (distance <= this.height / 2) {
        //         console.log('COLLISION')
        //         return 5
        // }
}
