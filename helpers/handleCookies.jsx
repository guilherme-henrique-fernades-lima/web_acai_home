import { getCookie as next_getCookie, setCookie, deleteCookie as next_deleteCookie, hasCookie as next_hasCookie } from 'cookies-next';


export function createCookies(name, data, exp_time) {

    setCookie(
        name,
        data,
        {
            maxAge: exp_time ?? "",
            path: "/",
        }
    );

};

export function getCookie(name) {
    return next_getCookie(name);

}

export function deleteCookie(name) {
    next_deleteCookie(name);

}

export function hasCookie(name) {
    return next_hasCookie(name);

}