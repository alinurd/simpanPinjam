import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import axios from 'axios';  // Import the axios library
import { Inertia } from '@inertiajs/inertia'; // Import the Inertia object

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to convert a string to lowercase
const toLowerCase = (string) => {
    return string.toLowerCase();
};

export default function PenilaianForm(props) {
    const { title } = props;
    const { mode } = props;
    const { input } = props;
    const { code } = props;
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

            // Hide loading spinner on error
            setIsSubmitting(false);

            // Handle the error as needed (e.g., display a user-friendly message)
        }
    };
    return (

        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">

                <div className="iq-header-title">
                    <h4 className="card-title"> <span className="m-3">{capitalizeFirstLetter(title)} | {capitalizeFirstLetter(mode)} </span>
                        <button type="button" class="btn mb-1 dark-icon btn-primary ">
                            Code <span class="badge badge-light ml-2">{code}</span>
                        </button>
                    </h4>
                </div>

                <div className="btn btn-dark d-flex float-right">
                    <Link
                        href={`/${toLowerCase(title)}`}
                        className={`text-light ${window.location.pathname === `/${toLowerCase(title)}Create` ? "active" : ""}`}
                        aria-current="page"
                    >
                        Back to {toLowerCase(title)}
                    </Link>                </div>
            </div>
            <div className="iq-card-body">
                <form className="was-validated" onSubmit={submit}>
                    {input.map((inputObj, key) => {
                        const fieldKey = Object.keys(inputObj)[0]; // Get the key (e.g., "code" or "cost")
                        const { title, type, options, properti, value } = inputObj[fieldKey];
                        console.log(value)

                        switch (type) {
                            case 'hidden':
                                return (
                                    <div className="mb-3" key={key}>
                                         <input
                                            type="hidden"
                                            className={`form-control is-invalid ${properti && properti.required ? 'required' : ''} ${properti && properti.readonly ? 'readonly' : ''} ${properti && properti.disable ? 'disable' : ''}`}
                                            id={`validation${capitalizeFirstLetter(title)}`}
                                            name={`${title.toLowerCase()}`}
                                            defaultValue={value}
                                            placeholder={mode !== 'update' ? `Input ${title.toLowerCase()}` : ''}
                                            required={properti && properti.required}
                                            readOnly={properti && properti.readonly}
                                            disabled={properti && properti.disable}
                                        />
                                        <div className={`feedback-message ${properti && properti.required ? 'invalid-feedback' : 'valid-feedback'}`}>
                                            {properti && properti.required ? 'Please enter a valid' : 'Valid'} {title}.
                                        </div>
                                    </div>
                                );
                            case 'text':
                                return (
                                    <div className="mb-3" key={key}>
                                        <label htmlFor={`validation${capitalizeFirstLetter(title)}`}>{capitalizeFirstLetter(title)}</label>
                                        <input
                                            type="text"
                                            className={`form-control is-invalid ${properti && properti.required ? 'required' : ''} ${properti && properti.readonly ? 'readonly' : ''} ${properti && properti.disable ? 'disable' : ''}`}
                                            id={`validation${capitalizeFirstLetter(title)}`}
                                            name={`${title.toLowerCase()}`}
                                            defaultValue={mode === 'update' ? value : ''}
                                            placeholder={mode !== 'update' ? `Input ${title.toLowerCase()}` : ''}
                                            required={properti && properti.required}
                                            readOnly={properti && properti.readonly}
                                            disabled={properti && properti.disable}
                                        />
                                        <div className={`feedback-message ${properti && properti.required ? 'invalid-feedback' : 'valid-feedback'}`}>
                                            {properti && properti.required ? 'Please enter a valid' : 'Valid'} {title}.
                                        </div>
                                    </div>
                                );
                            case 'number':
                                return (
                                    <div className="mb-3" key={key}>
                                        <label htmlFor={`validation${capitalizeFirstLetter(title)}`}>{capitalizeFirstLetter(title)}</label>
                                        <input
                                            type="number"
                                            className={`form-control is-invalid ${properti && properti.required ? 'required' : ''} ${properti && properti.readonly ? 'readonly' : ''} ${properti && properti.disable ? 'disable' : ''}`}
                                            id={`validation${capitalizeFirstLetter(title)}`}
                                            name={`${title.toLowerCase()}`}
                                            defaultValue={mode === 'update' ? value : ''}
                                            placeholder={mode !== 'update' ? `Input ${title.toLowerCase()}` : ''}
                                            required={properti && properti.required}
                                            readOnly={properti && properti.readonly}
                                            disabled={properti && properti.disable}
                                        />
                                        <div className={`feedback-message ${properti && properti.required ? 'invalid-feedback' : 'valid-feedback'}`}>
                                            {properti && properti.required ? 'Please enter a valid' : 'Valid'} {title}.
                                        </div>
                                    </div>
                                );


                            case 'area':
                                return (
                                    <div className="mb-3" key={key}>
                                        <label htmlFor={`validation${capitalizeFirstLetter(title)}`}>{capitalizeFirstLetter(title)}</label>
                                        <textarea
                                            className={`form-control is-invalid ${properti && properti.required ? 'required' : ''} ${properti && properti.readonly ? 'readonly' : ''} ${properti && properti.disable ? 'disable' : ''}`}
                                            id={`validation${capitalizeFirstLetter(title)}`}
                                            name={`${title.toLowerCase()}`}

                                            defaultValue={mode === 'update' ? value : ''}
                                            placeholder={mode !== 'update' ? `Input ${title.toLowerCase()}` : ''}
                                            required={properti && properti.required}
                                            readOnly={properti && properti.readonly}
                                            disabled={properti && properti.disable}
                                        ></textarea>
                                        <div className={`feedback-message ${properti && properti.required ? 'invalid-feedback' : 'valid-feedback'}`}>
                                            {properti && properti.required ? 'Please enter a valid' : 'Valid'} {title}.
                                        </div>
                                    </div>
                                );

                            // case 'dropdown':
                            //     return (
                            //         <div className="form-group" key={key}>
                            //             <label htmlFor={`validation${capitalizeFirstLetter(title)}`}>{capitalizeFirstLetter(title)}</label>
                            //             <select
                            //                 className="custom-select"
                            //                 name={`${title.toLowerCase()}`}
                            //                 value={value}
                            //                 required={properti && properti.required}
                            //                 readOnly={properti && properti.readonly}
                            //                 disabled={properti && properti.disable}
                            //             >
                            //                 <option   value="">
                            //                     - Pilih {capitalizeFirstLetter(title)}-
                            //                 </option>
                            //                 {options.map((option, index) => (
                            //                     <option
                            //                         key={index}
                            //                         value={option.value}
                            //                         // selected={option.value === value ? 'selected' : ''}
                            //                     >
                            //                         {option.title}
                            //                     </option>
                            //                 ))}
                            //             </select>

                            //             <div className="invalid-feedback">Please select a valid {title}.</div>
                            //         </div>
                            //     );

                            case 'dropdown':
                                return (
                                    <div className="form-group" key={key}>
                                        <label htmlFor={`validation${capitalizeFirstLetter(title)}`}>
                                            {capitalizeFirstLetter(title)}
                                        </label>
                                        <select
                                            className="custom-select"
                                            name={`${title.toLowerCase()}`}
                                            required={properti && properti.required}
                                            readOnly={properti && properti.readonly}
                                            disabled={properti && properti.disable}
                                        >
                                            <option value="" disabled>
                                                - Pilih {capitalizeFirstLetter(title)}-
                                            </option>
                                            {options.map((option, index) => (
                                                // <option key={index} value={option.value}>
                                                <option key={index} value={option.value} selected={option.value == value ? 'selected' : ''}>
                                                    {option.title}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="invalid-feedback">Please select a valid {title}.</div>
                                    </div>

                                );

                            case 'check':
                                return (
                                    // For inline checkboxes
                                    <>
                                        {options.map((checkbox, index) => (
                                            <div className="custom-control custom-checkbox custom-control-inline" key={key}>
                                                <div key={index}>
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id={`customCheck-${checkbox.name}`}
                                                    />
                                                    <label className="custom-control-label" htmlFor={`customCheck-${checkbox.name}`}>
                                                        {checkbox.title}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                );

                            case 'radio':
                                return (
                                    <div div className="custom-control custom-radio">
                                        {options.map((radio, index) => (
                                            <div className="custom-control custom-radio custom-control-inline  mb-3">
                                                <div key={index}>
                                                    <input
                                                        type="radio"
                                                        className={`custom-control-input  `}

                                                        id={`customControlValidationRadio${radio.value}`}
                                                        name={`input-${title}`} // Using the title as the identifier for the radio group
                                                        checked={mode == "update" ? value : 1}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor={`customControlValidationRadio${radio.value}`}
                                                    >
                                                        {radio.title}
                                                    </label>
                                                </div>
                                                <div className="invalid-feedback">Please select one {title}.</div>
                                            </div>
                                        ))}
                                    </div>
                                );

                            default:
                                return null;
                        }
                    })}
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">
                            {isSubmitting ?
                                <div className="loading">
                                    <img src="/assets/css/ajax-loader.gif" alt="Loading..." />
                                </div>
                                : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div >



    );
}
