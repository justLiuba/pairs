const images = {
    img1: {
        'src': './img/cloudy.png',
        'counter': 0
    },
    img2: {
       'src': './img/dollar.png',
       'counter': 0
    }
}
let level = 1
let openedCells = 0
let guessedCells = 0
let firstCell = ''
let secondCell = ''

const gameGrid = document.querySelector('.game-grid')
const startGameButton = document.querySelector('#start-game-button')
const nextLevelButton = document.querySelector('#next-level-button')
const winImg = document.querySelector('.win')
const header = document.querySelector('h1')
const defoultImage = './img/pixel.png'
const imagesNumber = Object.keys(images).length

function resetCounter() {
    for(let i = 0; i < imagesNumber; i++){
        const imageKeys = images[Object.keys(images)[i]]
        imageKeys.counter = 0
    }
}

function drawGameGrid(rows, columns) {
    gameGrid.removeAttribute('style')
    for (let i = 0; i < rows; i++){
        const row = "<div class='row'></div>"
        gameGrid.insertAdjacentHTML('beforeend', row)
        for (let j = 0; j < columns; j++){
            const col = "<div class='col'><img></div>"
            let newRow = gameGrid.lastChild
            newRow.insertAdjacentHTML('beforeend', col)
        }
    }
}  

function prepareToGame() {
    header.innerText = 'Enjoy the game!'
    if (level === 1){
        const buttons = document.querySelector('form')
        buttons.remove()
    } else {
        const winImg = document.querySelector('.win')
        winImg.setAttribute('style', 'display:none')
        nextLevelButton.setAttribute('style', 'display:none')
    }
}

function setDefoultImages() {
    const gameImages = document.querySelectorAll('.col img')
    gameImages.forEach(function(item){
        item.setAttribute('src', defoultImage)
    })
}

function setGameCellsHiddenImages() {
    for (i = 0; i < imagesNumber * 2;){
        if (setHiddenImage(imagesNumber, i)) {
            i++
        }
    }
}

function setHiddenImage(imagesNumber, i) {
    const gameImages = document.querySelectorAll('.col img')
    const randomImageIndex = Math.floor(Math.random() * imagesNumber)
    const imageKeys = images[Object.keys(images)[randomImageIndex]]
    if (imageKeys.counter < 2) {
        imageKeys.counter += 1
        const srcValue = imageKeys.src
        gameImages[i].setAttribute('data-hidden-image', srcValue)
        return true
    } return false

}


function closeGameCells() {
    const gameImages = document.querySelectorAll('.col img')
    for (i = 0; i < imagesNumber * 2;){
        gameImages[i].setAttribute('src', defoultImage)
        i++
        openedCells = 0
    }
}

function userWin() {
    level += 1
    gameGrid.setAttribute('style', 'display:none')
    const rows = document.querySelectorAll('.row')
    rows.forEach(element => {
        element.remove()
    });
    header.innerText = 'Congratulations, You win!!!'
    winImg.removeAttribute('style') 
    nextLevelButton.removeAttribute('style') 
    resetCounter()
    guessedCells = 0
}

function setEventListenerToCells(){
    const gameCells = document.querySelectorAll('.col')
gameCells.forEach(item => {
    item.addEventListener('click', function() {
        if (openedCells < 2) {
            openedCells += 1
            const cellImg = item.firstChild
            const hiddenImg = cellImg.getAttribute('data-hidden-image')
            cellImg.src = hiddenImg
            if (openedCells === 1) firstCell = hiddenImg
            if (openedCells === 2) {
                secondCell = hiddenImg
                if (firstCell === secondCell) {
                    openedCells = 0
                    guessedCells += 2
                    if (guessedCells === imagesNumber * 2) setTimeout(userWin, 2000)     
                } else setTimeout(closeGameCells, 2000)
            }
        }
    })
})
}

function game() {
    console.log(level)
    prepareToGame()
    drawGameGrid(2, 2)
    setDefoultImages()
    setGameCellsHiddenImages()
    setEventListenerToCells()
}

startGameButton.addEventListener('click', () => game())
nextLevelButton.addEventListener('click', () => game())