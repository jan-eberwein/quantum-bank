import React from 'react'
import MonthlyBalanceChart from './MonthlyBalanceChart'
import PolarAreaChart from './PolarAreaChart'
import {TestShadcnChart} from "@/components/TestShadcnChart";

const ChartsBox = () => {
    return (
        <section className="total-balance">
            <div className="">
                <MonthlyBalanceChart/>
            </div>
            <div>
                <PolarAreaChart/>
            </div>
            <div>
                <TestShadcnChart></TestShadcnChart>
            </div>
        </section>
    )
}

export default ChartsBox