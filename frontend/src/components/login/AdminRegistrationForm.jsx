import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { registerProfile } from '../../data/fetchProfile'
function AdminRegistrationForm ({ companyId }) {
    const [adminData, setAdminData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        isAdmin: true,
        adminRole: '',
        companyId: companyId,
        password: '',
    })
    const [alertMessage, setAlertMessage] = useState(null)

    const handleChange = (e) => {
        setAdminData({ ...adminData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await registerProfile(companyId, adminData)
        if (!response.success) {
            setAlertMessage(response.message)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            {alertMessage && <Alert variant='danger'>{alertMessage}</Alert>}
            <Form.Group controlId="firstName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="lastName" className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="adminRole" className="mb-3">
                <Form.Label>Admin Role</Form.Label>
                <Form.Select
                    onChange={handleChange}
                    defaultValue="Direttore"
                >
                    <option value="Socio">Socio</option>
                    <option value="Amministratore Delegato">Amministratore Delegato</option>
                    <option value="Direttore Tecnico">Direttore Tecnico</option>
                    <option value="Consigliere">Consigliere</option>
                    <option value="Direttore">Direttore</option>
                    <option value="Geometra">Geometra</option>
                    <option value="Responsabile Risorse Umane">Responsabile Risorse Umane</option>
                    <option value="Responsabile">Responsabile</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Register Admin
            </Button>
        </Form>
        /*
        <Form onSubmit={handleSubmit}>
            {alertMessage && <Alert variant='danger'>{alertMessage}</Alert>}
            <Form.Group controlId="firstName" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="lastName" className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control type="text" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="text" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Registra Admin</Button>
        </Form> 
        */
    )
}

export default AdminRegistrationForm