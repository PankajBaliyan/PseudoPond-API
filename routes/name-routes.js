const express = require('express')
const router = express()

router.get('/names', (req,res)=>{
    res.send("/names")
})

module.exports = router