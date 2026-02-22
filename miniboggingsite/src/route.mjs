import express from 'express';
import { createAuthor } from './controllers/authorController.mjs';
import { createBlog, deleteBlog, deleteBlogWithQuery, getBlogs, publishedBlog, updateBlog } from './controllers/blogController.mjs';
const router= express.Router();
router.get('/api',(req,res)=>{
    return res.status(200).send({message:"ok"})
})
router.post('/authors',createAuthor)
router.post('/blogs',createBlog)
router.get('/blogs',getBlogs)
router.put('/blogs/:blogId',updateBlog)
router.delete('/blogs/:blogId',deleteBlog)
router.delete('/blogs',deleteBlogWithQuery)
router.get('/blogs/published',publishedBlog)
export default router;