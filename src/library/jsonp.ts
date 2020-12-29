
export function getJsonpFile(url: string, callName: string) {
    const head = document.querySelector('head');
    const JSONP: HTMLScriptElement = document.createElement('script');
    JSONP.type = 'text/javascript';
    return new Promise((resolve, reject) => {
        // @ts-ignore
        window[callName] = (res: any) => {
            resolve(res);
            // @ts-ignore
            delete window[callName];
            JSONP.remove();
        };
        JSONP.src = `${url}?ts=${new Date().getTime()}`;
        head.appendChild(JSONP);
        setTimeout(() => {
            // @ts-ignore
            delete window[callName];
            JSONP.remove();
            reject('Timeout');
        }, 5000);
    })
};