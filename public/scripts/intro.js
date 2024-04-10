
const proxmoxProxy = 'http://localhost:3000/proxy';
const test_button = $("#test-btn");
const search_button = $("#search-btn");

$(document).ready(function () {
    test_button.click(function(){
        connect();
        console.log("Actions Performed")
    });
    search_button.click(function(){
        search();
        console.log("Search Performed")
    })
});

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

