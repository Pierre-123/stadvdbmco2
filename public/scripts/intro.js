const proxmoxProxy = 'http://localhost:20108/proxy';
const test_button = $("#test-btn");
const con_central_button = $("#connect-central-btn");
const clo_central_button = $("#close-central-btn");
import { connectCentral, closeCentral } from '.../database/index.js';


$(document).ready(function () {
    test_button.click(function(){
        connect();
        console.log("Actions Performed")
    });
    con_central_button.click(function(){
        connectCentral();
        console.log("Attempted Central")
    })
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