const fetchProfileUrl = `${process.env.REACT_APP_API_URL}/user`

export const registerProfile = async (formData) => {
    try {
        const response = await fetch(fetchProfileUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Server down, try again.')
        }
        const data = await response.json()
        console.log('Welcome:', data)
    } catch (error) {
        console.error('Wait and try again.', error);
    }
}