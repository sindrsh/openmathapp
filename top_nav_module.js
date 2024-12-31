function makeTopNav() {
    const bodyElement = document.getElementsByTagName("body")[0]
    const mainDiv = document.createElement("div")
    mainDiv.style.height = "50px"
    const homeButton = document.createElement("button")
    homeButton.innerHTML = 'heim'

    mainDiv.appendChild(homeButton)
    bodyElement.insertAdjacentElement('afterbegin', mainDiv)
}


export { makeTopNav }