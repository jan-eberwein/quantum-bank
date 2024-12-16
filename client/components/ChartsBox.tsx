import React from 'react'
import MonthlyBalanceChart from './MonthlyBalanceChart'
import PolarAreaChart from './PolarAreaChart'

const ChartsBox = () => {
  return (
    <section className="total-balance">
      <div className="">
        <MonthlyBalanceChart />
      </div>
      <div>
        <PolarAreaChart />
      </div>
    </section>
  )
}

export default ChartsBox