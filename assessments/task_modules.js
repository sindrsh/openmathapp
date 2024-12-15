

class Task {

    taskArguments = []
    fig
    info
    unit = ""
    interval
    timer
    hideInfoHeight
    showInfoHeight

    constructor(makeTask, tasksAmount) {
        this.id = window.location.href.split("/")[window.location.href.split("/").length-1].replace(".html", "")
        this.makeTask = makeTask
        this.tasksAmount = tasksAmount
        this.circles = []
        this.answer

        this.infoIsClicked = false
        this.body = document.getElementsByTagName("body")[0]
        this.body.style.fontSize = "32px"
        this.taskContainer = document.createElement("div")
        this.menuContainer = document.createElement("div")
        this.submitButton = document.createElement("input")
        this.restartButton = document.createElement("button")
        this.showAnswer = document.createElement("p")
        this.showAnswer.hidden = true
        this.containerDiv = document.createElement("div")
        this.containerDiv.style.maxWidth = "1080px"
        this.containerDiv.style.margin = "auto"
        this.containerDiv.style.padding = "20px"
        this.containerDiv.appendChild(this.menuContainer)
        this.infoDiv = document.createElement("div")
        this.containerDiv.appendChild(this.infoDiv)
    }

    prepare({figure=null, mathElement=null, stack=false} = {}) {
        
        
        const containerTable = document.createElement("table")
        const tableRow = document.createElement("tr")
        const taskColumn = document.createElement("td")
        const answerColumn = document.createElement("td")
        const submitColumn = document.createElement("td")
        const equalsColumn = document.createElement("td")
        

        

        if (mathElement) {
            taskColumn.appendChild(mathElement)
        }
        if (figure) {
            this.fig = figure
            const figDiv = document.createElement("div")
            figDiv.appendChild(this.fig.svgElement)
            figDiv.id = "fig"
            taskColumn.appendChild(figDiv)
        }
        
        this.submitButton.style.fontSize = this.body.style.fontSize
        this.submitButton.value = "Enter"
        this.restartButton.style.fontSize = this.body.style.fontSize
        
        this.submitButton.setAttribute("type", "submit")
        this.restartButton.innerHTML= "Omstart"
        this.makeStatusBar()
        
        equalsColumn.style.fontSize = this.body.style.fontSize
        equalsColumn.innerHTML = "="
        

        submitColumn.appendChild(this.submitButton)
        submitColumn.appendChild(this.restartButton)
        
        tableRow.appendChild(taskColumn)
        if (!stack) {
            tableRow.appendChild(equalsColumn)
            tableRow.appendChild(answerColumn)
            tableRow.appendChild(submitColumn)
            containerTable.appendChild(tableRow)
     
        } else {
            const tableRow2 = document.createElement("tr")
            const tableRow3 = document.createElement("tr")
            const tableRow4 = document.createElement("tr")
            containerTable.style.textAlign = "center"
            containerTable.appendChild(tableRow)
            containerTable.appendChild(tableRow2)
            containerTable.appendChild(tableRow3)
            containerTable.appendChild(tableRow4)
            tableRow2.appendChild(equalsColumn)
            tableRow3.appendChild(answerColumn)
            tableRow4.appendChild(submitColumn)
        }
        
        this.taskContainer.appendChild(containerTable)
        
        this.containerDiv.appendChild(this.taskContainer)
        this.containerDiv.appendChild(this.showAnswer)
        this.body.appendChild(this.containerDiv)
        
        this.restartButton.hidden = true
        
        this.submitButton.addEventListener("click", () => { this.checkAnswer() })
        
        this.prepareSpecifics(answerColumn)
        
        this.restartButton.addEventListener("click", () => { location.reload() })
        this.answer = this.makeTask(...this.taskArguments)
    }

    makeInfo(info) {
        const infoContainer = document.createElement("div")
        const infoButton = document.createElement("button")
        infoButton.style.display = "block"
        infoButton.style.width = "100%"
        infoButton.style.height = "30px"
        infoButton.innerHTML = "INFO"
        this.infoDiv.appendChild(infoButton)
        this.hideInfoHeight = this.infoDiv.offsetHeight.toString() + "px"
        
        this.infoDiv.style.borderTop = "2px solid black"
        this.infoDiv.style.borderBottom = "2px solid black"
        this.infoDiv.style.marginTop = "0px"
        infoContainer.style.paddingTop = "10px"
        infoContainer.appendChild(info)
        this.infoDiv.appendChild(infoContainer)
        this.infoDiv.style.overflow = "hidden"
        this.showInfoHeight = (this.infoDiv.offsetHeight).toString()+"px"
        this.infoDiv.style.margin = "auto"
        this.infoDiv.style.height = this.hideInfoHeight
        
        infoButton.addEventListener("click", (e) => 
            {
                if (this.infoIsShown) {
                    this.infoDiv.style.height = this.hideInfoHeight
                    this.infoIsShown = false
                } else {
                    this.infoDiv.style.height = this.showInfoHeight
                    this.infoIsShown = true
                }
                
            }
        )
    }

    checkAnswer() {
        this.submitButton.disabled = "true"
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.evaluateAnswer()
    }

    inputIsValid(inputElement) {
        let userAnswer = inputElement.value
        if (userAnswer === undefined) {
            return false
        }
        userAnswer = userAnswer.replaceAll(" ", "")
        if (userAnswer === "") {
            return false;
        }

        userAnswer = userAnswer.replaceAll(",", ".")
        let characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"]
        for (let char of userAnswer) {
            if (!characters.includes(char)) {
                return false
            }
        }

        return userAnswer;
    }
    
    makeMathElement() {
        return document.createElementNS("http://www.w3.org/1998/Math/MathML", "math") 
    }

    makeTimer(interval) {
        this.interval = interval
        this.timer = setTimeout(() => {
           this.submitButton.click() 
        }, interval);
    }

    async correctAnswer() {
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
            let testsFromLocalStorage = localStorage.getItem("tests")
            let tests = {}
            if (testsFromLocalStorage) {
                try {
                    JSON.parse(testsFromLocalStorage)
                    tests = JSON.parse(testsFromLocalStorage)
                } catch(error) {
                    localStorage.setItem("tests", "{}")
                }
            }
            console.log(localStorage.getItem("tests"))
            tests[this.id] = { "score": 2 }
            localStorage.setItem("tests", JSON.stringify(tests))
            alert("Flott! Fortsett på neste nivå.")
            setTimeout(() => {
                window.location.href = "../../index.html"
            }, 1000);
        }
        }
    }

    async getTaskMain() {
        try {
            const response = await fetch("../../task_index.json");
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
    
            const subjects = await response.json();
            return subjects
        } catch (error) {
            console.error(error.message);
        }
    }
    
    prepareSpecifics() {}

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
    constructor(makeTask, tasksAmount) {
        super(makeTask, tasksAmount)
        this.userInput = document.createElement("input")
        this.userInput.size = "9"
        this.userInput.maxLength = "9"
    }
    
    prepareSpecifics(answerColumn) {
        this.userInput.style.fontSize = this.body.style.fontSize
        answerColumn.appendChild(this.userInput)
        this.userInput.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer()
            }
        })
    }

    evaluateAnswer() {
        this.userInput.disabled = "true"
        let userAnswer = this.inputIsValid(this.userInput)
        if (userAnswer) {
            if (this.answer == parseFloat(userAnswer)) {
                this.correctAnswer()
            } else {
                this.wrongAnswer()
            }    
        } else {
            this.wrongAnswer()
        }    
    }

    resetInputFields() {
        this.userInput.disabled = false
        this.userInput.value = ""
        this.userInput.focus()
    }

    addAnswerContent() {
        this.showAnswer.innerHTML = `Svar: ${this.answer}${this.unit}`
    }
}


class FracCalcTask extends Task {
    constructor(makeTask, tasksAmount) {
        super(makeTask, tasksAmount)
        this.fracInput = document.createElement("div")
        this.numeratorInput = document.createElement("input")
        this.denominatorInput = document.createElement("input")
    }

    prepareSpecifics(answerColumn) {
        const fracColumn = document.createElement("td")

        const inputTable = document.createElement("table")
        const inputTableRow = document.createElement("tr")

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
        this.fracInput.style.display = "grid"
        this.fracInput.style.gridTemplateColumns = "90px"
        this.fracInput.style.backgroundColor = "black"
        this.fracInput.style.rowGap = "5px"
        fracColumn.appendChild(this.fracInput)
        inputTableRow.appendChild(fracColumn)
        
        inputTable.appendChild(inputTableRow)
        answerColumn.appendChild(inputTable)
        
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

export { CalcTask, FracCalcTask }