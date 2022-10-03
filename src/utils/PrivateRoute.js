import React from 'react';
import {Redirect,Route} from 'react-router-dom'

const PrivateRoute = ({component:Component,...rest})=>{

    const value = true;
    
    return (
        <Route
            {...rest}
            render={(props) => {
                return value ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to='/login' />
                    );
                }
            }
        />
    );
}

export default PrivateRoute;