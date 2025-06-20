export const checkpermission = (req, res, next) => {
    try {
        const user = req.user;

        if (user.role !== "staff" || user.role !== "Admin")
            
            return res.json({
                success: false,
                message: "you dont have authorization to perform that action!",
            });
        next();
        
    } catch (error) {
        
       

    }
}