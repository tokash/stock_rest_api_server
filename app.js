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

    connection.query(sql, [req.params.name, '2012-03-31', '2017-03-31'], (err, rows, fields) => {
        if(err){
            console.log("Failed to query for company: " + err)
            res.end()
            return
        }

        console.log("Query succeeded for company: " + req.params.name + " query returned " + rows.length + " records")

        res.json(rows)
    })

    //res.send("Hello from 3003")
})

app.listen(3003, () => {
    console.log("Server is up and listening on port 3003...")
})