const TOKEN_KEY = 'if_acsess_token'
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)