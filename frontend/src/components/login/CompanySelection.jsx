import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
function CompanySelection ({ companies, onSelectCompany, onRegisterCompany }) {
>>>>>>> parent of d5f6c4f (sab22)
=======
function CompanySelection ({ companies, onSelectCompany, onRegisterCompany, showCompanyRegistration }) {
>>>>>>> parent of 9e5ea69 (companyregistration)
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
<<<<<<< HEAD
<<<<<<< HEAD
            {!showCompanyRegistration ? (
                <>
                    <Button className="me-3 button-blue-po" onClick={handleSelection}>Login</Button>
                    <Button className="button-nvm-po" onClick={onRegisterCompany}>Registra Azienda</Button>
                </>
            ) : null}
=======
            <Button className="me-3" onClick={handleSelection}>Login</Button>
            <Button variant="secondary" onClick={onRegisterCompany}>Registra Azienda</Button>
>>>>>>> parent of d5f6c4f (sab22)
=======
            {!showCompanyRegistration ? (<>
                <Button className="me-3" onClick={handleSelection}>Login</Button>

                <Button variant="secondary" onClick={onRegisterCompany}>Registra Azienda</Button>
            </>) : null}
>>>>>>> parent of 9e5ea69 (companyregistration)
        </div>
    )
}

export default CompanySelection