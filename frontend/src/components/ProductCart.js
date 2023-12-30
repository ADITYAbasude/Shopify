import React from 'react'
import { Card, Form, Image } from 'react-bootstrap'
import '../style/productCartStyle.css'
import { createTheme, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const ProductCart = (props) => {

    const { pro } = props
    const history = useNavigate()
    const base65String = btoa(
        String.fromCharCode(...new Uint8Array(pro.image.data.data))
    )
    return (
        <>
            <div >
                <Card style={{
                    minHeight: '300px'
                }}>

                    <Form id='content' style={{
                        cursor: 'pointer'
                    }}
                        onClick={() => {
                            history(`/productDetail/${pro._id}`)
                        }}>

                        <Form.Group >
                            <Image
                                id='productImg'
                                src={`data:image/png;base64,${base65String}`}
                                className="mx-4 my-4"
                                fluid='true' />
                        </Form.Group>

                        <Form.Group style={{
                            marginTop: '50px',
                            marginLeft: '50px'                          
                        }}>
                            <Typography
                                marginLeft={'30px'}
                                fontFamily={'sans-serif'}
                                fontSize={'20px'}

                            >
                                {pro.title}
                                <br />
                            </Typography>

                            <Typography
                                className='my-2 mx-4'
                                color={pro.stock > 0 ? 'success.main' : 'error.main'}
                            >
                                {pro.stock > 0 ? "In stock" : "Out of stock"}
                            </Typography>
                            <h5 className=' mx-4'>₹ {pro.amount}</h5>
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default ProductCart