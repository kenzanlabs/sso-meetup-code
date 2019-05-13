import auth0, {Auth0DecodedHash, Auth0Error, Auth0ParseHashError, Auth0UserProfile} from 'auth0-js';
import moment from 'moment'

import history from '../history';

export default class Auth {
    public auth = new auth0.WebAuth({
        clientID: 'wB4WkOC0IXCh5oDvMPKOl18HR7Yop1wd',
        domain: 'dev-l7xeytqx.auth0.com',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile'
    });

    private accessToken: string | undefined | null;
    private expiresAt: number;
    private idToken: string| undefined | null;
    private userProfile: Auth0UserProfile | undefined | null;

    public handleAuthentication = () => {
        this.auth.parseHash((err: Auth0ParseHashError | null, authResult: Auth0DecodedHash | null) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.redirectToHome();
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    };

    public getProfile = () => {
        return this.userProfile
    }

    public fetchProfile = (cb: (err: Auth0Error | null, pf: Auth0UserProfile | null) => any) => {
        if(this.accessToken) {
            this.auth.client.userInfo(this.accessToken, (err, profile) => {
                if (profile) {
                    this.userProfile = profile;
                }
                cb(err, profile);
            });
        }

    }

    public getAccessToken = () => {
        return this.accessToken
    };

    public getIdToken = () => {
        return this.idToken
    };

    public login = () => {
        this.auth.authorize()
    };

    public logout = () =>  {
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;
        this.userProfile = null;

        localStorage.removeItem('isLoggedIn');

        this.auth.logout({
            returnTo: window.location.origin
        });
    };

    public isAuthenticated = () =>  {
        const expiresAt = this.expiresAt;
        console.log('expiresAt: ', moment( expiresAt ).calendar());

        return new Date().getTime() < expiresAt;
    };

    public renewSession = () => {
        this.auth.checkSession({}, (err?: Auth0ParseHashError | null, authResult?: Auth0DecodedHash | null) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }

    private setSession(authResult: Auth0DecodedHash) {
        const expiresAt = ((authResult.expiresIn || 0) * 1000) + new Date().getTime();
        
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;

        this.redirectToHome()
    }

    private redirectToHome = () => {
        history.replace('/');
    }

}