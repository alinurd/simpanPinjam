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


export default function AnggotaReview(props) {

    const { field, kriteria, subKriteria, codeId, mode, title, anggota, kriteriax, subKriteriax, point, tinjau, pointTotal, bobotTotal, aprv } = props;
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // console.log(aprv)
    const submit = async (e) => {
        e.preventDefault();

        try {
            // Show loading spinner
            // setIsSubmitting(true);

            // Serialize form data or customize the data as needed
            const formData = new FormData(e.target);
            console.log(mode)
            // Make a POST request using axios
            const response = await axios.post(`/${toLowerCase(title)}${capitalizeFirstLetter(mode)}`, formData);

            // Optionally, reset the form after successful submission
            e.target.reset();

            // Hide loading spinner after successful submission
            // setIsSubmitting(false);

            // Access the redirect path from the response data
            const redirectTo = response.data.redirect;


            alert(response.data.message)

            Inertia.visit(redirectTo, {
                only: ['body'],  // Optional, specify the sections of the page to update
            });

        } catch (error) {
            console.error('Error making POST request:', error);
            console.log('Error details:', error.response); // Log the error details
            // setIsSubmitting(false);

        }
    };
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
    const initializeModalAprv = async (id) => {
        try {
            const response = await axios.get(`/pointByAnggota/${id}`);
            console.log(response.data.data)

            if (response) {
                updateModalContentApr(response.data.data);
                $('#exampleModalCenterApprove').modal('show');
            }
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };
    const initializelPoint = async (id) => {
        try {
            const response = await axios.get(`/pointByAnggota/${id}`);
            // console.log(response.data.data)
            if (response) {
                updateModalContentPoint(response.data.data);
                $('#exampleModalCenterPoint').modal('show');
            }
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };

    // Function to update modal content
    const updateModalContentPoint = (data) => {
        // Access the modal element and update its content based on the fetched data

        const modalElement = document.getElementById('exampleModalCenterPoint');

        if (modalElement) {

            var Ha = hasilAhir(data.pointTotal, data.bobotTotal, 0)
            modalElement.querySelector('#exampleModalCenterPointTitle').textContent = data.field.nama;
            //  modalElement.querySelector('#exampleModalCenterPointNama').textContent = Ha.field.nama;
            // console.log(data.code)

            let stsPinjamanElements = document.getElementsByClassName('keteranganPoint');
            for (let j = 0; j < stsPinjamanElements.length; j++) {
                stsPinjamanElements[j].textContent = data.point[0].keterangan;
            }

            let stsPinjamanElements1 = document.getElementsByClassName('keteranganPoint1');
            for (let j = 0; j < stsPinjamanElements1.length; j++) {
                stsPinjamanElements1[j].textContent = data.point[0].keterangan;
            }
            data.tinjau.map((item, subIndex) => {
                var inputElement = document.getElementById(`point_${item.id_subkriteria}`);
                if (inputElement) {
                    inputElement.value = item.penilaian;
                    inputElement.readOnly = true;
                }
            });
            data.point.map((item2, subIndex) => {
                // kriteria.map
                var Hasil = calculateGrade(item2.id_subkriteria, item2.penilaian);
                // console.log(Hasil)
                // Mengasumsikan Anda memiliki elemen dengan ID seperti 'grade_item2.id_subkriteria', 'gscore_item2.id_subkriteria', 'klasifikasi_item2.id_subkriteria'
                document.getElementById(`grade_${item2.id_subkriteria}`).textContent = Hasil.klasifikasi;
                // document.getElementById(`gscore_${item2.id_subkriteria}`).textContent = Hasil;
                document.getElementById(`klasifikasi_${item2.id_subkriteria}`).textContent = Hasil.keterangan;

                var inputElement = document.getElementById(`point_${item2.id_subkriteria}`);
                // var ket = document.getElementById(`keterangan`);
                if (inputElement) {
                    inputElement.value = item2.penilaian;
                    inputElement.readOnly = true;
                    // ket.value = item2.penilaian;
                    // ket.readOnly = true;
                }
            });
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
            modalElement.querySelector('#exampleModalCenterTitle').textContent = data.code;
            modalElement.querySelector('#exampleModalCenterNama').textContent = data.nama;
            modalElement.querySelector('#exampleModalCenterDesa').textContent = data.desa.nama;
            modalElement.querySelector('#exampleModalCenterRw').textContent = data.rw;
            modalElement.querySelector('#exampleModalCenterRt').textContent = data.rt;
            modalElement.querySelector('#exampleModalCenterKp').textContent = data.kp;
            // Assuming you have elements in the modal to display the fetched data
        }
    };
    const updateModalContentApr = (data) => {
        const modalElement = document.getElementById('exampleModalCenterApprove');
        if (modalElement) {
            // console.log(data.point[0].code)
            // Update modal content here, for example:
            var Ha = hasilAhir(data.pointTotal, data.bobotTotal, 1)
            var inputElement = document.getElementById(`id_anggota`);
                // var ket = document.getElementById(`keterangan`);
                if (inputElement) {
                    inputElement.value = data.id;
                    inputElement.readOnly = true;
                    // ket.value = item2.penilaian;
                    // ket.readOnly = true;
                }

                
            modalElement.querySelector('#exampleModalCenterApproveTitle').textContent = data.field.code;
            modalElement.querySelector('#exampleModalCenterApproveName').textContent = data.field.nama;
            modalElement.querySelector('#exampleModalCenterApproveAjuan').textContent = "Rp. " + data.field.ajuan;
            document.getElementById('code').value = data.point[0].code;

            const tbl = document.getElementById('logAprv');
            const rowCount = tbl.rows.length;

            var inputElement = document.getElementById(`id_anggota`);
            // var ket = document.getElementById(`keterangan`);
            if (inputElement) {
                inputElement.value = data.field.id;
                inputElement.readOnly = true;
                // ket.value = item2.penilaian;
                // ket.readOnly = true;
            }
            // Hapus semua baris kecuali header
            for (let i = rowCount - 1; i > 0; i--) {
                tbl.deleteRow(i);
            }

            data.logAprv.forEach((apr, index) => {
                const row = tbl.insertRow(-1); // Insert new row at the end of the table
                const cellIndex = row.insertCell(0);
                const cellPengurus = row.insertCell(1);
                const cellSaranApprovalRp = row.insertCell(2);
                const cellStatus = row.insertCell(3);
                const cellKeterangan = row.insertCell(4);

                cellIndex.textContent = index + 1;
                cellPengurus.textContent = apr.users.name;
                cellSaranApprovalRp.textContent = apr.ajuan.toLocaleString() + ".-";
                cellStatus.innerHTML = `<i><span class="badge badge-${apr.status.bg}">${apr.status.nama}</span></i>`;
                cellKeterangan.textContent = apr.keterangan;
            });

            // Assuming you have elements in the modal to display the fetched data
        }

    };


    const hasilAhir = (pointTotal, bobotTotal, type) => {
        let point = 0;
        let bobot = 0;
        console.log(pointTotal)

        if (pointTotal.length > 0) {
            point = pointTotal[0].tPoint;
        }

        if (bobotTotal.length > 0) {
            bobot = bobotTotal[0].tBobot;
        }

        const persentase = Math.round((point / bobot) * 100);

        const clasGrade = ['80 >=', '70 >=', '60 >=', '50 >=', '50 <'];
        const clasketerangan = ['Sangat Bagus', 'Bagus', 'Cukup', 'Tidak Bagus', 'Buruk'];
        const stsPinjamans = [
            '100% dari Jumlah Aplikasi Pinjaman',
            '90% dari Jumlah Aplikasi Pinjaman',
            '80% dari Jumlah Aplikasi Pinjaman',
            'Pinjaman Tidak Tersedia',
            'Pinjaman Tidak Tersedia',
        ];
        const thresholds = [
            80,
            70,
            60,
            50,
            0
        ];
        for (let i = 0; i < thresholds.length; i++) {
            if (persentase >= thresholds[i]) {


                if (type > 0) {
                    let stsPinjamanElements = document.getElementsByClassName('stsPinjaman');
                    for (let j = 0; j < stsPinjamanElements.length; j++) {
                        stsPinjamanElements[j].textContent = stsPinjamans[i];
                    }
                    // let gAhirElements = document.getElementsByClassName('gAhir');
                    // for (let j = 0; j < gAhirElements.length; j++) {
                    //     gAhirElements[j].textContent = clasGrade[i];
                    // }
                    let ketAhirElements = document.getElementsByClassName('ketAhir');
                    for (let j = 0; j < ketAhirElements.length; j++) {
                        ketAhirElements[j].textContent = clasketerangan[i];
                    }

                    let resPointElements = document.getElementsByClassName('resPoint');
                    for (let j = 0; j < resPointElements.length; j++) {
                        resPointElements[j].textContent = persentase + '%';
                    }
                    let gAhirElements = document.getElementsByClassName('gAhir');
                    for (let j = 0; j < gAhirElements.length; j++) {
                        gAhirElements[j].textContent = clasGrade[i];
                    }
                } else {
                    let stsPinjamanElements = document.getElementsByClassName('stsPinjaman');
                    for (let j = 0; j < stsPinjamanElements.length; j++) {
                        stsPinjamanElements[j].textContent = stsPinjamans[i];
                    }

                    let ketAhirElements = document.getElementsByClassName('ketAhir');
                    for (let j = 0; j < ketAhirElements.length; j++) {
                        ketAhirElements[j].textContent = clasketerangan[i];
                    }

                    let resPointElements = document.getElementsByClassName('resPoint');
                    for (let j = 0; j < resPointElements.length; j++) {
                        resPointElements[j].textContent = persentase + '%';
                    }

                    let ttlPointElements = document.getElementsByClassName('ttlPoint');
                    for (let j = 0; j < ttlPointElements.length; j++) {
                        ttlPointElements[j].textContent = point;
                    }

                    let ttlBobotElements = document.getElementsByClassName('ttlBobot');
                    for (let j = 0; j < ttlBobotElements.length; j++) {
                        ttlBobotElements[j].textContent = bobot;
                    }
                    let gAhirElements = document.getElementsByClassName('gAhir');
                    for (let j = 0; j < gAhirElements.length; j++) {
                        gAhirElements[j].textContent = clasGrade[i];
                    }
                }
                // Update HTML elements based on class names




                // if (stsPinjamans[i] === "Pinjaman Tidak Tersedia") {
                //     setstsAhir(false);
                // } else {
                //     setstsAhir(true);
                // }
                break; // No need to continue the loop once updated
            }
        }

    };





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

    const handleApprove = () => {
        // Set the value of the hidden input field to 1
        document.getElementById('submitId').value = '3';
        // You can add any additional logic here if needed
        // For example, you can trigger form submission here
    };

    
    // Semua elemen trDetail disembunyikan secara default
    document.querySelectorAll('[id="Detail"]').forEach(trDetailElement => {
        trDetailElement.classList.add('d-none');
    });

    // Mendapatkan semua elemen trHead
    const trHeadElements = document.querySelectorAll('[id^="trHead"]');

    // Mengulangi setiap elemen trHead untuk menambahkan event listener
    trHeadElements.forEach((trHeadElement, index) => {
        // Menambahkan event listener untuk setiap elemen trHead
        trHeadElement.addEventListener('click', () => {
            // Mendapatkan elemen trDetail yang sesuai dengan indeks yang sama
            const trDetailElement = document.getElementById(`trDteail${index}`);

            // Memeriksa apakah trDetail sudah ditampilkan atau tidak
            const isHidden = trDetailElement.classList.contains('d-none');

            // Toggle untuk menampilkan atau menyembunyikan trDetail
            if (isHidden) {
                trDetailElement.classList.remove('d-none');
            } else {
                trDetailElement.classList.add('d-none');
            }
        });
    });
    const trHeadElementsx = document.querySelectorAll('[id^="trHeadx"]');

    // Mengulangi setiap elemen trHead untuk menambahkan event listener
    trHeadElementsx.forEach((trHeadElementx, index) => {
        // Menambahkan event listener untuk setiap elemen trHead
        trHeadElementx.addEventListener('click', () => {
            // Mendapatkan elemen trDetail yang sesuai dengan indeks yang sama
            const trDetailElementx = document.getElementById(`trDteailx${index}`);

            // Memeriksa apakah trDetail sudah ditampilkan atau tidak
            const isHidden = trDetailElementx.classList.contains('d-none');

            // Toggle untuk menampilkan atau menyembunyikan trDetail
            if (isHidden) {
                trDetailElementx.classList.remove('d-none');
            } else {
                trDetailElementx.classList.add('d-none');
            }
        });
    });

    // console.log(field)
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title">{capitalizeFirstLetter(title)} Review</h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <div className="row">

                            <div className="col-sm-12">
                                <hr className="mt-3" />
                                <h5 className="mb-0">Hello, Nik Jones</h5>
                                <p>
                                    It is a long established fact that a reader will be
                                    distracted by the readable content of a page when
                                    looking at its layout. The point of using Lorem Ipsum is
                                    that it has a more-or-less normal distribution of
                                    letters, as opposed to using 'Content here, content
                                    here', making it look like readable English.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <h5 className="badge badge-danger">Calon Crediter Yang Belum disetujui</h5>
                                <div className="table-responsive-sm">
                                    <table className="table table-striped" id="rejct">
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th className="text-left">Name</th>
                                                <th className="text-left">Email</th>
                                                <th className="text-left">Phone</th>
                                                <th className="text-center">Alamat</th>
                                                <th className="text-center">Penilaian</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {field.map((item, index) => {
                                                // Cek apakah status.id sama dengan 5
                                                if (item.status.id === 6) {
                                                    return (
                                                        <>
                                                            <tr id={`trHeadx${index}`}>
                                                                <td className="text-center" key={index}>{index + 1}</td>
                                                                <td className="text-left">{item.nama}</td>
                                                                <td className="text-left">{item.email}</td>
                                                                <td className="text-left">{item.phone}</td>
                                                                <td className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                        onClick={() => initializeModal(item ? item.id : '-')}
                                                                    >
                                                                        Lihat Alamat detail
                                                                    </button>
                                                                </td>
                                                                <td className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-info"
                                                                        onClick={() => initializelPoint(item ? item.id : '-')}
                                                                    >
                                                                        Lihat Penilaian detail
                                                                    </button>
                                                                </td>
                                                                <td className="text-center">
                                                                    <h6 class="mb-0"><span class={`badge badge-${item.status.bg}`}>{item.status.nama}</span></h6>
                                                                </td>
                                                                <td>
                                                                    <div className=" text-center flex align-items-center list-user-action">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => initializeModalAprv(item ? item.id : '-')}
                                                                            className={`btn mb-1 dark-icon btn-secondary`}
                                                                        >
                                                                            Catatan
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {aprv.map((itemAprv, k) => {
                                                                return null;
                                                                
                                                                if (item.id === itemAprv.id_anggota) {
                                                                    return (
                                                                        <tr className="d-none" id={`trDteailx${index}`}>
                                                                            <td colSpan={2} className="text-left">
                                                                                <span className="badge badge-info">{itemAprv.code}</span>
                                                                                <br />by: {itemAprv.users.name} {/* Ganti dengan field yang sesuai */}
                                                                            </td>
                                                                            <td className="text-left">diajukan <br />{item.ajuan.toLocaleString()}.-</td> {/* Ganti dengan field yang sesuai */}
                                                                            <td className="text-left">diAprv <br />{itemAprv.ajuan.toLocaleString()}.- </td> {/* Ganti dengan field yang sesuai */}
                                                                            <td colSpan={3} className="text-left">
                                                                                <p>keterangan: {itemAprv.keterangan}</p> {/* Ganti dengan field yang sesuai */}
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                } else {
                                                                    return null;
                                                                }
                                                            })}
                                                        </>
                                                    );
                                                } else {
                                                    return null; // Jika status tidak sama dengan 5, lewati item ini
                                                }
                                            })}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <h5 className="badge badge-success">Crediter Yang disetujui</h5>
                                <div className="table-responsive-sm">
                                    <table className="table table-striped" id="apr">
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th className="text-left">Name</th>
                                                <th className="text-left">Email</th>
                                                <th className="text-left">Phone</th>
                                                <th className="text-center">Alamat</th>
                                                <th className="text-center">Penilaian</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {field.map((item, indexx) => {
                                                // Cek apakah status.id sama dengan 5
                                                if (item.status.id === 5) {
                                                    return (
                                                        <>
                                                            <tr id={`trHead${item.id}`}>
                                                                <td className="text-center" key={indexx}>{indexx + 1}</td>
                                                                <td className="text-left">{item.nama}</td>
                                                                <td className="text-left">{item.email}</td>
                                                                <td className="text-left">{item.phone}</td>
                                                                <td className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                        onClick={() => initializeModal(item ? item.id : '-')}
                                                                    >
                                                                        Lihat Alamat detail
                                                                    </button>
                                                                </td>
                                                                <td className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-info"
                                                                        onClick={() => initializelPoint(item ? item.id : '-')}
                                                                    >
                                                                        Lihat Penilaian detail
                                                                    </button>
                                                                </td>
                                                                <td className="text-center">
                                                                    <h6 class="mb-0"><span class={`badge badge-${item.status.bg}`}>{item.status.nama}</span></h6>
                                                                </td>
                                                                <td>
                                                                    <div className=" text-center flex align-items-center list-user-action">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => initializeModalAprv(item ? item.id : '-')}
                                                                            className={`btn mb-1 dark-icon btn-secondary`}
                                                                        >
                                                                            Catatan
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {aprv.map((itemAprv, k) => {
                                                                return null;
                                                                if (item.id === itemAprv.id_anggota) {
                                                                    // return (
                                                                    //     <tr className="d-none" id={`trDteail${item.id}`}>
                                                                    //         <td colSpan={2} className="text-left">
                                                                    //             <span className="badge badge-info">{itemAprv.code}</span>
                                                                    //             <br/>by: {itemAprv.users.name} {/* Ganti dengan field yang sesuai */}
                                                                    //         </td>
                                                                    //         <td className="text-left">diajukan <br />{item.ajuan.toLocaleString()}.-</td> {/* Ganti dengan field yang sesuai */}
                                                                    //         <td className="text-left">diAprv <br />{itemAprv.ajuan.toLocaleString()}.- </td> {/* Ganti dengan field yang sesuai */}
                                                                    //         <td colSpan={3} className="text-left">
                                                                    //             <p>keterangan: {itemAprv.keterangan}</p> {/* Ganti dengan field yang sesuai */}
                                                                    //         </td>
                                                                    //     </tr>
                                                                    // );
                                                                } else {
                                                                    return null;
                                                                }
                                                            })}
                                                        </>
                                                    );
                                                } else {
                                                    return null; // Jika status tidak sama dengan 5, lewati item ini
                                                }
                                            })}
                                        </tbody>
                                    </table>


                                </div>
                                <h5 className="mt-5">Order Details</h5>
                                <div className="table-responsive-sm">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Bank</th>
                                                <th scope="col">.Acc.No</th>
                                                <th scope="col">Due Date</th>
                                                <th scope="col">Sub-total</th>
                                                <th scope="col">Discount</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Threadneedle St</th>
                                                <td>12333456789</td>
                                                <td>12 November 2019</td>
                                                <td>$4597.50</td>
                                                <td>10%</td>
                                                <td><b>$4137.75 USD</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-sm-6" />
                            <div className="col-sm-6 text-right">
                                <button type="button" className="btn btn-link mr-3">
                                    <i className="ri-printer-line" /> Download Print
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <div className="col-sm-12 mt-5">
                                <b className="text-danger">Notes:</b>
                                <p>
                                    It is a long established fact that a reader will be
                                    distracted by the readable content of a page when
                                    looking at its layout. The point of using Lorem Ipsum is
                                    that it has a more-or-less normal distribution of
                                    letters, as opposed to using 'Content here, content
                                    here', making it look like readable English.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalCenterApprove" role="dialog" aria-labelledby="exampleModalCenterApprove" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <form className="was-validated" onSubmit={submit}>
                            <div className="modal-header">
                                <h5 className="modal-title text-bold" id="">
                                    <b> [<span id="exampleModalCenterApproveTitle"></span>]</b> -  <span id="exampleModalCenterApproveName"></span> | 
                                    <i> Rp. <span className="badge badge-dark ajuan" id="exampleModalCenterApproveAjuan"></span></i>
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <center>
                                    
                                <div
                                    class="table-responsive"
                                >
                                    <h5 className="text-left">log Aproval</h5>
                                    <table class="table table-primary" id="logAprv">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Pengurus</th>
                                                    <th scope="col">Saran aprv Rp.</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Keterangan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="">
                                                    <td id="logIndex"><span id="logInsdex"></span></td>
                                                    <td id="logUser"><span id="loguser"></span></td>
                                                    <td id="logAjuan"><span id="logAjuan"></span></td>
                                                    <td id="logStatus"><span className="badge badge-secondary" id="logStatus"></span></td>
                                                    <td id="logKet"><span id="logKet"></span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </div>
                                
                                
                                </center>
                                 
                                <center>
                                    <label htmlFor="keterangan">Keterangan</label><br />
                                    <textarea name="keterangan" id="keterangan" cols="40" rows="2" required></textarea>
                                    <br />
                                    <label htmlFor="ajuan">Saran Ajuan</label><br />
                                    <input type="number" name="ajuan" id="ajuan" />
                                    <input type="hidden" name="id_anggota" id="id_anggota" />
                                 </center>
                                
                            </div>
                            <div className="modal-footer">
                                <div className="row">
                                    <div className="col">
                                        <button type="submit" className="btn btn-success" onClick={() => handleApprove()}>Saran</button>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" id="submitId" name="submitId" value="0" />
                            <input type="hidden" id="code" name="code" value="0" />
                        </form>

                    </div>
                </div>



            </div><div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenter" aria-hidden="true">
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

            <div className="modal fade" id="exampleModalCenterPoint" role="dialog" aria-labelledby="exampleModalCenterPoint" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg " role="document">
                    <div className="modal-content ">
                        <div className="modal-header ">
                            <center>
                                <h5 className="modal-title text-bold" id="">
                                    <b> <span id="exampleModalCenterPointTitle"></span></b> -

                                    <b className="mb-0" id="garde">&nbsp;
                                        <div className="badge badge-primary">
                                            <i className="ketAhir"></i>&nbsp;
                                            <span className="badge badge-light resPoint"></span>
                                        </div>
                                    </b><br />
                                    <i><span className="badge badge-secondary stsPinjaman"></span></i>
                                    {/* ( <i className="ttlPoint"> </i>*<i className="ttlBobot"> </i> ) /100%&nbsp; */}
                                    <br />

                                </h5>
                            </center>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <ul className="nav nav-pills mb-3 nav-fill" id="pills-tab-1" role="tablist">
                                <li className={`  active nav-item`}>
                                    <a className={`nav-link active`} id="pills-home-tab-fill1" data-toggle="pill" href="#pills-home-fill1" role="tab" aria-controls="pills-home1"  >Penilaian Point</a>
                                </li>
                                <li className={`  nav-item`}>
                                    <a className={`nav-link  `} id="pills-home-tab-fill2" data-toggle="pill" href="#pills-home-fill2" role="tab" aria-controls="pills-home2"  >Peninjauan Lokasi</a>
                                </li>
                            </ul>

                            <div className="tab-content     " id="pills-tabContent-1">
                                <div className={`tab-pane fade active `} id="pills-home-fill1" role="tabpanel" aria-labelledby="pills-home-tab-fill1">                                <div className="penilaian1" id="penilaian1">

                                    <table className="table table-striped active">
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
                                        <tr>
                                            <td colSpan={2}><i>keterangan:</i><br /><span className="keteranganPoint"></span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                </div>
                                <div className="tab-pane fade active" id="pills-home-fill2" role="tabpanel" aria-labelledby="pills-home-tab-fill2">
                                    <div className="penilaian1" id="penilaian1">
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
                                            <tr>
                                                <td colSpan={2}><i>keterangan:</i><br /><span className="keteranganPoint1"></span>
                                                </td>
                                            </tr>
                                        </table>
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
