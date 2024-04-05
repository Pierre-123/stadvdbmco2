const proxmoxUsername = 'stadvdb36';
const proxmoxPassword = 'w5EuLsQ8WHk2XyfJaZhSNen4';
const test_button = $("#test-btn");

$(document).ready(function () {
    test_button.click(function(){
        performActions(proxmoxUsername, proxmoxPassword);
        console.log("Actions Performed")
    });
});

function authenticate(username, password, callback) {
    // Make a POST request to /api2/json/access/ticket endpoint to authenticate
    $.ajax({
        url: 'https://ccscloud.dlsu.edu.ph:20108/api2/json/access/ticket',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            username: username,
            password: password
        },
        success: function(response) {
            var csrfToken = response.data.CSRFPreventionToken;
            callback(csrfToken);
        },
        error: function(xhr, status, error) {
            console.error('Error authenticating with Proxmox API:', error);
        }
    });
}

function performActions(username, password) {
    authenticate(username, password, function(csrfToken) {
        $.ajax({
            url: '/api2/json/nodes',
            type: 'GET',
            headers: {
                'CSRF-Token': csrfToken
            },
            success: function(response) {
                console.log('Successfully communicated with the online server.');
                console.log('Proxmox Node Information:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error getting Proxmox node information:', error);
            }
        });
    });
}