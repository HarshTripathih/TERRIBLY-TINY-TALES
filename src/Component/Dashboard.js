import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import FrequencyData from './FrequencyData';
import ChartData from './ChartData';
import TextDataParser from './TextDataParser';



const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    useEffect(() => {
        const navDropdowns = document.querySelectorAll('.nav-dropdown');
        const navToggle = document.querySelector('#nav-toggle');
        const navLinks = document.querySelectorAll('nav ul li a:not(:only-child)');

        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const dropdown = link.nextElementSibling;
                dropdown.classList.toggle('show');
                navDropdowns.forEach((dropdown) => {
                    if (dropdown !== link.nextElementSibling) {
                        dropdown.classList.remove('show');
                    }
                });
                e.stopPropagation();
            });
        });

        document.addEventListener('click', () => {
            navDropdowns.forEach((dropdown) => {
                dropdown.classList.remove('show');
            });
        });

        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener('click', () => { });
            });
            document.removeEventListener('click', () => { });
        };
    }, []);

    return (
        <>
            <div className={isSidebarOpen ? 'sidebar open' : 'sidebar'}>
                <div className="logo-details">
                    {/* <i className="bx bxl-c-plus-plus"></i> */}
                    <img style={{ height: '9vh', width: '15vw' }} src='https://d1fdloi71mui9q.cloudfront.net/gYmMqwKSvilFcYmulthg_AvQOEngi6D3asiow' alt='loading' />
                    <span className="logo_name"></span>
                </div>
                <ul className="nav-links">
                    <li>
                        <a href="/dashboard">
                            <i className="bx bx-grid-alt"></i>
                            <span className="link_name">Dashboard</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li>
                                <a className="link_name" href="/dashboard">
                                    Category
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/piechart">
                            <i className="fa fa-pie-chart"></i>
                            <span className="link_name">PieChart</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li>
                                <a className="link_name" href="/piechart">
                                    PieChart
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/bargraph">
                            <i className="bx bx-line-chart"></i>
                            <span className="link_name">BarGraph</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li>
                                <a className="link_name" href="/bargraph">
                                    BarGraph
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="iocn-link">
                            <a href="#">
                                <i className="bx bx-collection"></i>
                                <span className="link_name">Product</span>
                            </a>
                            <i className="bx bxs-chevron-down arrow"></i>
                        </div>
                        <ul className="sub-menu">
                            <li>
                                <a className="link_name" href="#">
                                    Product
                                </a>
                            </li>
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>
                                <a href="Addproduct_detail.html">Add Product</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="profile-details">
                            <div className="name-job">
                                <div className="profile_name">Harsh Tripathi</div>
                                <div className="job">Web Desginer</div>
                            </div>
                            <i className="bx bx-log-out"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <section className="home-section">
                <div className="home-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bx bx-menu" onClick={toggleSidebar}></i>
                    <span style={{ color: 'whitesmoke' }} className="text">Word Frequency Fetcher</span>

                    <div className="nav-container">
                        
                    </div>
                </div>
                <div className="damroo">
                    <div className="parents">
                        <div className="child">
                            <p style={{ textAlign: 'left', marginLeft: '40px', marginTop: '40px' }}>
                                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                <h4 style={{ marginTop: '-70px', marginLeft: '200px', color: 'white' }}>
                                    <b>
                                        120
                                        <br />
                                        BarGraph
                                    </b>
                                </h4>
                            </p>
                            <div className="sub-child">
                                <h4 style={{ marginLeft: '10px' }}>
                                    <b>
                                        View Details <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </b>
                                </h4>
                            </div>
                        </div>
                        <div className="child">
                            <p style={{ textAlign: 'left', marginLeft: '40px', marginTop: '40px' }}>
                                <i className="fa fa-pie-chart" aria-hidden="true"></i>
                                <h4 style={{ marginTop: '-70px', marginLeft: '200px', color: 'white' }}>
                                    <b>
                                        13<br />
                                        PieChart
                                    </b>
                                </h4>
                            </p>
                            <div className="sub-child">
                                <h4 style={{ marginLeft: '10px' }}>
                                    <b>
                                        View Details <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </b>
                                </h4>
                            </div>
                        </div>

                        <div className="child">
                            <p style={{ textAlign: 'left', marginLeft: '40px', marginTop: '40px' }}>
                                <i className="fa fa-line-chart" aria-hidden="true"></i>
                                <h4 style={{ marginTop: '-70px', marginLeft: '200px', color: 'white' }}>
                                    <b>
                                        80
                                        <br />
                                        LineChart
                                    </b>
                                </h4>
                            </p>
                            <div className="sub-child">
                                <h4 style={{ marginLeft: '10px' }}>
                                    <b>
                                        View Details <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </b>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <hr />
                <div id="content">
                    <p style={{ fontSize: '25px' }}><b>Click Submit button to view the Bargraph and PieChart</b> </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='frequencydata-box'>

                        <FrequencyData />
                    </div>
                    <br />
                    {/* <ChartData/> */}
                    <p style={{ fontSize: '20px' }}><b> <h3><b>Or</b></h3> <br /><br /><br /> You can type the <mark style={{ backgroundColor: 'yellow' }}>.txt</mark> URL for Fetch the data and Click Submit Button to Show the bargraph and Piechart</b> </p>
                    <div className='frequencydata-box'>

                        <TextDataParser />
                    </div>

                </div>
            </section>
        </>
    );
};

export default Dashboard;