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
    console.log(field)
    return (

        <div className="row">
            <div className="col-lg-12">
                <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title">Form Survey Calon Creditur</h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <div className="form-group">
                            <label>Calon Creditur:</label>
                            <select className="form-control" id="selecUser">

                                <option disabled>-Select Anggota-</option>
                                {field.map((item, index) => (
                                    <option>{item.nama} [{item.code}]</option>
                                ))}

                            </select>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card iq-mb-3">
                                    <div class="card-body">
                                        <h4 class="card-title"><span>budi santoso </span>[ <b id="code">AGT-0087</b> ]</h4>
                                        <img className="profile-pic img-fluid ml-2 " src="/assets/images/user/11.png" alt="Loading..." />
                                        <div className="mt-3 mb-5">
                                            <footer class="blockquote-footer">
                                                <small class="text-muted">
                                                    Media Komunikasi
                                                </small>
                                            </footer>
                                            <span id="#" class="card-link">Phone</span>
                                            <span id="phone" class="card-link">: <b>086764764</b></span><br />
                                            <span id="#" class="card-link">Email</span>
                                            <span id="email" class="card-link">: <b>email.com</b></span>
                                            <br />
                                            <footer class="blockquote-footer">
                                                <small class="text-muted">
                                                    Alamat
                                                </small>
                                            </footer>
                                            <span id="#" class="card-link">Kampung</span>
                                            <span id="kp" class="card-link">: <b>Pasir Pari </b></span><br />
                                            <span id="#" class="card-link">Rt/Rw</span>
                                            <span id="rtrw" class="card-link">: <b>003/004</b></span> <br />
                                            <span id="#" class="card-link">Desa</span>
                                            <span id="desa" class="card-link">: <b>Kiarasari</b></span>
                                            <br />
                                        </div>
                                        <a href="#" class="btn dark-icon btn-primary btn-block">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>





    );
}
