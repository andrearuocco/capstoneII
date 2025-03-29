import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { patchCompanyLogo } from '../../data/fetchCompany_refactored'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function UploadCompanyLogo({ show, onHide, companyId }) {
    const [logo, setLogo] = useState(null)
    const navigate = useNavigate()

    const handleUpload = async () => {
        const message = logo ? toast.success('✅ New logo uploaded') : toast.error('⚠️ There is not a new logo for your company')
        if (logo) await patchCompanyLogo(companyId, logo)
        onHide()
        setTimeout(() => navigate('/dashboard'), 1000) 
    }    

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Company Logo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Company Logo</Form.Label>
                    <Form.Control type="file" onChange={(e) => setLogo(e.target.files[0])} />
                </Form.Group>
                <Button variant="primary" onClick={handleUpload} className="mt-3">Upload</Button>
            </Modal.Body>
        </Modal>
    )
}

export default UploadCompanyLogo



