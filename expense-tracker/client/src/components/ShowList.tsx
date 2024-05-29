import React, { useEffect, useState } from "react";
import IDataList from "../models/IDataList";
import { getItemsData } from "../services/ItemService";
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import { isTemplateSpan } from "typescript";
import '../App.css';

export default function ShowList() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const data = await getItemsData();
                console.log(data);
                setItems(data);
                calculateOnItem(data);
            } catch (error: any) {
                console.error(error);
                setError(error);
            }
        }
        fetchItemsData();
    }, [showForm])

    const calculateOnItem = (data: IDataList[]) => {

        var rahulSpent1: number = 0;
        var rameshSpent1: number = 0;

        data.map((item) =>
            item.payeeName === "Rahul"
                ? (rahulSpent1 = rahulSpent1 + item.price)
                : (rameshSpent1 = rameshSpent1 + item.price)
        );
        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);
        setSum(rahulSpent1 + rameshSpent1);
    }

    const getTableHeaders = () => {
        return (
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>
        )
    }

    const renderExpense = (expense: IDataList) => {
        return (
            <div key={expense.id}>
                <div className="use-inline date">{expense.setDate}</div>
                <div className="use-inline">{expense.product}</div>
                <div className="use-inline price">{expense.price}</div>
                <div className={`use-inline ${expense.payeeName}`}>{expense.payeeName}</div>
            </div>
        )
    }

    const renderSummary = () => {
        return <>
            <div className="use-inline">Total</div>
            <div className="use-inline total">{sum}</div><br />
            <div className="use-inline">Rahul</div>
            <div className="use-inline total Rahul">{rahulSpent}</div><br />
            <div className="use-inline">Ramesh</div>
            <div className="use-inline total Ramesh">{rameshSpent}</div><br />
            <span className="use-inline payable">{rahulSpent > rameshSpent ? "Pay Rahul" : "Pay Ramesh"}</span>
            <span className="use-inline payable price">{Math.abs((rahulSpent - rameshSpent) / 2)}</span>
        </>
    }

    return <>
        <header id="page-Header">Expense Tracker</header>
        <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
        {
            showForm && <div className="form">
                <ExpenseTrackerForm onClose={() => setShowForm(false)} />
            </div>
        }
        {getTableHeaders()}
        {items && items.map((expense) => renderExpense(expense))}
        <hr />
        {renderSummary()}
    </>
}
