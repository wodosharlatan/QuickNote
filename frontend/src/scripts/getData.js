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
    console.log(await responseServer.text());
    return await responseServer.json();
}