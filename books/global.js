
var section = 0
var subsection = 0

class Example extends HTMLDivElement {
    
    constructor() {
        super()
    }

    connectedCallback() {
        const tempHTML = this.innerHTML
        this.innerHTML = ""
        const paragraph = document.createElement("p")
        paragraph.style.marginTop = "0px"
        const heading = document.createElement("b") 
        const heading_number = this.getAttribute("data-number")
        if (heading_number == null) {
            heading_number = ""
        }
        heading.appendChild(document.createTextNode("Eksempel " + heading_number))
        paragraph.appendChild(heading)
        this.appendChild(paragraph)
        this.insertAdjacentHTML("beforeend", tempHTML)
        this.style.padding = "5px"
        this.style.marginTop = "10px"
        this.style.marginTop = "10px"
        this.style.marginBottom = "10px"
        this.style.borderStyle = "solid"
        this.style.borderWidth = "2px"
        this.style.marginLeft = "auto"
        this.style.marginRight = "auto";
        this.style.backgroundColor = "rgb(51, 153, 102, 0.5)"
    }
}

customElements.define("custom-example", Example, { extends: "div"} )


class Rule extends HTMLDivElement {
    
    constructor() {
        super()
    }

    connectedCallback() {
        this.style.marginTop = "10px"
        this.style.marginTop = "10px"
        this.style.marginBottom = "10px"
        this.style.marginLeft = "auto"
        this.style.marginRight = "auto";
        this.style.backgroundColor = "rgb(255, 255, 0, 0.2)"
    }
}

customElements.define("custom-rule", Rule, { extends: "div"} )

class Theorem extends HTMLDivElement {
    
    constructor() {
        super()
    }

    connectedCallback() {
        const tempHTML = this.innerHTML
        this.innerHTML = ""
        const heading = document.createElement("b") 
        const heading_text = this.getAttribute("data-heading")
        heading.appendChild(document.createTextNode(heading_text))
        this.appendChild(heading)
        this.insertAdjacentHTML("beforeend", tempHTML)
        this.style.padding = "5px"
        this.style.marginTop = "10px"
        this.style.marginTop = "10px"
        this.style.marginBottom = "10px"
        this.style.borderStyle = "solid"
        this.style.borderWidth = "2px"
        this.style.marginLeft = "auto"
        this.style.marginRight = "auto";
        this.style.backgroundColor = "rgb(0, 0, 255, 0.5)"
    }
}

customElements.define("custom-theorem", Theorem, { extends: "div"} )