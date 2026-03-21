import jwt from 'jsonwebtoken'

//admin authenctiaction

const authAdmin = async (req, res, next) => {
    try {

        const { atoken} = req.headers // token to headers se lega 
        if(!atoken) {
            return res.json({success:false, message:"Not authorized Login again"})
        }
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET) // to verify jwt secret

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Not Authorized Login Again"})
        }
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
export default authAdmin

// import jwt from 'jsonwebtoken'
// const authAdmin = async (req, res, next) => {
//   try {
//     const { atoken } = req.headers

//     if (!atoken) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, login again"
//       })
//     }

//     const decoded = jwt.verify(atoken, process.env.JWT_SECRET)

//     // ✅ FIX: check email instead of full object
//     if (decoded.email !== process.env.ADMIN_EMAIL) {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized"
//       })
//     }

//     next()

//   } catch (error) {
//     console.error("Auth Error:", error.message)

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token"
//     })
//   }
// }
// export default authAdmin