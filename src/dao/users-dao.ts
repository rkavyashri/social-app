import PostgresDB from '../utils/postgres-db-util';
import { load } from '../utils/load-sql';
import { getDBConnConfig } from '../configs';
let postgres = new PostgresDB();
export class UserDao {


    public async getUserDetailsByUserName ( username ) {
        try {
            const pgdata = postgres.getPGPInstance( getDBConnConfig );
            let filepath = '../sql/user/user-authentication';
            let loadquery: any = await load( filepath )
            let data = await pgdata.dbInstance.any( loadquery, [ username ] )
            console.log( data )
            if ( data ) {
                return data;
            }
            else {
                throw ( 'Invalid Username' )
            }
        } catch ( err ) {
            throw ( err )

        }
    }
}