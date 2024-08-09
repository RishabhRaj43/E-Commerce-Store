const asyncHandler = (fn) => (req,res,next) =>{
  Promise.resolve(fn(req,res,next)).catch((error)=>{
    res.status(400).json({error:error.message})
  })
}

export default asyncHandler