const pools = require('../conn/dbService')
const iso_level_ru = `SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;` //just for reading, https://www.freecodecamp.org/news/how-to-use-mysql-transactions/
const iso_level_rc = `SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`
const iso_level_rr = `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;`
const iso_level_s = `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`
const isolationController = {
    setIsolationLevel: async (isolationlevel) => {
        if(isolationlevel=="READ UNCOMMITTED"){
            await pools.centralPool.query(iso_level_ru)
            await pools.centralPool2.query(iso_level_ru)
            await pools.luzonPool.query(iso_level_ru)
            await pools.visMinPool.query(iso_level_ru)
            console.log("DB performed: " + iso_level_ru)
        }
        if(isolationlevel=="READ COMMITTED"){
            await pools.centralPool.query(iso_level_rc)
            await pools.centralPool2.query(iso_level_rc)
            await pools.luzonPool.query(iso_level_rc)
            await pools.visMinPool.query(iso_level_rc)
            console.log("DB performed: " + iso_level_rc)
        }
        if(isolationlevel=="REPEATABLE READ"){
            await pools.centralPool.query(iso_level_rr)
            await pools.centralPool2.query(iso_level_rr)
            await pools.luzonPool.query(iso_level_rr)
            await pools.visMinPool.query(iso_level_rr)
            console.log("DB performed: " + iso_level_rr)
        }
        if(isolationlevel=="SERIALIZABLE"){
            await pools.centralPool.query(iso_level_s)
            await pools.centralPool2.query(iso_level_s)
            await pools.luzonPool.query(iso_level_s)
            await pools.visMinPool.query(iso_level_s)
            console.log("DB performed: " + iso_level_s)
        }
    }
}

module.exports = isolationController