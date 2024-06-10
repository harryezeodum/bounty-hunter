import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav className="nav">
            <Link to="/">
                <h2 className="nav-title">Home</h2>
            </Link>

            <Link to="/bounties">
                <h2 className="nav-title">Bounties</h2>
            </Link>

            <Link>
                <h2 className="nav-title">About us</h2>
            </Link>

            <Link>
                <h2 className="nav-title">Contact us</h2>
            </Link>
        </nav>
    )
}
export default Navbar