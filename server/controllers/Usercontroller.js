import { Webhook } from "svix";
import dotenv from "dotenv";
dotenv.config();
//api controller funtion to manage clerk user with database
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

const clerkWebhooks = async (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("Webhook Secret:", webhookSecret); // Debug the secret

    try {
        const wh = new Webhook(webhookSecret);
        const payload = JSON.stringify(req.body);
        wh.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { type, data } = req.body;

        if (type === "user.created") {
            console.log("User Created Event:", data);
            res.status(200).json({ success: true, message: "User created" });
        } else {
            res.status(400).json({ success: false, message: "Unhandled event type" });
        }
    } catch (err) {
        console.error("Error:", err.message);
        res.status(400).json({ success: false, message: err.message });
    }
};

export { clerkWebhooks };
