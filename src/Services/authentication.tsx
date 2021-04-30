export const getUsername = () => {
    const userStr = localStorage.getItem('username');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const isLogged = () => {
    const isLogged = localStorage.getItem('isLogged');
    if(isLogged) return true;
    else return false;
}

export const login = (logged: boolean, token :string, username: string, public_id: string, fname: string) => {
    // const new_token = token.replace('"', '')
    // const new_publicId = public_id.replace('"', "")
    localStorage.setItem('token', token);
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('isLogged', JSON.stringify(logged));
    localStorage.setItem('public_id', JSON.stringify(public_id));
    localStorage.setItem('fname', JSON.stringify(fname));

}

export const getToken = () => {
    return localStorage.getItem('token') || null;
}

export const getPublicId = () => {
    return localStorage.getItem('public_id') || "";
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('public_id');
    localStorage.removeItem('isLogged');
    
}