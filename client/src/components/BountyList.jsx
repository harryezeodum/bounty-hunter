import React, { useContext, useEffect } from "react";
import { BountyContext } from "./BountyContextProvider";
import { Link, useNavigate } from "react-router-dom";

function BountyList() {
    const context = useContext(BountyContext);
    const navigate = useNavigate();

    function bountyDetail(id) {
        navigate(`/bounties/${id}`);
    }

    function back() {
        navigate(-1);
    }

    const bountyList = context.bountyData.map((bounty, index) => {
        return [
            <a href="">
                <li className="bounty-list-text" onClick={() => bountyDetail(bounty._id)} key={index}>
                    <h2>{bounty.firstName} {bounty.lastName}</h2>
                </li>
            </a>
        ]
    });

    return (
        <div>
            <div className="bountylist">
                <button onClick={back} className="back-button">Back</button>
                <span className="bountylist-title">List of all Bounties</span>
                <ol>
                    {bountyList}
                </ol>
            </div>
        </div>
    )
}
export default BountyList