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


export default function Penilaian(props) {
    const calculateTotalBobot = (field, idKriteria) => {
        return field
            .filter(item => item.kriteria.id === idKriteria)
            .reduce((total, item) => total + parseFloat(item.bobot), 0);
    }
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
            <div className="col-lg-3">
                <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title">Add New User</h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <form>
                            <div className="form-group">
                                <div className="add-img-user profile-img-edit">
                                    <img className="profile-pic img-fluid" src="images/user/11.png" alt="profile-pic" />
                                    <div className="p-image">
                                        <a href="javascript:void();" className="upload-button btn iq-bg-primary">File Upload</a>
                                        <input className="file-upload" type="file" accept="image/*" />
                                    </div>
                                </div>
                                <div className="img-extension mt-3">
                                    <div className="d-inline-block align-items-center">
                                        <span>Only</span>
                                        <a href="javascript:void();">.jpg</a>
                                        <a href="javascript:void();">.png</a>
                                        <a href="javascript:void();">.jpeg</a>
                                        <span>allowed</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>User Role:</label>
                                <select className="form-control" id="selectuserrole">
                                    <option>Select</option>
                                    <option>Web Designer</option>
                                    <option>Web Developer</option>
                                    <option>Tester</option>
                                    <option>Php Developer</option>
                                    <option>Ios Developer </option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="furl">Facebook Url:</label>
                                <input type="text" className="form-control" id="furl" placeholder="Facebook Url" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="turl">Twitter Url:</label>
                                <input type="text" className="form-control" id="turl" placeholder="Twitter Url" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="instaurl">Instagram Url:</label>
                                <input type="text" className="form-control" id="instaurl" placeholder="Instagram Url" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lurl">Linkedin Url:</label>
                                <input type="text" className="form-control" id="lurl" placeholder="Linkedin Url" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="col-lg-9">
                <div className="iq-card">
                    <div className="float-right mr-5 mt-5"><button>detail</button></div>
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title"><span className="badge badge-pill badge-primary">
                                                Notifications <h5 class="badge badge-info ml-2" title="Point SubKategori">4</h5>
                                                </span>  
                                                </h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <div className="new-user-info">
                            <form>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        
                                        <div className="row justify-content-center align-items-center g-2" >
                                            <div className="col">
                                                <h4><span className="badge border border-primary badge-pill badge-info text-dark">
                                                Notifications <h5 class="badge border border-primary text-dark" title="Point SubKategori">4</h5>
                                                </span> </h4>
                                                    
                                                    
                           
                           </div>
                                            <div className="col">Penilaian</div>
                                            <div className="col">Grade</div>
                                        </div>
                                        <div className="row justify-content-center align-items-center g-2" >
                                            <div className="col">Point Sub</div>
                                            <div className="col">Penilaian</div>
                                            <div className="col">Grade</div>
                                        </div>
                                    </div> 
                                    </div>
                                     
                                <div className="checkbox">
                                    <label><input className="mr-2" type="checkbox" />Enable Two-Factor-Authentication</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Add New User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

 



    );
}
