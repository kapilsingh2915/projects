import blogModel from "../models/blogModel.mjs";
import authorModel from "../models/authorModel.mjs";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
const createBlog= async (req,res)=>{
    try {
        let data=req.body;
        let authorId=data.authorId;
        if(!authorId){
            return res.status(400).send({message:'failed',error:"author id is required"})
        }
        if(!mongoose.Types.ObjectId.isValid(authorId)){
            return res.status(400).send({message:'failed',error:"author id is not valid"})
        }
        let author= await authorModel.findById(authorId);
        if(author==null){
            return res.status(400).send({message:'failed',error:"author not found"})
        }
        let blog= await blogModel.create(data);
        return res.status(201).send({status:true,data:blog});
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

const getBlogs= async (req,res)=>{
    try {
        let query={isDeleted:false,isPublished:true};
        let {authorid,category,tag,subcategory}=req.query;
        if(authorid){
            query.authorId=authorid;
        }
        if(category){
            query.category=category;
        }
        if(tag){
            query.tags={$in:tag};
        }
        if(subcategory){
            query.subcategory={$in:subcategory};
        }
        let blogs= await blogModel.find(query);
        if(blogs.length===0){
            return res.status(404).send({"status":false, "message": "Blogs not found"})
        }
        return res.status(200).send({"status":true, "message": "Blogs list",data:blogs})
    } catch (error) {
        return res.status(500).send({message:"failed",error:error.message})
    }
}
const updateBlog=async (req,res)=>{
    try {
        let {title, body,tags,subcategory}=req.body;
        let {blogId}=req.params;
        if(!mongoose.Types.ObjectId.isValid(blogId)){
            return res.status(400).send({message:'failed',error:"author id is not valid"})
        }
        let oldBlog= await blogModel.findOne({_id:blogId,isDeleted:false});
        if(oldBlog==null){
            return res.status(404).send({status:false,message:"blog not found"})
        }
        let data={}
        if(title){
            data.title=title;
        }
        if(body){
            data.body=body;
        }
        data.isPublished=true;
        data.publishedAt=new Date();
        if(!Array.isArray(tags)&&tags.length===0){
            return res.status(400).send({status:"failed",message:"tags must be an array"})
        }
        if(!Array.isArray(subcategory)&&subcategory.length===0){
            return res.status(400).send({status:"failed",message:"subcategory must be an array"})
        }
        let blog= await blogModel.findByIdAndUpdate(blogId,{$set:data,$addToSet:{tags:{$each:tags},subcategory:{$each:subcategory}}},{new:true});
        // let blog= await blogModel.findById(blogId);
        return res.status(200).send({status:true,message:"Blog updated successfully",data:blog});
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
const deleteBlog= async (req,res)=>{
    try {
        let {blogId}=req.params;
        let blog= await blogModel.findOne({_id:blogId,isDeleted:false});
        if(blog==null){
            return res.status(404).send({status:false,message:"Blog does not exist"})
        }
        await blogModel.findByIdAndUpdate(blogId,{$set:{isDeleted:true,deletedAt:Date.now()}});
        return res.status(200).send({});
    } catch (error) {
        return res.status(500).send({message:"failed",error:error.message})
    }
}
const deleteBlogWithQuery= async(req,res)=>{
     try {
       let { authorId, category, tag, subcategory, unpublished } = req.query;
       let query={isDeleted:false}
       if(authorId){
        query.authorId=authorId;
       }
       if(category){
        query.category=category;
       }
       if(tag){
        query.tags=tag;
       }
       if(subcategory){
        query.subcategory=subcategory;
       }
       if(unpublished!==undefined){
        if(unpublished){
          query.isPublished=false;
        }else{
          query.isPublished=true;
        }
       }
        let blog= await blogModel.findOne(query);
        if(blog==null){
            return res.status(404).send({status:false,message:"Blog does not exist"})
        }
        await blogModel.findByIdAndDelete(blog["_id"],{$set:{isDeleted:true,deletedAt:Date.now()}});
        return res.status(200).send({});
    } catch (error) {
        return res.status(500).send({message:"failed",error:error.message})
    }
}
const publishedBlog= async (req,res)=>{
    try {
        let blogs= await blogModel.aggregate([{$match:{isPublished:true}}]);
        return res.status(200).send({status:true,data:blogs});
    } catch (error) {
        return res.status(500).send({message:"failed",error:error.message})
    }
}
export {createBlog,getBlogs,updateBlog,deleteBlog,deleteBlogWithQuery,publishedBlog};