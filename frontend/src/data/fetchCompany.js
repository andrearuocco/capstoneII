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

    } catch (error) {
        return { error: 'Server down, try again.' }
    }
}

export const companyId = async (id) => {
    try {
        const res = await fetch(`${fetchCompanyUrl}/:id`, {
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
        return { error: 'Riprova più tardi' }
    }
}