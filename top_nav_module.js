function makeTopNav(userName) {
    const bodyElement = document.getElementsByTagName("body")[0]
    const containerDiv = document.createElement("div")
    containerDiv.innerHTML = 
    `
   <div class="top-nav-container">
    <a href="https://openmathapp.netlify.app/" class="left">HOME</a>
    <a class="right"> sign in </a>
     </div>
     `
     bodyElement.insertAdjacentElement('beforebegin', containerDiv)
}


export { makeTopNav }