import { Webhook } from "svix";
import userModel from "../modules/userModel.js";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

const clerkWebhooks = async (req, res) => {
    try {
        // Verify webhook
        const wh = new Webhook(webhookSecret);
        const payload = JSON.stringify(req.body);
        wh.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        // Parse the webhook event
        const { type, data } = req.body;

        if (type === "user.created") {
            // Extract user data
            const userData = {
                clerkID: data.id,
                email: data.email_addresses[0].email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                photo: data.image_url,
            };

            // Save user to MongoDB
            await userModel.create(userData);

            console.log("User created:", userData);
            return res.status(200).json({ success: true, message: "User created" });
        }

        res.status(400).json({ success: false, message: "Unhandled event type" });
    } catch (err) {
        console.error("Webhook error:", err.message);
        res.status(400).json({ success: false, message: "Webhook verification failed" });
    }
};

export { clerkWebhooks };
