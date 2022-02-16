import { UserDao } from '../dao/users-dao';
export class AuthenticationHanlder {

    public async authentication ( request, reply ) {

        try {
            const username = request.payload.userName;
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

        } catch ( err ) {
            throw err
        }
    }

}
