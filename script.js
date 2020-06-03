const FIELD_SIZE = 8
const ROWS_NUMBER = 100
const COLUMNS_NUMBER = 100
const BACKGROUND_COLOR = 'black'
const FIELD_COLOR = 'yellow'
const VIRUS_COLOR = 'red'
const GENERATION_TIME = 0

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const lifeGame = new LifeGame(ROWS_NUMBER, COLUMNS_NUMBER)

start()

function start () {
    canvas.width = FIELD_SIZE * COLUMNS_NUMBER
    canvas.height = FIELD_SIZE * ROWS_NUMBER

    lifeGame.reviveRandomFields(ROWS_NUMBER * COLUMNS_NUMBER / 2)
    //регеструє виклик функції tick 
    requestAnimationFrame(tick)
}

//стираємо і малюємо дуже швидко
function tick (timestamp) {
    clearCanvas()
    //якшо прийшов час змінити покоління
    if (timestamp > lifeGame.generationNumber * GENERATION_TIME) {
        lifeGame.changeGeneration()
    }
    
    lifeGame.forAlive((x, y) => drawField(x, y, FIELD_COLOR, VIRUS_COLOR))

    requestAnimationFrame(tick)
}

function clearCanvas () {
    context.fillStyle = BACKGROUND_COLOR
    context.beginPath()
    context.rect(0, 0, canvas.width, canvas.height)
    context.fill()
}

function drawField (x, y, color) {
    context.fillStyle = color
    context.beginPath()
    context.rect(x * FIELD_SIZE, y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
    context.fill()
}