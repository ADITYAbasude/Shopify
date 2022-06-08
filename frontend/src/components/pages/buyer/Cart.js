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
import logo from '../../data/img/logo.png'
import { createOrderAction } from '../../actions/paymentAction'
import { orderAction } from '../../actions/orderAction'
import { toast, ToastContainer } from 'react-toastify'

const AddCart = () => {


    const dispatch = useDispatch()
    const { cartData, loading } = useSelector((state) => state.getProductFromCart)
    const { data, status } = useSelector((state) => state.deleteProductFromCart)
    const { orderResult } = useSelector((state) => state.createOrder)
    const { orderSave } = useSelector((state) => state.productOrder)

    const [quantity, setQuantity] = useState(1)

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


    const handleToastSuccess = (text) => {
        toast.success(text, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: false,
        })
    }

    const data2 = JSON.parse(localStorage.getItem('admin'))

    const width = window.innerWidth
    const handleDelete = (productId) => (e) => {
        e.preventDefault();
        dispatch(deleteCart(productId))
    }


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            document.body.appendChild(script)
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }

        })
    }


    const handlePayment = (name, email, contact, amount, currency = "INR", image, title, sellerId, quantity = 1, productId) => async (e) => {
        e.preventDefault()
        // creating order by using Razorpay order API
        // const sun = amount * quantity
        dispatch(createOrderAction((amount * quantity), currency))

        const result = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (result) {
            const options = {
                "key": process.env.keyId,
                "amount": amount,
                "currency": currency,
                "name": "Shopify",
                "image": logo,
                "order_id": orderResult?.id,
                "handler": function (response) {
                    dispatch(orderAction(orderResult?.id,
                        title,
                        amount,
                        image,
                        response.razorpay_payment_id,
                        sellerId,
                        productId.id,
                        quantity
                    ))
                    if (!orderSave) {
                        handleToastSuccess("Thanks for ordering")
                    }
                },
                "prefill": {
                    name,
                    email,
                    contact
                },
                "theme": {
                    "color": "#22a32a"
                }
            };
            const razorpay = new window.Razorpay(options)
            razorpay.open()
        } else {
            toast.warning("Check internet connection", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                closeButton: false,
            })
        }

    }



    useEffect(() => {

        dispatch(getProductFromCartAction())
    }, [data])

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
                                            setQuantity(5)
                                            console.log(e.target.value)
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
                                            onClick={handlePayment(data2.name,
                                                data2.email,
                                                data2.mobile,
                                                pro.amount * 100,
                                                "INR",
                                                pro.image,
                                                pro.title,
                                                pro.sellerId,
                                                quantity,
                                                pro.productId
                                            )}
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