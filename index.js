const express = require("express")
const app = express()
const db = require('monk')('mongodb://admin:FNpassword1@ds147890.mlab.com:47890/friendly-neighbor')
const jobCollection = db.get('postjob')
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use((req, res, next)=> {
    console.log('from use', req.body)
    next()
}) 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', "POST, GET, PUSH, DELETE, OPTIONS")
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})
app.get('/jobs',async (req, res) => {
    const jobs = await jobCollection.find({})
    res.send(jobs)
})

app.post('/postjob', async (req, res)=> {
    console.log("hit")
   try{ 
    const newJob = req.body
    const savedJob =  await jobCollection.insert(newJob)
    console.log('from try', newJob)
    res.send(newJob)
    }
    catch(err){
        
        console.log('from error', err)
    }
})
app.delete('/deletejob', async (req, res)=> {
    try{
        const deletejob = req.body
        const removedjob = await jobCollection.remove(deletejob)
    }
    catch(err){

        console.log('')
    }
})

app.listen(3001, ()=>{console.log("app running on port 3001")})

