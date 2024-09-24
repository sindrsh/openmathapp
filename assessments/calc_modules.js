const _body = document.getElementsByTagName("body")[0]
const _div = document.createElement("div")
const _statusBar = document.createElementNS("http://www.w3.org/2000/svg", "svg")
const _math = document.createElement("math")
const _userInput = document.createElement("input")
const _submitButton = document.createElement("input")
const _restartButton = document.createElement("button")

_body.style.fontSize = "32px"
_statusBar.setAttribute("width", "100%")
_statusBar.setAttribute("height", "35")
_userInput.style.fontSize = _body.style.fontSize
_userInput.setAttribute("size", "5")
_userInput.setAttribute("maxlength", "9")
_submitButton.style.fontSize = _body.style.fontSize
_submitButton.value = "Enter"
_restartButton.style.fontSize = _body.style.fontSize


_submitButton.setAttribute("type", "submit")
_restartButton.innerHTML= "Omstart"

_div.appendChild(_statusBar)
_div.appendChild(_math)
_div.appendChild(_userInput)
_div.appendChild(_submitButton)
_div.appendChild(_restartButton)
_body.appendChild(_div)

_restartButton.hidden = true

_userInput.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        validate()
    }
})

_submitButton.addEventListener("click", validate)
_restartButton.addEventListener("click", () => { location.reload() })

function validate() {
    let characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "."]
    _userInput.readOnly = true
    _submitButton.disabled = true
    let userAnswer = _userInput.value
    for (char of userAnswer) {
        if (!(char in characters)) {
            wrongAnswer()
            return
        }
    }
    if (Number(userAnswer) == answer) {
        correctAnswer()
    } else {
        wrongAnswer()
    }    
}

function correctAnswer() {
    if (circles.length > 0) {
        circles.pop().setAttribute("fill", "green")
    
    if (circles.length != 0) {
        setTimeout(() => {
            make_task()
            _userInput.value = ""  
            _submitButton.disabled = false
            _userInput.readOnly = false      
        }, 1000);
        }
    else {
        console.log(localStorage.getItem("tests"))
        if (localStorage.getItem("tests")) {
            console.log(localStorage)
        }
        //location.replace("../../topics.html")
    }
    }
}

function wrongAnswer() {
    let showAnswer = document.createElement("p")
    showAnswer.innerHTML = `<p> Svar: ${answer} </p>`
    _body.appendChild(showAnswer)
    _restartButton.hidden = false
}

let circles = []
function make_status_bar(n) {
    let r = 10
    let space = 20
    let strk_width = 2

    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("stroke", "black")
    circle.setAttribute("stroke-width", strk_width.toString())
    circle.setAttribute("fill", "white")
    circle.setAttribute("cy", (r + strk_width).toString())
    circle.setAttribute("r", r.toString())
    
    for (k of Array(n).keys()) {
        let _circle = circle.cloneNode(false)
        let cx = r*(k+1) + k*space + strk_width
        _circle.setAttribute("cx", cx.toString())
        _statusBar.appendChild(_circle)
        circles.unshift(_circle)
    }

}
