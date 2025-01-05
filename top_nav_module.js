function makeTopNav() {
    const bodyElement = document.getElementsByTagName("body")[0]
    const containerDiv = document.createElement("div")
    containerDiv.innerHTML = `<span style="width: 50%;"></span>
     <span style="width: 50%;">
        <button>HEIM</button>
     </span>`
     bodyElement.insertAdjacentElement('beforebegin', containerDiv)
}


export { makeTopNav }