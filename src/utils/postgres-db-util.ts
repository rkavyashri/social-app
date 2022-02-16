import * as PGPromise from 'pg-promise';

export default class PostgresDB {

    private pgp: PGPromise.IMain;
    private static connectionPool: { [ key: string ]: PostgresDB } = {};
    private db: PGPromise.IDatabase<any>;
    private postgresDB: PostgresDB;
    private static queryFiles: { [ key: string ]: PGPromise.QueryFile } = {};

    constructor () {

    }

    public getPGPInstance ( connectionUrl ) {
        if ( PostgresDB.connectionPool[ this.getURL( connectionUrl ) ] == null ) {
            this.postgresDB = new PostgresDB();
            this.postgresDB.pgp = PGPromise();
            this.postgresDB.db = this.postgresDB.pgp( this.getURL( connectionUrl ) );
            PostgresDB.connectionPool[ this.getURL( connectionUrl ) ] = this.postgresDB;
        }
        return PostgresDB.connectionPool[ this.getURL( connectionUrl ) ];
    }

    public get dbInstance (): PGPromise.IDatabase<any> {
        return this.db;
    }

    private getURL ( config ) {
        return `postgres://${ config.username }:${ config.password }@${ config.host }:${ config.port }/${ config.dbname }`;
    }

    public sql ( filePath: string ): PGPromise.QueryFile {
        const array = filePath.split( '/' );
        const fileName = array[ array.length - 1 ];
        let query = null;
        let pgp = this.pgp;
        if ( PostgresDB.queryFiles[ fileName ] == null ) {
            query = new PGPromise.QueryFile( filePath, { minify: true } );
            PostgresDB.queryFiles[ fileName ] = query;
        } else {
            query = PostgresDB.queryFiles[ fileName ];
        }
        return query;
    }

    public hasMany ( query: PGPromise.QueryFile, obj?: any ) {
        return this.db.many( query, obj );
    }

    public hasOne ( query: PGPromise.QueryFile, obj?: any ) {
        return this.db.one( query, obj );
    }
    public batch ( query: PGPromise.QueryFile, paramArray?: any ) {
        let batchQueries = [];
        if ( paramArray == null )
            return this.db.any( query );
        else {
            paramArray.forEach( eachInput => {
                batchQueries.push( {
                    query: query, values: eachInput
                } );
            } );
        }
        let sql: string = this.pgp.helpers.concat( batchQueries );
        return this.db.any( sql );
    }
    public hasManyOrNone ( query: PGPromise.QueryFile, obj?: any ) {
        return this.db.manyOrNone( query, obj );
    }

    public hasNone ( query: PGPromise.QueryFile, obj?: any ) {
        return this.db.none( query, obj );
    }

    public closeConnection () {
        this.pgp.end();
    }
}