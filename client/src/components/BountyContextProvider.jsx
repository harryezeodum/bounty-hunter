import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BountyContext = React.createContext();

function BountyContextProvider(props) {
    const navigate = useNavigate();
    const [bountyData, setBountyData] = useState([]);
    const [bountyForm, setBountyForm] = useState({
        firstName: "",
        lastName: "",
        isAlive: false,
        bountyAmount: "",
        type: ""
    });
    const [bountyFormSubmit, setBountyFormSubmit] = useState([]);

    function bountyFormChanges(event) {
        const { name, type, checked, value } = event.target;
        setBountyForm(prevForm => {
            return {
                ...prevForm, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function bountySubmit(event) {
        event.preventDefault();
        axios.post("/api/bounty", bountyForm)
            .then(response => setBountyFormSubmit(prev => {
                return [
                    ...prev, response.data
                ]
            }))
            .catch(err => console.log(err))

        setBountyForm({
            firstName: "",
            lastName: "",
            isAlive: false,
            bountyAmount: "",
            type: ""
        })

        axios.get("/api/bounty")
            .then(response => setBountyData(response.data))
            .catch(err => console.log(err));
        
        navigate("/bounties");
    }

    function editBountyDetail(id, update) {
        axios.put(`/api/bounty/${id}`, update)
            .then(response => setBountyForm(update))
            .catch(err => console.log(err));

        axios.get("/api/bounty")
            .then(response => setBountyData(response.data))
            .catch(err => console.log(err));

        navigate(`/bounties/${id}`);
    }

    function deleteBounty(id) {
        const deletedBounty = bountyFormSubmit.filter(bounty => bounty._id !== id)
        axios.delete(`/api/bounty/${id}`)
            .then(response => setBountyFormSubmit(deletedBounty))
            .catch(err => console.log(err))

        navigate("/bounties");

        axios.get("/api/bounty")
            .then(response => setBountyData(response.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get("/api/bounty")
            .then(response => setBountyData(response.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <BountyContext.Provider value={{
            bountyForm,
            bountyData,
            bountyFormSubmit,
            bountyFormChanges,
            bountySubmit,
            editBountyDetail,
            setBountyData,
            deleteBounty
        }}>
            {props.children}
        </BountyContext.Provider>
    )
}

export { BountyContext, BountyContextProvider }