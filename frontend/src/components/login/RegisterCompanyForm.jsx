import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './RegisterCompanyForm.css'
import { AnimatePresence, motion } from 'framer-motion'

function RegisterCompanyForm({ onSubmit, CloseRegisterCompany }) {
    const [exitAnim, setExitAnim] = useState(false)
    const [formData, setFormData] = useState({
        companyName: '',
        vatNumber: '',
        email: '',
        IBAN: '',
        street: '',
        city: '',
        postalCode: '',
        province: '',
        country: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData)
    }

    const handleGoBack = () => {
        setExitAnim(true) 
    }

    return (
        <AnimatePresence>
            {!exitAnim && (
                <motion.div
                    key="register-form"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                >
                    <Form onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-center align-items-start'>
                            <div>
                                <Form.Group>
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control placeholder="Company Name" style={{ textTransform: 'uppercase' }} type="text" required onChange={(e) => setFormData({ ...formData, companyName: e.target.value.toUpperCase() })} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>VAT Number</Form.Label>
                                    <Form.Control placeholder="P.IVA" inputMode="numeric" type="text" required onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })} onKeyDown={(e) => {
                                        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
                                        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control placeholder="Company's email" style={{ textTransform: 'uppercase' }} type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>IBAN</Form.Label>
                                    <Form.Control placeholder="IBAN" style={{ textTransform: 'uppercase' }} type="text" required onChange={(e) => setFormData({ ...formData, IBAN: e.target.value.toUpperCase() })} />
                                </Form.Group>
                            </div>

                            <div className='ms-2'>
                                <Form.Group>
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control placeholder="Indirizzo" style={{ textTransform: 'uppercase' }} type="text" onChange={(e) => setFormData({ ...formData, street: e.target.value.toUpperCase() })} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control placeholder="City" style={{ textTransform: 'uppercase' }} type="text" onChange={(e) => setFormData({ ...formData, city: e.target.value.toUpperCase() })} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control placeholder="CAP" type="text" inputMode="numeric" onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} onKeyDown={(e) => {
                                        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
                                        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control placeholder="Province" style={{ textTransform: 'uppercase' }} type="text" onChange={(e) => setFormData({ ...formData, province: e.target.value.toUpperCase() })} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control placeholder="Country" style={{ textTransform: 'uppercase' }} type="text" onChange={(e) => setFormData({ ...formData, country: e.target.value.toUpperCase() })} />
                                </Form.Group>
                            </div>
                        </div>

                        <div className='d-flex align-items-center'>
                            <Button type="submit" className="button-nvm-blue mt-3 me-2">Register Company</Button>

                            <Button onClick={handleGoBack} className="mt-3 button-nvm-po">Go Back</Button>
                        </div>
                    </Form>
                </motion.div>
            )}
            {exitAnim && (
                <motion.div
                    key="exiting"
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    onAnimationComplete={CloseRegisterCompany}
                />
            )}
        </AnimatePresence>
    )
}

export default RegisterCompanyForm

