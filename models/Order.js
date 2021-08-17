const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/RestaurantDataBase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("ORDER DataBase Created")
})
.catch((err)=>{
    console.log(err)
})


const OrderSchema = new mongoose.Schema({
    Order: String,
    OrderPrice: Number,
    OrderQty: Number,
    Order_ID : Number,
})

const Order = new mongoose.model("Order",OrderSchema)

module.exports = Order ;