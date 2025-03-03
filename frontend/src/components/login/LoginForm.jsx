import React, { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
<<<<<<< HEAD

<<<<<<< HEAD
function LoginForm ({ companyId, onLogin, showCompanyRegistration, alertMessage, alertVariant }) {
=======
function LoginForm ({ companyId, onLogin }) {
>>>>>>> parent of d5f6c4f (sab22)
=======
function LoginForm ({ companyId, onLogin, showCompanyRegistration}) {
>>>>>>> parent of 9e5ea69 (companyregistration)
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