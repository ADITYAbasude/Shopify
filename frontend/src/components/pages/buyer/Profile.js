import React, { createRef, useEffect, useState } from 'react'
import { Button, Container, FormControl, TextField, ThemeProvider, createTheme } from '@mui/material'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import { useDispatch } from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import {userInfoAction} from '../../actions/userAction'
const Profile = () => {

    const theme1 = createTheme({
        typography: {
            button: {
                textTransform: 'none'
            }
            
        }
    })
    const data = JSON.parse(localStorage.getItem('admin'))
    const dispatch = useDispatch()
    const [info, setInfo] = useState({
        name: data.name,
        email: data.email,
        address: data.address,
        mobile: data.mobile
    })
    console.log((info))

    const handleUserInfo = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        dispatch(userInfoAction())
    }, [])

    return (


        <>
            <Container>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '50px 0px 50px 0px'
                }}>
                    <FormControl>

                        <TextField

                            label="User Name"
                            variant="outlined"
                            name="name"
                            required
                            type="text"
                            value={data.name}
                            onChange={handleUserInfo}
                        />
                        <br />
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            required
                            type="email"
                            value={data.email}
                            onChange={handleUserInfo}
                        />
                        <br />
                        <PhoneInput
                            inputStyle={{
                                width: "100%",
                            }}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true
                            }}
                            name="mobile"
                            country={'in'}
                            // value={data.mobile}
                            onChange={(phone) => {
                                // setInfo({ ...info, 'mobile': phone })
                            }}
                        />
                        <br />
                        <TextField
                            label="Address"
                            variant="outlined"
                            name="address"
                            required
                            type="address"
                            value={data.address}
                            onChange={handleUserInfo}
                        />
                        <br />

                        <ThemeProvider theme={theme1}>
                            <Button
                                variant='contained'
                                color='warning'
                                sx={{
                                    borderRadius: '20px'
                                }}
                                startIcon={<UpdateRoundedIcon />}
                                disabled={true}
                            >
                                Update
                            </Button>
                        </ThemeProvider>
                    </FormControl>
                </div>
            </Container>
        </>
    )

}

export default Profile