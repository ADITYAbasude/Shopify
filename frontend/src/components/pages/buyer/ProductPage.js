import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCart from '../../tools/ProductCart'
import { getBuyerProducts } from '../../actions/buyerAction'
import { useNavigate, useParams } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../../tools/Loader'
import Loader from '../../tools/Loader'
import { Pagination, Paper, Stack } from '@mui/material'
const ProductPage = () => {
    const type = useParams()
    const { products, loading } = useSelector((state) => state.getProducts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBuyerProducts(type.type))
    }, [type])

    return (
        <>
            <div >

                {loading ? <Loading /> : products?.map((pro) => {
                    return <ProductCart key={pro._id} pro={pro} />
                })
                }

            </div>

        </>
    )
}

export default ProductPage