import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ToolBox from './ToolBox'
import { getAllProducts } from '../../actions/sellerAction'
import { Table } from 'react-bootstrap'

const AllProducts = () => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('sellerToken')
    const { products, loading } = useSelector((state) => state.sellerProducts)
    useEffect(() => {
        if (token !== null) {
            dispatch(getAllProducts())
        } else {
            history('/sellerRegistration')
        }
    }, [token])


    return (
        <>
            <ToolBox />
            <h3 className='mx-5 my-4'>Your Products</h3>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                height: 'auto'
            }} className="container">
                {products !== null ?

                    <Table striped
                        bordered
                        hover
                        responsive>
                        <thead>
                            <tr>
                                <th>Sr .No</th>
                                <th>Product id</th>
                                <th>Products Name</th>
                                <th>Products Description</th>
                                <th>Criteria</th>
                                <th>Products stoke</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((pro) => {
                                    return <tr key={pro._id}>
                                        <td>{(products.indexOf(pro))+1}</td>
                                        <td>{pro._id}</td>
                                        <td>{pro.title}</td>
                                        <td>{pro.productsDetails}</td>
                                        <td>{pro.productType}</td>
                                        <td>{pro.stock}</td>
                                        <td>{pro.amount}</td>
                                    </tr>

                                })
                            }
                        </tbody>
                    </Table>
                    : <p>You not added a product, So please first add a product</p>
                }

            </div>
        </>
    )
}

export default AllProducts