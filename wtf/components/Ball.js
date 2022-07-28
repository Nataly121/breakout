import {container} from './DOMcontainers.js'

//creating ball
export default class Ball {
    constructor(coordX = 390, coordY = 445) {
        this.x = coordX
        this.y = coordY
        this.OffsetX = 5
        this.OffsetY = -5
        this.height = 20
        this.width = 20
        // this.centerX //= this.x + this.width / 2
        // this.centerY // = this.y + this.height / 2
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
    }
}
