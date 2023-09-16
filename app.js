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

    if (window.innerWidth > window.innerHeight && document.getElementById("btt").style.opacity > 0) {
        document.getElementById("btt").style.opacity = 0
    } else if (window.innerHeight > window.innerWidth && document.getElementById("toc").style.opacity > 0) {
        document.getElementById("toc").style.opacity = 0
    }
    i = 0
    for (proj of document.getElementsByClassName("sheet")) {
        // console.log(i, proj.getBoundingClientRect().y)
        if (proj.getBoundingClientRect().y + proj.getBoundingClientRect().height >= 0 && proj.getBoundingClientRect().y + proj.getBoundingClientRect().height <= window.innerHeight) {
            break
        }
        i++
    }
    t = 0
    for (link of document.getElementsByClassName("tocEl")) {
        if (link.className.includes("active")) {
            if (t != i) {
                link.className = "tocEl"
            }
        } else if (t == i) {
            link.className = "tocEl active"
        }
        t++
    }

    

    if (window.scrollY - window.innerHeight > 0) {
        if (window.innerWidth > window.innerHeight) {
            document.getElementById("toc").style.opacity = 1
        } else {
            document.getElementById("btt").style.opacity = 1
        }
    } else {
        document.getElementById("toc").style.opacity = 0
        document.getElementById("btt").style.opacity = 0
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    // ctx.fillRect(0, canvas.height*0.8, canvas.width, canvas.height*0.2)

    ctx.strokeStyle = "rgb(200, 200, 255)"
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
    ctx.strokeStyle = "white"
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

toc = document.getElementById("toc")
i = 0
for (proj of document.getElementsByClassName("project")) {
    proj.id = `P${i}`
    newA = document.createElement("a")
    newA.href = `#P${i}`
    newA.id = `A${i}`
    newA.className = "tocEl"
    toc.appendChild(newA)
    i++
}