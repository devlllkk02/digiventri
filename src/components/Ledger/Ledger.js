import React from 'react'
import "./Ledger.scss"

export default function Ledger() {
    return (
        <div>
            <h1 className="ledger-title">Inventory Ledger 01</h1>
            <form className="ledger-form">
                <select className="ledger-method">
                    <option value="FIFO">FIFO</option>
                    <option value="WAC">WAC</option>
                </select>
                <i class="fas fa-cog"></i>

                <dev className="ledger-dateWrapper">
                    <label className="ledger-datetxt" for="Date">Date</label>
                    <input className="ledger-date" type="date" id="LedgerDate" name="Date"/>
                </dev>
            </form>
        </div>
    )
}
