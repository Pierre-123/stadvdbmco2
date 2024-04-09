const { Router } = require('express'); 
const router = Router();
const axios = require('axios');
const https = require('https');
const Proxmox = require('proxmox');//https://www.npmjs.com/package/proxmox
const { time } = require('console');
const { hostname } = require('os');

const Proxmox_Server0 = new Proxmox({
    hostname: 'STADVDB36-Server0',
    username: 'stadvdb36',
    password: 'w5EuLsQ8WHk2XyfJaZhSNen4'
})

const URL = 'http://ccscloud.dlsu.edu.ph:20108/api2/json';
const username = 'stadvdb36';
const password = 'w5EuLsQ8WHk2XyfJaZhSNen4';


router.get('/', (req, res) => {
    res.render('intro', {title: "A Page"});
});





router.get('/proxy', async (req, res) => {
    try { //getting https://ccscloud.dlsu.edu.ph/ gets the html page. adding the :20108 ERCONNRefuses/ETIMEDOUT hmm. 
        /*
        const response = await axios.post(`${URL}/access/ticket`, {
            username,
            password
        })
        console.log(response)
        const { data } = response;
        const csrfToken = data.data.CSRFPreventionToken;
        const ticket = data.data.ticket;
        console.log("Csrf Token: "+csrfToken)
        console.log("Ticket" + ticket)

        const proxmoxResponse = await axios.get(`${URL}/nodes`, {
            headers:{
                'CSRF-Token': csrfToken,
                Cookie: `PVEAuthCookie=${ticket}`
            }
        })
        console.log("Proxmox Response" + proxmoxResponse)

        res.json(proxmoxResponse.data);*/

        
        const response = await axios.get('https://ccscloud.dlsu.edu.ph:20108/api2/json', {
            httpsAgent: new https.Agent({ rejectUnauthorized: false}), 
            auth: {
                username: username,
                password: password
            }
        });
        console.log('What: ', response.data)
        res.json(response.data);
        } catch (error) {
        console.error('Proxy request failed:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Proxy request failed' });
        }
  });



module.exports = router;