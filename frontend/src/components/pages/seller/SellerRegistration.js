import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { sellRegistration } from '../../actions/sellerAction'


const SellerRegistration = () => {
    const token = localStorage.getItem('sellerToken')
    const history = useNavigate()
    const { loading, error } = useSelector((state) => state.seller)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        shopName: "",
        contactNumber: "",
        email: "",
        password: "",
        address: "",
        pincode: "",
        confirmPassword: ""
    })

    function createErrorToast(error) {
        toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })
    }


    useEffect(() => {
        if (token) {
            history(`/sellerAllProducts/${token}`)
        } else if (error) {
            createErrorToast(error)
            
        }
    }, [ token , loading])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.confirmPassword === data.password) {
            dispatch(sellRegistration(data.shopName, data.contactNumber, data.email,
                data.password, data.address, data.pincode))
        } else {
            createErrorToast("Enter a proper password 😢")
        }
    }
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                pauseOnFocusLoss
                draggable
                theme='colored'
            />
            <div style={{ marginTop: '70px' }}>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <h4>Seller Information</h4><hr />
                        <Form.Group className='row'>
                            <Form.Group className='col'>
                                <Form.Label>Shop Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='shopName'
                                    value={data.shopName}
                                    onChange={handleOnChange}
                                    required

                                />
                            </Form.Group>
                            <Form.Group className='col'>
                                <Form.Label>Contact number</Form.Label>
                                <PhoneInput
                                    inputStyle={{
                                        width: "100%",
                                    }}
                                    inputProps={{
                                        name: 'phone',
                                        required: true
                                    }}
                                    name='contactNumber'
                                    country={'in'}
                                    value={data.contactNumber}
                                    onChange={(phone) => {
                                        setData({ ...data, 'contactNumber': phone })
                                    }}
                                    required

                                />
                            </Form.Group>
                            <Form.Group className='col'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    name='email'
                                    onChange={handleOnChange}
                                    value={data.email}
                                    required
                                />
                            </Form.Group>
                        </Form.Group>

                        <br />
                        <Form.Group className='row'>
                            <Form.Group className='col'>
                                <Form.Label>Create password</Form.Label>
                                <Form.Control
                                    type='password'
                                    name='password'
                                    onChange={handleOnChange}
                                    value={data.password}
                                    required

                                />
                            </Form.Group>
                            <Form.Group className='col'>
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type='password'
                                    name='confirmPassword'
                                    required
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                />
                            </Form.Group>
                        </Form.Group>
                        <hr />


                        {/* // shop details */}
                        <Form.Group className='row'>
                            <Form.Group className='col'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='address'
                                    onChange={handleOnChange}
                                    value={data.address}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className='col'>
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='pincode'
                                    onChange={handleOnChange}
                                    value={data.pincode}
                                    required
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group>

                            <div className='text-center mt-3'>

                                <Form.Label>If you have already seller account? </Form.Label>
                                <Link to={'/sellerLogin'}> LogIn </Link>

                            </div>
                            <Button style={{
                                marginBottom: '200px'
                            }} className='mt-5'
                                type='submit'
                            >
                                Register
                            </Button>


                        </Form.Group>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default SellerRegistration