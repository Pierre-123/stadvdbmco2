const pools = require('../conn/dbService')

const visMinController = {
     getVisMinData: async () => {
          {
               const [rows, field] = await pools.visMinPool.query(`
               SELECT * 
               FROM VisMin
               LIMIT 10
               `, [variable])
               return rows
          }
     },
     getVisMinSearch: async (variable) => {
          const [rows, field] = await pools.visMinPool.query(`
          SELECT * 
          FROM VisMin
          WHERE apptid = ? 
          LIMIT 10
          `, [variable])
          return rows
     },
     deleteVisMinData: async (apptid) => {
          try{
               const [rows, field] = await pools.visMinPool.query(
                    `DELETE FROM VisMin
                    WHERE apptid= ?`, [apptid])
               
          } catch (err) {
               console.log(err)
          }
     }
}

module.exports = visMinController