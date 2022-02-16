import * as nconf from 'nconf';
import * as path from 'path';

export function getDBConnConfig (): any {
    const configs = new nconf.Provider(
        {
            argv: true,
            env: true,
            store: {
                file: path.join( __dirname, `./db-configuration.json` ),
                type: 'file',
            },
        } );
    return <any> configs.get( 'postgresConn' );
}
