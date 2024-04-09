const mysql = require('mysql2');

const CentralNode = mysql.createConnection({
    host: 'ccscloud.dlsu.edu.ph',
    port: '20108',
    user: 'root',
    password: 'w5EuLsQ8WHk2XyfJaZhSNen4',
    database: 'Central'
})

const LuzonNode = mysql.createConnection({
    host: '10.2.0.109',
    user: 'root',
    password: 'w5EuLsQ8WHk2XyfJaZhSNen4',
    database: 'Luzon'
})

const VisMinNode = mysql.createConnection({
    host: '10.2.0.110',
    user: 'root',
    password: 'w5EuLsQ8WHk2XyfJaZhSNen4',
    database: 'VisMin'
})

connectCentral()

function connectCentral() {
    CentralNode.connect((err)=>{
        if(err){
            console.log(err);
            
        } else {
            console.log('Connected to Central Node')
        }
        
    })
}

function closeCentral(){
    CentralNode.end();
    console.log('Central Closed')
}

module.exports = {
    connectCentral,
    closeCentral
};