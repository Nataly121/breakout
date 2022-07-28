import {body} from "./DOMcontainers.js";

let blurBeforeGame = document.createElement('div')
blurBeforeGame.classList.add('blurBlock')
body.appendChild(blurBeforeGame)
let startButton = document.createElement('a')
startButton.classList.add('start-button')
startButton.textContent = 'Start a game'
blurBeforeGame.appendChild(startButton)

export {blurBeforeGame, startButton}