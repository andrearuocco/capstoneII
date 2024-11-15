export const registerAdmin = async (formData, profileId) => {
    try {
        /* const employeeId = '6701296374a18dafd4ce3f3c' */
        const response = await fetch(`http://localhost:5000/profile/${profileId}/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Errore nella registrazione')
        }
        const data = await response.json()
        console.log('Sei un nuovo Admin:', data)
    } catch (error) {
        console.error('Riprova più tardi:', error);
    }
}