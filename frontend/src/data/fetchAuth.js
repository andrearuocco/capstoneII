const fetchAuthUrl = `${process.env.REACT_APP_API_URL}`

export const login = async (formValue) => {
    try {
        const res = await fetch(`${fetchAuthUrl}/auth/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(formValue)
        })
        if (res.ok) {
            const data = await res.json()
            return data
        } else {
            const errorData = await res.json()
            return { error: errorData.message || 'Error to login' }
        }
    } catch (error) {
        return { error: 'Server error' }
    }
}