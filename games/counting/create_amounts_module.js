import { Figure } from "../../figures/figure_modules.js"

let cardWidth = 100
let cardHeight = 80
var chosenCard = null
let digitContainerStrokeWidth = 2
let digitGap = 2

let oneDigit = null

const fig = new Figure()
fig.makeBoundingBox({xSize: 1080, ySize: 600})



let digitContainerPos = [200, 10]
let digitContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")
let digitContainerWidth = 2*cardWidth + 2*digitContainerStrokeWidth + digitGap
let digitRectangle = fig.makeRectangle({x: digitContainerPos[0], y: digitContainerPos[1], width: digitContainerWidth, height: cardHeight + digitContainerStrokeWidth, fill: "black", strokeWidth:digitContainerStrokeWidth, addToSvg: false})
let digitRectangle1 = fig.makeRectangle({x: digitContainerPos[0] + cardWidth + 2.5*digitContainerStrokeWidth , y: digitContainerPos[1] + digitContainerStrokeWidth/2, width: cardWidth, height: cardHeight, strokeWidth:0, addToSvg: false})
let digitRectangle10 =fig.makeRectangle({x: digitContainerPos[0] + digitContainerStrokeWidth/2, y: digitContainerPos[1] + digitContainerStrokeWidth/2, width: cardWidth, height: cardHeight, strokeWidth:0, addToSvg: false})
digitContainer.appendChild(digitRectangle)
digitContainer.appendChild(digitRectangle1)
digitContainer.appendChild(digitRectangle10)
fig.addToSVGContainer({fig: digitContainer})

makeOneCards()

document.getElementsByTagName("body")[0].appendChild(fig.svgElement)

document.addEventListener("mousemove", mouseMoving)
document.addEventListener("mouseup", mouseUp)


var offsetX = 0
var offsetY = 0


function makeOneCards() {
    let x = 100
    let dx = 20
    let y = 100
    let dy = 20

    for (let i of [...Array(9).keys()]) {
        let oneCard = document.createElementNS("http://www.w3.org/2000/svg", "g")
        let originalX = x+(cardWidth + dx)*(i % 3)

        console.log(i % 9)
        console.log(Math.floor(i/3))
        let originalY = y + (cardHeight + dy)*(Math.floor(i/3))
        let oneRectangle = fig.makeRectangle({width: cardWidth, height: cardHeight, fill: "green", strokeWidth:0, addToSvg: false})
        oneCard.setAttribute("data-x", originalX)
        oneCard.setAttribute("data-y", originalY)
        oneCard.appendChild(oneRectangle)
        
        oneCard.setAttribute("data-original-x", originalX)
        oneCard.setAttribute("data-original-y", originalY)
        fig.addToSVGContainer({fig: oneCard})
        
        let oneText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        oneText.setAttribute("x", cardWidth/2)
        oneText.setAttribute("y", cardHeight/2)
        oneText.style.textAnchor = "middle"
        oneText.style.alignmentBaseline = "middle"
        oneText.style.fontSize = "32"
        oneText.innerHTML = (i+1).toString()
        oneCard.appendChild(oneText)
        fig.move(oneCard, originalX, originalY)
        oneCard.addEventListener("mousedown", mouseDown)
        oneCard.addEventListener("click", onClick)
    }
    
}

function mouseDown(mouse) {
    chosenCard = this
    offsetX = mouse.clientX - parseInt(chosenCard.dataset.x)
    offsetY = mouse.clientY - parseInt(chosenCard.dataset.y)
}

function mouseUp(event) {
    chosenCard = null
}

function mouseMoving(mouse) {
    if (chosenCard) {
        if (parseFloat(chosenCard.dataset.y) > 1000) {
            chosenCard.dataset.y = digitRectangle1.getAttribute("y")
            chosenCard.dataset.x = digitRectangle1.getAttribute("x")
            chosenCard.setAttribute("transform", `translate(${chosenCard.dataset.x} ${chosenCard.dataset.y})`)
            oneDigit = chosenCard
            chosenCard = null
        }
        else {
            chosenCard.setAttribute("transform", `translate(${mouse.clientX - offsetX} ${mouse.clientY - offsetY})`)
            chosenCard.dataset.x = mouse.clientX - offsetX
            chosenCard.dataset.y = mouse.clientY - offsetY
        }
        
         
    }
    
}

function onClick() {
    console.log("hei")
    if (this === oneDigit) {
        console.log("heidsa")
        this.setAttribute("transform", `translate(${this.dataset.originalX} ${this.dataset.originalY})`)
    }
}

