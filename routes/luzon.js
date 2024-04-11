const { Router, json } = require('express'); 
const router = Router();
const indexController = require('../controller/index.controller')

router.get('/', async (req, res) => {
    try {
      const rows = await indexController.getSearchData("Luzon","")
      res.render('luzon', {title: "Luzon Node", rows: rows})
    } catch (err) {
      console.log(err)
      res.render('luzon', {title: "Luzon Node"})
    }
  });

  module.exports = router;