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

                <dev className="ledger-secondlineObj">
                    <label className="ledger-secondlinetxt" for="Date">Date</label>
                    <input className="ledger-secondlineInput" type="date" id="LedgerDate" name="Date"/>
                </dev>

                <dev className="ledger-secondlineObj">
                    <label className="ledger-secondlinetxt" for="Type">Type</label>
                    <select className="ledger-secondlineInput">
                        <option value=""></option>
                        <option value="Sample">Sample</option>
                    </select>
                </dev>

                <dev className="ledger-secondlineObj">
                    <label className="ledger-secondlinetxt" for="Quantity">Quantity</label>
                    <input className="ledger-secondlineInput" type="text" name="Qty"/>
                </dev>

                <dev className="ledger-secondlineObj">
                    <label className="ledger-secondlinetxt" for="Unit Cost">Unit Cost</label>
                    <input className="ledger-secondlineInput" type="text" name="Unit Cost"/>
                </dev>
            </form>

            <div className="ledgertable-wrapper">
            <div className="divTable" >
                <div className="divTableBody">
                <div className="divTableRow">
                <div className="divTableCell">Date</div>
                <div className="divTableCell">Purchased
                    <div className="divTableCell-Cols">&nbsp;</div>
                    <div className="divTableCell-Cols">&nbsp;</div>
                    <div className="divTableCell-Cols">&nbsp;</div>
                </div>
                <div className="divTableCell">Issued
                    <div className="divTableCell-Cols">&nbsp;</div>
                    <div className="divTableCell-Cols">&nbsp;</div>
                    <div className="divTableCell-Cols">&nbsp;</div>
                </div>
                <div className="divTableCell">Balance
                    <div className="divTableCell-Cols">&nbsp;</div>
                    <div className="divTableCell-Cols">&nbsp;</div>
                    <div className="divTableCell-Cols">&nbsp;</div>
                </div>
                </div>
                <div className="divTableRow">
                <div className="divTableCell">&nbsp;</div>
                <div className="divTableCell">&nbsp;</div>
                <div className="divTableCell">&nbsp;</div>
                <div className="divTableCell">&nbsp;</div>
                </div>
                <div className="divTableRow">
                <div className="divTableCell">&nbsp;</div>
                <div className="divTableCell">&nbsp;</div>
                <div className="divTableCell">&nbsp;</div>
                <div className="divTableCell">&nbsp;</div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}
