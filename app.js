var cors = require('cors')


const express = require('express')()
const app = express
app.use(cors({credentials: true, origin: true}))

const mysql = require('mysql')
//app.use(mysql)

app.get("/", (req, res) => {
    console.log("The server on port 3003 has responded.")
    res.send("Hello from 3003")
})

app.get("/company/:name", (req, res) => {
    console.log("Fetching company with name: " + req.params.name)

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'yt043112192',
        database: 'sec_dataset2'
    })

    let sql = 'CALL GetCompanyData(?, ?, ?)'

    var startDate = '2012-03-31'
    var endDate = '2012-06-30'
    connection.query(sql, [req.params.name, startDate, endDate], (err, rows, fields) => {
        if(err){
            console.log("Failed to query for company: " + err)
            res.end()
            return
        }

        

        //res.json(rows)
        
        var string=JSON.stringify(rows);
        var json =  JSON.parse(string);

        console.log("Query succeeded for company: " + req.params.name + " query returned " + json[0].length + " records for the period " + startDate + " - " + endDate )

        for (let i = 0; i < json[0].length; i++) {
            console.log(json[0][i].tag)
        }

        //console.log('>> company.plabel: ', data )
        res.end()
    })

    //res.send("Hello from 3003")
})

app.listen(3003, () => {
    console.log("Server is up and listening on port 3003...")
})