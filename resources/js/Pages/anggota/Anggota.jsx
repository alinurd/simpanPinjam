import React from "react";
import { Link } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to convert a string to lowercase
const toLowerCase = (string) => {
    return string.toLowerCase();
};


export default function Anggota(props) {
    const initializeModal = async (id) => {
        try {
            const response = await axios.get(`/anggotaById/${id}`);
            console.log(response.data.data)


            // If data is successfully fetched, update the modal content
            if (response) {
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
            console.log(data.code)
            // Update modal content here, for example:
            modalElement.querySelector('#exampleModalCenterTitle').textContent = data.code;
            modalElement.querySelector('#exampleModalCenterNama').textContent = data.nama;
            modalElement.querySelector('#exampleModalCenterDesa').textContent = data.desa.nama;
            modalElement.querySelector('#exampleModalCenterRw').textContent = data.rw;
            modalElement.querySelector('#exampleModalCenterRt').textContent = data.rt;
            modalElement.querySelector('#exampleModalCenterKp').textContent = data.kp;
            // Assuming you have elements in the modal to display the fetched data
        }
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        console.log(id)
        if (confirm('Are you sure you want to delete this record?')) {
            Inertia.delete("anggotaDelete/" + id); // Add the concatenation operator (+) here
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
                                        <th className="text-left">Name</th>
                                        <th className="text-left">Email</th>
                                        <th className="text-left">Phone</th>
                                        <th className="text-left">Alamat</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Progress</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {field.map((item, index) => (
                                        <tr>
                                            <td className="text-center" key={index}>{index + 1}</td>
                                            <td className="text-left">{item.nama}</td>
                                            <td className="text-left">{item.email}</td>
                                            <td className="text-left">{item.phone}</td>
                                            <td className="text-left">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => initializeModal(item ? item.id : '-')}
                                                >
                                                    Lihat Alamat detail
                                                </button>
                                            </td>
                                            <td className="text-center">
                                            <h6 class="mb-0"><span class={`badge badge-${item.status.bg}`}>{item.status.nama}</span></h6>
                                            </td>
                                            <td className="text-center">
                                                <button type="button" className={`btn mb-1 dark-icon btn-${item.progress.bg}`}>
                                                    {item.progress.id>7?"Need Review":item.progress.nama}
                                                </button>
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
                            <h5 className="modal-title text-bold" id="">
                                <b> <span id="exampleModalCenterTitle"></span></b> - <span id="exampleModalCenterNama"></span>
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Desa</th>
                                        <th>Rw</th>
                                        <th>Rt</th>
                                        <th>Kampung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Add your dynamic data here */}
                                    <tr>
                                        <th><b className="modal-title pre-line" id="exampleModalCenterDesa"></b></th>
                                        <th><b className="modal-title" id="exampleModalCenterRt"></b></th>
                                        <th><b className="modal-title" id="exampleModalCenterRw"></b></th>
                                        <th><b className="modal-title" id="exampleModalCenterKp"></b></th>
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
