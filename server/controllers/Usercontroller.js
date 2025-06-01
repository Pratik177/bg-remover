import { Webhook } from "svix";
import userModel from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();
//api controller funtion to manage clerk user with database
//const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

const clerkWebhooks = async (req, res) => {
   
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
     //   const payload = JSON.stringify(req.body);
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { data, type } = req.body;

        switch (type){
            case "user.created":{
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url

                }
                console.log("User Data:", userData);
                await userModel.create(userData);
                res.json({ success: true, message: "User created successfully" });

                break;
            }
            case "user.updated":{
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url
                }
                await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                res.json({ success: true, message: "User updated successfully" });
                break;
            }
            case "user.deleted":{
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({ success: true, message: "User deleted successfully" });

                break;
            }
        }



    } catch (err) {
        console.error("Error:", err.message);
        res.status(400).json({ success: false, message: err.message });
    }
};

export { clerkWebhooks };
