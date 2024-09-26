

export default class calcTask {

    constructor(id, makeTask, tasksAmount) {
        this.id = id
        this.makeTask = makeTask
        this.tasksAmount = tasksAmount
        this.circles = []
        this.answer
        this.body = document.getElementsByTagName("body")[0]
        this.userInput = document.createElement("input")
        this.submitButton = document.createElement("input")
        this.restartButton = document.createElement("button")
    }

    prepare() {
        const _div = document.createElement("div")
        const _math = document.createElement("math")
        
        this.body.style.fontSize = "32px"
        this.userInput.style.fontSize = this.body.style.fontSize
        this.userInput.setAttribute("size", "5")
        this.userInput.setAttribute("maxlength", "9")
        this.submitButton.style.fontSize = this.body.style.fontSize
        this.submitButton.value = "Enter"
        this.restartButton.style.fontSize = this.body.style.fontSize
        
        
        this.submitButton.setAttribute("type", "submit")
        this.restartButton.innerHTML= "Omstart"
        this.makeStatusBar(_div)
        _div.appendChild(_math)
        _div.appendChild(this.userInput)
        _div.appendChild(this.submitButton)
        _div.appendChild(this.restartButton)
        this.body.appendChild(_div)
        
        this.restartButton.hidden = true
        
        this.userInput.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this.validate()
            }
        })
        
        this.submitButton.addEventListener("click", () => { this.validate() })
        this.restartButton.addEventListener("click", () => { location.reload() })
        this.answer = this.makeTask()
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
            let tests = localStorage.getItem("tests") 
        }
        }
    }

    a() {
        import("../assessment_modules.js").then ( (value) =>
            console.log(value)
        )
        signIn()    
    }
    
    wrongAnswer() {
        let showAnswer = document.createElement("p")
        showAnswer.innerHTML = `<p> Svar: ${this.answer} </p>`
        this.body.appendChild(showAnswer)
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


