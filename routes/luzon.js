const { Router, json } = require('express'); 
const router = Router();
const luzonController = require('../controller/luzon.controller');
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
      res.render('luzon', {title: "Luzon Node", rows: rows})
    } catch (err) {
      console.error(error)
      res.render('luzon', {title: "Luzon Node"})
    }
  })

  router.delete('/appointment/:id', async (req, res) => {
    try{ 
      const deleteID = await luzonController.deleteLuzonData(req.params.id)
      const rows = await luzonController.getLuzonData()
      res.status(201).render('luzon', {title: "Luzon Node", rows: rows})
    } catch (err) {
      console.error(error)
      res.render('luzon', {title: "Luzon Node"})
    }
  })

  module.exports = router;