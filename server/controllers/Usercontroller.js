import { Webhook } from "svix";
import userModel from "../modules/userModel.js";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

const clerkWebhooks = async (req, res) => {
    try {
        // Verify webhook signature
        const wh = new Webhook(webhookSecret);
        const payload = JSON.stringify(req.body);

        wh.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { type, data } = req.body;

        // Handle different event types
        switch (type) {
            case "user.created": {
                // Extract user data
                const userData = {
                    clerkID: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };

                // Save user in MongoDB
                await userModel.create(userData);
                console.log("User created in database:", userData);
                res.status(200).json({ success: true, message: "User created" });
                break;
            }
            case "user.updated": {
                const updates = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };

                await userModel.findOneAndUpdate({ clerkID: data.id }, updates, { new: true });
                console.log("User updated in database:", updates);
                res.status(200).json({ success: true, message: "User updated" });
                break;
            }
            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkID: data.id });
                console.log("User deleted from database:", data.id);
                res.status(200).json({ success: true, message: "User deleted" });
                break;
            }
            default:
                res.status(400).json({ success: false, message: "Unknown event type" });
        }
    } catch (err) {
        console.error("Webhook error:", err.message);
        res.status(400).json({ success: false, message: "Webhook verification failed" });
    }
};

export { clerkWebhooks };
