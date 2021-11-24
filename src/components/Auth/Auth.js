import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, Icon } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import useStyles from './styles';
import { useDispatch } from 'react-redux';  // it is a hook
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
// import Icon from './Icon';

const initialState = { firstName : '', lastName : '', email : '', password : '', confirmPassword : '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);  
    const [isSignup, setIsSignup ] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formData);
        if(isSignup) {
            dispatch(signup(formData, history));
        }
        else {
            dispatch(signin(formData, history));
        }
        
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });   // formdata me values set hongi ek ek karke 
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        //console.log(res);
        const result = res?.profileObj;  // ?. => this optional chaining operator will not give error even if we doesnt have an object 'res'
        const token = res?.tokenId;

        try {
            dispatch( { type : 'AUTH', data : { result, token } } );   // dispatch an action to reducer for google signing in
            history.push('/');  // redirecting back to home page after google signing in
        } catch (error) {
            console.log(error);
        }
    };
 
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In Failed ! Try Again Later !");
    };

    return (  
      
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3} >  
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" >{ isSignup ? 'Sign Up' : 'Sign In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2} >
                        {
                            isSignup && (
                                <React.Fragment>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </React.Fragment>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin 
                        clientId = "94455594099-k1fq8pn4tgah7ju86av3h7n8mbkcnbiq.apps.googleusercontent.com"
                        render = { (renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={ <Icon /> } 
                            variant="contained" > Google Sign In </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an Account? Sign In' : "Don't have an Account ? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
 
export default Auth;
