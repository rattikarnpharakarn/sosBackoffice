import React from 'react'

const index = () => {
    return (
        <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] 
  motion-reduce:animate-[spin_1.5s_linear_infinite]  flex m-auto"
            role="status">
            <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] justify-center"
            >Loading...</span
            >
        </div>
    )
}

export default index