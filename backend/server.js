const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); 
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const app = express();

const path = require("path"); 

app.use(cors({
  origin: 'http://localhost:3000'
})); 
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images"), {
  setHeaders: function (res, path) {
    res.set('Content-Type', 'image/jpeg');
  }
}));


const UserSchema=mongoose.Schema({
  name:String,
  phone:String,
  email:String,
  password:String,
  address:String
},{collection:'user'})

const User = mongoose.model("User", UserSchema);

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

connectDB();

const menu = [
  {
    image: "http://localhost:5000/images/dosa.jpg",
    title: "Dosa",
    description: "Food provides essential nutrients for overall health and well-being.",
    price: 50,
    rating: 4.5,
  },
  {
    image: "http://localhost:5000/images/idli.jpg",
    title: "Idli",
    description: "Food provides essential nutrients for overall health and well-being.",
    price: 40,
    rating: 5,
  },
  {
    image: "http://localhost:5000/images/upma.jpg",
    title: "Upma",
    description: "Food provides essential nutrients for overall health and well-being.",
    price: 35,
    rating: 4,
  },
  {
    image: "http://localhost:5000/images/roti.jpg",
    title: "Roti",
    description: "Food provides essential nutrients for overall health and well-being.",
    price: 25,
    rating: 4.5,
  },
  {
    image: "http://localhost:5000/images/paneer_butter_masala.jpg",
    title: "Paneer Butter Masala",
    description: "Food provides essential nutrients for overall health and well-being.",
    price: 40,
    rating: 5,
  },
  {
    image: "http://localhost:5000/images/aloo_paratha.jpg",
    title: "Aloo Paratha",
    description: "Food provides essential nutrients for overall health and well-being.",
    price: 30,
    rating: 4,
  },
  {
    image: "http://localhost:5000/images/french_fries.jpg",
    title: "French Fries",
    description: "Food provides essential nutrients for overall health and well-being.",
    price: 50,
    rating: 4.5,
  },
  {
    image: "http://localhost:5000/images/noodles.jpg",
    title: "Noodles",
    description: "Food provides essential nutrients for overall health and well-being.",
    price: 45,
    rating: 5,
  },
  {
    image: "http://localhost:5000/images/tomato_soup.jpg",
    title: "Tomato Soup",
    description: "Food provides essential nutrients for overall health and well-being.",
    price: 35,
    rating: 4,
  },
];

let cart = [];

app.get("/menu", (req, res) => {
  const menuWithQuantities = menu.map((item) => {
    const cartItem = cart.find((c) => c.title === item.title);
    return { ...item, quantity: cartItem ? cartItem.quantity : 0 }; 
  });
  res.json(menuWithQuantities);
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

app.post("/cart", (req, res) => {
  const { title, price, quantity } = req.body;

  if (quantity === 0) {
    cart = cart.filter((item) => item.title !== title);
  } else {
    const existingItem = cart.find((item) => item.title === title);
    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      cart.push({ title, price, quantity });
    }
  }

  res.json({ message: "Cart updated successfully", cart });
});

app.delete("/cart", (req, res) => {
  const { title } = req.body;
  cart = cart.filter((item) => item.title !== title);
  res.json({ message: "Item removed successfully", cart });
});

app.post("/checkout", async (req, res) => {
  const { customerName, customerEmail, items, subtotal, tax, total } = req.body;

  if (!customerName || !customerEmail) {
    return res.status(400).json({ message: "Customer name and email are required" });
  }
  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty, cannot place an order" });
  }

  try {
    const updatedItems = items.map((item) => ({
      ...item,
      totalPrice: item.price * item.quantity,
    }));

    const roundedTax = parseFloat(tax.toFixed(2));

    const order = new Order({
      customerName,
      customerEmail,
      items: updatedItems,
      subtotal,
      tax: roundedTax,
      total,
      createdAt: new Date(),
    });

    const savedOrder = await order.save();

    res.json({
      message: "Order placed successfully",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order" });
  }
});


app.get("/Signup", async (req, res) => {
  const { email, password } = req.query;

  try {
    const users = await User.find({ email }).limit(1);

    if (users.length > 0) {
      const user = users[0]; 
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).send({
          message: "User exists",
          user,
          address: user.address,
        });
      } else {
        res.status(401).send({ message: "Invalid password" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).send("Error checking user");
  }
});


app.post("/Signup", async (req, res) => {
  const { name, phone, email, password, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    const users = await User.find({ email }).limit(1);

    if (users.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      address,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Error adding user" }); 
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
