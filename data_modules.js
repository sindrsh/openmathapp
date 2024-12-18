import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const client = createClient('https://ewfkoaogwqeyhkysxsar.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4')

async function getSession() {
    const { data, error } = await client.auth.getSession()
    return data
}

async function syncTasks(tasks, data) {
    const tasksFromDatabase = await client
        .from('helland_skule_students')
        .select("tasks")
        .eq('user_id', data.session.user.id)

    if (!tasksFromDatabase){
        return
    }

    if (tasksFromDatabase.data[0]) {
        const storedTasks = JSON.parse(tasksFromDatabase.data[0]["tasks"])    

    for (let key of Object.keys(tasks)) {
        if (key in storedTasks) {
            if (storedTasks[key]["score"] > tasks[key]["score"]) {
                tasks[key]["score"] = storedTasks[key]["score"]
            }
        }
    }
        for (let key of Object.keys(storedTasks)) {
            if (!(key in tasks)) {
                tasks[key] = storedTasks[key]
            }
        }
    }

    const { updateError } = await client
        .from('helland_skule_students')
        .update({ tasks: `${JSON.stringify(tasks)}`  })
        .eq('user_id', data.session.user.id)
}

function getLocalTasks() {
    let testsFromLocalStorage = localStorage.getItem("tests") // previous name
    let tests = {}
    try {
        JSON.parse(testsFromLocalStorage)
        tests = JSON.parse(testsFromLocalStorage)
    } catch(error) {
        localStorage.setItem("tasks", "{}")
    }

    let tasksFromLocalStorage = localStorage.getItem("tasks")
    let tasks = {}
    try {
        JSON.parse(tasksFromLocalStorage)
        tasks = JSON.parse(testsFromLocalStorage)
    } catch(error) {
        localStorage.setItem("tasks", "{}")
    }

    for (let key of Object.keys(tests)) {
        if (!(key in tasks)) {
            tasks[key] = tests[key]
        }
    }
    return tasks
}


export { getSession, getLocalTasks, syncTasks }
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
