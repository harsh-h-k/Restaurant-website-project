// MODULES 

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const app = express();
const Order = require('../models//Order')
const Customer = require('../models//Customer')

// PATHS 

const PublicPath = path.join(__dirname, "../public");
const PartialsPath = path.join(__dirname, "../views/partials");
const ViewsPath = path.join(__dirname, "../views");

// VARIABLES
var totalamt = 0;
var OrderCount = 0;
var Order_ID = 9000;
var ID = 0;


// USING EXPRESS AND HBS 

app.use(express.static(PublicPath))
app.set("view engine", "ejs")
app.set("views", ViewsPath)

app.use(bodyParser.urlencoded({ extended: true }))



// SERVER REQUEST AND RESPONSE 

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/index", (req, res) => {
    res.render("index");
})

app.get("/menu", (req, res) => {
    res.render("menu");
})

app.post("/submit", (req, res) => {

    const OrderID = () => {
        Order_ID = Order_ID + 1;
        return Order_ID
    }

    const OrderIn = async () => {
        try {

            var Oname = [req.body.dishName0, req.body.dishName1, req.body.dishName2, req.body.dishName3, req.body.dishName4, req.body.dishName5, req.body.dishName6, req.body.dishName7, req.body.dishName8, req.body.dishName9, req.body.dishName10, req.body.dishName11, req.body.dishName12, req.body.dishName13, req.body.dishName14
            ]

            var Oprice = [req.body.dishPrice0, req.body.dishPrice1, req.body.dishPrice2, req.body.dishPrice3, req.body.dishPrice4, req.body.dishPrice5, req.body.dishPrice6, req.body.dishPrice7, req.body.dishPrice8, req.body.dishPrice9, req.body.dishPrice10, req.body.dishPrice11, req.body.dishPrice12, req.body.dishPrice13, req.body.dishPrice14]

            var Oqty = [req.body.dishQty0, req.body.dishQty1, req.body.dishQty2, req.body.dishQty3, req.body.dishQty4, req.body.dishQty5, req.body.dishQty6, req.body.dishQty7, req.body.dishQty8, req.body.dishQty9, req.body.dishQty10, req.body.dishQty11, req.body.dishQty12, req.body.dishQty13, req.body.dishQty14]

            for (var i = 0; i < 15; i++) {

                var xx = Oname[i];
                var yy = Oprice[i];
                var zz = Oqty[i];
                if (zz > 0) {
                    totalamt = totalamt + (yy * zz);
                    console.log(totalamt)
                    OrderCount = OrderCount + 1;
                    console.log(`Total No. Of orders ${OrderCount}`)
                    const OrderDb = new Order({
                        Order: xx,
                        OrderPrice: yy,
                        OrderQty: zz,
                        Order_ID: Order_ID
                    })
                    const result = await OrderDb.save();
                    console.log(result);
                }

            }
        }
        catch (err) {
            console.log(err)
        }
    }
    OrderID()
    OrderIn()
    res.render("submit")
})

app.post("/Checkout", (req, res) => {

    const OrderID = () => {
        Order_ID = Order_ID + 0;
    }

    const CustomerIn = async () => {
        try {

            const CustomerDb = new Customer({
                Customer_ID: Order_ID,
                CustomerName: req.body.Cname,
                CustomerAddress: req.body.CAdd,
                CustomerContact: req.body.CNumber,
                CustomerEmail: req.body.CEmail,
            })
            const result = await CustomerDb.save();
            console.log(result);
        }
        catch (err) {
            console.log(err)
        }
    }
    OrderID()
    CustomerIn()
    res.render("Checkout")
})


app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/contact", (req, res) => {
    res.render("contact")

})

// READING DATA FROM DATABASE AND DISPLAYING IN HTML

app.get("/DisplayOrder", (req, res) => {

    Order.find({Order_ID: {$eq : Order_ID}}, function (err, data) {
        if (err) throw err;
        res.render("DisplayOrder", {
            row: data
        })
    })
})

app.get("/OrderPlaced", (req, res) => {

    Customer.find({Customer_ID: {$eq : Order_ID}}, function (err, data) {
        if (err) throw err;
        res.render("OrderPlaced", {
            row: data
        })
    })
})

app.get("/*", (req, res) => {
    res.render("404");
})




//SERVER LISTEN

app.listen(3000, () => {
    console.log("server started")
})