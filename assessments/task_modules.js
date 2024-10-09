

class Task {

    taskArguments = []
    fig
    info

    constructor(id, makeTask, tasksAmount) {
        this.id = id
        this.makeTask = makeTask
        this.tasksAmount = tasksAmount
        this.circles = []
        this.answer
        this.body = document.getElementsByTagName("body")[0]
        this.body.style.maxWidth = "1080px"
        this.body.margin = "auto"
        //document.getElementsByTagName("html")[0].appendChild(this.body)
        this.menuContainer = document.createElement("div")
        this.submitButton = document.createElement("input")
        this.restartButton = document.createElement("button")
        this.showAnswer = document.createElement("p")
        this.showAnswer.hidden = true
    }

    checkAnswer() {
        this.submitButton.disabled = "true"
        this.evaluateAnswer()
    }

    inputIsValid(inputElement) {
        inputElement.readOnly = true
        let userAnswer = inputElement.value
        userAnswer = userAnswer.replaceAll(" ", "")
        if (userAnswer === "") {
            return false;
        }

        userAnswer = userAnswer.replaceAll(",", ".")
        let characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
        for (let char of userAnswer) {
            if (!(char in characters)) {
                return false;
            }
        }

        return true;
    }
    
    correctAnswer() {
        if (this.circles.length > 0) {
            this.circles.pop().setAttribute("fill", "green")
        
        if (this.circles.length != 0) {
            setTimeout(() => {
                if (this.fig) {
                    this.fig.removeTemporaryElements()
                }
                this.answer = this.makeTask()
                this.submitButton.disabled = false
                
                this.resetInputFields()
            }, 1000);
            }
        else {
            return
            let tests = localStorage.getItem("tests")
            if (!tests) {
                tests = {}
            }
              
            tests[this.id] = { "score": 2 }
            console.log(tests)
            let testsString = JSON.stringify( { "tests": tests } )
            this.updateRecord(testsString)
        }
        }
    }
    
    evaluateAnswer() {}

    resetInputFields(){}

    async updateRecord(testsString) {
        import("../assessment_modules.js").then ( (supabase) => {
            supabase.signIn()
            setTimeout(() => {
                supabase.updateTestRecord(testsString)    
            }, 500);
            
        }
        )
    }
    
    wrongAnswer() {
        this.addAnswerContent()
        this.showAnswer.hidden = false
        this.restartButton.hidden = false
    }
    
    
    makeStatusBar() {
        const statusBar = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        statusBar.setAttribute("width", "100%")
        statusBar.setAttribute("height", "35")
        this.menuContainer.appendChild(statusBar)
        let r = 10
        let space = 20
        let strk_width = 2
    
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("stroke", "black")
        circle.setAttribute("stroke-width", strk_width.toString())
        circle.setAttribute("fill", "white")
        circle.setAttribute("cy", (r + strk_width).toString())
        circle.setAttribute("r", r.toString())
        
        for (let k of Array(this.tasksAmount).keys()) {
            let newCircle = circle.cloneNode(false)
            let cx = r*(k+1) + k*space + strk_width
            newCircle.setAttribute("cx", cx.toString())
            statusBar.appendChild(newCircle)
            this.circles.unshift(newCircle)
        }
    
    }        
}


class CalcTask extends Task {
    constructor(id, makeTask, tasksAmount) {
        super(id, makeTask, tasksAmount)
        this.userInput = document.createElement("input")
    }
    
    prepare({figure=null, mathElement=null} = {}) {
        const containerDiv = document.createElement("div")
        
        const containerTable = document.createElement("table")
        const tableRow = document.createElement("tr")
        const leftColumn = document.createElement("td")
        const rightColumn = document.createElement("td")
        if (mathElement) {
            const _math = document.createElement("math")
            leftColumn.appendChild(_math)
        }
        if (figure) {
            const figDiv = document.createElement("div")
            figDiv.appendChild(figure)
            figDiv.id = "fig"
            leftColumn.appendChild(figDiv)
        }
        
        this.body.style.fontSize = "32px"
        this.userInput.style.fontSize = this.body.style.fontSize
        this.userInput.setAttribute("size", "5")
        this.userInput.setAttribute("maxlength", "9")
        this.submitButton.style.fontSize = this.body.style.fontSize
        this.submitButton.value = "Enter"
        this.restartButton.style.fontSize = this.body.style.fontSize
        
        this.userInput.style.display = "inline"
        
        this.submitButton.setAttribute("type", "submit")
        this.restartButton.innerHTML= "Omstart"
        this.makeStatusBar(containerDiv)
        
        rightColumn.appendChild(this.userInput)
        rightColumn.appendChild(this.submitButton)
        rightColumn.appendChild(this.restartButton)
        rightColumn.append(this.showAnswer)

        tableRow.appendChild(leftColumn)
        tableRow.appendChild(rightColumn)
        containerTable.appendChild(tableRow)
        containerDiv.appendChild(containerTable)
        
        this.body.appendChild(containerDiv)
        
        this.restartButton.hidden = true
        
        this.userInput.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer()
            }
        })
        
        this.submitButton.addEventListener("click", () => { this.validate() })
        this.restartButton.addEventListener("click", () => { location.reload() })
        this.answer = this.makeTask(...this.taskArguments)
    }
}


class FracCalcTask extends Task {
    constructor(id, makeTask, tasksAmount) {
        super(id, makeTask, tasksAmount)
        this.fracInput = document.createElement("div")
        this.numeratorInput = document.createElement("input")
        this.denominatorInput = document.createElement("input")
    }

    prepare( { figure=null, mathElement=null, info=null } = {} ) {
        
        const containerDiv = document.createElement("div")
        
        const containerTable = document.createElement("table")
        const tableRow = document.createElement("tr")
        const taskColumn = document.createElement("td")
        const answerColumn = document.createElement("td")
        const submitColumn = document.createElement("td")
        const inputTable = document.createElement("table")
        const inputTableRow = document.createElement("tr")
        const equlsColumn = document.createElement("td")
        const fracColumn = document.createElement("td")

        this.body.appendChild(this.menuContainer)

        if (mathElement) {
            const _math = document.createElement("math")
            taskColumn.appendChild(_math)
        }
        if (figure) {
            this.fig = figure
            const figDiv = document.createElement("div")
            figDiv.appendChild(this.fig.svgElement)
            figDiv.id = "fig"
            taskColumn.appendChild(figDiv)
        }
        if (info) {
            const infoDiv = document.createElement("div")
            infoDiv.appendChild(info)
            infoDiv.style.borderTop = "2px solid black"
            infoDiv.style.borderBottom = "2px solid black"
            this.body.appendChild(infoDiv)
            infoDiv.style.margin = "auto"
        }
        
        this.body.style.fontSize = "32px"
        this.submitButton.style.fontSize = this.body.style.fontSize
        this.submitButton.value = "Enter"
        this.restartButton.style.fontSize = this.body.style.fontSize
        
        this.submitButton.setAttribute("type", "submit")
        this.restartButton.innerHTML= "Omstart"
        this.makeStatusBar(containerDiv)
        
        equlsColumn.style.fontSize = this.body.style.fontSize
        equlsColumn.innerHTML = "="
        inputTableRow.appendChild(equlsColumn)

        
        this.fracInput.style.display = "grid"
        this.fracInput.style.gridTemplateColumns = "90px"
        this.fracInput.style.backgroundColor = "black"
        this.fracInput.style.rowGap = "5px"
        fracColumn.appendChild(this.fracInput)
        inputTableRow.appendChild(fracColumn)

        inputTable.appendChild(inputTableRow)

        this.numeratorInput.style.textAlign = "center"
        this.numeratorInput.style.fontSize = this.body.style.fontSize
        this.numeratorInput.setAttribute("size", "3")
        this.numeratorInput.setAttribute("maxlength", "3")
        this.denominatorInput.style.fontSize = this.body.style.fontSize
        this.denominatorInput.setAttribute("size", "3")
        this.denominatorInput.setAttribute("maxlength", "3")
        this.denominatorInput.style.textAlign = "center"
        this.denominatorInput.style.fontSize = this.body.style.fontSize
        
        this.fracInput.appendChild(this.numeratorInput)
        this.fracInput.appendChild(this.denominatorInput)
        

        answerColumn.appendChild(inputTable)

        submitColumn.appendChild(this.submitButton)
        submitColumn.appendChild(this.restartButton)
        

        tableRow.appendChild(taskColumn)
        tableRow.appendChild(answerColumn)
        tableRow.appendChild(submitColumn)
        containerTable.appendChild(tableRow)
        containerDiv.appendChild(containerTable)
        
        this.body.appendChild(containerDiv)
        this.body.appendChild(this.showAnswer)
        
        this.restartButton.hidden = true
        
        this.submitButton.addEventListener("click", () => { this.checkAnswer() })
        this.restartButton.addEventListener("click", () => { location.reload() })
        this.answer = this.makeTask(...this.taskArguments)

        this.numeratorInput.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer()
            }
        })

        this.denominatorInput.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer()
            }
        })
    }

    evaluateAnswer() {
        console.log("d")
        if (!(this.inputIsValid(this.numeratorInput) && this.inputIsValid(this.denominatorInput))) {
            this.wrongAnswer()        
        }
        let userNumerator = parseInt(this.numeratorInput.value)
        let userDenominator = parseInt(this.denominatorInput.value)
        if (userNumerator === this.answer[0] && userDenominator === this.answer[1]) {
            this.correctAnswer()
        } else {
            this.wrongAnswer()
        }
    }

    resetInputFields() {
        this.numeratorInput.value = ""
        this.numeratorInput.readOnly = false
        this.denominatorInput.value = ""
        this.denominatorInput.readOnly = false
    }

    addAnswerContent() {
        this.showAnswer.innerHTML = `Svar: <math><mfrac><mn>${this.answer[0]}</mn><mn>${this.answer[1]}</mn></mfrac></math>`
    }
}

export { FracCalcTask }