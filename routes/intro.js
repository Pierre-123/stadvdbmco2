const { Router } = require('express'); 
const router = Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('intro', {title: "A Page"});
});
/*
router.post('/api2/json/access/ticket', async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Make a POST request to authenticate with Proxmox API
        const response = await axios.post('https://ccscloud.dlsu.edu.ph:20108/api2/json/access/ticket', {
            username: username,
            password: password
        });

        // Return the response from Proxmox API to the client
        res.json(response.data);
    } catch (error) {
        // If an error occurs, return an error response
        console.error('Error authenticating with Proxmox API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});*/


module.exports = router;