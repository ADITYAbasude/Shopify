import { Rating, Box, createTheme, ThemeProvider, Typography, Input, Button } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { giveReviewsAction } from '../actions/buyerAction'


const Rate = (props) => {
    const [value, setValue] = useState(0)
    const [comment, setComment] = useState("")
    const theme1 = createTheme({
        palette: {
            primary: {
                main: green[50]
            },
            success: {
                main: green[500],
                light: green[100]
            }
        }
    })
    const dispatch = useDispatch()
    let { rating, productId, numReviews } = props
    const data2 = JSON.parse(localStorage.getItem('admin'))
    const name = data2?.name
    const { error, loading, info } = useSelector((state) => state.reviewReducer)


    useEffect(() => {

        if (error) {
            toast.error(error, {
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
        else if (info) {
            toast.success(info, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                closeButton: false,
            })
            rating += value
            numReviews += 1
        }
    }, [error, info])
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
            <ThemeProvider theme={theme1}>
                <Box sx={{
                    padding: '20px'
                }}>
                    <Box sx={{
                        backgroundColor: 'gray.light',
                    }}>
                        <Box sx={{
                            backgroundColor: 'gray.light',
                            textAlign: 'center',
                        }}>
                            <Typography
                                component={"span"}
                                fontSize="30px"

                            >
                                {numReviews}

                            </Typography>


                            <Typography>
                                reviews
                            </Typography>


                            <Rating
                                readOnly
                                value={rating}
                                precision={0.5}
                                size='small'
                            />
                        </Box>

                    </Box>

                    <Box sx={{
                        backgroundColor: 'primary.main',
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        <Rating
                            name="rating"
                            value={value}
                            onChange={(e, newValue) => {
                                setValue(newValue)
                            }}
                        />
                        <br />
                        <Input
                            className="my-3"
                            placeholder="give review"
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value)
                            }}
                        />
                        <Button
                            variant='outlined'
                            color='success'
                            sx={{
                                textDecoration: 'none'
                            }}
                            size='small'
                            className='mx-2'
                            type='submit'
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(giveReviewsAction(productId, name, value, comment))
                            }}
                        >
                            Post
                        </Button>
                    </Box>

                </Box>
            </ThemeProvider>
        </>
    )
}

export default Rate