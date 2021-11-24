import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import React from 'react';
import Visibilty from '@material-ui/icons/Visibility';
import VisibiltyOff from '@material-ui/icons/VisibilityOff';


const Input = ({ name, handleChange, label ,half, autoFocus, type, handleShowPassword }) => {
    return (  
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name = {name}
                onChange = {handleChange}
                variant = "outlined"
                required
                fullWidth
                label = {label}
                autoFocus = {autoFocus}
                type = {type}
                InputProps = {name === 'password' ? {   // is ? ki jagah && tab lagta h react me jab second value null hoti hai
                    endAdornment : (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibilty /> : <VisibiltyOff /> }                            
                            </IconButton>
                        </InputAdornment>
                    )
                } : null }
            />
        </Grid>
    );
}
 
export default Input;