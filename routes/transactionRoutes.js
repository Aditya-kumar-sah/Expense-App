const express = require('express')
const { addTransaction, getAllTransaction,editTransaction,deleteTransaction } = require('../controllers/transactionCtrl')

//router object
const router = express.Router()

//router
// add transaction POST 
router.post('/add-transaction',addTransaction)

// edit transaction POST 
router.post('/edit-transaction',editTransaction)
 

// delete transaction POST 
router.post('/delete-transaction',deleteTransaction)
 
//get transaction GET

router.post('/get-transaction',getAllTransaction)
module.exports = router