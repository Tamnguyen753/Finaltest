import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/finaltest");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const orderSchema = new mongoose.Schema({
  _id: Number,
  item: String,
  price: Number,
  quantity: Number,
});

const inventorySchema = new mongoose.Schema({
  _id:Number,
  sku: String,
  description: String,
  instock: Number,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});


const NeworderSchema = new mongoose.Schema({
  products: [
    {
      sku: String,
      quantity: Number,
      description: String,
    },
  ],
});



const OrderModel = mongoose.model("Order", orderSchema);
const InventoryModel = mongoose.model("Inventory", inventorySchema);
const UserModel = mongoose.model("User", userSchema);
const NeworderModel= mongoose.model("Orders", NeworderSchema)

export { connectToDb, OrderModel, InventoryModel, UserModel, NeworderModel };
