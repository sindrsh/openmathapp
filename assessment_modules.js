var user = {}
            
async function signIn() {
    try {
        const response = await fetch("https://ewfkoaogwqeyhkysxsar.supabase.co/auth/v1/token?grant_type=password", {
            method: "POST",
            body: JSON.stringify({ "email": "user88@mail.com", "password": 'pswd5756' }),
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
        console.log(user)
        
    } catch (error) {
        console.error(error.message);
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


export { signIn, updateTestRecord }