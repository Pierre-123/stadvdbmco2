const express = require('express');
const router = express.Router();

// Not sure const {  } = require

// Define the supported isolation levels
const isolationLevels = {
  'read-uncommitted': 'READ UNCOMMITTED',
  'read-committed': 'READ COMMITTED',
  'repeatable-read': 'REPEATABLE READ',
  'serializable': 'SERIALIZABLE'
};

// Route handler for setting isolation level
router.post('/:isolationLevel', async (req, res) => {
  const { isolationLevel } = req.params;
  
  try {
    // Check if the requested isolation level is supported
    /*if (!isolationLevels.hasOwnProperty(isolationLevel)) {
      throw new Error('Invalid isolation level');
    }*/
    
    // Set the requested isolation level for each node
    const promises = ['central', 'luzon', 'vismin'].map(node => {
      return queryDatabase(node, `SET GLOBAL TRANSACTION ISOLATION LEVEL ${isolationLevels[isolationLevel]}`);
    });
    
    // Wait for all queries to complete
    await Promise.all(promises);
    
    res.redirect('/');
  } catch (error) {
    console.error(`Error setting isolation level (${isolationLevel}):`, error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
