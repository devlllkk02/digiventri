import React from 'react'
import "./Ledger.scss"

export default function Ledger() {
    return (
        <div>
            <h1 className="ledger-title">Inventory Ledger 01</h1>
            <form className="ledger-form">
                <select className="ledger-method">
                    <option>FIFO</option>
                    <option>WAC</option>
                </select>
            </form>
        </div>
    )
}
