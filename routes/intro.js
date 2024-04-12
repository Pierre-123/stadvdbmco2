const { Router, json } = require('express'); 
const router = Router();
const axios = require('axios');
const https = require('https');
const Proxmox = require('proxmox');//https://www.npmjs.com/package/proxmox
const indexController = require('../controller/index.controller')
const isolationController = require('../controller/isolation.controller')
const recoveryController = require('../controller/recovery.controller')
const { time } = require('console');
const { hostname, type } = require('os');
const { getJSON } = require('jquery');

router.get('/', async (req, res) => {
  try {
    recoveryController.introRecovery();
    const rows = await indexController.getAllData()
    res.render('intro', {title: "Central", rows: rows})
  } catch (err) {
    console.log(err)
    res.render('intro', {title: "Central"})
    
  }
});

router.post('/create', async (req, res) => { // Corrected the syntax error here
  try {
      // Call the appropriate controller function to handle data creation
      // For example:
      console.log(req.body)
      const response = await indexController.postData(req.body.apptid, req.body.pxid, req.body.doctorid, req.body.hospitalname, req.body.City, 
        req.body.Province, req.body.RegionCode, req.body.status, req.body.type, req.body.Virtual);
      
      console.log("Ping!");
      //res.status(201).send("Data created successfully"); // Send a success response
      const rows = await indexController.getAllData()
      res.render('intro', {title: "Central", rows: rows})
  } catch (error) {
      console.log(error.message);
      if(error.message==='connect ETIMEDOUT'){//if central is down
        const hold = req.body;//check region code then send to vismin/luzon controller temporary databse
        console.log(req.body);
        if(req.body.RegionCode=='1'||req.body.RegionCode=='2'||req.body.RegionCode=='3'||req.body.RegionCode=='4'||req.body.RegionCode=='5'||req.body.RegionCode=='6'||req.body.RegionCode=='15'||req.body.RegionCode=='16'){
          //send to luzon temp database
          console.log(req.body);
          await recoveryController.addTemporaryValues(req.body);
          //apptid, pxid, doctorid, hospitalname, City, Province, RegionName, RegionCode, status, TimeQueued, QueueDate, StartTime, EndTime, type, Virtual
        } else {
          //send to vismin temp database
        }
        //when central server is up, grab it from the temporary database
        console.log("no respons")

      }
      res.status(500).render('intro', {title: "Central"}); // Send an error response
  }
});

router.post('/update', async (req, res) => {
  try{
    console.log(req.body)
    await sleep(5000)//5 seconds
    await indexController.updateData(req.body.apptid, req.body.database, req.body.hospitalname, req.body.City, req.body.Province, req.body.status, req.body.type, req.body.Virtual);
    console.log('update goods :)')
    const rows = await indexController.getAllData()
    console.log(rows);
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
    await sleep(5000); //5 seconds
    console.log("Search attempted")
    res.render('intro', {title: "Central", rows: rows})
  } catch (err) {
    console.log(err)
    res.render('intro', {title: "Central"})
    
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
    console.log(deleteID)
    console.log(regionCode)
    await sleep(5000);
    const response = await indexController.deleteData(deleteID, regionCode)
    console.log(response);
    console.log("Print")
    const rows = await indexController.getAllData()
    res.render('intro', {title: "Central", rows: rows})
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

router.post('/isolation/:isolation', async(req, res)=>{
  try {
    console.log(req.params.isolation)
    const response = await isolationController.setIsolationLevel(req.params.isolation)
  } catch (error) {
    console.log(error)
  }
})


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = router;