import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Collapse, Container, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getSellerOrdersAction } from '../../actions/sellerAction'
import Loader from '../../tools/Loader'
const SeeOrders = () => {
    const dispatch = useDispatch()

    const { orders, status } = useSelector((state) => state.getSellerOrder)
    useEffect(() => {
        dispatch(getSellerOrdersAction())
    }, [])

    return (
        <>
            {status ? <Loader /> : orders?.map((pro) => {
                return <Card key={pro.id} sx={{
                    m: 2,
                    p: 1
                }}>
                    <React.Fragment>


                        <Typography
                            component={'span'}
                            fontSize={'16px'}
                        >
                            Product Id: <b>{pro.productId}</b>
                            &nbsp;&nbsp;&nbsp; Order Id: <b>{pro.orderId}</b>
                            &nbsp;&nbsp;&nbsp; Payment Id: <b>{pro.paymentId}</b>
                        </Typography>


                        <Box>
                            <Button
                                variant='contained'
                                color='warning'
                                size='small'
                                id='btn'
                                onClick={()=>{
                                    const btn = document.getElementById('btn');
                                }}
                                sx={{
                                    m: 1,
                                    textTransform: 'none'
                                }}
                            >Move to out Of delivery</Button>

                            <Button
                                variant='contained'
                                color='warning'
                                size='small'
                                sx={{
                                    m: 1,
                                    textTransform: 'none'
                                }}
                            >Order Successfully</Button>
                        </Box>
                    </React.Fragment>
                </Card>
            })
            }
        </>
    )
}

export default SeeOrders