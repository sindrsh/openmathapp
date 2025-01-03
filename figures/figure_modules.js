
class BookFigure {
    svgElement
    svgContainer
    body
    strokeWidth = 2
    oneSize
    xScale
    yScale
    useViewBox
    xMin = 0
    yMin = 0
    xMax = 0
    yMax = 0
    width = 0
    height = 0


    posColor = "blue"
    negColor = "cyan"
    subColor = "red"
    tenthColor = "cyan"
    tenthStrokeColor = "Cyan"
    oneColor = "#87CEFA"
    oneStrokeColor = "blue"
    tenColor = "#98FB98"
    tenStrokeColor = "#006400"

    constructor(id, oneSize, useViewBox=true, appendToBody=true) {
        this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")
        this.svgElement.appendChild(this.svgContainer)
        if (appendToBody) {
            this.body = document.getElementsByTagName("body")[0]
            this.body.appendChild(this.svgElement)
            
        }

        this.useViewBox = useViewBox
        if (this.useViewBox) {
            this.adjust()
        }

        if (id) {
            this.svgElement.id = id
        }
        this.oneSize = oneSize
        this.xScale = this.oneSize
        this.yScale = this.oneSize
    }

    addToSVGContainer(fig) {
        this.svgContainer.appendChild(fig)
        if (this.useViewBox) {
            
            let boundingBox = this.svgContainer.getBBox()
            this.updateBoundingBox(boundingBox.x, boundingBox.y, boundingBox.x + boundingBox.width, boundingBox.y + boundingBox.height)
        }
    }
    
    adjust() {
        this.svgContainer.setAttribute("transform", `translate(${-this.xMin + this.strokeWidth} ${-this.yMin + this.strokeWidth})`)
    }

    updateBoundingBox(shapeXmin, shapeYmin, shapeXmax, shapeYmax) {
        
        if (shapeXmin < this.xMin) {
            this.xMin = shapeXmin
        }
        if (shapeYmin < this.yMin) {
            this.yMin = shapeYmin
        }
        if (shapeXmax > this.xMax) {
            this.xMax = shapeXmax
        }
        if (shapeYmax > this.yMax) {
            this.yMax = shapeYmax
        }
        
        this.svgElement.setAttribute("height", (this.yMax - this.yMin + 5).toString())
        this.svgElement.setAttribute("width", (this.xMax - this.xMin + 5).toString())
        this.adjust()
    }

    makeBoundingBox(xSize, ySize, strokeColor="transparent", fill= "transparent") {
        this.useViewBox = false
        this.svgElement.setAttribute("width", xSize + this.strokeWidth)
        this.svgElement.setAttribute("height", ySize + this.strokeWidth)
        this.makePolygon([[0, 0], [xSize, 0], [xSize, ySize], [0, ySize]], {
            fill: fill,
            strokeColor: strokeColor,
        })
    }

    
    makeCircle(r, x=0, y=0, {oneLength=this.oneSize, fill="transparent", strokeColor = "black", strokeWidth= this.strokeWidth, addToSvg= true} = {}) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("stroke", strokeColor)
        circle.setAttribute("stroke-width", strokeWidth)
        circle.setAttribute("fill", fill)
        circle.setAttribute("cx", (x*oneLength).toString())
        circle.setAttribute("cy", (y*oneLength).toString())
        circle.setAttribute("r", (r*oneLength).toString())
        if (addToSvg) {
            this.addToSVGContainer(circle)
        }
        return circle
    }
    
    makeLine({A, B, strokeColor = "black", addToSvg=true, strokeWidth= this.strokeWidth} = {}) {
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

    makeRectangle(width, height, x=0, y=0, {fill="white", strokeColor="black", addToSvg=true, strokeWidth=this.strokeWidth, xScale= this.xScale, yScale=this.yScale} = {}) {
        let rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect")  
        rectangle.setAttribute("x", x*xScale)
        rectangle.setAttribute("y", y*yScale)
        rectangle.setAttribute("width", (xScale*width).toString())
        rectangle.setAttribute("height", (yScale*height).toString())
        rectangle.setAttribute("stroke", strokeColor)
        rectangle.setAttribute("stroke-width", strokeWidth)
        rectangle.setAttribute("fill", fill)
        
        if (addToSvg) {
            this.addToSVGContainer(rectangle)
        }
        return rectangle
    }

    makePolygon(points, {xScale=this.oneSize, yScale=this.oneSize, fill="white", strokeColor = "black", addToSvg=true, strokeWidth = this.strokeWidth} = {}) {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        let firstPoint = points.shift()
        let pointsString = (xScale*firstPoint[0]).toString() + " " + (yScale*firstPoint[1]).toString()
        for ( let point of points ) {
            pointsString += " " + point[0].toString() + " " + point[1].toString() 
        }
        polygon.setAttribute("points", pointsString)
        polygon.setAttribute("fill", fill)
        polygon.setAttribute("stroke-width", strokeWidth)
        polygon.setAttribute("stroke", strokeColor)  
        if (addToSvg) {
            this.addToSVGContainer(polygon)
        }
        return polygon      
    }
    
    makeTenths(amount, {x=0, y=0, ySpace=5, fill=this.tenthColor, strokeColor = this.tenthStrokeColor, addToSvg=true, strokeWidth=this.strokeWidth} = {}) {
        let tenthsCollection = document.createElementNS("http://www.w3.org/2000/svg", "g")
        for (let i of Array(amount).keys()) {
            let m = i % 5
            let n = Math.floor(i/5)
            let tenth = this.makeRectangle(1/5, 1/2, x + 1/5*m, y - (n-1)*0.5, {fill:this.oneColor, strokeColor:this.oneStrokeColor, addToSvg:false, strokeWidth:this.strokeWidth})
            tenthsCollection.appendChild(tenth)
        }

        if (addToSvg) {
            this.addToSVGContainer(tenthsCollection)
        }
        return tenthsCollection
    }


    makeOnes(amount, {x=0, y=0, ySpace=0.5, fill=this.oneColor, strokeColor = this.oneStrokeColor, addToSvg=true, strokeWidth=this.strokeWidth} ={}) {
        if (amount == 0 || amount == null) {
            return null;
        }
        let onesCollection = document.createElementNS("http://www.w3.org/2000/svg", "g")
        for (let i of Array(amount).keys()) {
            let one = this.makeRectangle(1, 1, x, y - i - ySpace*i, {fill: fill, strokeColor: strokeColor, strokeWidth: strokeWidth, addToSvg: false})
            onesCollection.appendChild(one)   
        }
        if (addToSvg) {
            this.addToSVGContainer(onesCollection)
        }
        
        return onesCollection
        
    }

    makeTens(amount, {x=0, y=0, xSize=this.oneSize, xSpace=0.5, fill=this.tenColor, strokeColor="black", addToSvg=true, direction=-1, strokeWidth=this.strokeWidth, unit=1} = {}) {
        if (amount == 0 || amount == null) {
            return null;
        }

        let tensCollection = document.createElementNS("http://www.w3.org/2000/svg", "g")
        
        for (let i of Array(amount).keys()) {
            let ten
            if (unit == 1) { 
                    ten = this.makeOnes(
                    10, {
                    x: x + i*(1 + xSpace)*direction,
                    y: y,
                    size: xSize, 
                    ySpace: 0, 
                    fill: fill, 
                    strokeColor: strokeColor,
                    strokeWidth: strokeWidth,
                    addToSvg: false})
            }
            
            if (unit == 10) {
                ten = this.makeRectangle(
                    xSize, 10*xSize, x + i*xSpace*direction, y, {
                    strokeColor: strokeColor,
                    strokeWidth: strokeWidth,
                    fill:fill, 
                    addToSvg: false
                })    
            }
            tensCollection.appendChild(ten)   
        }
        if (addToSvg) {
            this.addToSVGContainer(tensCollection)
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

    getCirclePoint(r=1, angle=0) {
        return [r*Math.cos(angle), -r*Math.sin(angle)]
    }

    makeCircleArc(r, x, y, angle0, angle1, {addToSvg=true, fill="transparent", density=100, strokeColor="black", strokeWidth=this.strokeWidth, flag=1} = {}) {
        let arc = document.createElementNS("http://www.w3.org/2000/svg", "path")
        let p0 = this.getCirclePoint(r, angle0)
        let p1 = this.getCirclePoint(r, angle1)
        let pathD = `M ${x + p0[0]} ${y + p0[1]} A ${r} ${r}, 0, 0, 0, ${x + p1[0]} ${y + p1[1]}`
        arc.setAttribute("d", pathD)
        arc.setAttribute("fill", fill)
        arc.setAttribute("stroke", strokeColor)
        arc.setAttribute("stroke-width", strokeWidth)
       
        if (addToSvg) {
            this.addToSVGContainer(arc)
        }
        return arc
    }

    makeCircleSegment(r, x, y, angle0, angle1, {fill= "white", strokeColor="black", strokeWidth= this.strokeWidth} = {}) {
        let segment = this.makeCircleArc(r, x, y, angle0, angle1, {fill: fill, strokeColor: strokeColor, strokeWidth: this.strokeWidth})
        let pathD = segment.getAttribute("d") + ` L ${x} ${y} Z`
        segment.setAttribute("d", pathD)
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
    
    makeVector(A, B, {arrow="triangle", xScale=this.xScale, yScale=this.yScale, arrowScale=1, x=0, y=0, strokeWidth=this.strokeWidth, addToSvg=true, isTemp=true, strokeColor="black", oneLength=this.oneSize} = {} ) {
        
        A = [(x + A[0])*xScale, (y + A[1])*yScale]
        B = [(x + B[0])*xScale, (y + B[1])*yScale]
        let lineContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")

        let arrowHead = null
        if (arrow === "triangle") {
            let triangleLength = arrowScale*4
            let triangleHeight = arrowScale*10
            arrowHead = this.makePolygon([[0, -triangleLength], [triangleHeight, 0], [0, triangleLength]], {fill: strokeColor, strokeColor: strokeColor, addToSvg: false, xScale: 1, yScale: 1})
            let direction = [B[0]-A[0], B[1]-A[1]]
            let directionLength = Math.sqrt(direction[0]**2 + direction[1]**2)
            direction = [triangleHeight*direction[0]/directionLength, triangleHeight*direction[1]/directionLength]  
            B = [B[0] - direction[0], B[1] - direction[1]]
        }

        if (arrow === "axisArrow") {
            arrowHead = document.createElementNS("http://www.w3.org/2000/svg", "path")
            let endPoint = [-arrowScale*7, arrowScale*7]
            let curvePoint = [-arrowScale*3.5, arrowScale*2]
            arrowHead.setAttribute("d", `M ${endPoint[0]} ${endPoint[1]} Q ${curvePoint[0]} ${curvePoint[1]} 0 0 Q ${curvePoint[0]} ${-curvePoint[1]} ${endPoint[0]} ${-endPoint[1]}`)
            arrowHead.setAttribute("stroke", strokeColor)
            arrowHead.setAttribute("fill", "transparent")
        }
        
        if (arrowHead) {
            let angle = this.getAngle(A, B)
            arrowHead.setAttribute("transform", `translate(${B[0]} ${B[1]}) rotate(${angle})`)
            lineContainer.appendChild(arrowHead)
        }

        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("stroke", strokeColor)
        line.setAttribute("stroke-width", strokeWidth)
        line.setAttribute("x1", A[0].toString())
        line.setAttribute("y1", (A[1]).toString())
        line.setAttribute("x2", B[0].toString())
        line.setAttribute("y2", (B[1]).toString())
        lineContainer.appendChild(line)
        if (addToSvg) {
            this.addToSVGContainer(lineContainer)
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

    makeText(label= "", x, y, {textColor="black", verticalAnchor="middle", horizontalAnchor="middle", addToSvg=true, xScale=this.xScale, yScale=this.yScale} = {}) {
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        x*= xScale
        y*= yScale
        text.setAttribute("x", x.toString())
        text.setAttribute("y", y.toString())
        text.style.dominantBaseline = verticalAnchor
        text.style.textAnchor = horizontalAnchor
        text.style.fill = textColor
        text.innerHTML = `${label}`

        if (this.useViewBox) {
            let textRect = document.createElement("span")
            textRect.innerHTML = `${label}`
            textRect.style.visibility = "hidden"
            let body = document.getElementsByTagName("body")[0]
            body.appendChild(textRect)
            let boundingRect = textRect.getBoundingClientRect()
            body.removeChild(textRect)

            let textX = x
            if (horizontalAnchor === "middle") {
                textX = x - boundingRect.width/2
            }
            if (horizontalAnchor === "end") {
                textX = x - boundingRect.width
            }
    
            let textY = y
            if (verticalAnchor === "middle") {
                textY = y - boundingRect.height/2
            }
        
            this.updateBoundingBox(textX, textY, textX + boundingRect.width, textY + boundingRect.height)
        }
        
        if (addToSvg) {
            this.svgContainer.appendChild(text)
        }
        return text
    }

    makeXTick(x, {fig=null, height= 5, label=null, addToSvg=false, strokeColor="black", strokeWidth=this.strokeWidth, xScale=this.xScale, yScale=this.yScale, visible=true, textColor=strokeColor, y=0}) {
        x = x*xScale
        y = y*yScale
        let tickContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")
        let tick = document.createElementNS("http://www.w3.org/2000/svg", "path")
        tick.setAttribute("d", `M ${x} ${y + - height} L ${x} ${y + height}`)
        tick.setAttribute("stroke", strokeColor)
        tick.setAttribute("stroke-linecap", "round")
        tick.setAttribute("stroke-width", strokeWidth)
        tickContainer.appendChild(tick)
        if (label) {
            let text = this.makeText(label, x, height + 10 + y, {yScale:1, xScale:1, textColor: textColor, verticalAnchor: "hanging"})
            tickContainer.appendChild(text)
        }
        if (!visible) {
            tickContainer.setAttribute("visibility", "hidden")
        }
        if (addToSvg) {
            this.addToSVGContainer(tickContainer)
        }
        if (fig) {
            fig.appendChild(tickContainer)
        }
        return tickContainer
    }

    makeYTick(y, {fig=null, height= 5, label=null, addToSvg=false, strokeColor="black", strokeWidth=this.strokeWidth, oneLength=this.oneSize, visible=true, textColor=strokeColor}) {
        
        y = y*oneLength
        let tickContainer = document.createElementNS("http://www.w3.org/2000/svg", "g")
        let tick = document.createElementNS("http://www.w3.org/2000/svg", "path")
        tick.setAttribute("d", `M ${- height} ${y} L ${height} ${y}`)
        tick.setAttribute("stroke", strokeColor)
        tick.setAttribute("stroke-linecap", "round")
        tick.setAttribute("stroke-width", strokeWidth)
        tickContainer.appendChild(tick)
        if (label) {
            let text = this.makeText(label, -height - 10  ,y, {yScale:1, xScale:1, textColor: textColor, horizontalAnchor: "end"})
            tickContainer.appendChild(text)
        }
        if (!visible) {
            tickContainer.setAttribute("visibility", "hidden")
        }
        if (addToSvg) {
            this.addToSVGContainer(tickContainer)
        }
        if (fig) {
            fig.appendChild(tickContainer)
        }
        return tickContainer
    }

    move(shape, x=0, y=0, rotateDegrees=0, rotatePoint=[0, 0]) {
        shape.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotateDegrees} ${rotatePoint[0]} ${rotatePoint[1]})`)
    }

    makePoint(x, y, label="", offset=[0, -1], offsetScale=15) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("r", 3)
        circle.setAttribute("cx", (x*this.xScale).toString())
        circle.setAttribute("cy", (y*this.yScale).toString())
        this.addToSVGContainer(circle)
        if (label != "") {
            this.makeText(label, x + offset[0]*offsetScale/this.xScale, y + offset[1]*offsetScale/this.yScale)
        }
    }

    makeGrid(x0, y0, x1, y1, {dx=1, dy=1, strokeColor="rgb(0, 0, 0, 0.05)"} = {}) {
        let xInterval = x1-x0
        let yInterval = y1-y0
        let xN = Math.floor(xInterval/dx)
        let yN = Math.floor(yInterval/dy)
        for(let i=0; i< xN; ++i) {
            for(let j=0; j< yN; ++j) {
                this.makeRectangle(dx, dy, i*dx, -(j+1)*dy, {fill: "transparent", strokeColor: strokeColor})
            }
        }
        
    }
}

class TaskFigure extends BookFigure {

    temporaryElements = []

    constructor(oneSize=1) {
        super(null, oneSize, true, false)
    }

    removeTemporaryElements() {
        for (let i of [...Array(this.temporaryElements.length).keys()]) {
            this.temporaryElements[i].remove()
        }
        this.temporaryElements = []
    }

  
}


export { TaskFigure, BookFigure }