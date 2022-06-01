import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const ToolBox = () => {
    const btn = {
        color: 'white',
        textDecoration: 'none'
    }
    const history = useNavigate()
    return (
        <>
            <header style={{
                margin: '5px'
            }}>
                <nav>
                    <LinkContainer to={'/'}>

                        <Button size='sm'>
                            See Orders
                        </Button>
                    </LinkContainer>


                    <Button className='mx-3'
                        size='sm' onClick={() => {
                            localStorage.removeItem('sellerToken')
                            history('/sellerRegistration')
                        }}>
                        LogOut your seller account
                    </Button>

                    <LinkContainer to={'/AddProducts'} >
                        <Button
                            className='float-end'
                            size='sm'>
                            Add Products
                        </Button>
                    </LinkContainer>
                </nav>
            </header>
        </>
    )
}

export default ToolBox