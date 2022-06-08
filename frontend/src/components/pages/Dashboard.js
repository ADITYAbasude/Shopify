import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../style/dashboard.css'
import 'react-toastify/dist/ReactToastify.css';
import img1 from '../data/productsImg/img1.jpg'
import img2 from '../data/productsImg/img2.jpg'
import ipad from '../data/productsImg/ipad.jpg'
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { getRandProductAction } from '../actions/buyerAction'
import Loader from '../tools/Loader'
export const Dashboard = () => {
    const history = useNavigate()
    const dispatch = useDispatch()

    const { data, status } = useSelector((state) => state.getRandProduct)

    useEffect(() => {
        if (!localStorage.getItem('jwtToken'))
            history('/login')
        else
            dispatch(getRandProductAction())
        console.log(data)
    }, [])
    return (
        <>
            {status ? <Loader /> :

                <div>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={img1}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={img2}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                    </Carousel>

                    <Box
                        sx={{
                            m: 1,
                            marginTop: '100px'
                        }}
                        className="list"
                    >
                        {data?.map((item, index) => {
                            const base65String = btoa(
                                String.fromCharCode(...new Uint8Array(item.image.data.data))
                            )
                            return <Card sx={{
                                m: 0,
                                maxWidth: '300px',
                                textAlign: 'center'
                            }}
                                key={index}
                                onClick={() => {
                                    history(`/productDetail/${item._id}`)
                                }}
                            >
                                <Image
                                    src={`data:image/png;base64,${base65String}`}
                                    fluid
                                    width={'200px'}
                                />
                                <CardContent>
                                    <Typography>
                                        {item.title}
                                    </Typography>
                                    <br />
                                    <Typography
                                        component={'span'}
                                        fontWeight={'bold'}
                                    >
                                        ₹ {item.amount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        })}
                    </Box>
                </div>
            }
        </>
    )
}


