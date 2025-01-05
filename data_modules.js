import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const client = createClient('https://ewfkoaogwqeyhkysxsar.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4')

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

async function syncTasks(tasks, userId) {
    
    const tasksFromDatabase = await getTasksFromDatabase(userId)
    //console.log(tasksFromDatabase)

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

    const { updateError } = await client
        .from('helland_skule_students')
        .update({ tasks: `${JSON.stringify(tasks)}`  })
        .eq('user_id', userId)
}

async function getTasksFromDatabase(userId) {
    const { data, error } = await client
        .from('helland_skule_students')
        .select("tasks")
        .eq('user_id', userId)
    console.log(data)
    if (error){
        alert("Bad request.")
        return null
    } else if (!data[0]["tasks"]) {
        return {}
    } else {
        console.log(JSON.parse(data[0]["tasks"]))
        return JSON.parse(data[0]["tasks"])
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

    let tasksFromLocalStorage = localStorage.getItem("tasks")
    let tasks = {}
    try {
        tasks = JSON.parse(tasksFromLocalStorage)
    } catch(error) {
        localStorage.setItem("tasks", "{}")
        tasks = {}
    }

    if (tests) {
        for (let key of Object.keys(tests)) {
            if (!(key in tasks)) {
                tasks[key] = tests[key]
            }
        }
    }
    if (!tasks) {
        tasks = {}
    }
    
    return tasks
}

async function updateTasks(taskId, userId) {
    if (userId) {
        let tasks = getTasksFromDatabase(userId)
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
        console.log("before", tasks)
        tasks[taskId] = { "score": 2 }
        localStorage.setItem("tasks", JSON.stringify(tasks))
        console.log("after", tasks)
    }
}




export { getSession, getLocalTasks, syncTasks, updateTasks, signOut, signInWithMail, getTasksFromDatabase }
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
