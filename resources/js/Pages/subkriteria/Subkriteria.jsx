import React from "react";
import { Link } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';  // Import the axios library


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to convert a string to lowercase
const toLowerCase = (string) => {
    return string.toLowerCase();
};


export default function Subkriteria(props) {
    const initializeModal = async (id) => {
        try {
            const response = await axios.get(`/kriteriaById/${id}`);
            // console.log(response)
                        var data = {
                id: 1,
                code: 'SCR-9776',
                bobot: '60',
                name: 'Dummy Kriteria',
                create: '20-01-2000',
                // Add other fields as needed
            };
    
            // If data is successfully fetched, update the modal content
            if (data) {
                 updateModalContent(response.data.data); 
                $('#exampleModalCenter').modal('show');
            }
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };
     
    
    
    // Function to update modal content
    const updateModalContent = (data) => {
        // Access the modal element and update its content based on the fetched data

        const modalElement = document.getElementById('exampleModalCenter');
    
        if (modalElement) {
            // console.log(data.data.id)
            // Update modal content here, for example:
             modalElement.querySelector('#exampleModalCenterTitle').textContent = data.code;
            modalElement.querySelector('#exampleModalCenterName').textContent = data.nama;
            modalElement.querySelector('#exampleModalCenterCode').textContent = data.code;
            modalElement.querySelector('#exampleModalCenterBobot').textContent = data.bobot;
              // Assuming you have elements in the modal to display the fetched data
        }
    };
    

    const handleDelete = (e, id) => {
        e.preventDefault();
        console.log(id)
        if (confirm('Are you sure you want to delete this record?')) {
            Inertia.delete("subkriteriaDelete/" + id); // Add the concatenation operator (+) here
        }
    };
    const { title } = props;
    const { field } = props;
    // console.log(field)
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title">{capitalizeFirstLetter(title)} List</h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <div className="table-responsive">
                            <div className="row justify-content-between">
                                <div className="col-sm-12 col-md-6">
                                    <div id="user_list_datatable_info" className="dataTables_filter">
                                        <form className="mr-3 position-relative">
                                            <div className="form-group mb-0">
                                                <input type="search" className="form-control" id="exampleInputSearch" placeholder="Search" aria-controls="user-list-table" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="user-list-files d-flex float-right">
                                        <Link
                                            href={`/${toLowerCase(title)}Create`}
                                            className={`iq-bg-primary ${window.location.pathname === `/${toLowerCase(title)}Create` ? "active" : ""}`}
                                            aria-current="page"
                                        >
                                            Tambah {capitalizeFirstLetter(title)}
                                        </Link>


                                        <a className="iq-bg-info" href="javascript:void();">
                                            Export  Excel
                                        </a>
                                        <a className="iq-bg-info" href="javascript:void();">
                                            Export Pdf
                                        </a>

                                    </div>
                                </div>
                            </div>
                            <table id="user-list-table" className="table table-striped table-borderless mt-4" role="grid" aria-describedby="user-list-page-info">
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-left">Kriteria</th>
                                        <th className="text-center">Code</th>
                                        <th className="text-left">Name</th>
                                        <th className="text-left">Bobot</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {field.map((item, index) => (
                                        <tr>
                                            <td className="text-center" key={index}>{index + 1}</td>
                                            <td className="text-left">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => initializeModal(item.kriteria ? item.kriteria.id : '-')}
                                                >
                                                    <b>{item.kriteria.code}</b>- {item.kriteria.nama}        
                                                                                           
                                                 </button>

                                            </td>
                                            <td className="text-center">{item.code}</td>
                                            <td className="text-left">{item.nama}</td>
                                            <td className="text-left">{item.bobot}</td>
                                            <td className="text-center">
                                                <span className={`text-center badge icon-light iq-bg-${item.status == 1 ? "info" : "danger"}`}>
                                                    {item.status == 1 ? "Active" : "Non Active"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className=" text-center flex align-items-center list-user-action">
                                                    <a className="iq-bg-primary" data-toggle="tooltip" data-placement="top" title data-original-title="Edit" href={`/${toLowerCase(title)}Edit/${item.code}`}>

                                                        <i className="ri-pencil-line" />
                                                    </a>
                                                    <a
                                                        className="iq-bg-primary"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        title="Delete"
                                                        href="#"
                                                        onClick={(e) => handleDelete(e, item.id)} // Call the handleDelete function with the record id
                                                    >
                                                        <i className="ri-delete-bin-line" />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                        <div className="row justify-content-between mt-3">
                            <div id="user-list-page-info" className="col-md-6">
                                <span>Showing 1 to 5 of 5 entries</span>
                            </div>
                            <div className="col-md-6">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-end mb-0">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                                        </li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenter" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-bold" id="exampleModalCenterTitle"></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">                            
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Bobot</th>
                                     </tr>
                                </thead>
                                <tbody>
                                    {/* Add your dynamic data here */}
                                    <tr>
                                        <th><b className="modal-title" id="exampleModalCenterCode"></b></th>
                                        <th><b className="modal-title pre-line" id="exampleModalCenterName"></b></th>
                                        <th><b className="modal-title" id="exampleModalCenterBobot"></b></th> 
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                         </div>
                    </div>
                </div>
            </div>



        </div>



    );
}
 