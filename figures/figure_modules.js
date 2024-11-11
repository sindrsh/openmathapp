class Figure {

    svgElement
    svgContainer
    strokeWidth = 2
    oneSize = 15
    temporaryElements = []
    useViewBox
    x = 0
    y = 0

    constructor({id = null, useViewBox=true} = {}) {
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")
        
        this.svgElement.appendChild(this.svgContainer)
        this.useViewBox = useViewBox
        if (this.useViewBox) {
            this.adjust()
        }

        if (id) {
            this.svgElement.id = id
        }
    }

    addToSVGContainer({fig=null, isTemp=true}) {
        this.svgContainer.appendChild(fig)
        if (this.useViewBox) {
            
            let boundingBox = this.svgElement.getBBox({"stroke": true})
            boundingBox.width -= boundingBox.x - this.strokeWidth
            boundingBox.height -= boundingBox.y - this.strokeWidth
            if (boundingBox.x < 0) {
                this.x -= boundingBox.x
            }
            if (boundingBox.y < 0) {
                this.y -= boundingBox.y
            }
            //this.svgElement.setAttribute("height", boundingBox.height.toString())
            //this.svgElement.setAttribute("width", boundingBox.width.toString())
        }
        if (isTemp) {
            this.temporaryElements.push(fig)
        }
        
    }
    
    adjust() {
        this.x += this.strokeWidth/2
        this.y += this.strokeWidth/2
        this.svgContainer.setAttribute("transform", `translate(${this.x} ${this.y})`)
    }

    removeTemporaryElements() {
        for (let i of [...Array(this.temporaryElements.length).keys()]) {
            this.temporaryElements[i].remove()
        }
        this.temporaryElements = []
    }

    makeBoundingBox( {xSize, ySize, strokeColor="transparent", fill= "transparent"} ) {
        this.useViewBox = false
        this.svgElement.setAttribute("width", xSize)
        this.svgElement.setAttribute("height", ySize)
        this.makePolygon({
            points: [[0, 0], [xSize, 0], [xSize, ySize], [0, ySize]],
            fill: fill,
            strokeColor: strokeColor,
            isTemp: false
        })
    }

    
    makeCircle({r, pos = [0, 0], isTemp=true, fill="white", strokeColor = "black", strokeWidth= this.strokeWidth, addToSvg= true}) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("stroke", "black")
        circle.setAttribute("stroke-width", strokeWidth)
        circle.setAttribute("fill", fill)
        circle.setAttribute("cx", pos[0].toString())
        circle.setAttribute("cy", pos[1].toString())
        circle.setAttribute("r", r.toString())
        if (addToSvg) {
            this.addToSVGContainer({fig: circle, isTemp: isTemp})
        }
        return circle
    }
    
    makeLine({A, B, isTemp=true, strokeColor = "black", addToSvg=true, strokeWidth= this.strokeWidth}) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("stroke", strokeColor)
        line.setAttribute("stroke-width", strokeWidth)
        line.setAttribute("x1", A[0].toString())
        line.setAttribute("y1", (A[1]).toString())
        line.setAttribute("x2", B[0].toString())
        line.setAttribute("y2", (B[1]).toString())
        if (addToSvg) {
            this.addToSVGContainer({fig:line, isTemp: isTemp})
        }
        return line
    }

    makeRectangle({x=0, y=0, width, height, fill="white", strokeColor="black", addToSvg=true, strokeWidth=this.strokeWidth, isTemp=true}) {
        let rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect")  
        rectangle.setAttribute("x", x.toString())
        rectangle.setAttribute("y", y.toString())
        rectangle.setAttribute("width", width.toString())
        rectangle.setAttribute("height", height.toString())
        rectangle.setAttribute("stroke", strokeColor)
        rectangle.setAttribute("stroke-width", strokeWidth)
        rectangle.setAttribute("fill", fill)
        
        if (addToSvg) {
            this.addToSVGContainer({fig: rectangle, isTemp: isTemp})
        }
        return rectangle
    }

    makePolygon({points, isTemp=true, fill="white", strokeColor = "black", addToSvg=true, strokeWidth = this.strokeWidth}) {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        let firstPoint = points.shift()
        let pointsString = firstPoint[0].toString() + " " + firstPoint[1].toString()
        for ( let point of points ) {
            pointsString += " " + point[0].toString() + " " + point[1].toString() 
        }
        polygon.setAttribute("points", pointsString)
        polygon.setAttribute("fill", fill)
        polygon.setAttribute("stroke-width", strokeWidth)
        polygon.setAttribute("stroke", strokeColor)  
        if (addToSvg) {
            this.addToSVGContainer({fig: polygon, isTemp: isTemp})
        }
        return polygon      
    }
    


    makeOnes({amount, isTemp=true, size=this.oneSize, ySpace=5, fill="blue", strokeColor = "black", addToSvg=true, strokeWidth=this.strokeWidth}) {
        if (amount == 0 || amount == null) {
            return null;
        }
        let one = this.makeRectangle({width: size, height: size, isTemp: isTemp, fill: fill, strokeColor: strokeColor, strokeWidth: strokeWidth, addToSvg: false})
        let onesCollection = document.createElementNS("http://www.w3.org/2000/svg", "g")
        onesCollection.appendChild(one)
        let dy = 0
        for (let i of Array(amount - 1).keys()) {
            one = one.cloneNode()
            dy = (i+1)*(size + ySpace)
            one.setAttribute("y", dy.toString())
            onesCollection.appendChild(one)   
        }
        if (addToSvg) {
            this.addToSVGContainer({fig: onesCollection, isTemp: isTemp})
        }
        
        return onesCollection
        
    }

    makeTens({amount, isTemp=true, xSize=this.oneSize, xSpace=5, fill="red", strokeColor="black", addToSvg=true, id=null, direction=-1, strokeWidth=this.strokeWidth, unit=1}) {
        if (amount == 0 || amount == null) {
            return null;
        }

        let ten
        if (unit == 1) { 
                ten = this.makeOnes({
                amount: 10, 
                size: xSize, 
                ySpace: 0, 
                fill: fill, 
                addToSvg: false})
        }
        
        if (unit == 10) {
            ten = this.makePolygon({
                points: [[0, 0], [xSize, 0], [xSize, 10*xSize], [0, 10*xSize]], 
                fill:fill, 
                addToSvg: false
            })    
        }
        let tensCollection = document.createElementNS("http://www.w3.org/2000/svg", "g")
        tensCollection.appendChild(ten)
        let dx = 0
        for (let i of Array(amount - 1).keys()) {
            ten = ten.cloneNode(true)
            dx = (i+1)*(xSize + xSpace)*direction
            ten.setAttribute("transform", `translate(${dx} 0)`)
            tensCollection.appendChild(ten)   
        }
        if (addToSvg) {
            this.addToSVGContainer({fig: tensCollection, isTemp: isTemp})
        }

        return tensCollection
    }

    makeHundreds({amount, isTemp=true, xSize=this.oneSize, space=10, fill="green", strokeColor="black", addToSvg=true, id=null, unit=100, strokeWidth=this.strokeWidth}) {
        
        let hundred
        if (amount == 0 || amount == null) {
            return null; 
        }
        if (unit == 1) {

        }
        if (unit == 100) {
            hundred = this.makePolygon({points: [[0, 0], [10*xSize, 0], [10*xSize, 10*xSize], [0, 10*xSize]], addToSvg: false, fill: fill, strokeWidth: strokeWidth, strokeColor: strokeColor})
        }
         
        let hundredsCollection = document.createElementNS("http://www.w3.org/2000/svg", "g")
        hundredsCollection.appendChild(hundred) 
        let dxdy = 0      
        for (let i of Array(amount - 1).keys()) {
            hundred = hundred.cloneNode(true)
            dxdy = (i+1)*space
            hundred.setAttribute("transform", `translate(${-dxdy} ${dxdy})`)
            hundredsCollection.appendChild(hundred)
        }

        if (addToSvg) {
            this.addToSVGContainer({fig: hundredsCollection, isTemp: isTemp})
        }

        return hundredsCollection
    }

    getCirclePoint({ r=1, angle=0 } ) {
        return [r*Math.cos(angle), -r*Math.sin(angle)]
    }

    makeCircleArc({r=50, angle0=0, angle1, pos=[0, 0], fill="white", density=100, strokeColor="black", strokeWidth=this.strokeWidth} = {}) {
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
        arc.setAttribute("stroke", strokeColor)
        arc.setAttribute("stroke-width", strokeWidth)
       
        this.addToSVGContainer({fig:arc})
        arc.setAttribute("transform", `translate(${pos[0]} ${pos[1]})`)
        return arc
    }

    makeCircleSegment({r=50, angle0=0, angle1, pos=[0, 0], density=100, fill= "white", strokeColor="black", strokeWidth= this.strokeWidth} = {}) {
        let segment = this.makeCircleArc({r:50, angle0: angle0, angle1: angle1, density:density, fill: fill, strokeColor: strokeColor, strokeWidth: this.strokeWidth})
        let pathD = segment.getAttribute("d") + " L 0 0 Z"
        // making the arc a segment
        segment.setAttribute("d", pathD)
        segment.setAttribute("transform", `translate(${pos[0]} ${pos[1]})`)
        return segment 
    }

    makeEquals({number, pos= [0, 0], height="0", width="0"} = {}) {
        let equals = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
        let math = document.createElementNS("http://www.w3.org/1998/Math/MathML", "math")
        math.innerHTML = `<mo>=</mo> <mn> ${number} </mn>`
        math.style.objectPosition = "left top"
        equals.appendChild(math)
        
        this.addToSVGContainer({fig: equals, isTemp: false})
        
        let heightFloat = parseFloat(window.getComputedStyle(math).getPropertyValue("font-size")) + 2
        if (width == "0") {
            width = window.getComputedStyle(math).getPropertyValue("width")
        }        
        if (height == "0") {
            height = heightFloat.toString()
        }

        equals.setAttribute("x", pos[0])
        equals.setAttribute("y", pos[1] - heightFloat/2)
        equals.setAttribute("width", width)
        equals.setAttribute("height", height)
    }

    makeMathText({mathContent, pos= [0, 0], height="0", width="0", dir="ltr"} = {}) {
        let container = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
        let math = document.createElementNS("http://www.w3.org/1998/Math/MathML", "math")
        math.innerHTML = `${mathContent}`
        math.style.objectPosition = "left top"
        math.setAttribute("dir", dir)
        container.appendChild(math)
        
        this.addToSVGContainer({fig: container, isTemp: false})
        
        let heightFloat = parseFloat(window.getComputedStyle(math).getPropertyValue("font-size")) + 2
        if (width == "0") {
            width = window.getComputedStyle(math).getPropertyValue("width")
        }        
        if (height == "0") {
            height = heightFloat.toString()
        }

        container.setAttribute("x", pos[0])
        container.setAttribute("y", pos[1] - heightFloat/2)
        container.setAttribute("width", width)
        container.setAttribute("height", height)
    }
    
    makeVector({ A=[0, 0], B, arrow="triangle", arrowScale=1, pos=[0, 0], addToSvg=true, isTemp=true, strokeColor="black", oneLength=this.oneSize} = {} ) {
        
        A = [A[0]*oneLength, A[1]*oneLength]
        B = [B[0]*oneLength, B[1]*oneLength]
        let lineContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")

        let arrowHead = null
        if (arrow === "triangle") {
            let triangleLength = arrowScale*6
            let triangleHeight = arrowScale*10
            arrowHead = this.makePolygon({points: [[0, -triangleLength], [triangleHeight, 0], [0, triangleLength]], fill: strokeColor, strokeColor: strokeColor, addToSvg: false})
            let direction = [B[0]-A[0], B[1]-A[1]]
            let directionLength = Math.sqrt(direction[0]**2 + direction[1]**2)
            direction = [triangleHeight*direction[0]/directionLength, triangleHeight*direction[1]/directionLength]  
            B = [B[0] - direction[0], B[1] - direction[1]]
        }

        if (arrow === "axisArrow") {
            arrowHead = document.createElementNS("http://www.w3.org/2000/svg", "path")
            let endPoint = [-arrowScale*10, arrowScale*10]
            let curvePoint = [-arrowScale*7, arrowScale*3]
            arrowHead.setAttribute("d", `M ${endPoint[0]} ${endPoint[1]} Q ${curvePoint[0]} ${curvePoint[1]} 0 0 Q ${curvePoint[0]} ${-curvePoint[1]} ${endPoint[0]} ${-endPoint[1]}`)
            arrowHead.setAttribute("stroke", strokeColor)
            arrowHead.setAttribute("fill", "transparent")
        }
        
        if (arrowHead) {
            let angle = this.getAngle(A, B)
            arrowHead.setAttribute("transform", `translate(${B[0]} ${B[1]}) rotate(${angle})`)
            lineContainer.appendChild(arrowHead)
        }

        let line = this.makeLine({A: A, B: B, addToSvg: false, isTemp: false})
        line.setAttribute("stroke", strokeColor)
        lineContainer.appendChild(line)

        if (addToSvg) {
            this.addToSVGContainer({fig:lineContainer, isTemp:isTemp})
        }
        return lineContainer    
    }

    getAngle(A, B) {
        let angle = Math.atan2(B[1]-A[1], B[0]-A[0])
        if (angle < 0) {
            angle += Math.PI*2
        }
        return angle*180/Math.PI
    }

    makeXTick({x, fig=null, height= 5, label=null, isTemp=false, addToSvg=false, strokeColor="black", strokeWidth=this.strokeWidth, oneLength=this.oneSize, visible=true}) {
        
        x = x*oneLength
        let tickContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")
        let tick = document.createElementNS("http://www.w3.org/2000/svg", "path")
        tick.setAttribute("d", `M ${x} ${- height} L ${x} ${height}`)
        tick.setAttribute("stroke", strokeColor)
        tick.setAttribute("stroke-linecap", "round")
        tick.setAttribute("stroke-width", strokeWidth)
        tickContainer.appendChild(tick)
        if (label) {
            let text = document.createElementNS("http://www.w3.org/2000/svg", "text")
            text.setAttribute("dominant-baseline", "hanging")
            text.setAttribute("x", x.toString())
            text.setAttribute("y", (height).toString())
            text.setAttribute("dy", "10")
            text.style.textAnchor = "middle"
            text.style.fill = strokeColor
            text.innerHTML = `${label}`
            tickContainer.appendChild(text)
        }
        if (!visible) {
            tickContainer.setAttribute("visibility", "hidden")
        }
        if (addToSvg) {
            this.addToSVGContainer( {fig: tickContainer, isTemp: isTemp} )
        }
        if (fig) {
            fig.appendChild(tickContainer)
        }
        return tickContainer
    }

    move(shape, x=0, y=0) {
        shape.setAttribute("transform", `translate(${x}, ${y})`)
    }
}

class BookFigure extends Figure {
    constructor() {
        super()
    }
}   

export { Figure, BookFigure }