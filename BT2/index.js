import express from "express";
import { InventoryModel, OrderModel, UserModel, connectToDb } from "./db.js";
import authRouter from "./Routes/Routes.js";

const app = express();
app.use(express.json());
const importData = async () => {
  // Dữ liệu Order
  const orderData = [
    { "_id": 1, "item": "almonds", "price": 12, "quantity": 2 },
    { "_id": 2, "item": "pecans", "price": 20, "quantity": 1 },
    { "_id": 3, "item": "pecans", "price": 20, "quantity": 3 },
  ];

  // Dữ liệu Inventory
  const inventoryData = [
    { "_id": 1, "sku": "almonds", "description": "product 1", "instock": 120 },
    { "_id": 2, "sku": "bread", "description": "product 2", "instock": 80 },
    { "_id": 3, "sku": "cashews", "description": "product 3", "instock": 60 },
    { "_id": 4, "sku": "pecans", "description": "product 4", "instock": 70 },
  ];

  // Dữ liệu Users
  const usersData = [
    { "username": "admin", "password": "MindX@2022" },
    { "username": "alice", "password": "MindX@2022" },
  ];

  // Thêm dữ liệu vào MongoDB
  await OrderModel.insertMany(orderData);
  await InventoryModel.insertMany(inventoryData);
  await UserModel.insertMany(usersData);



  console.log("Data imported successfully!");
};

app.use('/',authRouter)




app.listen(3000, async () => {
  console.log("App is running at 3000");
  
  // Kết nối vào cơ sở dữ liệu
  await connectToDb();

  // Import dữ liệu vào MongoDB
  await importData();
});


