import React from "react";
import "../../../css/sidebars.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout(props) {
    const { children } = props;
    return (
        <>
            
                {/* <div id="loading">
                    <div id="loading-center">
                    </div>
                </div> */}
                <div className="wrapper">
                    <Sidebar />
                    <Navbar />
                    <div className="content-page" id="content-page">
                        <div className="container-fluid relative" >
                            {children}
                        </div>
                    </div>
                </div>
                    <Footer />
            
        </>
    );
}
