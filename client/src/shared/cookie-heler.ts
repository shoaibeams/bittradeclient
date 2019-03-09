
import Cookies from 'universal-cookie';

export class CookieHelper{

    static get(name)
    {   
        let cookie = new Cookies();
        return cookie.get(name);
    }

    static set(name, value, options?)
    {
        let cookie = new Cookies();
        cookie.set(name, value, options);
    }
}