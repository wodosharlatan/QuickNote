import { useLoginStore } from '@/stores/login'

export const login = async (username, password) => {
    // Send login request to server
    const responseServer = await fetch('http://' + import.meta.env.VITE_BACKEND_SERVER + '/login', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const response = await responseServer.json()

    if (response.message)
        return response.message
    if (!response.Token || response.Token.length != 22)
        return "SERVER ERROR!!!"

    const loginStore = useLoginStore()
    loginStore.loginToken = response.Token
    return "LoggedIn"
}