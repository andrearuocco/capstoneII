import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

function DynamicAlert({ message, onClose }) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false)
            if (onClose) onClose();
        }, 3000)
        return () => clearTimeout(timer);
    }, [])

    return show ? (
        <Alert variant="info" dismissible onClose={() => setShow(false)}>
            {message}
        </Alert>
    ) : null;
}

export default DynamicAlert
