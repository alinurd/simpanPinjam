import React, { useState } from "react";
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
    const { title } = props;
    const { mode } = props;
    const { input } = props;
    const { codeId } = props;
console.log(codeId)
// console.log(mode)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submit = async (e) => {
        e.preventDefault();

        try {
            // Show loading spinner
            setIsSubmitting(true);

            // Serialize form data or customize the data as needed
            const formData = new FormData(e.target);

            // Make a POST request using axios
            const response = await axios.post(`/${toLowerCase(title)}${capitalizeFirstLetter(mode)}`, formData);

            // Optionally, reset the form after successful submission
            e.target.reset();

            // Hide loading spinner after successful submission
            setIsSubmitting(false);

            // Access the redirect path from the response data
            const redirectTo = response.data.redirect;


            alert(response.data.message)

            Inertia.visit(redirectTo, {
                only: ['body'],  // Optional, specify the sections of the page to update
            });

        } catch (error) {
            console.error('Error making POST request:', error);
            console.log('Error details:', error.response); // Log the error details
            setIsSubmitting(false);

        }
    };
    const calculateTotalBobot = (field, idKriteria) => {
        return field
            .filter(item => item.kriteria.id === idKriteria)
            .reduce((total, item) => total + parseFloat(item.bobot), 0);
    }
    const initializeModal = async (id) => {
        try {
            const response = await axios.get(`/anggotaById/${id}`);
            console.log(response)
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
            console.log(data.id)
            // Update modal content here, for example:
            modalElement.querySelector('#code').textContent = data.code;
            modalElement.querySelector('#nama').textContent = data.nama;
            modalElement.querySelector('#desa').textContent = data.desa.nama;
            modalElement.querySelector('#rt').textContent = data.rt;
            modalElement.querySelector('#rw').textContent = data.rw;
            modalElement.querySelector('#phone').textContent = data.phone;
            modalElement.querySelector('#email').textContent = data.email;
            modalElement.querySelector('#kp').textContent = data.kp;
            // Assuming you have elements in the modal to display the fetched data
        }
    };

    const { field, kriteria, subKriteria } = props;
    // console.log(field)
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
                        {/* Pilih Anggota */}
                        <div className="pilih-anggota" id="pilih-anggota">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card iq-mb-3">
                                        <div className="card-body">
                                            <h4 className="card-title text-center"><span>budi santoso </span>[ <b id="code">AGT-0087</b> ]</h4>
                                            <p className="text-center"><small className="text-muted">Rp. <b id="ajuan">10220</b></small></p>


                                            <button
                                                type="button"
                                                className="btn dark-icon btn-info btn-block"
                                                onClick={() => initializeModal(1)}
                                            //   onClick={() => initializeModal(item.kriteria ? item.kriteria.id : '-')}
                                            >
                                                Lihat Detail Anggota
                                            </button>
                                            <button
                                                type="button"
                                                className="btn dark-icon btn-info btn-block"
                                                onClick={() => initializeModal(1)}
                                            //   onClick={() => initializeModal(item.kriteria ? item.kriteria.id : '-')}
                                            >
                                                Klasifikasi Crore
                                            </button>

                                            {/* <a href="#" className="btn dark-icon btn-info btn-block">Lihat Detail Anggota</a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="nav nav-pills mb-3 nav-fill" id="pills-tab-1" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-home-tab-fill" data-toggle="pill" href="#pills-home-fill" role="tab" aria-controls="pills-home" aria-selected="true">Penilaian Point</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab-fill" disabled data-toggle="pill" href="#pills-profile-fill" role="tab" aria-controls="pills-profile" aria-selected="false">Peninjauan Lokasi</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab-fill" data-toggle="pill" href="#pills-contact-fill" role="tab" aria-controls="pills-contact" aria-selected="false">Hasil</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent-1">
                            <div className="tab-pane fade show active" id="pills-home-fill" role="tabpanel" aria-labelledby="pills-home-tab-fill">

                                {/* Penilaian 1 */}
                             {/* Penilaian 1 */}
<div className="penilaian1" id="penilaian1">
  <div className="row">
    <div className="col-sm-12">
      <form className="was-validated" onSubmit={submit}>
        <div className="card iq-mb-3">
          <small className="text-muted">Penilaian Alokasi Point</small>
          <div className="card-body">
            <table className="table table-striped">
              {kriteria.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <tr>
                      <th colSpan={2}>{item.nama} [{item.bobot}]</th>
                    </tr>
                    {subKriteria.map((itemSub, subIndex) => {
                      if (itemSub.id_kriteria == item.id) {
                        return (
                          <tr key={`${item.id}-${subIndex}`}>
                             <input type="hidden" name="kriteria[]" value={item.id} />
                            <input type="hidden" name="subkriteria[]" value={itemSub.id} />
                            <input type="hidden" name="id_anggota" value="1" />
                            <input type="hidden" name="type" value="1" />
                            <input type="hidden" name="codeId" value={codeId} />
                            <td>{itemSub.nama} <br />[{itemSub.bobot}]</td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                id={`point_${itemSub.id}`}
                                name="penilaian[]"
                                placeholder="Berikan Penilaian"
                                required
                              />
                            </td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </React.Fragment>
                );
              })}
            </table>
          </div>
          <label htmlFor="keterangan">Keterangan</label>
          <textarea name="keterangan" id="keterangan" cols="30" rows="2"></textarea>
        </div>
        <button className="btn dark-icon btn-primary btn-block" type="submit">
          {isSubmitting ? (
            <div className="loading">
              <img src="/assets/css/ajax-loader.gif" alt="Loading..." />
            </div>
          ) : (
            'Simpan & Lanjut'
          )}
        </button>
      </form>
    </div>
  </div>
</div>


                            </div>
                            <div className="tab-pane fade" id="pills-profile-fill" role="tabpanel" aria-labelledby="pills-profile-tab-fill">

                                {/* Penilaian 1 */}
                                <div className="penilaian1" id="penilaian1">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="card iq-mb-3">
                                                <small className="text-muted">Laporan Hasil Peninjauan Lokasi</small>
                                                <div className="card-body">


                                                </div>
                                            </div>
                                            <a href="#" className="btn dark-icon btn-primary btn-block">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="pills-contact-fill" role="tabpanel" aria-labelledby="pills-contact-tab-fill">

                                {/* Penilaian 1 */}
                                <div className="penilaian1" id="penilaian1">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="card iq-mb-3">
                                                <div className="card-body">
                                                    <small className="text-muted"><span>budi santoso1 </span>[ <b id="code">AGT-0087</b> ]</small>


                                                    <a href="#" className="btn dark-icon btn-primary btn-block">Go somewhere</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>



                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenter" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-bold" ><span id="code"></span> <strong>[<span id="nama"></span>]</strong></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="mt-3 mb-5">
                                <footer className="blockquote-footer">
                                    <small className="text-muted">
                                        Media Komunikasi
                                    </small>
                                </footer>
                                <span id="#" className="card-link">Phone</span>
                                <span id="phone" className="card-link">: <b>086764764</b></span><br />
                                <span id="#" className="card-link">Email</span>
                                <span id="email" className="card-link">: <b>email.com</b></span>
                                <br />
                                <footer className="blockquote-footer">
                                    <small className="text-muted">
                                        Alamat
                                    </small>
                                </footer>
                                <span id="#" className="card-link">Kampung</span>
                                <span id="kp" className="card-link">: <b>Pasir Pari </b></span><br />
                                <span id="#" className="card-link">Rt/Rw</span>
                                <span id="#" className="card-link">: <b id="rt"></b>/<b id="rw"></b></span> <br />
                                <span id="#" className="card-link">Desa</span>
                                <span id="desa" className="card-link">: <b>Kiarasari</b></span>
                                <br />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >





    );
}
