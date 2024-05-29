// Start coding here
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1024
canvas.height = window.innerHeight/window.innerWidth * canvas.width

function resized() {
    canvas.width = 1024
    canvas.height = window.innerHeight/window.innerWidth * canvas.width
}

var rains = []
var ripples = []
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "white"
    rainOffsets = [-2, 5]
    rains.forEach((rain, index) => {
        ctx.beginPath()
        ctx.moveTo(rain[0] - rainOffsets[0]*5*rain[2], rain[1] - rainOffsets[1]*5*rain[2])
        ctx.lineTo(rain[0], rain[1])
        ctx.closePath()
        ctx.stroke()
        rain[0] += rainOffsets[0]*rain[2]
        rain[1] += rainOffsets[1]*rain[2]

        if (rain[1] >= (rain[2] - 1)*canvas.height*0.2 + canvas.height*0.8) {
            rains.splice(index, 1)
            ripples.push([rain[0], rain[1], 0, rain[2] - 1])
        }
    })
    ripples.forEach((ripple, index) => {
        ctx.beginPath()
        ctx.arc(ripple[0], ripple[1], ripple[2], 0, 2*Math.PI)
        ctx.closePath()
        ctx.stroke()
        ripple[2] += 1
        if (ripple[2] >= ripple[3]*10) {
            ripples.splice(index, 1)
        }
    })
    rains.push([Math.random()*canvas.width*1.5, 0, Math.random() + 1])
}
animate()