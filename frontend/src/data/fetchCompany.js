
const fetchCompanyUrl = `${process.env.REACT_APP_API_URL}/companies`

export const fetchGetCompanies = async () => {
    try {
        const res = await fetch(fetchCompanyUrl)
        const data = await res.json()
        if (res.status === 200) {
            return { status: res.status, data }
        } else {
            return { status: res.status, error: 'Error loading companies.' }
        }
    } catch (err) {
        return { status: 500, error: 'Server down, try again.' }
    }
}

export const createCompany = async (newCompany) => {
    try {
        const res = await fetch(fetchCompanyUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(newCompany)
        })
        const data = await res.json()
        if (res.status === 200) {
            return { status: res.status, data: data }
        } else {
            return { status: res.status, error: data.message || 'Creation failed.' }
        }
    } catch (error) {
        return { status: 500, error: 'Server down, try again.' }
    }
}

export const companyWho = async (id) => {
    try {
        const res = await fetch(`${fetchCompanyUrl}/${id}`, {
            method: 'GET',
        })
        const data = await res.json()
        if (res.status === 200) {
            return { status: res.status, data }
        } else {
            return { status: res.status, error: data.message || 'Not Found' }
        }
    } catch (error) {
        return { status: 500, error: 'Server down, try again.' }
    }
}

export const patchCompanyLogo = async (id, logo) => {
    try {
        const res = await fetch(`${fetchCompanyUrl}/${id}/logo`, {
            method: 'PATCH',
            body: logo,
        })
        const data = await res.json()
        if (res.status === 200) {
            return { status: res.status, data }
        } else {
            return { status: res.status, error: data.message || 'Upload failed' }
        }
    } catch (error) {
        return { status: 500, error: 'Server down, try again.' }
    }
}
