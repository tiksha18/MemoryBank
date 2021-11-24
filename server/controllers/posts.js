import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    const { page } = req.query;  // getting the page number from url
    try 
    {
        const LIMIT = 3;  // no. of posts per page
        const startIndex = (Number(page) - 1) * LIMIT;  // getting the starting index of every page
        const total = await PostMessage.countDocuments({});  // counting the total number of posts in our db so as to display the no. of pages accordingly 
        // fetching posts from newest to oldest so we will be sorting them by id
        const posts = await PostMessage.find().sort({ _id : -1 }).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({ data : posts, currentPage : Number(page), numberOfPages : Math.ceil(total / LIMIT) });
    } 
    catch (error) 
    {
        res.status(404).json({
            message : error.message
        }) 
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try 
    {
        const title = new RegExp(searchQuery, 'i');  // search all the posts related to the search query ignoring the case sensitivity
        const posts = await PostMessage.find({ $or : [ { title }, { tags : { $in : tags.split(',') } }] });  
        res.json({ data : posts }); 
    } 
    catch (error) 
    {
        res.status(404).json({
            message : error.message
        }) 
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator : req.userId, createdAt: new Date().toISOString() });
    try 
    {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } 
    catch (error) 
    {
        res.status(409).json({
            message : error.message
        })
    }
}

export const updatePost = async (req, res) => {

    const { id : _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id} , { new : true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
    
    await PostMessage.findByIdAndRemove(id);

    res.json({ message : 'Post Deleted Successfully !' });
}

export const likePost = async (req, res) => {

    const { id } = req.params;

    if(!req.userId) return res.json({ message : 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));  // means user has already liked the post and now it will be a dislike

    if(index === -1)  // when user has not liked any of the posts then index value will be -1
    { // like the post => add a user like
        post.likes.push(req.userId);
    }
    else
    { // dislike a post => remove the user like
        post.likes = post.likes.filter((id) => id !== String(req.userId) ); 
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post , { new : true });

    res.json(updatedPost);
}