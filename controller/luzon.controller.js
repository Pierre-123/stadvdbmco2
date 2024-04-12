const pools = require('../conn/dbService')

const luzonController = {
     getLuzonData: async () => {
          {
               const [rows, field] = await pools.luzonPool.query(`
               SELECT * 
               FROM Luzon
               LIMIT 10
               `)
               return rows
          }
     },
     getLuzonSearch: async (variable) => {
          const [rows, field] = await pools.luzonPool.query(`
          SELECT * 
          FROM Luzon
          WHERE apptid = ? 
          LIMIT 10
          `, [variable])
          return rows
     },
     deleteLuzonData: async (apptid) => {
          try{
               const [rows, field] = await pools.centralPool.query(
                    `DELETE FROM Luzon
                    WHERE apptid= ?`, [apptid])
               
          } catch (err) {
               console.log(err)
          }
     }
}

module.exports = luzonController