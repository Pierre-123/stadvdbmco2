const { Router, json } = require('express'); 
const router = Router();
const luzonController = require('../controller/luzon.controller');
const indexController = require('../controller/index.controller')
const { error } = require('jquery');

router.get('/', async (req, res) => {
    try {
      const rows = await luzonController.getLuzonData()
      res.render('luzon', {title: "Luzon Node", rows: rows})
    } catch (err) {
      console.log(err)
      res.render('luzon', {title: "Luzon Node"})
    }
  });

  router.get('/search', async (req, res) => {
    try{
      const rows = await luzonController.getLuzonSearch(req.query.search)
      console.log(req.query.search)
      res.render('luzon', {title: "Luzon Node", rows: rows})
    } catch (err) {
      console.error(error)
      res.render('luzon', {title: "Luzon Node"})
    }
  })

  router.delete('/appointment/:id', async (req, res) => {
    try{ 
        console.log("router delete")
      const deleteID = await luzonController.deleteLuzonData(req.params.id)
      const rows = await luzonController.getLuzonData()
      res.status(201).render('luzon', {title: "Luzon Node", rows: rows})
    } catch (err) {
      console.error(error)
        

      res.render('luzon', {title: "Luzon Node"})
    }
  })
/*
  router.get('/search',  async (req, res) => {
    try {
      const rows = await indexController.getSearchData(req.query.database, req.query.search)
      /*if(typeof req.query.search === 'string'){
          console.log('req search is string')
      }
      console.log(req.query.database)
      console.log(req.query.search)
      console.log("Search attempted Luzon Node")
      res.render('luzon', {title: "Luzon Node", rows: rows})
    } catch (err) {
      console.log(err)
      res.render('luzon', {title: "Luzon Node"})
      
    }
  }) */
router.post('/update', async (req, res) => {
  try{
    console.log(req.body)
    const response = await luzonController.updateLuzonData(req.body);
    const rows = await luzonController.getLuzonData()
    console.log(rows);
      res.render('luzon', {title: "Luzon", rows: rows})
  } catch (err){
    console.log(err)
    res.render('luzon', {title: "Luzon"})
  }
})
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  module.exports = router;