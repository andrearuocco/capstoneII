const fetchProfileUrl = `${process.env.REACT_APP_API_URL}/user`

export const registerProfile = async (formData) => {
    try {
        const response = await fetch(fetchProfileUrl, {
            
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        });
        /* if (!response.ok) {
            throw new Error('Server down, try again.')
        } */
        const data = await response.json()
        return { data }
    } catch (error) {
        return { error: 'Server down, try again.' }
    }
}

