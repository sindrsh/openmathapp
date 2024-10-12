
var sectionCounter = 0
var subsectionCounter = 0

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
        var heading_number = this.getAttribute("data-number")
        if (heading_number == null) {
            heading_number = ""
        }
        heading.appendChild(document.createTextNode("Eksempel " + heading_number))
        heading.appendChild(document.createElement("p"))
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


class Rule extends HTMLDivElement {
    
    constructor() {
        super()
    }

    connectedCallback() {
        const heading = document.createElement("b") 
        const heading_text = this.getAttribute("data-heading")
        heading.appendChild(document.createTextNode(heading_text))
        heading.appendChild(document.createElement("p"))
        this.insertAdjacentElement("afterbegin", heading)
        this.style.padding = "5px"
        this.style.marginTop = "10px"
        this.style.marginTop = "10px"
        this.style.marginBottom = "10px"
        this.style.borderStyle = "solid"
        this.style.borderWidth = "2px"
        this.style.marginLeft = "auto"
        this.style.marginRight = "auto";
        this.style.backgroundColor = "rgb(204, 224, 255)"
    }
}

class Info extends HTMLDivElement {
    
    constructor() {
        super()
    }

    connectedCallback() {
        const heading = document.createElement("b") 
        const heading_text = this.getAttribute("data-heading")
        heading.appendChild(document.createTextNode(heading_text))
        heading.appendChild(document.createElement("p"))
        this.insertAdjacentElement("afterbegin", heading)
        this.style.padding = "5px"
        this.style.marginTop = "10px"
        this.style.marginTop = "10px"
        this.style.marginBottom = "10px"
        this.style.borderStyle = "solid"
        this.style.borderWidth = "2px"
        this.style.marginLeft = "auto"
        this.style.marginRight = "auto";
        this.style.backgroundColor = "rgb(204, 224, 255)"
    }
}

class LangBox extends HTMLDivElement {
    
    constructor() {
        super()
    }

    connectedCallback() {
        const heading = document.createElement("b") 
        const heading_text = this.getAttribute("data-heading")
        heading.appendChild(document.createTextNode("Språkboksen"))
        heading.appendChild(document.createElement("p"))
        this.insertAdjacentElement("afterbegin", heading)
        this.style.padding = "5px"
        this.style.marginTop = "10px"
        this.style.marginTop = "10px"
        this.style.marginBottom = "10px"
        this.style.borderStyle = "solid"
        this.style.borderWidth = "2px"
        this.style.marginLeft = "auto"
        this.style.marginRight = "auto";
        this.style.backgroundColor = "rgb(255, 255, 0, 0.2)"
    }
}



class Section extends HTMLHeadingElement {

    constructor() {
        super()
    }

    connectedCallback() {
        if (sectionCounter > 0) {
            this.innerHTML = `${sectionCounter} `+ this.innerHTML
        }
        
    }    
}

class SubSection extends HTMLHeadingElement {

    constructor() {
        super()
    }        
}    

customElements.define("custom-info", Info, { extends: "div"} )
customElements.define("custom-sub-section", SubSection, { extends: "h3"} )
customElements.define("custom-section", Section, { extends: "h2"} )
customElements.define("custom-rule", Rule, { extends: "div"} )
customElements.define("custom-language-box", LangBox, { extends: "div"} )
customElements.define("custom-example", Example, { extends: "div"} )