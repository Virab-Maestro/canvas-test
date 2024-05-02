const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []

class Particle {
	constructor(x, y, radius, color, speedX, speedY) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.speedX = speedX
		this.speedY = speedY
	}

	draw() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.closePath()
	}

	update() {
		this.x += this.speedX
		this.y += this.speedY

		if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
			this.speedX = -this.speedX
		}

		if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
			this.speedY = -this.speedY
		}

		this.draw()
	}
}

function init() {
	for (let i = 0; i < 100; i++) {
		const radius = Math.random() * 3 + 1
		const x = Math.random() * (canvas.width - radius * 2) + radius
		const y = Math.random() * (canvas.height - radius * 2) + radius
		const color = `hsl(${Math.random() * 360}, 50%, 50%)`
		const speedX = (Math.random() - 0.5) * 3
		const speedY = (Math.random() - 0.5) * 3
		particles.push(new Particle(x, y, radius, color, speedX, speedY))
	}
}

function animate() {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	particles.forEach(particle => {
		particle.update()
	})
}

init()
animate()
