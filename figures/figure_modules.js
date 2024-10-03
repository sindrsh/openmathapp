export default class Figure {

    svgElement
    svgContainer
    svgRect
    strokeWidth = "2"
    temporaryElements = []

    constructor(svgID = null) {
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")
        this.svgElement.appendChild(this.svgContainer)
    }

    addToSVGContainer(fig, isTemp=true) {
        this.svgContainer.appendChild(fig)
        let boundingBox = this.svgElement.getBBox()
        boundingBox.x += Math.sign(boundingBox.x)*10
        boundingBox.y += Math.sign(boundingBox.y)*10
        boundingBox.width += Math.sign(boundingBox.width)*10
        boundingBox.height += Math.sign(boundingBox.height)*10
        this.svgElement.setAttribute("width", Math.abs(boundingBox.width))
        this.svgElement.setAttribute("height", Math.abs(boundingBox.height))
        if (isTemp) {
            this.temporaryElements.push(fig)
        }
        //this.svgElement.setAttribute("viewBox", boundingBox.x.toString()+ " " + boundingBox.y.toString() + " " + boundingBox.width.toString() + " " + boundingBox.height.toString())
    }
    
    removeTemporaryElements() {
        for (let i of Array(this.temporaryElements.length).keys()) {
            this.temporaryElements[i].remove()
        }
        this.temporaryElements = []
    }

    
    makeCircle(r, pos = [0, 0], isTemp=true, fill="white", strokeColor = "black") {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("stroke", "black")
        circle.setAttribute("stroke-width", this.strokeWidth)
        circle.setAttribute("fill", fill)
        circle.setAttribute("cy", pos[0].toString())
        circle.setAttribute("cx", pos[1].toString())
        circle.setAttribute("r", r.toString())
        this.addToSVGContainer(circle, isTemp)
        return circle
    }
    
    makeLine(A, B, isTemp=true, strokeColor = "black") {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("stroke", "black")
        line.setAttribute("stroke-width", this.strokeWidth)
        line.setAttribute("x1", A[0].toString())
        line.setAttribute("y1", (-A[1]).toString())
        line.setAttribute("x2", B[0].toString())
        line.setAttribute("y2", (-B[1]).toString())
        this.addToSVGContainer(line, isTemp)
        return line
    }

    makePolygon(points, isTemp=true, fill="white", strokeColor = "black", add=true) {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        let firstPoint = points.shift()
        let pointsString = firstPoint[0].toString() + " " + firstPoint[1].toString()
        for ( let point of points ) {
            pointsString += " " + point[0].toString() + " " + point[1].toString() 
        }
        polygon.setAttribute("points", pointsString)
        polygon.setAttribute("fill", fill)
        polygon.setAttribute("stroke", strokeColor)  
        if (add) {
            console.log("?")
            this.addToSVGContainer(polygon, isTemp)
        }
        return polygon      
    }
    
    makeOnes(amount, isTemp=true, size=15, ySpace=5, fill="blue", strokeColor = "black", addToSvg=true) {
        let one = this.makePolygon([[0,0], [size, 0], [size, size], [0, size]], isTemp, fill, strokeColor, false)
        let onesCollection = document.createElementNS("http://www.w3.org/2000/svg", "g")
        onesCollection.appendChild(one)
        let dy = 0
        for (let i of Array(amount - 1).keys()) {
            one = one.cloneNode()
            dy = (i+1)*(size + ySpace)
            one.setAttribute("transform", `translate(0 ${dy})` )
            onesCollection.appendChild(one)   
        }
        if (addToSvg) {
            this.addToSVGContainer(onesCollection, isTemp)
        }
        
        return onesCollection
        
    }

    makeTens(amount, isTemp=true, xSize=15, xSpace=5, fill="red", strokeColor="black", addToSvg=true) {
        let ten = this.makeOnes(10, isTemp, xSize, 0, fill, strokeColor, false)
        let tensCollection = document.createElementNS("http://www.w3.org/2000/svg", "g")
        tensCollection.appendChild(ten)
        let dx = 0
        for (let i of Array(amount - 1).keys()) {
            ten = ten.cloneNode(true)
            dx = (i+1)*(xSize + xSpace)
            ten.setAttribute("transform", `translate(${dx} 0)`)
            console.log(ten)
            tensCollection.appendChild(ten)   
        }
        if (addToSvg) {
            this.addToSVGContainer(tensCollection, isTemp)
        }

        return tensCollection
    }

    test({amount= 1, isTemp=true, xSize=15, xSpace=5, fill="red", strokeColor="black", addToSvg=true} = {}) {
        console.log(amount, fill)
    }
}

   