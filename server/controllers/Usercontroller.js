import { Webhook } from "svix";
import userModel from "../models/userModel.js";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

const clerkWebhooks = async (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    try {
        const wh = new Webhook(webhookSecret);
        const payload = JSON.stringify(req.body);
        wh.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { type, data } = req.body;

        switch (type) {
            case "user.created":
                const userData = {
                    clerkID: data.id,
                    email: data.email_addresses[0]?.email_address || "No email",
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };

                await userModel.create(userData);
                console.log("User created:", userData);
                res.status(200).json({ success: true, message: "User created" });
                break;

            default:
                console.log("Unhandled event type:", type);
                res.status(400).json({ success: false, message: "Unhandled event type" });
        }
    } catch (err) {
        console.error("Error:", err.message);
        res.status(400).json({ success: false, message: err.message });
    }
};

export { clerkWebhooks };
