import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { patchCompanyLogo } from '../../data/fetchCompany'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './UploadCompanyLogo.css'

function UploadCompanyLogo({ show, onHide, companyId }) {
    const [logo, setLogo] = useState(null)
    const navigate = useNavigate()

    const handleUpload = async () => {
        const message = logo ? toast.success('New logo uploaded.') : toast.error('There is not a new logo for your company.')
        
        const formData = new FormData()
        formData.append('logo', logo)
        await patchCompanyLogo(companyId, formData)

        onHide()
        setTimeout(() => navigate('/dashboard'), 1000) 
    }    

    const handleClose = () => {
        toast.error('There is not a new logo for your company.')
        onHide()
        setTimeout(() => navigate('/dashboard'), 1000)
    }

    return (
        <Modal show={show} onHide={handleClose} centered className="custom-modal" backdropClassName='custom-backdrop'>
            <Modal.Header closeButton className="modal-header-custom">
                <Modal.Title className="modal-title-custom">Upload Company Logo</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-custom">
                <Form.Group>
                    <Form.Label>Company Logo</Form.Label>
                    <Form.Control type="file" onChange={(e) => setLogo(e.target.files[0])} />
                </Form.Group>
                <Button onClick={handleUpload} className="mt-3 button-nvm-blue">Upload</Button>
            </Modal.Body>
        </Modal>
    )
}

export default UploadCompanyLogo



