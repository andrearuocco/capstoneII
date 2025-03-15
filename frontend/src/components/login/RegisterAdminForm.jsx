import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function RegisterAdminForm({ onSubmit }) {
    const [adminData, setAdminData] = useState({ firstName: '', lastName: '', email: '', password: '' }) //aggiungi 16.03

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(adminData)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" required onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value })} />
            </Form.Group>
            <Button type="submit" variant="success" className="mt-3">Register Admin</Button>
        </Form>
    )
}

export default RegisterAdminForm