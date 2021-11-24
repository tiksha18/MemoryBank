import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts.js';


// Pagination is used to cut down on load time
const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts );  // reducer having access of number of pages

    const classes = useStyles();

    const dispatch = useDispatch(); // a hook

    useEffect(() => {
       if(page) dispatch(getPosts(page));  // successfully disptached an action 
    }, [page]);  // run it everytime when the page changes

    return (
        <Pagination 
            classes = {{ ul : classes.ul }}
            count = {numberOfPages}  // means 5 pages but this is static but we have to dynamically fetch and arrange the no. of pages according to the no. of posts
            page={Number(page) || 1}  // current page is 1 and this should also need to be dynamic
            variant="outlined"
            color="primary"
            renderItem = {(item) => (  // item is taken in this callback function as a prop
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate;