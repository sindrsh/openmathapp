export default class Figure {

    svgElement
    svgContainer
    svgRect
    strokeWidth = "2"
    temporaryElements = []

    constructor({svgID = null} = {}) {
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")
        this.svgElement.appendChild(this.svgContainer)
    }

    addToSVGContainer({fig=null, isTemp=true, id=null}) {
        this.svgContainer.appendChild(fig)
        if (isTemp) {
            this.temporaryElements.push(fig)
        }
        //this.svgElement.setAttribute("viewBox", boundingBox.x.toString()+ " " + boundingBox.y.toString() + " " + boundingBox.width.toString() + " " + boundingBox.height.toString())
    }
    
    removeTemporaryElements() {
        for (let i of [...Array(this.temporaryElements.length).keys()]) {
            this.temporaryElements[i].remove()
        }
        this.temporaryElements = []
    }

    makeBoundingBox( {xSize, ySize, fill="transparent", strokeColor="transparent"} ) {
        this.svgElement.setAttribute("width", xSize)
        this.svgElement.setAttribute("height", ySize)
        this.makePolygon({
            points: [[0, 0], [xSize, 0], [xSize, ySize], [0, ySize]],
            fill: fill,
            strokeColor: strokeColor,
            isTemp: false
        })
    }

    
    makeCircle({r, pos = [0, 0], isTemp=true, fill="white", strokeColor = "black"}) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("stroke", "black")
        circle.setAttribute("stroke-width", this.strokeWidth)
        circle.setAttribute("fill", fill)
        circle.setAttribute("cy", pos[0].toString())
        circle.setAttribute("cx", pos[1].toString())
        circle.setAttribute("r", r.toString())
        this.addToSVGContainer({fig: circle, isTemp: isTemp})
        return circle
    }
    
    makeLine({A, B, isTemp=true, strokeColor = "black"}) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("stroke", "black")
        line.setAttribute("stroke-width", this.strokeWidth)
        line.setAttribute("x1", A[0].toString())
        line.setAttribute("y1", (-A[1]).toString())
        line.setAttribute("x2", B[0].toString())
        line.setAttribute("y2", (-B[1]).toString())
        this.addToSVGContainer({fig:line, isTemp: isTemp})
        return line
    }

    makePolygon({points, isTemp=true, fill="white", strokeColor = "black", addToSvg=true}) {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        let firstPoint = points.shift()
        let pointsString = firstPoint[0].toString() + " " + firstPoint[1].toString()
        for ( let point of points ) {
            pointsString += " " + point[0].toString() + " " + point[1].toString() 
        }
        polygon.setAttribute("points", pointsString)
        polygon.setAttribute("fill", fill)
        polygon.setAttribute("stroke", strokeColor)  
        if (addToSvg) {
            this.addToSVGContainer({fig: polygon, isTemp: isTemp})
        }
        return polygon      
    }
    


    makeOnes({amount, isTemp=true, size=15, ySpace=5, fill="blue", strokeColor = "black", addToSvg=true}) {
        if (amount == 0 || amount == null) {
            return null;
        }
        let one = this.makePolygon({points: [[0,0], [size, 0], [size, size], [0, size]], isTemp: isTemp, fill: fill, strokeColor: strokeColor, addToSvg: false})
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
            this.addToSVGContainer({fig: onesCollection, isTemp: isTemp})
        }
        
        return onesCollection
        
    }

    makeTens({amount, isTemp=true, xSize=15, xSpace=5, fill="red", strokeColor="black", addToSvg=true, id=null}) {
        if (amount == 0 || amount == null) {
            return null;
        }
        let ten = this.makeOnes({
            amount: 10, 
            isTemp:isTemp, 
            size: xSize, 
            ySpace: 0, 
            fill: fill, 
            addToSvg: false})
        let tensCollection = document.createElementNS("http://www.w3.org/2000/svg", "g")
        tensCollection.appendChild(ten)
        let dx = 0
        for (let i of Array(amount - 1).keys()) {
            ten = ten.cloneNode(true)
            dx = (i+1)*(xSize + xSpace)
            ten.setAttribute("transform", `translate(${dx} 0)`)
            tensCollection.appendChild(ten)   
        }
        if (addToSvg) {
            this.addToSVGContainer({fig: tensCollection, isTemp: isTemp})
        }

        return tensCollection
    }

    getCirclePoint({ r=1, angle=0 } ) {
        return [r*Math.cos(angle), -r*Math.sin(angle)]
    }

    makeCircleArc({r=50, angle0=0, angle1, origo=[0, 0], fill="white", density=100, stroke="black"} = {}) {
        let arc = document.createElementNS("http://www.w3.org/2000/svg", "path")
        let p = this.getCirclePoint({r: r, angle: angle0})
        let pathD = `M ${p[0]} ${p[1]}`

        let da = angle1-angle0
        let n = [...Array(Math.floor(density*da/(2*Math.PI))).keys()]
        n.shift()
        da = da/n.length
        
        for (let i of n) {
            angle0 += da 
            p = this.getCirclePoint({r: r, angle: angle0})
            pathD += ` L ${p[0]} ${p[1]}` 
        }
        
        arc.setAttribute("d", pathD)
        arc.setAttribute("fill", fill)
        arc.setAttribute("stroke", stroke)
       
        this.addToSVGContainer({fig:arc})
        arc.setAttribute("transform", `translate(${origo[0]} ${origo[1]})`)
        return arc
    }

    makeCircleSegment({r=50, angle0=0, angle1, origo=[0, 0], density=100, fill= "white"} = {}) {
        let segment = this.makeCircleArc({r:50, angle0: angle0, angle1: angle1, density:density, fill: fill})
        let pathD = segment.getAttribute("d") + " L 0 0 Z"
        // making the arc a segment
        segment.setAttribute("d", pathD)
        segment.setAttribute("transform", `translate(${origo[0]} ${origo[1]})`)
        return segment 
    }

    makeEquals({number, pos= [0, 0], height="50", width="100"} = {}) {
        let equals = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
        equals.innerHTML = `<math> <mo>=</mo> <mn> ${number} </mn> </math>`
        this.svgElement.appendChild(equals)
        this.move(equals, pos[0], pos[1])
        equals.setAttribute("height", height)
        equals.setAttribute("width", width)
    }  

    move(shape, x=0, y=0) {
        shape.setAttribute("transform", `translate(${x}, ${y})`)
    }
}

   