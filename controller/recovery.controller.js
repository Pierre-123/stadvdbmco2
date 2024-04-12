const pools = require('../conn/dbService')
const indexController =require('./index.controller')

const recoveryController = {
    introRecovery: async() => {
        try {
           const [row, field] = await pools.luzonPool.query(`
           SELECT *
           FROM temporary_values`)
           /*const count = await pools.luzonPool.query(`
           SELECT COUNT(apptid)
           FROM temporary_values`)*/
           
           /*for(const[key, value] of Object.entries(row)){
            console.log(value)
           }*/
           const stringify = JSON.parse(JSON.stringify(row))
           //console.log(stringify.length)
           //console.log(stringify[0].apptid)
           for(i=0;i<stringify.length;i++){
            console.log(stringify[i].apptid) //add here
            indexController.postData(stringify[i].apptid, stringify[i].pxid, stringify[i].doctorid, stringify[i].hospitalname, stringify[i].City, stringify[i].Province, stringify[i].RegionCode, stringify[i].status, stringify[i].type, stringify[i].Virtual);//kill here
            await pools.luzonPool.query(`DELETE FROM temporary_values WHERE apptid=?`,[stringify[i].apptid])
           }
        } catch (error) {
            console.log(error)
        }
    },
    addTemporaryValues: async(lostData) => {
        try {
            const response = await pools.luzonPool.query(
                `INSERT INTO temporary_values (apptid, pxid, doctorid, hospitalname, City, Province, RegionName, RegionCode, 
                                status, TimeQueued, QueueDate, StartTime, EndTime, type, \`Virtual\`)
                 VALUES (?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?, ?, ?);
            `,[lostData.apptid, lostData.pxid, lostData.doctorid, lostData.hospitalname, lostData.City, 
                lostData.Province, lostData.RegionName, lostData.RegionCode, lostData.status, lostData.TimeQueued, 
                lostData.QueueDate, lostData.StartTime, lostData.EndTime, lostData.type, lostData.Virtual]);
                console.log(response);
        } catch (err){
            console.log(err)
        }
    }
}


module.exports = recoveryController