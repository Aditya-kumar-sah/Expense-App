const transactionModel = require('../models/transactionModels')
//npm i moment for dates in both client and backend

const moment = require('moment')
const getAllTransaction = async(req,res) =>{
     try {
        const {frequency,selectDate,type} = req.body;
        const transaction = await transactionModel.find({  
         ...(frequency !== 'custom' ? {
            date : {
               $gt : moment().subtract(Number(frequency),'d').toDate(),
             },
         } : {
            date:{
               $gte: selectDate[0],
               $lte : selectDate[1]
            }
         }),
         userid:req.body.userid, 
        ...(type !== 'all' && {type} )
      });
        res.status(200).json(transaction)
     } catch (error) {
        res.status(500).json(error)
     }
}

const deleteTransaction = async(req,res) => {
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send("Transaction Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

const editTransaction = async(req,res) =>{
       try {
           await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload);
           res.status(200).send("Edit Successfull")
       } catch (error) {
         res.status(500).json(error)
       }
}

const addTransaction = async(req,res) =>{
      try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction Created')
      } catch (error) {
          console.log(error);
          res.status(500).json(error)
      }
}

module.exports = {getAllTransaction,addTransaction,editTransaction,deleteTransaction}