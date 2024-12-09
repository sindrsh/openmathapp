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
    const htmlElement = document.getElementsByTagName("html")[0]
    const link = document.createElement("link")
    link.setAttribute("rel", "stylesheet")
    link.setAttribute("href", "../../menu_styles.css")
    htmlElement.appendChild(link)

    const bodyElement = document.getElementsByTagName("body")[0]

    getSubjects().then( (subjects) => {
        let subjectTable = document.createElement("table")
        let subjectTableBody = document.createElement("tbody")
        let subjectRow = document.createElement("tr")
        
        subjectTable.setAttribute("class", "subject-table")
    
        let topics = subjects[subject]["topics"]
        const topicsArray = Object.keys(topics)
    
        subjectTable.appendChild(subjectTableBody)
        subjectTableBody.appendChild(subjectRow)
        
        
        for (let topic of topicsArray) {
            subjectRow = document.createElement("tr")
            let subjectRowTd = document.createElement("td")
            let topicTable = document.createElement("table")
            topicTable.setAttribute("class", "topic-table")
            let topicTableBody = document.createElement("tbody")
            let topicTableTitleRow = document.createElement("tr")
            let topicTableRow = document.createElement("tr")
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
                sectionTd.innerHTML = ``
                sectionTd.setAttribute("class", "section")
                topicTableBookRow.appendChild(sectionTd)
                
                let interactiveTd = document.createElement("td")
                interactiveTd.innerHTML = ``
                interactiveTd.setAttribute("class", "interactive")
                topicTableInteractiveRow.appendChild(interactiveTd)
    
                
                ++cnt
                let taskTd = document.createElement("td")
                taskTd.innerHTML = `<a href="">Test ${cnt}</a>`
                taskTd.setAttribute("class", "dynamic-task")
                taskTd.setAttribute("id", task)
                topicTableTaskRow.appendChild(taskTd)
    
            }
            topicTable.appendChild(topicTableBody)
            subjectRowTd.appendChild(topicTable)
            subjectRow.appendChild(subjectRowTd)
            subjectTableBody.appendChild(subjectRow)
        }
        
        bodyElement.appendChild(subjectTable)
    
        let testsFromLocalStorage = {}
        if (localStorage.getItem("tests")) {
            testsFromLocalStorage = JSON.parse(localStorage.getItem("tests"))
        } 



    
    let topicElements = document.getElementsByClassName("topic-table")
    for (let topicElement of topicElements) {
        let row = topicElement.getElementsByClassName("tasks")[0]
        let tests = Array.from(row.getElementsByClassName("dynamic-task"))
        console.log(tests)
        tests[0].style.visibility = "visible"
        tests = tests.slice(0)
        let cnt = 0

        let testsFromLocalStorage = {}
        
        for (let i=0; i<tests.length-1; ++i) {
            if (tests[i].id in testsFromLocalStorage) {
                if (testsFromLocalStorage[tests[i].id]["score"] == 2) {
                    ++cnt
                    tests[i+1].style.visibility = "visible"    
                }
                else {
                    break
                }
            } else {
                break
            }
        }
    }
    }
)
}

export { makeTables }