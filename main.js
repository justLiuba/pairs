const startGameButton = document.querySelector('#start-game-button')
const gameGrid = document.querySelector('.game-grid')
const gameImages = document.querySelectorAll('.col img')
const gameCells = document.querySelectorAll('.col')
const header = document.querySelector('h1')
const defoultImage = './img/pixel.png'
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

//start game
startGameButton.addEventListener('click', function(){
    header.innerText = 'Enjoy the game!'
    const buttons = document.querySelector('form')
    buttons.remove()
    gameImages.forEach(function(item){
        item.setAttribute('src', defoultImage)
    })
    gameGrid.removeAttribute("style")
})

//random fill the game cells 
const imagesNumber = Object.keys(images).length

function setGameCellsHiddenImages(imagesNumber, i) {
    const randomImageIndex = Math.floor(Math.random() * imagesNumber)
    const imageKeys = images[Object.keys(images)[randomImageIndex]]
    if (imageKeys.counter < 2) {
        imageKeys.counter += 1
        const srcValue = imageKeys.src
        gameImages[i].setAttribute('data-hidden-image', srcValue)
        return true
    } return false

}

for (i = 0; i < imagesNumber * 2;){
    if (setGameCellsHiddenImages(imagesNumber, i)) {
        i++
    }
}

// game
let openedCells = 0
let guessedCells = 0
let firstCell = ''
let secondCell = ''

function closeGameCells() {
    for (i = 0; i < imagesNumber * 2;){
        gameImages[i].setAttribute('src', defoultImage)
        i++
        openedCells = 0
    }
}

gameCells.forEach(item => {
    item.addEventListener('click', function() {
        if (openedCells < 2) {
            openedCells += 1
            const cellImg = item.firstChild
            const hiddenImg = cellImg.getAttribute('data-hidden-image')
            cellImg.src = hiddenImg
            if (openedCells === 1){
                firstCell = hiddenImg
            }
            if (openedCells === 2) {
                secondCell = hiddenImg
                if (firstCell === secondCell) {
                    openedCells = 0
                    guessedCells += 2
                    setTimeout(userWin(), 2000)
                } else {
                    setTimeout(closeGameCells, 2000)
                }
            }
        }
    })
})

function userWin() {
    if (guessedCells === imagesNumber * 2){
        gameGrid.remove()
        header.innerText = 'Congratulations, You win!!!'
        const winImg = document.createElement('img')
        winImg.setAttribute('class', 'win')
        winImg.src = './img/trophy.png'
        document.body.append(winImg)
    }
}