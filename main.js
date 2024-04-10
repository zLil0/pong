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
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fillRect(this.position.x, this.position.y, Player.width, Player.height)
    }
    update() {
        this.position.y += this.velocity.y
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

const ball = new Ball({
    position: {
        x: 430,
        y: 290
    },
    velocity: {
        x: -5,
        y: -1
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
}

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
    return (ball.position.y + 5 === 0 || ball.position.y + Ball.size + 5 === canvas.height)
}

const animate = () => {
    window.requestAnimationFrame(animate)
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

    p1.update()
    p2.update()
    ball.update()
}
animate()


document.addEventListener('keydown', ({ key }) => {
    if (key === 'w') {
        p1.velocity.y = -5
    }
    else if (key === 's') {
        p1.velocity.y = 5
    }

    if (key === 'ArrowUp') {
        p2.velocity.y = -5
    }
    else if (key === 'ArrowDown') {
        p2.velocity.y = 5
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
