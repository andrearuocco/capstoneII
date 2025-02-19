import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
function LoginForm ({ companyId, onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await onLogin(email, password, companyId)
        if (!response.success) {
            setAlertMessage(response.message)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            {alertMessage && <Alert variant='danger'>{alertMessage}</Alert>}
            <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Inserisci email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Inserisci password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Accedi</Button>
        </Form>
    )
}

export default LoginForm