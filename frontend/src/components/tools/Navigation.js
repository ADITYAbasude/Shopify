import React, { useEffect } from 'react'
import { Badge, Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userInfoAction } from '../actions/userAction'
import { LinkContainer } from 'react-router-bootstrap'


const Navigation = () => {
    const history = useNavigate()
    const token = localStorage.getItem('jwtToken')
    const data = JSON.parse(localStorage.getItem('admin'))
    const dispatch = useDispatch()
    const { info } = useSelector((state) => state.userInfo)


    const handleLogOut = () => {
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('admin')
        localStorage.removeItem('sellerToken')
        history('/login')
    }
    useEffect(() => {
        dispatch(userInfoAction())
    }, [token])
    return (
        <>
            <header>

                <Navbar bg="light sticky-top" expand="lg">
                    <Container fluid >
                        <Navbar.Brand className='text-success'>
                            <strong><Link className='text-success' to={'/'} style={
                                {
                                    textDecoration: 'none'
                                }
                            }>Shopify</Link></strong>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse >
                            {localStorage.getItem('jwtToken') !== null &&
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >

                                    {/* <Form className="d-flex">
                                        <FormControl
                                            type="text"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"

                                        />
                                        <Button variant="outline-success">Search</Button>
                                    </Form> */}


                                    <NavDropdown title={'Products'} id="navbarScrollingDropdown">
                                        <LinkContainer to={`/product/${'Electronics'}`}>
                                            <NavDropdown.Item>
                                                Electronics
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to={`/product/${'Fashion'}`}>
                                            <NavDropdown.Item>
                                                Fashion
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to={`/product/${'Appliances'}`}>
                                            <NavDropdown.Item>
                                                Appliances
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>




                                    <Nav.Link>
                                        <LinkContainer to={data !== null ? `/cart/user=${data.name}` : "/"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                            </svg>
                                        </LinkContainer>
                                        <Badge bg='danger' pill>{localStorage.getItem('carts')}</Badge>
                                    </Nav.Link>

                                    <NavDropdown title={data !== null ? <b>{data.name}</b> : ""} id="navbarScrollingDropdown">

                                        <LinkContainer to={data !== null ? `/profile/user=${data.name}` : "/"} >
                                            <NavDropdown.Item >Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to={data !== null ? `/user=${data.name}/orders` : "/"}>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to={`/sellerAllProducts/${localStorage.getItem('sellerToken')}`}>
                                            <NavDropdown.Item >Your Seller Account</NavDropdown.Item>
                                        </LinkContainer>
                                        <hr />
                                        <NavDropdown.Item onClick={handleLogOut}>LogOut</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            }
                        </Navbar.Collapse>

                    </Container>
                </Navbar>
            </header >
        </>
    )
}

export default Navigation