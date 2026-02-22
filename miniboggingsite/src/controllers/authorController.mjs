import authorModel from "../models/authorModel.mjs";
const createAuthor= async (req,res)=>{
    try {
        let data= req.body;
        let author= await authorModel.create(data);
        return res.status(201).send({message:'ok',data:author})
    } catch (error) {
        if(error.message.includes('duplicate')){
            return res.status(400).send({message:"failed",error:error.message})
        }else if(error.message.includes('validation')){
            return res.status(400).send({message:"failed",error:error.message})
        }else{
            return res.status(500).send({message:"failed",error:error.message})
        }
    }
}
export {createAuthor};