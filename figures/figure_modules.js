
export default class Figure {

    svgElement
    svgContainer
    svgRect
    strokeWidth = "2"

    constructor(svgID = null) {
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")
        this.svgElement.appendChild(this.svgContainer)
    }

    addToSVGContainer(fig) {
        
        this.svgContainer.appendChild(fig)
        let boundingBox = this.svgElement.getBBox()
        boundingBox.x += Math.sign(boundingBox.x)*10
        boundingBox.y += Math.sign(boundingBox.y)*10
        boundingBox.width += Math.sign(boundingBox.width)*10
        boundingBox.height += Math.sign(boundingBox.height)*10
        this.svgElement.setAttribute("width", Math.abs(boundingBox.width))
        this.svgElement.setAttribute("height", Math.abs(boundingBox.height))
        //this.svgElement.setAttribute("viewBox", boundingBox.x.toString()+ " " + boundingBox.y.toString() + " " + boundingBox.width.toString() + " " + boundingBox.height.toString())
    }
    
    
    makeCircle(r, pos = [0, 0], fill="white", strokeColor = "black") {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("stroke", "black")
        circle.setAttribute("stroke-width", this.strokeWidth)
        circle.setAttribute("fill", fill)
        circle.setAttribute("cy", pos[0].toString())
        circle.setAttribute("cx", pos[1].toString())
        circle.setAttribute("r", r.toString())
        this.addToSVGContainer(circle)
        return circle
    }
    
    makeLine(A, B, strokeColor = "black") {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("stroke", "black")
        line.setAttribute("stroke-width", this.strokeWidth)
        line.setAttribute("x1", A[0].toString())
        line.setAttribute("y1", (-A[1]).toString())
        line.setAttribute("x2", B[0].toString())
        line.setAttribute("y2", (-B[1]).toString())
        this.addToSVGContainer(line)
    }

    makePolygon(points, fill="white", strokeColor = "black") {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        let firstPoint = points.shift()
        let pointsString = firstPoint[0].toString() + " " + firstPoint[1].toString()
        for ( let point of points ) {
            pointsString += " " + point[0].toString() + " " + point[1].toString() 
        }
        polygon.setAttribute("points", pointsString)
        polygon.setAttribute("fill", fill)
        polygon.setAttribute("stroke", strokeColor)  
        this.addToSVGContainer(polygon)
        return polygon      
    } 
}

   