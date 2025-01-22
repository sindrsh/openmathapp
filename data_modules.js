import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const client = createClient('https://ewfkoaogwqeyhkysxsar.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4')

const session = await getSession()

const bodyElement = document.getElementsByTagName("body")[0]
const containerDiv = document.createElement("div")
containerDiv.innerHTML = `
                            <div class="top-nav-container">
                            <a href="https://openmathapp.netlify.app/" class="left">HOME</a>
                            <a id="log-in-info" class="right"> sign in </a>
                            </div>
                        `
bodyElement.insertAdjacentElement('afterbegin', containerDiv)

let userName = null
let userId = null
let role = null


if (session.session) {
    userId = await session.session.user.id
    userName = await getUserName()
    if (userName) {
        const logInInfo = document.getElementById("log-in-info")
        logInInfo.innerHTML = `signed in as ${userName}`
    }
}


async function getSession() {
    const { data, error } = await client.auth.getSession()
    return data
}

async function signInWithMail(mail, password) {
    const { data, error } = await client.auth.signInWithPassword({
        email: mail,
        password: password,
      })
    if (error) {
        console.log(error)
    }
    return data
}


async function signOut() {
    await client.auth.signOut()
}

async function syncTasks() {
    let tasks = getLocalTasks()
    const tasksFromDatabase = await getTasksFromDatabase()

    if (tasksFromDatabase) {
    for (let key of Object.keys(tasks)) {
        if (key in tasksFromDatabase) {
            if (tasksFromDatabase[key]["score"] > tasks[key]["score"]) {
                tasks[key]["score"] = tasksFromDatabase[key]["score"]
            }
        }
    }
        for (let key of Object.keys(tasksFromDatabase)) {
            if (!(key in tasks)) {
                tasks[key] = tasksFromDatabase[key]
            }
        }
    }
    if (tasks) {
        const { updateError } = await client
        .from('helland_skule_students')
        .update({ tasks: tasks })
        .eq('user_id', userId)
    }
    
}

async function getTasksFromDatabase() {
    const { data, error } = await client
        .from('helland_skule_students')
        .select("tasks")
        .eq('user_id', userId)
    if (error){
        alert("Bad request.")
        return null
    } else if (!data[0]["tasks"]) {
        return {}
    } else {
        return data[0]["tasks"]
    }
}

function getLocalTasks() {
    let testsFromLocalStorage = localStorage.getItem("tests") // previous name
    let tests = {}
    try {
        JSON.parse(testsFromLocalStorage)
        tests = JSON.parse(testsFromLocalStorage)
        localStorage.removeItem("tests")
    } catch(error) {
        tests = {}
    }
    if (!tests) {
        tests = {}
    }

    let tasksFromLocalStorage = localStorage.getItem("tasks")
    let tasks = {}
    try {
        tasks = JSON.parse(tasksFromLocalStorage)
    } catch(error) {
        localStorage.setItem("tasks", "{}")
        tasks = {}
    }

    if (!tasks) {
        tasks = {}
    }

    if (tests) {
        for (let key of Object.keys(tests)) {
            if (!(key in tasks)) {
                tasks[key] = tests[key]
            }
        }
    }
    
    
    return tasks
}

async function getUserName() {
    const instrucurData = await client
        .from('helland_skule_instructors')
        .select("first_name")
        .eq('user_id', userId)
        
    if (!instrucurData.error) {
        if (instrucurData.data.length > 0) {
            role = "instructor"
            return instrucurData.data[0]["first_name"]
        } else {
            const { data, error } = await client
            .from('helland_skule_students')
            .select("first_name")
            .eq('user_id', userId)
            if (data) {
                role = "student"
                return data[0]["first_name"]
            }
        }
        
    } else {
        const { data, error } = await client
        .from('helland_skule_students')
        .select("first_name")
        .eq('user_id', userId)
        if (data) {
            role = "student"
            return data[0]["first_name"]
        }
    }
     
    return null
}

async function updateTasks(taskId) {
    if (userId) {
        let tasks = await getTasksFromDatabase()
        if (tasks) {
            tasks[taskId] = { "score": 2 }
            const { updateError } = await client
            .from('helland_skule_students')
            .update({ tasks: tasks  })
            .eq('user_id', userId)
        }
    }
    else {
        let tasks = getLocalTasks()
        tasks[taskId] = { "score": 2 }
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

async function getStudentsData() {
    const { data, error } = await client
        .from('helland_skule_students')
        .select()
    if (data) {
        return data
    } else {
        alert("An error occured when loading student tasks at" + location.href)
        return null
    }
}




export { session, getSession, getLocalTasks, syncTasks, updateTasks, signOut, signInWithMail, getTasksFromDatabase, getUserName, getStudentsData, role }
/*

var user = {}
            
async function signIn(email, password) {
    try {
        const response = await fetch("https://ewfkoaogwqeyhkysxsar.supabase.co/auth/v1/token?grant_type=password", {
            method: "POST",
            body: JSON.stringify({ "email": email, "password": password}),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4"
            },
        })
        
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json()
        user.access_token = json["access_token"]
        user.id = json["user"]["id"]
        return true

    } catch (error) {
        console.error(error.message);
        return false
    }
    
}

async function getTestRecord() {
    try {
        const response = await fetch("https://ewfkoaogwqeyhkysxsar.supabase.co/rest/v1/students?select=id,tests", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4",
                "Authorization": "Bearer " + user.access_token
            },
        })
        
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json()
    } catch (error) {
        console.error(error.message);
    }
}

async function updateTestRecord(testsString) {
    console.log(testsString)
    try {
        const response = await fetch("https://ewfkoaogwqeyhkysxsar.supabase.co/rest/v1/students?id=eq." + user.id, {
            method: "PATCH",
            body: testsString,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4",
                "Authorization": "Bearer " + user.access_token
            },
        })
        
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
    }    
}

 
        var user = {}

        await signIn("student_test@mail.com", "testing")
        getTestRecord()
        updateTestRecord(JSON.stringify({ tests: null}))    
            async function signIn(email, password) {
                try {
                    const response = await fetch("https://ewfkoaogwqeyhkysxsar.supabase.co/auth/v1/token?grant_type=password", {
                        method: "POST",
                        body: JSON.stringify({ "email": email, "password": password}),
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4"
                        },
                    })
                    
                    if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                    }
                    
                    const json = await response.json()
                    user.access_token = json["access_token"]
                    user.id = json["user"]["id"]
                    return true
            
                } catch (error) {
                    console.error(error.message);
                    return false
                }
                
            }
            
            async function getTestRecord() {
                try {
                    const response = await fetch("https://ewfkoaogwqeyhkysxsar.supabase.co/rest/v1/helland_skule_students?select=user_id,tests", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4",
                            "Authorization": "Bearer " + user.access_token
                        },
                    })
                    
                    if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                    }
                    
                    const json = await response.json()
                    console.log(json)
                } catch (error) {
                    console.error(error.message);
                }
            }
            
            async function updateTestRecord(testsString) {
                try {
                    const response = await fetch("https://ewfkoaogwqeyhkysxsar.supabase.co/rest/v1/helland_skule_students?user_id=eq." + user.id, {
                        method: "PATCH",
                        body: testsString,
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4",
                            "Authorization": "Bearer " + user.access_token
                        },
                    })
                    
                    if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                    }
                } catch (error) {
                    console.error(error.message);
                }    
            }
        */
