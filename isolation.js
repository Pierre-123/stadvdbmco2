const express = require('express');
const router = express.Router();

const { queryDatabase } = require('../public/commons/javascript/queryDatabase.js');


router.post('/read-uncommitted', async (req, res) =>{
    try{
        queryDatabase('central', "SET GLOBAL TRANSACTION ISOLATION LEVEL READ UNCOMMITTED");
        queryDatabase('luzon', "SET GLOBAL TRANSACTION ISOLATION LEVEL READ UNCOMMITTED");
        queryDatabase('vismin', "SET GLOBAL TRANSACTION ISOLATION LEVEL READ UNCOMMITTED");

        res.redirect('/')
    } catch (error) {
        console.error('Error during concurrent write-read:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/read-committed', async (req, res) =>{
    try{
        queryDatabase('central', "SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED");
        queryDatabase('luzon', "SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED");
        queryDatabase('vismin', "SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED");


        res.redirect('/')
    } catch (error) {
        console.error('Error during concurrent write-read:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/repeatable-read', async (req, res) =>{
    try{
        queryDatabase('central', "SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ");
        queryDatabase('luzon', "SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ");
        queryDatabase('vismin', "SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ");

        res.redirect('/')
    } catch (error) {
        console.error('Error during concurrent write-read:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/serializable', async (req, res) =>{
    try{
        queryDatabase('central', "SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE");
        queryDatabase('luzon', "SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE");
        queryDatabase('vismin', "SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE");

        res.redirect('/')
    } catch (error) {
        console.error('Error during concurrent write-read:', error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;
