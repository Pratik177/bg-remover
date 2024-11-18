import { Svix } from 'svix';
import userModel from '../modules/userModel.js';
// Api controller funtions to manage clerk user with database 
//http://localhost:3000/api/user/webhooks

const { webhook } = Svix;
const clerkWebhoooks = async (req, res) => {
    try{
        // create a svix  instance with your secret key
        const whook = new webhook(process.env.CLERK_WEBHOOK_SECRET);
        // verify the webhook signature

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
    });

    const {data, type} = req.body;
        switch(type){
            case "user.created":{

                const userData = {
                    clerkID: data.id,
                    email: data.email_addresses[0].email_address,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    photo:data.image_url,

                }

                await userModel.create(userData);
                res.json({})
                break;
            }
            case "user.updated":{

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    photo:data.image_url,

                }

                await userModel.findoneAndUpdate({clerkID: data.id}, userData);
                res.json({})

                break;
            }
            case "user.deleted":{

                await userModel.findoneAndDelete({clerkID: data.id});
                res.json({})

                break;

            }
        }


    }catch(err){
        console.log(err.message);
        res.json({success: false, message: err.message});
    }

};

export {clerkWebhoooks};