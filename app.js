const canvas = document.getElementById("bg")
const ctx = canvas.getContext("2d")
canvas.width = Math.round(100*window.innerWidth/window.innerHeight)
canvas.height = 100

window.addEventListener("resize", (e) => {
    canvas.width = Math.round(100*window.innerWidth/window.innerHeight)
    canvas.height = 100
})

centroids = []
for (let i = 0; i < 5; i++) {
    centroids.push([(Math.random() - 0.5), [Math.random(), Math.random()], Math.random()*0.7+0.5])
}
let theta = 0
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white"

    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
            let powerSum = 0
            for (cent of centroids) {
                let centroid = [cent[0]*Math.min(canvas.width, canvas.height), [cent[1][0]*canvas.width*0.8 + canvas.width*0.1, cent[1][1]*canvas.height*0.8 + canvas.height*0.1], cent[2]]
                let cx = Math.cos(theta*centroid[2])*centroid[0]+centroid[1][0]
                let cy = Math.cos(theta*centroid[2])*centroid[0]+centroid[1][1]
                powerSum += 1/((x - cx)**2 + (y - cy)**2)
            }
            if (Math.abs(powerSum*200 - 0.5) < 0.1) {
                ctx.fillRect(x, y, 1, 1)
            }
        }
    }

    theta += 0.03*Math.random() + 0.01
}
setInterval(animate, 50)

const hov = document.getElementById("hover")
window.addEventListener("mousemove", (e) => {
    hov.style.left = `${e.clientX + 15}px`
    hov.style.top = `${e.clientY + 10}px`
})

for (let ss of [...document.getElementsByClassName("projects")].map(x => [...x.children]).flat(Infinity)) {
    if (ss.dataset.ss != undefined) {
        console.log(ss.dataset.ss)
        ss.addEventListener("mouseenter", () => {
            hov.style.scale = 1
            hov.src=ss.dataset.ss
    })
        ss.addEventListener("mouseleave", () => {
            hov.style.scale = 0
        }
        )
    }
}