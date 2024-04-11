
const proxmoxProxy = 'http://localhost:3000/proxy';
const test_button = $("#test-btn");
const search_button = $("#search-btn");
//const create_button = $("#create-btn");

$(document).ready(function () {
    test_button.click(function(){
        connect();
        console.log("Actions Performed")
    });
    search_button.click(function(){
        search();
        console.log("Search Performed")
    })
    /*create_button.click(function(){
        //add();
        console.log("Create Attempted")
    })*/
});

async function add(){
    try {
        const response = await fetch('/create');
        const data=await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error creating data: '+ error);
    }
}

async function search(){
    try{
        const response = await fetch('/search');
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.error('Error fetching data: ', error)
    }
}

async function connect(){
    try {
        const response = await fetch(proxmoxProxy);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function showDetails(appointment) {
    let appointmentID = appointment.getAttribute("data-apptid")
    try {
        const response = await fetch(`/appointment/${appointmentID}`,{
            method: "DELETE"
        })
    } catch (err) {
        console.error(err)
    }
}