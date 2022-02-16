import { UserDao } from '../dao/users-dao';
import { Hash } from '../utils/hash';
export class AuthenticationHanlder {

    public async authentication ( request, reply ) {

        try {
            const username = request.payload.username;
            console.log( 'username ', username )
            const password = request.payload.password;
            this.authenticateUser( username, password );
            reply( true ).code( 200 )
        } catch ( err ) {
            reply( err ).code( 500 )
        }
    }

    private async authenticateUser ( argUsername, argPassword ) {
        try {
            let userDaoInstance = new UserDao();
            let data = await userDaoInstance.getUserDetailsByUserName( argUsername );
            let passequal = await this.isPasswordHashEqual( argPassword, data );
            console.log( "PasswordHash equality" );
            if ( passequal[ 'authenticated' ] ) {
                console.log( 'User Authentication Passed' )
                return ( true );
            } else {
                throw ( "User Authentication Failed" );
            }
        } catch ( err ) {
            throw err
        }
    }
    private async isPasswordHashEqual ( userpwd, data ) {
        try {
            let hashInstance = new Hash();
            const enteredPwdHash = await hashInstance.sha512( userpwd, data.salt );
            console.log( enteredPwdHash )
            if ( enteredPwdHash === data.password_hash ) {
                const data = {
                    authenticated: true,
                };
                return ( data );
            } else {

                throw ( "Invalid User Credentials" );
            }
        } catch ( err ) {
            throw ( err );
        }
    }
}
