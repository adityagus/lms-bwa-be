import { ZodError } from "zod";

export const validateRequest = (schema) => async (req, res, next) => {
  try{
    schema.parse(req.body)
    next();
  }catch(error){
    console.log(error)
    if(error instanceof ZodError){
      const errorMessages = error.issues.map(err => err.message)
      
      return res.status(300).json({error: "Invalid Request", details: errorMessages})
    }
    res.status(500).json({error: error})
  }
}