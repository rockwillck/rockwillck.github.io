function scrollLoop() {
    requestAnimationFrame(scrollLoop)

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
}
scrollLoop()

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