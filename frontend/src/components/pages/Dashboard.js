import React, { useEffect } from 'react'
import { Container, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ipad from '../data/productsImg/ipad.jpg'
import '../style/dashboard.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export const Dashboard = () => {
    const history = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('jwtToken')) {
            history('/login')
        }
    }, [])
    return (
        <>
            <div>
                <div className='content'>
                    <Container>

                        <Image fluid='true' src={ipad} alt='ipad' />
                        <Image fluid='true' src={ipad} alt='ipad' />
                        <Image fluid='true' src={ipad} alt='ipad' />
                    </Container>
                </div>
            </div>
        </>
    )
}


