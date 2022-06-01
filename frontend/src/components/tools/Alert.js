import React, { useState } from 'react'
import { Col, Toast, ToastBody } from 'react-bootstrap'
import logo from '../data/img/warning.png'
export const Alert = (props) => {
    const [show, setShow] = useState(true)
    const {err} = props
    return (
        <>
            {/* <Col xs={6} style={{ margin: '5px', position: 'absolute' , zIndex: '1' }}>
                <Toast onClose={() => {
                    setShow(false)
                }} show={true} delay={3000} autohide bg='warning'>
                    <Toast.Header className="me-auto">
                        <img
                            src={logo}
                            className="rounded me-2"
                            alt=""
                            style={{ width: '20px', height: '20px' }}
                        />
                        <strong className='text-dark'>Warning</strong>
                    </Toast.Header>
                    <ToastBody>
                        {err}
                    </ToastBody>
                </Toast>
            </Col> */}
        </>
    )
}
