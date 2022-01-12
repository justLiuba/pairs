const startGameButton = document.querySelector('#start-game-button')
const gameGrid = document.querySelector('.game-grid')
const gameImages = document.querySelectorAll('.col img')
const gameCells = document.querySelectorAll('.col')
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
    const header = document.querySelector('h1')
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

// open and close cells logick
let openedCells = 0

gameCells.forEach(item => {
    item.addEventListener('click', function() {
        if (openedCells < 2) {
            openedCells += 1
            const cellImg = item.firstChild
            const hiddenImg = cellImg.getAttribute('data-hidden-image')
            cellImg.src = hiddenImg
        } else {
            openedCells = 0
            for (i = 0; i < imagesNumber * 2;){
                gameImages[i].setAttribute('src', defoultImage)
                i++
            }
        }
        
    })
})





