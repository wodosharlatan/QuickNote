export const getJsonServer = async (address,token,params) => {
    // Send login request to server
    const responseServer = await fetch('http://' + import.meta.env.VITE_BACKEND_SERVER + '/' + address, {
        method: 'POST',
        // Combine params if more
        body: JSON.stringify(Object.assign({},{token: token},params)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await responseServer.json();
}