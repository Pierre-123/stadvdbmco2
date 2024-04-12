const pools = require('../conn/dbService')

const visMinController = {
     getVisMinData: async () => {
          {
               const [rows, field] = await pools.visMinPool.query(`
               SELECT * 
               FROM VisMin
               LIMIT 10
               `)
               return rows
          }
     },
     getVisMinSearch: async (variable) => {
          if(!variable){
               const [rows, field] = await pools.visMinPool.query(`
               SELECT * 
               FROM VisMin
               LIMIT 10
               `)
               return rows;
          }
          pools.visMinPool.query(start_query)
          console.log(start_query)
          const [rows, field] = await pools.visMinPool.query(`
          SELECT * 
          FROM VisMin
          WHERE apptid = ? 
          LIMIT 10
          `, [variable])
          pools.visMinPool.query(commit)
          return rows
     },
     deleteVisMinData: async (apptid) => {
          try{
               const [rows, field] = await pools.centralPool2.query(
                    `DELETE FROM VisMin
                    WHERE apptid= ?`, [apptid])
               
          } catch (err) {
               console.log(err)
          }
     }
}

module.exports = visMinController