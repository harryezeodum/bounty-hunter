import React, { useContext } from "react";
import { BountyContext } from "./BountyContextProvider";

function BountyForm() {
    const context = useContext(BountyContext);

    return (
        <div className="border">
            <h1 className="home-title">Welcome to our Bounty Hunter site</h1>
            <p className="home-text"> We are delighted to see you. Please fill in your bounty below and add to our database!</p>
            <form className="form">
                <label className="form-title">Enter the First Name: </label>
                <input
                    placeholder="First Name"
                    className="form-inputs"
                    name="firstName"
                    onChange={context.bountyFormChanges}
                    value={context.bountyForm.firstName}
                />

                <label className="form-title">Enter the Last Name: </label>
                <input
                    placeholder="Last Name"
                    className="form-inputs"
                    name="lastName"
                    onChange={context.bountyFormChanges}
                    value={context.bountyForm.lastName}
                />

                <label className="form-title">Enter the Bounty Amount: </label>
                <input
                    placeholder="Bount Amount"
                    type="number"
                    className="form-inputs"
                    name="bountyAmount"
                    onChange={context.bountyFormChanges}
                    value={context.bountyForm.bountyAmount}
                />

                <label className="form-title">Enter the Type: </label>
                <input
                    placeholder="Type"
                    className="form-inputs"
                    name="type"
                    onChange={context.bountyFormChanges}
                    value={context.bountyForm.type}
                />

                <label className="form-title-checkbox">Is the Bounty Alive? </label> <br />
                <input
                    type="checkbox"
                    className="form-checkbox"
                    name="isAlive"
                    onChange={context.bountyFormChanges}
                    value={context.bountyForm.isAlive}
                /> 
                <button onClick={context.bountySubmit} className="form-button">Submit</button>
            </form>
        </div>
    )
}
export default BountyForm