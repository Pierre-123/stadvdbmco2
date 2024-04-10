
const proxmoxProxy = 'http://localhost:3000/proxy';
const test_button = $("#test-btn");

$(document).ready(function () {
    test_button.click(function(){
        connect();
        console.log("Actions Performed")
    });
});

async function connect(){
    try {
        const response = await fetch(proxmoxProxy);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
