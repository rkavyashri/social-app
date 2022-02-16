import * as crypto from 'crypto';
export class Hash {
    /**
     * generates random string of characters i.e salt
     * @function
     * @param {number} length - Lenth of the random salt
     */
    public async generateSalt ( length ) {
        try {
            return crypto.randomBytes( Math.ceil( length / 2 ) )
                .toString( "hex" )
                .slice( 0, length );
        } catch ( err ) {
            throw err
        }
    }
    public async sha512 ( password, salt ) {
        try {
            const hash = crypto.createHmac( "sha512", salt );
            hash.update( password );
            const value = hash.digest( "hex" );
            return value;
        } catch ( err ) {
            throw err
        }
    }
}
