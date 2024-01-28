import React, { useState, useEffect } from "react";
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
    // const { title } = props;
    // const { mode } = props;
    // const { input } = props;
    // const {  } = props;
    const { field, kriteria, subKriteria, codeId, mode, title, anggota, kriteriax, subKriteriax, point, tinjau } = props;

    useEffect(() => {
        // Trigger initializeModal with the first item in the field array
        updateModalContent(anggota, 1);

    })
    // console.log(codeId)
    // console.log(mode)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUser, setIsUser] = useState(false);

    const [sts1Show, setSts1Show] = useState(false);
    const [sts1Aktif, setSts1Aktif] = useState(false);

    const [sts2Show, setSts2Show] = useState(false);
    const [sts2Aktif, setSts2Aktif] = useState(false);

    const [sts3Show, setSts3Show] = useState(false);
    const [sts3Aktif, setSts3Aktif] = useState(false);
    // setIsUser(true)
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

    const initializeModalKlasifikasi = async (id, type) => {
        $('#ModalKlasifikasi').modal('show');
    };
    const updateModalContent = (data, type) => {
        if (type == 1) {
            const x = document.getElementById('pilih-anggota');
            x.querySelector('#code').textContent = data.code;
            x.querySelector('#nama').textContent = data.nama;
            x.querySelector('#ajuan').textContent = data.ajuan;
            setIsSubmitting(false);
            setIsUser(true);
            setSts1Show(true);
            setSts1Aktif(true);
            isAn(data.id, data.penilain, data.progress)
        }
        const modalElement = document.getElementById('exampleModalCenter');
        if (modalElement) {
            modalElement.querySelector('#code').textContent = data.code;
            modalElement.querySelector('#nama').textContent = data.nama;
            modalElement.querySelector('#desa').textContent = data.desa.nama;
            modalElement.querySelector('#rt').textContent = data.rt;
            modalElement.querySelector('#rw').textContent = data.rw;
            modalElement.querySelector('#phone').textContent = data.phone;
            modalElement.querySelector('#email').textContent = data.email;
            modalElement.querySelector('#kp').textContent = data.kp;
            setIsSubmitting(false);
        }
    };

    const isAn = (id, data, sts) => {
         var x = document.getElementById('id_anggota');
        var x2 = document.getElementById('id_anggota1');
console.log(sts)
        if (x) {
            x.value = id;
            x2.value = id;
        }
        if (sts == 1) {
            setSts1Show(true);
            setSts1Aktif(true);

            setSts2Show(false);
            setSts2Aktif(false);

            setSts3Show(false);
            setSts3Aktif(false);

        } else if (sts == 7) {
            point.map((item2, subIndex) => {  
                // kriteria.map
                var Hasil = calculateGrade(item2.id_subkriteria, item2.penilaian);
                // console.log(Hasil)
                // Mengasumsikan Anda memiliki elemen dengan ID seperti 'grade_item2.id_subkriteria', 'gscore_item2.id_subkriteria', 'klasifikasi_item2.id_subkriteria'
                document.getElementById(`grade_${item2.id_subkriteria}`).textContent = Hasil.klasifikasi;
                // document.getElementById(`gscore_${item2.id_subkriteria}`).textContent = Hasil;
                document.getElementById(`klasifikasi_${item2.id_subkriteria}`).textContent = Hasil.keterangan;

                var inputElement = document.getElementById(`point_${item2.id_subkriteria}`);
                var ket = document.getElementById(`keterangan`);
                if (inputElement) {
                    inputElement.value = item2.penilaian;
                    inputElement.readOnly = true;
                    ket.value = item2.penilaian;
                    ket.readOnly = true;
                }
            });
            setSts1Show(true);
            setSts1Aktif(false);

            setSts2Show(true);
            setSts2Aktif(true);

            setSts3Show(false);
            setSts3Aktif(false);
        } else if (sts > 7) {

            setSts1Show(true);
            setSts1Aktif(false);

            setSts2Show(true);
            setSts2Aktif(false);

            setSts3Show(true);
            setSts3Aktif(true);

            tinjau.map((item, subIndex) => {
                var inputElement = document.getElementById(`point_${item.id_subkriteria}`);
                var ket1 = document.getElementById(`keterangan1`);
                if (inputElement) {
                    inputElement.value = item.penilaian;
                    inputElement.readOnly = true;
                    ket1.value = item.penilaian;
                    ket1.readOnly = true;
                }
            });

             point.map((item2, subIndex) => {  
                // kriteria.map
                var Hasil = calculateGrade(item2.id_subkriteria, item2.penilaian);
                // console.log(Hasil)
                // Mengasumsikan Anda memiliki elemen dengan ID seperti 'grade_item2.id_subkriteria', 'gscore_item2.id_subkriteria', 'klasifikasi_item2.id_subkriteria'
                document.getElementById(`grade_${item2.id_subkriteria}`).textContent = Hasil.klasifikasi;
                // document.getElementById(`gscore_${item2.id_subkriteria}`).textContent = Hasil;
                document.getElementById(`klasifikasi_${item2.id_subkriteria}`).textContent = Hasil.keterangan;

                var inputElement = document.getElementById(`point_${item2.id_subkriteria}`);
                var ket = document.getElementById(`keterangan`);
                if (inputElement) {
                    inputElement.value = item2.penilaian;
                    inputElement.readOnly = true;
                    ket.value = item2.penilaian;
                    ket.readOnly = true;
                }
            });

        }

    } 
    
    // console.log(id_kriteria);

    const calculateGrade = (id, grdePenilaian) => {
        const bobot = subKriteria.find(kriteriaItem => kriteriaItem.id == id)?.bobot || 0;
        const clasGrade = ['A', 'B', 'C', 'D', 'E'];
        const clasketerangan = ['Sangat Bagus', 'Bagus', 'Cukup', 'Tidak Bagus', 'Buruk'];
    
        const thresholds = [
            bobot * 0.9,   // A => 90% - 100%
            bobot * 0.6,   // B => 60% - 89%
            bobot * 0.45,  // C => 45% - 59%
            bobot * 0.05,  // D => 5% - 44%
            0              // E => 0% - 4%
        ];
    
        for (let i = 0; i < thresholds.length; i++) {
            if (grdePenilaian >= thresholds[i]) {
                // Kembalikan objek yang berisi klasifikasi dan keterangan
                return {
                    klasifikasi: clasGrade[i],
                    keterangan: clasketerangan[i]
                };
            }
        }
    
        // Jika grdePenilaian di bawah ambang batas terendah, kembalikan 'E'
        return {
            klasifikasi: clasGrade[clasGrade.length - 1],
            keterangan: clasketerangan[clasGrade.length - 1]
        };
    };
    
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

                            <select
                                className="form-control"
                                id="selecUser"
                                value={anggota.id}
                                disabled
                            >
                                <option disabled>-Select Anggota-</option>
                                {field.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                        selected={item.id === anggota.id}
                                    >
                                        {item.nama} [{item.code}]
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="pilih-anggota" id="pilih-anggota">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card iq-mb-3">
                                        <div className="card-body">
                                            {isSubmitting ? (
                                                <div className="loading">
                                                    <center>
                                                        <img src="/assets/css/ajax-loader.gif" alt="Loading..." />
                                                    </center>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            <h4 className="card-title text-center"><span id="nama"></span>[ <b id="code"></b> ]</h4>
                                            <p className="text-center"><small className="text-muted">Rp. <b id="ajuan">10220</b></small></p>
                                            <button
                                                type="button"
                                                id="userId"
                                                className="btn dark-icon btn-info btn-block"
                                                onClick={() => initializeModalKlasifikasi(0)}
                                            >
                                                Klasifikasi Crore
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="nav nav-pills mb-3 nav-fill" id="pills-tab-1" role="tablist">
                            <li className={`${sts1Show ? 'active' : ''} nav-item`}>
                                <a className={`nav-link ${sts1Aktif ? 'active' : ''}`} id="pills-home-tab-fill1" data-toggle="pill" href="#pills-home-fill1" role="tab" aria-controls="pills-home1"  >Penilaian Point</a>
                            </li>
                            <li className={`${sts2Show ? 'active' : ''} nav-item`}>
                                <a className={`nav-link ${sts2Aktif ? 'active' : ''}`} id="pills-home-tab-fill2" data-toggle="pill" href="#pills-home-fill2" role="tab" aria-controls="pills-home2"  >Peninjauan Lokasi</a>
                            </li>
                            <li className={`${sts3Show ? 'active' : ''} nav-item`}>
                                <a className={`nav-link ${sts3Aktif ? 'active' : ''}`} id="pills-home-tab-fill3" data-toggle="pill" href="#pills-home-fill3" role="tab" aria-controls="pills-home3"  >Hasil</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent-1">
                            <div className={`tab-pane fade ${sts1Show ? 'show' : ''} ${sts1Aktif ? 'active' : ''}`} id="pills-home-fill1" role="tabpanel" aria-labelledby="pills-home-tab-fill1">                                <div className="penilaian1" id="penilaian1">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <form className="was-validated" onSubmit={submit}>
                                            <input type="hidden" name="id_anggota" id="id_anggota" />
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
                                                                                    <input type="hidden" name="type" value="1" />
                                                                                    <input type="hidden" name="sts" value="7" />
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
                                                                                        <b className="mb-0" id="garde">Grade: &nbsp;
                                                                                            <div className="badge badge-info">
                                                                                                <span id={`grade_${itemSub.id}`}></span>
                                                                                                {/* <span className="badge badge-light ml-2" id={`gscore_${itemSub.id}`}></span> */}
                                                                                            </div>

                                                                                        </b>&nbsp;|&nbsp; <b className="mb-0">Klasifikasi: &nbsp;
                                                                                            <span className="badge badge-primary" id={`klasifikasi_${itemSub.id}`}> 
                                                                                            </span>
                                                                                        </b>
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
                            <div className={`tab-pane fade ${sts2Show ? 'show' : ''} ${sts2Aktif ? 'active' : ''}`} id="pills-home-fill2" role="tabpanel" aria-labelledby="pills-home-tab-fill2">                                <div className="penilaian1" id="penilaian1">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <form className="was-validated" onSubmit={submit}>
                                            <input type="hidden" name="id_anggota" id="id_anggota1" />
                                            {sts1Show ? (
                                                <div className="card iq-mb-3">
                                                    <small className="text-muted">Laporan Hasil Peninjauan Lokasi</small>
                                                    <div className="card-body">
                                                        <table className="table table-striped">
                                                            {kriteriax.map((item) => {
                                                                return (
                                                                    <React.Fragment key={item.id}>
                                                                        <tr>
                                                                            <th colSpan={2}>{item.nama} [{item.bobot}]</th>
                                                                        </tr>
                                                                        {subKriteriax.map((itemSub, subIndex) => {
                                                                            if (itemSub.id_kriteria == item.id) {
                                                                                return (
                                                                                    <tr key={`${item.id}-${subIndex}`}>
                                                                                        <input type="hidden" name="kriteria[]" value={item.id} />
                                                                                        <input type="hidden" name="subkriteria[]" value={itemSub.id} />
                                                                                        <input type="hidden" name="type" value="2" />
                                                                                        <input type="hidden" name="sts" value="8" />
                                                                                        <input type="hidden" name="codeId" value={codeId} />
                                                                                        <td>{itemSub.nama} <br />[{itemSub.bobot}]</td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
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
                                                    <textarea name="keterangan" id="keterangan1" cols="30" rows="2"></textarea>
                                                    <button className="btn dark-icon btn-primary btn-block" type="submit">
                                                        {isSubmitting ? (
                                                            <div className="loading">
                                                                <img src="/assets/css/ajax-loader.gif" alt="Loading..." />
                                                            </div>
                                                        ) : (
                                                            'Simpan & Lanjut'
                                                        )}
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p>sts 2 is false</p>
                                                    {/* You can add more debugging output if needed */}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className={`tab-pane fade ${sts3Show ? 'show' : ''} ${sts3Aktif ? 'active' : ''}`} id="pills-home-fill3" role="tabpanel" aria-labelledby="pills-home-tab-fill3">                                <div className="penilaian1" id="penilaian1">
                                <div className="row">
                                    <div className="col-sm-12">
                                        {sts3Show ? (

                                            <div className="card iq-mb-3">
                                                <div className="card-body">
                                                    <small className="text-muted"><span>budi santoso1 </span>[ <b id="code">AGT-0087</b> ]</small>
                                                    <a href="#" className="btn dark-icon btn-primary btn-block">Go somewhere</a>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>sts 3 is false</p>
                                                {/* You can add more debugging output if needed */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
