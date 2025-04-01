
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
        const data = await res.json()
        if (res.status === 200) {
            return { status: res.status, data:data }
        } else {
            return { status: res.status, error: data.message || 'Error to login' }
        }
    } catch (error) {
        return { status: 500, error: 'Server error' }
    }
}

export const me = async () => {
    try {
        const res = await fetch(`${fetchAuthUrl}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await res.json()
        if (res.status === 200) {
            return { status: res.status, data }
        } else {
            return { status: res.status, error: 'Unauthorized' }
        }
    } catch (error) {
        return { status: 500, error: 'Server error' }
    }
}
