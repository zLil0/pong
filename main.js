const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 900
canvas.height = 600

class Player {
    static height = 90
    static width = 10
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.score = 0
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fillRect(this.position.x, this.position.y, Player.width, Player.height)
    }
    update() {
        if(this.position.y + this.velocity.y >= 0 && this.position.y + Player.height + this.velocity.y <= canvas.height){
            this.position.y += this.velocity.y
        }
    }
}

class Ball {
    static size = 10
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fillRect(this.position.x, this.position.y, Ball.size, Ball.size)
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

let gameOver = false
let ball

const newBall = (player) => {
    let vX, vY, pX
    if(player === 'p1'){
        vX = 10
        pX = 460
    }
    else if(player === 'p2'){
        vX = -10
        pX = 430
    }
    else{
        vX = 10
        pX = 460
    }
    ball = new Ball({
        position: {
            x: pX,
            y: 290
        },
        velocity: {
            x: vX,
            y: -1
        }
    })
}

newBall()

const p1 = new Player({
    position: {
        x: 20,
        y: 250
    },
    velocity: {
        y: 0
    }
})
const p2 = new Player({
    position: {
        x: 870,
        y: 40
    },
    velocity: {
        y: 0
    }
})

const background = () => {
    for (let i = 0; i < 100; i += 1) {
        if (i % 2 !== 0) {
            ctx.beginPath()
            ctx.fillStyle = 'white'
            ctx.fillRect(445, (i * 40), 10, 50)
            ctx.closePath()
        }
    }
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.font = '50px arial'
    ctx.textAlign = 'center'
    ctx.fillText(`${p1.score}`, 370, 50)
    ctx.fillText(`${p2.score}`, 530, 50)
    ctx.closePath()

}


p1.draw()
p2.draw()

const ballCollidesPlayer = () => {
    return ((p1.position.x + Player.width == ball.position.x &&
        ball.position.y + Ball.size >= p1.position.y &&
        ball.position.y <= p1.position.y + Player.height) ||
        (p2.position.x == ball.position.x + Ball.size &&
            ball.position.y + Ball.size >= p2.position.y &&
            ball.position.y <= p2.position.y + Player.height))
}

const ballCollidesMap = () => {
    return (ball.position.y - 5 === 0 || ball.position.y + Ball.size + 5 === canvas.height)
}

const scoreDetection = () => {
    let player
    if(ball.position.x + Ball.size <= 0){
        player = 'p2'
    }
    else if(ball.position.x >= canvas.width){
        player = 'p1'
    }
    return player
}

const winDetection = () => {
    if(p1.score === 10 || p2.score === 10){
        if(p1.score > p2.score) document.querySelector('#win p').innerHTML = "Jogador 1 Ganhou!"
        else document.querySelector('#win p').innerHTML = "Jogador 2 Ganhou!"

        document.getElementById('win').style.display = "flex"
        gameOver = true
    }
}

const animate = () => {
    if(!gameOver) window.requestAnimationFrame(animate)
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    background()
    ball.draw()
    p1.draw()
    p2.draw()

    if (ballCollidesPlayer()) {
        ball.velocity.x *= -1
    }
    if (ballCollidesMap()) {
        ball.velocity.y *= -1
    }

    if(scoreDetection() === 'p1'){
        p1.score ++
        newBall('p1')
    }
    else if(scoreDetection() === 'p2'){
        p2.score ++
        newBall('p2')
    }
    winDetection()
    p1.update()
    p2.update()
    ball.update()
}
animate()

const restart = () => {
    location.reload()
}


document.addEventListener('keydown', ({ key }) => {
    if (key === 'w') {
        p1.velocity.y = -7
    }
    else if (key === 's') {
        p1.velocity.y = 7
    }

    if (key === 'ArrowUp') {
        p2.velocity.y = -7
    }
    else if (key === 'ArrowDown') {
        p2.velocity.y = 7
    }
})
document.addEventListener('keyup', ({ key }) => {
    if (key === 'w') {
        p1.velocity.y = 0
    }
    else if (key === 's') {
        p1.velocity.y = 0
    }

    if (key === 'ArrowUp') {
        p2.velocity.y = 0
    }
    else if (key === 'ArrowDown') {
        p2.velocity.y = 0
    }
})
