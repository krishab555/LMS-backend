import { UserModel, validateUserSchema } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser= async(req,res) => {

    try {
      const reqBody = req.body;
      
      const validateduser = validateUserSchema.validate(reqBody);
      
      if (validateduser.error) {
        return res.json({
          success: false,
          message: validateduser.error.message,
        })
      }
        const foundUser = await UserModel.find({email: reqBody.email});

        if(foundUser.length>0){
            return res.json({
                sucess:false,
                message:`user with email ${reqBody.email}already exist`,
            })
      }
      
      // const newuserInfo = {
      //   email: reqBody.email,
      //   phoneNumber: reqBody.phoneNumber,
      //   password: reqBody.password,
      //   address: reqBody.address,
      //   name: reqBody.name,
      // };


        const newUser =await UserModel.create(validateduser.value);

return res.json({
    sucess:true,
    data:newUser,
    message:`Dear ${newUser.name},Welcome to LMS.`,
})
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message,
        })
    }
}

export const getUserController = async(req, res) => {
    try{
    const newUser= await UserModel.find();
  res.json({
    success: true,
    data:newUser,
  })
}catch(error){
    console.log(error);
    res.json({
        success: false,
        message:error,
      });
}
};


export const updateUserController=async(req, res) => {
 try {
  const { id: UserId } = req.params;
  const reqBody = req.body;

  const foundUser = await UserModel.findById(UserId);

  if (foundUser) {
    const updatedUser = await UserModel.findByIdAndUpdate(UserId, reqBody, {
      new: true,
    });

    return res.json({
      success: true,
      data: updatedUser,
    });
  }
  res.json({
    success: false,
    message: `user with id:${UserId} not found`,
  });

 } catch (error) {
  console.log(error);
  res.json({
    success: false,
    message: error.message,
  });
 }
   
  };

  export const deleteuserController=async(req, res) => {
     try {
      const { id: UserId } = req.params;
  
      const foundUser = await UserModel.findById(UserId);
  
      if (foundUser) {
        await UserModel.findByIdAndDelete(UserId);
  
        return res.json({
          success: true,
          message: `User with id:${UserId} has been deleted`,
        });
      }
  
      res.json({
        success: false,
        message: `User with id:${UserId} not found`,
      });
      
     } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
     }
  
      res.json({
        success: true,
        message: "This is delete route of user",
      });
    };

    export const loginUser =async(req,res) => {
      try {
        
         const reqBody =req.body;

         const foundUser = await UserModel.findOne({email: reqBody.email});

         console.log(foundUser);

         if(!foundUser){

          return res.json({
            success: false,
            message:"Invaid Credentials!!1"
          });
         }

         const isPasswordMatched = await foundUser.isPasswordValid(reqBody.password);
         if(isPasswordMatched){
           const token = await generateToken({_id: foundUser?._id});


           if(!token){
            return res.json({
              success: "Something went wrong ",
            });
           }
          const userData={
            name:foundUser.name,
            email:foundUser.email,
            address:foundUser.address,
            phoneNumber:foundUser.phoneNumber,
            token:token
          };


          res.json({
           success:true,
           data:userData,
           message:`Welcome back ${foundUser.name}`,
          })
         }

         res.json({
           success: false,
           message: "Invaid Credentials!!1",
         });
      } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message:error.message,
        });
      }
    }