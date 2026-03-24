import { PricingTable } from '@clerk/react'
import React from 'react'

function Pricing() {
    return (
        <div className='mt-28 flex flex-col items-center justify-center max-w-6xl mx-auto px-6 pb-10'>
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
                <p className="text-gray-500 text-lg">Choose the plan that fits your creative needs.</p>
            </div>
            <PricingTable />
        </div>
    )
}

export default Pricing
