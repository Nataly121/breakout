import {container} from './DOMcontainers.js'

// creating user
export default class User {
    constructor (coordX = 340, coordY = 465)
    {
        this.x = coordX
        this.y = coordY
        this.OffsetX = 55
        this.height = 20
        this.width = 120
    }
    drawUser() {
        this.userOnBoard.style.left = this.x + 'px'
        this.userOnBoard.style.top = this.y + 'px'
    }

    createUserInDOM() {
        this.userOnBoard = document.createElement('div')
        this.userOnBoard.classList.add('user-block')
        this.userOnBoard.style.height = this.height + 'px'
        this.userOnBoard.style.width = this.width + 'px'
        this.userOnBoard.style.left = this.x + 'px'
        this.userOnBoard.style.top = this.y + 'px'
        container.appendChild(this.userOnBoard)
        console.log('user in DOM created')
    }
}


