var cors = require('cors')


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

<<<<<<< HEAD
    connection.query(sql, [req.params.name, '2012-03-31', '2012-06-30', '0'], (err, rows, fields) => {
=======
    var startDate = '2012-03-31'
    var endDate = '2012-06-30'
    connection.query(sql, [req.params.name, startDate, endDate], (err, rows, fields) => {
>>>>>>> 7e2d206d12d4a5900761de77878a1aa58b3ef805
        if(err){
            console.log("Failed to query for company: " + err)
            res.end()
            return
        }

<<<<<<< HEAD
        console.log("Query succeeded for company: " + req.params.name + " query returned " + rows.length + " records")
        
        /*if (err) throw err;
        Object.keys(rows).forEach(function(key) {
            var row = rows[key];
            //console.log(row.RowDataPacket.company)
          });*/

          
        var records = []
        records = JSON.parse(JSON.stringify(rows))
        console.log(records)
        //console.log(records[0].RowDataPacket.plabel)
        //console.log(String(data[0].plabel));
        /*for (let i = 0; i < records.length; i++) {
            //var currCompany = new Company()
            //currCompany.company = data[i].company
            //currCompany.plabel = String(data[i].plabel)
            console.log(records[i].plabel)
            
            //console.log(v[i])
            //records.push(currCompany)

            //res.append(currCompany.plabel)
        }*/

        res.end()
        

        //res.json(rows)
=======
        

        res.json(rows[0])

        
        var string=JSON.stringify(rows);
        var json =  JSON.parse(string);

        console.log("Query succeeded for company: " + req.params.name + " query returned " + json[0].length + " records for the period " + startDate + " - " + endDate )

        // for (let i = 0; i < json[0].length; i++) {
        //     console.log(json[0][i].tag)
        // }

        //console.log('>> company.plabel: ', data )
        //res.end(json)
>>>>>>> 7e2d206d12d4a5900761de77878a1aa58b3ef805
    })

    //res.send("Hello from 3003")
})

app.listen(3003, () => {
    console.log("Server is up and listening on port 3003...")
})