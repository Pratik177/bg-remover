import { Webhook } from "svix";
import userModel from "../models/UserModel.js";

//api controller function to manage clerk user with database 
//http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req, res) => {
    try{
        //create a svix instance with the secret key
        const whook =new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(json.stringify(req.body),{ 
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        const {data, type}= req.body;

        switch(type){
            case "user.created":{
                //create a new user
                //add the user to the database
                const userData= {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                await userModel.create(userData);
                res.json({})
                
                break;
            }
            case "user.updated":{
                //update a  user
                //add the user to the database
                const userData= {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                await userModel.findOneAndUpdate({clerkId:data.id},userData);
                res.json({})
                break;
            }
            case "user.deleted":{
                //delete a  user
                //remove the user from the database
                await userModel.findOneAndDelete({clerkId:data.id});
                res.json({})

                break;
            }

        }


    }catch(err){
        console.log(err.message);
        res.json({success:false,message:err.message});
    }

};

export {clerkWebhooks};