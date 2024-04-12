const { Router, json } = require('express'); 
const router = Router();
const indexController = require('../controller/index.controller')

router.get('/', async (req, res) => {
    try {
      console.log("put report here")
      res.render('report', {title: "Report", rows: rows})
    } catch (err) {
      console.log(err)
      res.render('report', {title: "Report"})
    }
  });
  module.exports = router;