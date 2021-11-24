import React, { useState ,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';  // useHistory => for renavigating to certain pages and search things; useLocation => to know that on which page we are currently
import ChipInput from 'material-ui-chip-input';

// setting up url search params that we gonna use to tell on which page we are currently on and what thing we are searching for => hence we will be using a useQuery() func provided by react-router-dom
function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {

    const classes = useStyles();  // callling useStyles as a hook

    const query = useQuery();  // using it as a hook
    const history = useHistory();
    const page = query.get('page') || 1;  // getting the page info on which we are i.e. it will read our URL and see if we have 'page' parameter in there and if so, then it will be going to populate page variable and if we dont have 'page' in URL then we will be landing on first page
    const searchQuery = query.get('searchQuery'); 

    const [currentId, setCurrentId] = useState(null);  // setting currentID of the post as null
    // const classes = useStyles();
    const dispatch = useDispatch(); // a hook

    const [search, setSearch] = useState(''); // setting default value of search as ''
    const [tags, setTags] = useState([]);  // tags in search bar willbe an empty array initially

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {  // key code 13 means user has pressed Enter key
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([ ...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const searchPost = () => {
        if(search.trim() || tags) {
            // dispatch => fetch search posts
            dispatch(getPostsBySearch({ search, tags : tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else {
            history.push("/"); // redirect to home page if the user has searched to nothing and still clicks the button
        }
    }
 
    return (  
        <Grow in>
            <Container maxWidth="xl" >
                <Grid container justifyContent="space-between" alignItems = "stretch" spacing = {3} className={classes.gridContainer} >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId = {setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                            name="search"
                            variant="outlined"
                            label="Search Memories"
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        /> 
                        <ChipInput 
                            style={{ margin : '10px 0' }}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label="Search Tags"
                            variant="outlined"
                        />
                        <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                    </AppBar>
                        <Form  currentId = {currentId} setCurrentId = {setCurrentId} />
                        { ( !searchQuery && !tags.length ) && (

                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page}/>
                            </Paper>
                        ) }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}
 
export default Home;