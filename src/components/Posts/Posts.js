// logic for all posts that will appear

import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';   // CircularProgess is just a loading spinner
import { useSelector } from 'react-redux';  // going to initialize it as a hook
import Post from './Post/Post';
import useStyles from './styles';



const Posts = ( { setCurrentId }) => {

    const { posts, isLoading } = useSelector((state) => state.posts )   // here state is the redux store or local db and we are fetching all the posts from local db

    const classes = useStyles();

    if(!posts.length && !isLoading) return 'No Posts !';

    return (  
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3} >
                {
                    posts.map( (post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId = {setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}
 
export default Posts;