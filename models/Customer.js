const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/RestaurantDataBase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("CUSTOMER DataBase Created")
})
.catch((err)=>{
    console.log(err)
})

const OrderSchema = new mongoose.Schema({
    Customer_ID : Number,
    CustomerName: String,
    CustomerAddress: String,
    CustomerContact: Number,
    CustomerEmail: String,
    
})

const Customer = new mongoose.model("Customer",OrderSchema)

module.exports = Customer ;