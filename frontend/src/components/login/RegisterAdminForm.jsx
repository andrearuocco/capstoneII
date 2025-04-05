import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import './RegisterAdminForm.css'
import reactSelectStyles from '../context/ReactSelectStyles'
import { toast } from 'react-toastify'

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
    
    const [confirmPassword, setConfirmPassword] = useState('') // PROVE 5 APRILE
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
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (adminData.password !== confirmPassword) {
            toast.error("Check your data and try again.")
            return;
        }

        onSubmit(adminData) // 02 APR.:onSubmit(adminData)
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <div className='d-flex justify-content-center align-items-start'>
                <div>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="EasyToUse" style={{ textTransform: 'uppercase' }} type="text" required value={adminData.firstName} onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value.toUpperCase() })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="EasyToUse" style={{ textTransform: 'uppercase' }} type="text" required value={adminData.lastName} onChange={(e) => setAdminData({ ...adminData, lastName: e.target.value.toUpperCase() })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="EasyToUse" style={{ textTransform: 'uppercase' }} type="email" required value={adminData.email} onChange={(e) => setAdminData({ ...adminData, email: e.target.value.toLowerCase() })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control placeholder="EasyToUse" style={{ textTransform: 'uppercase' }} type="text" inputMode="numeric" required value={adminData.phone} onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })} onKeyDown={(e) => {
                            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
                            if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                e.preventDefault();
                            }
                        }} />
                    </Form.Group>
                </div>

                <div className='ms-2'>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="EasyToUse" required value={adminData.password} onChange={(e) => setAdminData({ ...adminData, password: e.target.value })} />
                    </Form.Group>

                    {/* PROVE 5 APRILE */}<Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="EasyToUse"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>{/* PROVE 5 APRILE */}

                    <Form.Group>
                        <Form.Label>IBAN</Form.Label>
                        <Form.Control placeholder="EasyToUse" style={{ textTransform: 'uppercase' }} type="IBAN" required value={adminData.IBAN} onChange={(e) => setAdminData({ ...adminData, IBAN: e.target.value.toUpperCase() })} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Admin Role</Form.Label>
                        <Select
                            value={adminRoles.find(role => role.value === adminData.adminRole)}
                            onChange={(selectedOption) => setAdminData({ ...adminData, adminRole: selectedOption.value })}
                            options={adminRoles}
                            placeholder="Select Admin Role"
                            isClearable
                            styles={reactSelectStyles}
                        />
                    </Form.Group>
                </div>
            </div>

            <Button type="submit" className="mt-3 button-nvm-blue">Register Admin</Button>
        </Form>
    )
}

export default RegisterAdminForm;




