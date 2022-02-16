import PostgresDB from '../utils/postgres-db-util';
import { load } from '../utils/load-sql';
import { getDBConnConfig } from '../configs';
let postgres = new PostgresDB();
export class UserDao {


    public async getUserDetailsByUserName ( username ) {
        try {

            let connDetails = getDBConnConfig();
            const pgConn = postgres.getPGPInstance( connDetails );
            let filepath = '../sqls/user/user-authentication.sql';
            let loadquery: any = await load( filepath )
            let data = await pgConn.dbInstance.any( loadquery, [ username ] )
            console.log( data )
            if ( data && data.length > 0 ) {
                return data[ 0 ];
            }
            else {
                throw ( 'Invalid Username' )
            }
        } catch ( err ) {
            console.log( err )
            throw ( err )

        }
    }
}