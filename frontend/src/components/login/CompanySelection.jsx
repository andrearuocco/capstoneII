import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import './CompanySelection.css'
import Select from 'react-select'

const customStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: "10px",
        border: "2px solid #0d6efd",
        padding: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
        backgroundColor: "#f8f9fa",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            backgroundColor: "#e9ecef"
        }
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0d8efd" : state.isFocused ? "#dce8ff" : "#fff",
        color: state.isSelected ? "#fff" : "#333",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "20px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#d6efd",
            color: "white"
        }
    })
}
function CompanySelection({ companies, onSelectCompany, onRegisterCompany, showCompanyRegistration }) {
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)
    const [alertVariant, setAlertVariant] = useState('danger')

    const options = companies.map(company => ({
        value: company._id,
        label: `🏢 ${company.companyName} ${company.address.street} ${company.address.city}`
    }))

    const handleSelection = () => {
        if (!selectedCompanyId) {
            setAlertVariant('danger')
            setAlertMessage("⚠️ Seleziona la tua azienda.")
            setTimeout(() => setAlertMessage(null), 3000) 
            return
        }
        onSelectCompany(selectedCompanyId)
    }

    return (
        <div>
            {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
            <Form.Group controlId="companySelection" className="mb-3">
                <Form.Label className="fw-bold text-primary">Seleziona la tua Azienda</Form.Label>
                <Select
                    options={options}
                    styles={customStyles}
                    placeholder="gestionaleaziendale's companies"
                    onChange={(selectedOption) => setSelectedCompanyId(selectedOption.value)}
                />
            </Form.Group>
            {!showCompanyRegistration ? (
                <>
                    <Button className="me-3 button-blue-po" onClick={handleSelection}>Login</Button>
                    <Button className="button-nvm-po" onClick={onRegisterCompany}>Registra Azienda</Button>
                </>
            ) : null}
        </div>
    )
}

export default CompanySelection
