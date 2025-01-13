import { session, getTasksFromDatabase, syncTasks, getLocalTasks } from "./data_modules.js"

async function getSubjects() {
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

function makeTables(subject) {
    localStorage.setItem("previous-page", location.href)
    const htmlElement = document.getElementsByTagName("html")[0]
    const link = document.createElement("link")
    link.setAttribute("rel", "stylesheet")
    link.setAttribute("href", "../../menu_styles.css")
    htmlElement.appendChild(link)

    const bodyElement = document.getElementsByTagName("body")[0]

    getSubjects().then( (subjects) => {
        const subjectDiv = document.createElement("div")
        subjectDiv.setAttribute("class", "subject-div")
        let topics = subjects[subject]["topics"]
        const topicsArray = Object.keys(topics)
        
        
        for (let topic of topicsArray) {
            let topicTable = document.createElement("table")
            topicTable.setAttribute("class", "topic-table")
            let topicTableBody = document.createElement("tbody")
            let topicTableTitleRow = document.createElement("tr")
            let topicTableInteractiveRow = document.createElement("tr")
            let topicTableBookRow = document.createElement("tr")
            let topicTableTaskRow = document.createElement("tr")

            topicTableBookRow.setAttribute("class", "book")
            topicTableInteractiveRow.setAttribute("class", "interactive")
            topicTableTaskRow.setAttribute("class", "tasks")
    
            topicTableBookRow.innerHTML = `<td> Bok </td>`
            topicTableInteractiveRow.innerHTML = `<td> Interaktivt </td>`
            topicTableTaskRow.innerHTML = `<td> Oppgaver </td>`
    
            let tasks = topics[topic]
            let tasksArray = Object.keys(tasks)
            topicTableTitleRow.innerHTML = `<td rowspan="4">${topic}</td>`
            
            topicTableBody.appendChild(topicTableTitleRow)
            topicTableBody.appendChild(topicTableBookRow)
            topicTableBody.appendChild(topicTableInteractiveRow)
            topicTableBody.appendChild(topicTableTaskRow)
    
            let cnt = 0
            for (let task of tasksArray) {
                let sectionTd = document.createElement("td")
                let sectionButton = document.createElement("button")
                let taskObject = subjects[subject]["topics"][topic][task]
                if (taskObject.hasOwnProperty("book-section")) {
                    sectionButton.addEventListener("click", sectionChoice)
                    sectionButton.setAttribute("data-book-section", taskObject["book-section"])
                    sectionButton.innerHTML = bookIcon
                    sectionTd.appendChild(sectionButton)
                }
                sectionTd.setAttribute("class", "section")
                sectionTd.style.border = "none"
                sectionTd.style.textAlign = "center"
                sectionTd.style.visibility = "hidden"
                topicTableBookRow.appendChild(sectionTd)
                
                let interactiveTd = document.createElement("td")
                interactiveTd.innerHTML = ``
                interactiveTd.setAttribute("class", "interactive")
                interactiveTd.style.textAlign = "center"
                topicTableInteractiveRow.appendChild(interactiveTd)
                interactiveTd.style.border = "none"
    
                
                ++cnt
                let taskTd = document.createElement("td")
                taskTd.innerHTML = `<a href="./${task}.html"> ${pencilIcon} </a>`
                taskTd.setAttribute("class", "dynamic-task")
                taskTd.setAttribute("id", task)
                taskTd.style.border = "none"
                taskTd.style.textAlign = "center"
                topicTableTaskRow.appendChild(taskTd)
            }
            topicTable.appendChild(topicTableBody)
            subjectDiv.appendChild(topicTable)
        }
        
        bodyElement.appendChild(subjectDiv)

        if (sessionStorage.getItem("logged-in") == "false") {
            for (const element of document.getElementsByClassName("dynamic-task")) {
                element.style.visibility = "visible"
                element.style.border = "1pt solid black"
            }
        }
    
    
    let topicElements = document.getElementsByClassName("topic-table")
    
    for (let topicElement of topicElements) {
        console.log(topicElement)
        let bookRow = topicElement.getElementsByClassName("book")[0]
        let taskRow = topicElement.getElementsByClassName("tasks")[0]
        let tasks = Array.from(taskRow.getElementsByClassName("dynamic-task"))
        let sections = Array.from(bookRow.getElementsByClassName("section")) 
        sections[0].style.visibility = "visible"
        tasks[0].style.visibility = "visible"

        for (const element of [sections[0], tasks[0]]){
            element.style.border = "1pt solid black"
        }
        tasks = tasks.slice(0)

        let tasksRecord = null
        if (session.session) {   
                syncTasks().then( () => {
                    getTasksFromDatabase().then( (tasksFromDataBase) => {
                        if (tasksFromDataBase) {
                            tasksRecord = tasksFromDataBase
                        } else {
                            tasksRecord = {}
                        }
                        makeTasksVisible(sections, tasks, tasksRecord)
                    }
                )
                }
            )
            } else {
                if (sessionStorage.getItem("logged-in") == "false") {
                    tasksRecord = getLocalTasks()
                    makeTasksVisible(sections, tasks, tasksRecord)
                }
                
            }
            
        }
    }
)
}

function makeTasksVisible(sections, tasks, tasksRecord) {
    let cnt = 0
    for (let i=0; i <tasks.length; ++i) {
        if (tasks[i].id in tasksRecord) {
            if (tasksRecord[tasks[i].id]["score"] == 2) {
                ++cnt
                tasks[i].getElementsByTagName("a")[0].style.backgroundColor = "green"
                if (i < tasks.length -1) {
                    for (const element of [sections[i+1], tasks[i+1]]) {
                        element.style.visibility = "visible"
                        element.style.border = "1pt solid black"
                    }
                }
                    
            }
            else {
                break
            }
        } else {
            break
        }
    }
}

function sectionChoice() {
    localStorage.setItem("book-section", this.dataset.bookSection)
    window.location.href = "../../books/FP/fp_no.html"
}


const bookIcon = `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 459.319 459.319" xml:space="preserve">
<g>
	<path d="M94.924,366.674h312.874c0.958,0,1.886-0.136,2.778-0.349c0.071,0,0.13,0.012,0.201,0.012   c6.679,0,12.105-5.42,12.105-12.104V12.105C422.883,5.423,417.456,0,410.777,0h-2.955H114.284H94.941   c-32.22,0-58.428,26.214-58.428,58.425c0,0.432,0.085,0.842,0.127,1.259c-0.042,29.755-0.411,303.166-0.042,339.109   c-0.023,0.703-0.109,1.389-0.109,2.099c0,30.973,24.252,56.329,54.757,58.245c0.612,0.094,1.212,0.183,1.847,0.183h317.683   c6.679,0,12.105-5.42,12.105-12.105v-45.565c0-6.68-5.427-12.105-12.105-12.105s-12.105,5.426-12.105,12.105v33.461H94.924   c-18.395,0-33.411-14.605-34.149-32.817c0.018-0.325,0.077-0.632,0.071-0.963c-0.012-0.532-0.03-1.359-0.042-2.459   C61.862,380.948,76.739,366.674,94.924,366.674z M103.178,58.425c0-6.682,5.423-12.105,12.105-12.105s12.105,5.423,12.105,12.105   V304.31c0,6.679-5.423,12.105-12.105,12.105s-12.105-5.427-12.105-12.105V58.425z"/>
</g>
</svg>`

const pencilIcon = `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="20px" height="20px" viewBox="0 0 528.899 528.899"
	 xml:space="preserve">
<g>
	<path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
		L27.473,390.597L0.3,512.69z"/>
</g>
</svg>`
export { makeTables }