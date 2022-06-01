import React from 'react'
import Loading from '../data/img/loading.gif'

const Loader = () => {
    return (
        <>
        <div className='d-flex justify-content-center'>
            <img src={Loading} />
        </div>
        </>
    )
}

export default Loader