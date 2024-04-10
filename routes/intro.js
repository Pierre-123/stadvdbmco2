const { Router, json } = require('express'); 
const router = Router();
const axios = require('axios');
const https = require('https');
const Proxmox = require('proxmox');//https://www.npmjs.com/package/proxmox
const indexController = require('../controller/index.controller')
const { time } = require('console');
const { hostname, type } = require('os');
const { getJSON } = require('jquery');

router.get('/', async (req, res) => {
  try {
    const rows = await indexController.getAllData()
    res.render('intro', {title: "A Page", rows: rows})
  } catch (err) {
    console.log(err)
    res.render('intro', {title: "A Page"})
    
  }
});

router.get('/search',  async (req, res) => {
  try {
    const rows = await indexController.getSearchData(req.query.database, req.query.search)
    /*if(typeof req.query.search === 'string'){
        console.log('req search is string')
    }
    console.log(req.query.database)
    console.log(req.query.search)*/
    console.log("Search attempted")
    res.render('intro', {title: "A Page", rows: rows})
  } catch (err) {
    console.log(err)
    res.render('intro', {title: "A Page"})
    
  }
}) 

router.post('/', async (req, res) => {
  try {
    console.log('test')
  } catch(err) {
  console.log(err)
}
})



module.exports = router;