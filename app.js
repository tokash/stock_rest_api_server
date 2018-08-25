var cors = require('cors')
var lodash = require('lodash')

const express = require('express')()
const app = express
app.use(cors({credentials: true, origin: true}))

const mysql = require('mysql')

class Company {
    constructor(company, instance, adsh, tag, version, fiscal_period, date, quarter, uom, coreg, value, footnote, cik, sic, plabel) {
      this.company = company;
      this.instance = instance;
      this.adsh = adsh;
      this.tag = tag;
      this.version = version;
      this.fiscal_period = fiscal_period;
      this.date = date;
      this.quarter = quarter;
      this.uom = uom;
      this.coreg = coreg;
      this.value = value;
      this.footnote = footnote;
      this.cik = cik;
      this.sic = sic;
      this.plabel = plabel;
    }
}

app.get("/", (req, res) => {
    console.log("The server on port 3003 has responded.")
    res.send("Hello from 3003")
})

app.get("/companies/:num_companies", (req, res) => {
    console.log("Fetching names for " + req.params.num_companies + " companies")

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'yt043112192',
        database: 'sec_dataset2'
    })

    let sql = 'CALL GetAllCompanies(?)'
    connection.query(sql, [req.params.num_companies], (err, rows, fields) => {
        if(err){
            console.log("Failed to query : " + err)
            res.end()
            return
        }

        connection.end()

        res.json(rows[0])
        
        var string=JSON.stringify(rows)
        var json =  JSON.parse(string)

        console.log("Query succeeded for " + req.params.num_companies + " companies +  query returned " + json[0].length + " records")
    })})

app.get("/company/:name", (req, res) => {
    console.log("Fetching company with name: " + req.params.name)

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'yt043112192',
        database: 'sec_dataset2'
    })

    let sql = 'CALL GetCompanyFullData(?, ?, ?, ?)'

    var startDate = '2012-03-31'
    var endDate = '2012-06-30'
    connection.query(sql, [req.params.name, startDate, endDate, '1'], (err, rows, fields) => {
        if(err){
            console.log("Failed to query for company: " + err)
            res.end()
            return
        }

        connection.end()

        var rows = JSON.stringify(rows[0])
        var jsonRows = JSON.parse(rows)

        console.log(lodash.groupBy(jsonRows, 'tag'))

        res.json(rows[0])

        
        var string=JSON.stringify(rows);
        var json =  JSON.parse(string);

        //console.log("Query succeeded for company: " + req.params.name + " query returned " + json[0].length + " records for the period " + startDate + " - " + endDate )

        // for (let i = 0; i < json[0].length; i++) {
        //     console.log(json[0][i].tag)
        // }

        //console.log('>> company.plabel: ', data )
        //res.end(json)
    })

    //res.send("Hello from 3003")
})

app.listen(3003, () => {
    console.log("Server is up and listening on port 3003...")
})