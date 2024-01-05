import { getToken } from "../Utils/index.js";
import { InventoryModel, NeworderModel, UserModel} from "../db.js";

const getInventory = async (req,res) => {
    try {
        const Inventory = await InventoryModel.find()
        res.send({
            message: "Thành công !",
            data: Inventory
        });
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
};

const login = async (req,res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await UserModel.findOne({
            username,
        });
        //find user
        if (!existingUser) {
          throw new Error("Tên đăng nhập không tồn tại !",409);
        }
        const matched = await UserModel.findOne({
            password,
        });
        if (!matched) {
            throw new Error("Mật khẩu sai !",409);
          }

        res.status(200).send({
          message: "Đăng nhập thành công !",
          data: getToken({
            id: existingUser.id,
          }),
        });
      } catch (error) {
        res.status(403).send({
          message: error.message,
        });
      }
};

const order = async (req,res) => {
    try {
        const { products } = req.body;
    
        if (!products || !Array.isArray(products) || products.length === 0) {
          return res.status(400).json({ error: "Invalid products data" });
        }
    
        // Tạo một đơn hàng mới
        const newOrder = NeworderModel.create({products});
    
        // Lưu đơn hàng vào cơ sở dữ liệu
         await newOrder.save();
    
        res.status(201).json({ message: "Order created successfully", order: newOrder });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}



export { getInventory, login ,order}