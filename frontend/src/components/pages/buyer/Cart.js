import React, { useEffect, useState } from 'react'
import { Container, FormControl, MenuItem, Select, Typography, InputLabel, Button, IconButton, Tooltip, ThemeProvider, createTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart, getProductFromCartAction, updateCartAction } from '../../actions/buyerAction'
import { Row, Col, Card, Image } from 'react-bootstrap'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import '../../style/cart.css'
import { green } from '@mui/material/colors'
import { AddShoppingCartSharp } from '@mui/icons-material'
import Loader from '../../tools/Loader'
const AddCart = () => {
    const dispatch = useDispatch()
    const { cartData, loading } = useSelector((state) => state.getProductFromCart)
    const { data, status } = useSelector((state) => state.deleteProductFromCart)
    useEffect(() => {
        dispatch(getProductFromCartAction())
    }, [data])
    let countAmount = 0
    let countProduct = 0

    const theme1 = createTheme({
        typography: {
            button: {
                textTransform: 'none'
            }
        },
        palette: {
            success: {
                main: green[500]
            }
        }
    })

    const width = window.innerWidth
    const handleDelete = (productId) => (e) => {
        e.preventDefault();
        dispatch(deleteCart(productId))
    }

    return (
        <>
            {loading || status ? <Loader /> : cartData?.map((pro) => {
                countProduct += pro.quantity
                countAmount += pro.amount * pro.quantity
                const base65String = btoa(
                    String.fromCharCode(...new Uint8Array(pro.image.data.data))
                )
                return <Card className='card' key={pro._id}>
                    <Container>
                        <Tooltip title='Delete product'>
                            <IconButton id="delete" onClick={handleDelete(pro.productId)}>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Row>
                            <Col>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>

                                    <Image src={`data:image/png;base64,${base65String}`}
                                        fluid='true'
                                        alt='img'
                                        style={{ maxWidth: '250px', marginTop: '40px' }}
                                    />
                                </div>
                            </Col>

                            <Col>

                                <div className='mt-3 mx-2'>
                                    <h5>{pro.title}</h5>
                                </div>
                                <br />
                                <h5>₹ {pro.amount}</h5>

                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Quantity</InputLabel>
                                    <Select
                                        label="quantity"
                                        autoWidth
                                        size='small'
                                        defaultValue={pro.quantity}
                                        onChange={(e) => {
                                            pro.quantity = e.target.value
                                            dispatch(updateCartAction(e.target.value, pro.productId))
                                        }}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>

                                    </Select>
                                </FormControl>
                                <br />
                                <ThemeProvider theme={theme1}>
                                    <FormControl sx={{ m: 1, display: 'block' }}>
                                        <Button
                                            variant='contained'
                                            color='success'
                                            startIcon={<AddShoppingCartSharp />}
                                            size={'small'}
                                        >
                                            Buy
                                        </Button>

                                    </FormControl>

                                </ThemeProvider>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            })}

            <FormControl style={{ width: '100%' }}>
                <Typography
                    textAlign={'center'}
                    fontSize={25}
                >
                    Subtotal (<b>{countProduct}</b> items) : ₹ <b>{countAmount}</b>
                </Typography>
            </FormControl>
        </>
    )
}

export default AddCart