import * as Hapi from 'hapi';
import { AuthenticationHanlder } from '../../handlers/auth';
import { IRouteConfiguration } from '../../interfaces/route-configuration-interface'

/**
 * 
 * 
 * @export
 * @param {Hapi.Server} server 
 * @param {IRouteConfiguration} route 
 */
export default function ( server: Hapi.Server, route: IRouteConfiguration ) {
    const handler = new AuthenticationHanlder();
    server.bind( handler );
    server.route( {
        handler: handler.authentication,
        method: 'POST',
        path: `/${ route.pathName }/${ route.apiName }`,
    } );
}
