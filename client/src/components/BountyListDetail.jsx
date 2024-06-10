import React, { useContext, useState, useEffect } from "react";
import { BountyContext } from "./BountyContextProvider";
import { useParams, useNavigate } from "react-router-dom";

function BountyListDetail() {
    const context = useContext(BountyContext);
    const navigate = useNavigate();
    const { detailId } = useParams();

    const foundBounty = context.bountyData.find(bounty => bounty._id === detailId)

    const [editBountyForm, setEditBountyForm] = useState({});

    useEffect(() => {
        setEditBountyForm({
            firstName: foundBounty?.firstName,
            lastName: foundBounty?.lastName,
            bountyAmount: foundBounty?.bountyAmount,
            type: foundBounty?.type,
            isAlive: foundBounty?.isAlive
        })
    }, [foundBounty])

    const [isEdit, setIsEdit] = useState(false);

    function editForm() {
        setIsEdit(prev => !prev);
    }

    function cancelForm() {
        setIsEdit(prev => !prev)
    }

    function updatedBountyForm() {
        context.editBountyDetail(foundBounty._id, editBountyForm);
        setIsEdit(prev => !prev)
    }

    function editBountyFormChanges(event) {
        const { name, type, checked, value } = event.target;
        setEditBountyForm(prevForm => {
            return {
                ...prevForm, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function deleted() {
        context.deleteBounty(foundBounty._id);
    }

    function back() {
        navigate(-1);
    }

    if (!foundBounty) {
        return <div>
            <h2 className="bounty-list-detail-errors"> Loading.....</h2>
            <p className="bounty-list-detail-error">This page no longer exist, please click on the Home menu!</p>
        </div>
    }

    return (
        <div>
            <button onClick={back} className="back-button">Back</button>
            {!isEdit && <div className="bounty-list-detail">
                <span className="bounty-list-detail-title"><strong>First Name: </strong></span> <span className="bounty-list-detail-text">{foundBounty.firstName}</span> <br /> <br />
                <span className="bounty-list-detail-title"><strong>Last Name: </strong></span> <span className="bounty-list-detail-text">{foundBounty.lastName}</span> <br /> <br />
                <span className="bounty-list-detail-title"><strong>Bounty Amount: </strong></span> <span className="bounty-list-detail-text">{foundBounty.bountyAmount}</span> <br /> <br />
                <span className="bounty-list-detail-title"><strong>Type: </strong></span> <span className="bounty-list-detail-text">{foundBounty.type}</span> <br /> <br />
                <span className="bounty-list-detail-title"><strong>Is Bounty Alive: </strong></span> <input className="bounty-list-detail-input" type="checkbox" checked={foundBounty.isAlive} /> <br /> <br />
                <button onClick={editForm} className="edit-button">Edit</button> <button onClick={deleted} className="delete-button">Delete</button>
            </div>}

            {isEdit && <form className="form">
                <label className="form-title">Enter the First Name: </label>
                <input
                    placeholder="First Name"
                    className="form-inputs"
                    name="firstName"
                    onChange={editBountyFormChanges}
                    value={editBountyForm.firstName}
                />

                <label className="form-title">Enter the Last Name: </label>
                <input
                    placeholder="Last Name"
                    className="form-inputs"
                    name="lastName"
                    onChange={editBountyFormChanges}
                    value={editBountyForm.lastName}
                />

                <label className="form-title">Enter the Bounty Amount: </label>
                <input
                    placeholder="Bount Amount"
                    type="number"
                    className="form-inputs"
                    name="bountyAmount"
                    onChange={editBountyFormChanges}
                    value={editBountyForm.bountyAmount}
                />

                <label className="form-title">Enter the Type: </label>
                <input
                    placeholder="Type"
                    className="form-inputs"
                    name="type"
                    onChange={editBountyFormChanges}
                    value={editBountyForm.type}
                />

                <label className="form-title-checkbox">Is the Bounty Alive? </label> <br />
                <input
                    type="checkbox"
                    className="form-checkbox"
                    name="isAlive"
                    onChange={editBountyFormChanges}
                    checked={editBountyForm.isAlive}
                /> <br />
                <button onClick={updatedBountyForm} className="form-button">Update</button> <button className="form-cancel" onClick={cancelForm}> Cancel</button>
            </form>}
        </div>
    )
}

export default BountyListDetail