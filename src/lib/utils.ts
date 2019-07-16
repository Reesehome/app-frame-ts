export const getQueryString = (name: string) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.hash.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

export const setToken = (hash?: string | null) => {
    // 如果没有hash，相当于清空token
    if (!hash) return sessionStorage.removeItem("TOKEN_KEY");
    // Cookies.set('access_token', token, { expires: cookieExpires || 1 });
    sessionStorage.setItem("TOKEN_KEY", hash);
};

export const getToken = () => {
    // const token = Cookies.get(TOKEN_KEY);
    return sessionStorage.getItem("TOKEN_KEY");
};
