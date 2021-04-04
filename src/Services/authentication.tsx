export const getUserEmail = () => {
    const userStr = localStorage.getItem('email');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const isLogged = () => {
    const isLogged = localStorage.getItem('isLogged');
    if(isLogged) return JSON.parse(isLogged);
    else return null;
}

export const login = (logged: boolean, token :string, username: string, public_id: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('isLogged', JSON.stringify(logged));
    localStorage.setItem('public_id', JSON.stringify(public_id));

}

export const getToken = () => {
    return localStorage.getItem('token') || null;
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('public_id');
    localStorage.setItem('isLogged', 'false');
    
}