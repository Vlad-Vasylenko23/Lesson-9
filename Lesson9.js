const fs = require ('fs')
let FileData = null
fs.readFile('persons.txt', 'utf-8', (err, data)=>{
    if (err){
        console.error(err)
        return
    }
    FileData = data
    console.log (data)
})