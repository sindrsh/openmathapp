import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'


const supabase = createClient('https://ewfkoaogwqeyhkysxsar.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZmtvYW9nd3FleWhreXN4c2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjczOTM4ODIsImV4cCI6MTk4Mjk2OTg4Mn0.xIjkHy_RbQnNbYCob74L7kf4VAfyEgJwLvKT8wItaS4')

const client = await supabase.auth.signInWithPassword({
    email: "user88@mail.com",
    password: 'pswd5756',
})


const { data, error } = await supabase
    .from('students')
    .select()

if (!!window.SharedWorker) {
  const myWorker = new SharedWorker("worker.js");

  squareNumber.onchange = function () {
    myWorker.port.postMessage([squareNumber.value, squareNumber.value]);
    console.log("Message posted to worker");
  };

  myWorker.port.onmessage = function (event) {
    result2.textContent = event.data;
    console.log("Message received from worker");
  };
}    



