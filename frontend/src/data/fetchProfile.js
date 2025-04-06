const fetchProfileUrl = `${process.env.REACT_APP_API_URL}/user`

export const registerProfile = async (formData) => {
    try {
        const res = await fetch(fetchProfileUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (res.status === 201 || res.status === 200) {
            return { status: res.status, data }
        } else {
            return { status: res.status, error: data.message || 'Registration failed.' }
        }
    } catch (error) {
        return { status: 500, error: 'Server down, try again.' }
    }
}
