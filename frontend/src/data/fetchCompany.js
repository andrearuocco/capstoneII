const fetchCompanyUrl = `${process.env.REACT_APP_API_URL}/companies`

export const fetchGetCompanies = async () => {
    try {
        const res = await fetch(fetchCompanyUrl)
        const data = await res.json()
        return data
    } catch (err) {
        console.log("There are not companies, here.", err)
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
        return { data }
    } catch (error) {
        return { error: 'Server down, try again.' }
    }
}

export const companyWho = async (id) => {
    try {
        const res = await fetch(`${fetchCompanyUrl}/${id}`, {
            method: 'GET',
        })
        if (res.ok) {
            const data = await res.json()
            return data
        } else {
            const errorData = await res.json()
            return { error: errorData.message || 'Not Found' }
        }
    } catch (error) {
        return { error: 'Server down, try again.' }
    }
}

export const patchCompanyLogo = async (id, logo) => {
    try {

        const response = await fetch(`${fetchCompanyUrl}/${id}/logo`, {
            method: 'PATCH',
            body: logo,
        })
        if (!response.ok) {
            throw new Error('This company got a new logo.')
        }
        
    } catch (error) {
        console.error('Server down, try again.', error)
    }
}