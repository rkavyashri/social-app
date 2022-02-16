
import * as Hapi from 'hapi';
const start = async () => {
  try {
    let routes = [

      {
        "allowedOrigin": [
          "*"
        ],
        "routeName": "authentication-route",
        "pathName": "v1",
        "version": "1.0",
        "apiName": "login"
      }
    ]

    const server = new Hapi.Server( {
      debug: {
        "request": [
          "error"
        ],
        "log": [
          "error"
        ]
      }
    } );
    server.connection( {
      host: "localhost",
      port: 3000,
    } );

    routes.forEach( ( serverRoute, index ) => {
      require( `./routes/${ serverRoute.pathName }/${ serverRoute.routeName }` )
        .default( server, serverRoute );
    } );

    server.start();
    console.log( 'Server running at:', server.info.uri );

  } catch ( err ) {
    console.error( 'Error starting server: ', err );
  }

}
start();
