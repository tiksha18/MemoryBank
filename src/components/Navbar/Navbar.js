import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import memoriesText from '../../images/memoriesText.png';
import memoriesLogo from '../../images/memoriesLogo.png'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';


const Navbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));  // retrieving real user from local storage/ local db/ redux named with 'profile'
    
    // renavigating automatically to the memories page or the home page so we need not to do it manually after signing in from google account
    useEffect(() => {
        const token = user?.token;
        
        // see that even after the 1 hour the token is exists or not
        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime() ) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);   // whenever location changes that is if user signs in using google account then simply call setUser method in useEffect
    
    const logout = () => {
        dispatch({ type : "LOGOUT" });
        history.push('/');
        setUser(null);  // after logging out, the user has to be set null 
    }

    return (  
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            
            <Toolbar className={classes.toolbar} >
                { user ? (
                    <div className={classes.profile} >
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
                ) }            
            </Toolbar>

        </AppBar>
    );
}
 
export default Navbar;