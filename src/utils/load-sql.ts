'use strict';
let QueryFile = require( 'pg-promise' ).QueryFile;
let Path = require( 'path' );

export async function load ( file ) {
    {
        var fullPath = Path.join( __dirname, file );
        return new QueryFile( fullPath, {
            minify: true
        } );
    }
}