

export default class calcTask {

    taskArguments = []

    constructor(id, makeTask, tasksAmount) {
        this.id = id
        this.makeTask = makeTask
        this.tasksAmount = tasksAmount
        this.circles = []
        this.answer
        this.body = document.createElement("body")
        document.getElementsByTagName("html")[0].appendChild(this.body)
        this.userInput = document.createElement("input")
        this.submitButton = document.createElement("input")
        this.restartButton = document.createElement("button")
        this.showAnswer = document.createElement("p")
        this.showAnswer.hidden = true
    }

    prepare(figure=null, mathElement=null) {
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
                this.validate()
            }
        })
        
        this.submitButton.addEventListener("click", () => { this.validate() })
        this.restartButton.addEventListener("click", () => { location.reload() })
        this.answer = this.makeTask(...this.taskArguments)
    }
    
    validate() {
        let characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "."]
        this.userInput.readOnly = true
        this.submitButton.disabled = true
        let userAnswer = this.userInput.value
        if (userAnswer === "") {
            this.wrongAnswer()
            return
        }
        for (let char of userAnswer) {
            if (!(char in characters)) {
                this.wrongAnswer()
                return
            }
        }
        if (Number(userAnswer) == this.answer) {
            this.correctAnswer()
        } else {
            this.wrongAnswer()
        }    
    }
    
    correctAnswer() {
        if (this.circles.length > 0) {
            this.circles.pop().setAttribute("fill", "green")
        
        if (this.circles.length != 0) {
            setTimeout(() => {
                this.answer = this.makeTask()
                this.userInput.value = ""  
                this.submitButton.disabled = false
                this.userInput.readOnly = false      
            }, 1000);
            }
        else {
            console.log("yep!")
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
        this.showAnswer.innerHTML = `Svar: ${this.answer}`
        this.showAnswer.hidden = false
        this.restartButton.hidden = false
    }
    
    
    makeStatusBar(div) {
        const _statusBar = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        _statusBar.setAttribute("width", "100%")
        _statusBar.setAttribute("height", "35")
        div.appendChild(_statusBar)
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
            let _circle = circle.cloneNode(false)
            let cx = r*(k+1) + k*space + strk_width
            _circle.setAttribute("cx", cx.toString())
            _statusBar.appendChild(_circle)
            this.circles.unshift(_circle)
        }
    
    }        
}

