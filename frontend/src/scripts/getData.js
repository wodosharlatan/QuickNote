import { useLoginStore } from '@/stores/login'

export const getJsonServer = async (address,params) => {
    const loginStore = useLoginStore()
    // Send login request to server
    console.log('http://' + import.meta.env.VITE_BACKEND_SERVER + '/' + address);
    const responseServer = await fetch('http://' + import.meta.env.VITE_BACKEND_SERVER + '/' + address, {
        method: 'POST',
        // Combine params if more
        body: JSON.stringify(Object.assign({},{token: loginStore.loginToken},params)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await responseServer.json();
}

export const deleteJsonServer = async (address,params) => {
    const loginStore = useLoginStore()
    // Send login request to server
    console.log('http://' + import.meta.env.VITE_BACKEND_SERVER + '/' + address);
    const responseServer = await fetch('http://' + import.meta.env.VITE_BACKEND_SERVER + '/' + address, {
        method: 'DELETE',
        // Combine params if more
        body: JSON.stringify(Object.assign({},{token: loginStore.loginToken},params)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await responseServer.json();
}