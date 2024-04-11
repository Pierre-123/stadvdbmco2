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

//router.post('/create'), async (req, res)=> {//cannot post :(
  //  try {
        //postData from index controller here, console.log to see whats wrong
    //    console.log("Ping!")
   // } catch (error) {
     //   console.log(error)
   // }
//}

router.post('/create', async (req, res) => { // Corrected the syntax error here
  try {
      // Call the appropriate controller function to handle data creation
      // For example:
      await indexController.postData(req.body.apptid, req.body.pxid, req.body.doctorid, req.body.hospitalname, req.body.City, req.body.Province, req.body.status, req.body.type, req.body.Virtual);
      console.log("Ping!");
      //res.status(201).send("Data created successfully"); // Send a success response
      const rows = await indexController.getAllData()
      res.render('intro', {title: "A Page", rows: rows})
  } catch (error) {
      console.log(error);
      res.status(500).send("Error creating data: " + error); // Send an error response
  }
});

router.post('/update', async (req, res) => {
  try{
    console.log(req.body)
    await indexController.updateData(req.body.apptid, req.body.database, req.body.hospitalname, req.body.City, req.body.Province, req.body.status, req.body.type, req.body.Virtual);
    console.log('update goods :)')
    const rows = await indexController.getAllData()
      res.render('intro', {title: "A Page", rows: rows})
  } catch (err){
    console.log(err)
  }
})

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
// maybe this will work
router.delete('/appointment/:id/:regionCode', async (req, res) => {
  try {
    const deleteID = req.params.id
    const regionCode = req.params.regionCode
    const response = await indexController.deleteData(deleteID, regionCode)
    const rows = await indexController.getAllData()
    res.render('intro', {title: "A Page", rows: rows})
  } catch (err) {
    console.log(err)
  }
})

router.put('/appointment/:id', async (req, res) => {
  try{
    const updateID = req.params.id
    const response = await indexController.updateData(updateID)
  } catch (err) {
    console.log(err)
  }
})



module.exports = router;