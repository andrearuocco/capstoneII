import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
function CompanySelection ({ companies, onSelectCompany, onRegisterCompany, showCompanyRegistration }) {
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)

    const handleSelection = () => {
        if (!selectedCompanyId) {
            setAlertMessage("Seleziona la tua azienda per accedere.")
            return;
        }
        onSelectCompany(selectedCompanyId)
    }

    return (
        <div>
            {alertMessage && <Alert variant='warning'>{alertMessage}</Alert>}
            <Form.Group controlId="companySelection" className="mb-3">
                <Form.Label>Seleziona la tua Azienda</Form.Label>
                <Form.Select onChange={(e) => setSelectedCompanyId(e.target.value)}>
                    <option value="">-- Seleziona la tua Azienda --</option>
                    {companies.map(company => (
                        <option key={company._id} value={company._id}>{company.companyName}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            {!showCompanyRegistration ? (<>
                <Button className="me-3" onClick={handleSelection}>Login</Button>

                <Button variant="secondary" onClick={onRegisterCompany}>Registra Azienda</Button>
            </>) : null}
        </div>
    )
}

export default CompanySelection