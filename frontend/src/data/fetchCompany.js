const fetchCompanyUrl = `${process.env.REACT_APP_API_URL}/companies`

export const fetchGetCompanies = async () => {
    try {
        const res = await fetch(fetchCompanyUrl)
        const data = await res.json()
        return data
    } catch (err) {
        console.log("Aziende non recuperate.", err)
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
        return { error: 'Riporva più tardi.' }
    }
}