import {blocks_container} from './DOMcontainers.js'

//creating a block
export class Block {
    constructor(Xcoord, Ycoord)
    {
        this.x = Xcoord
        this.y = Ycoord
        this.height = 20
        this.width = 100
    }
}

//creating class of blocks with methods to place blocks in DOM
export default class Blocks {
    constructor() {
        this.blocks = []
    }

    addBlocks(blockRows, blockColumns, rowStart, columnStart, rowStep, columnStep) {
        for (let i = 0, rowStart = 10; i < blockRows; i++, rowStart+=rowStep) {
            this.blocks[i] = []
            for (let j = 0, columnStart = 10; j < blockColumns; j++, columnStart+=columnStep) {
                this.blocks[i][j] = new Block(columnStart, rowStart)
            }
        }
    }

    flatBlocks() {
        this.blocks = this.blocks.flat()
    }

    drawBlocksInDOM() {
        for (let i = 0; i < this.blocks.length; i++) {
                const block = document.createElement('div')
                block.classList.add('game-block')
                block.style.left = this.blocks[i].x + 'px'
                block.style.top = this.blocks[i].y + 'px'
                block.style.height = this.blocks[i].height + 'px'
                block.style.width = this.blocks[i].width + 'px'
                blocks_container.appendChild(block)
                console.log('drawing block')
        }
    }

    // discardBlock(i) {
    //     let child_nodes = blocks_container.childNodes
    //     child_nodes.forEach((item, index) => {
    //         if (index === i) {
    //             blocks_container.removeChild(item)
    //         }
    //     })
    //     console.log(child_nodes)
    //     // this.blocks = this.blocks.filter((_, index) => index !== i)
    // }
}

// Blocks.prototype.createBlock = function (offsetLeft, offsetTop) {
//     return new Block(this, offsetLeft, offsetTop)
// }
