const { Router } = require('express'); 
const router = Router();
const axios = require('axios');
const https = require('https');
const Proxmox = require('proxmox');//https://www.npmjs.com/package/proxmox
const { time } = require('console');
const { hostname } = require('os');
const username = 'stadvdb36';
const password = 'w5EuLsQ8WHk2XyfJaZhSNen4';

const Proxmox_Server0 = new Proxmox({
    hostname: 'STADVDB36-Server0',
    username: 'stadvdb36',
    password: 'w5EuLsQ8WHk2XyfJaZhSNen4'
})


router.get('/', (req, res) => {
    res.render('intro', {title: "A Page"});
});

router.get('/proxy', async (req, res) => {
    try { //getting https://ccscloud.dlsu.edu.ph/ gets the html page. adding the :20108 ERCONNRefuses/ETIMEDOUT hmm. 
      const response = await axios.get('https://ccscloud.dlsu.edu.ph', {
        httpsAgent: new https.Agent({ rejectUnauthorized: false}), 
        auth: {
            username: username,
            password: password
        }
      });
      console.log('What: ', response.data)
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500);
    }
  });

module.exports = router;