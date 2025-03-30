import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import './RegisterAdminForm.css'

function RegisterAdminForm({ companyId, onSubmit }) {
    const adminRoles = [
        { value: "Socio", label: "Socio" },
        { value: "Amministratore Delegato", label: "Amministratore Delegato" },
        { value: "Direttore Tecnico", label: "Direttore Tecnico" },
        { value: "Consigliere", label: "Consigliere" },
        { value: "Direttore", label: "Direttore" },
        { value: "Geometra", label: "Geometra" },
        { value: "Responsabile Risorse Umane", label: "Responsabile Risorse Umane" },
        { value: "Responsabile", label: "Responsabile" }
    ]
    
    const [adminData, setAdminData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        isAdmin: true,
        adminRole: '',
        companyId: companyId, 
        IBAN: '' // MODIFICHE 30 MARZO
    })

    /* useEffect(() => {
        console.log("✅ Received companyId in RegisterAdminForm:", companyId)
        if (companyId) {
            setAdminData((prev) => ({ ...prev, company: companyId }))
        }
    }, [companyId]) */

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(adminData)
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <div className='d-flex justify-content-center align-items-start'><div><Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" required value={adminData.firstName} onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" required value={adminData.lastName} onChange={(e) => setAdminData({ ...adminData, lastName: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required value={adminData.email} onChange={(e) => setAdminData({ ...adminData, email: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" required value={adminData.phone} onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })} />
            </Form.Group></div>

            <div className='ms-2'><Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required value={adminData.password} onChange={(e) => setAdminData({ ...adminData, password: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>IBAN</Form.Label>
                <Form.Control type="IBAN" required value={adminData.IBAN} onChange={(e) => setAdminData({ ...adminData, IBAN: e.target.value })} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Admin Role</Form.Label>
                <Select
                    value={adminRoles.find(role => role.value === adminData.adminRole)}
                    onChange={(selectedOption) => setAdminData({ ...adminData, adminRole: selectedOption.value })}
                    options={adminRoles}
                    placeholder="Select Admin Role"
                    isClearable
                />
            </Form.Group></div></div>

            <Button type="submit" className="mt-3 button-nvm-blue">Register Admin</Button>
        </Form>
    );
}

export default RegisterAdminForm;




