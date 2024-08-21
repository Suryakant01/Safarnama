import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ show, message, onClose, variant }) => {
    if (!show) return null;

    return (
        <Alert variant={variant}
            style={{
                position: 'fixed',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1050,
                width: '100%',
                maxWidth: '500px',
            }}
            onClose={onClose}
            dismissible >
            {message}
        </Alert>
    );
};

export default Notification;