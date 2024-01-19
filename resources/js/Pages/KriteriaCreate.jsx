import React from "react";
import { Link } from "@inertiajs/react";


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to convert a string to lowercase
const toLowerCase = (string) => {
    return string.toLowerCase();
};


export default function KriteriaCreate(props) {
    const { title } = props;
    const { mode } = props;
    return (

        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title"> {capitalizeFirstLetter(title)} | {capitalizeFirstLetter(mode)}</h4>
                </div>

                <div className="btn btn-dark d-flex float-right">
                <Link
                        href={`/${toLowerCase(title)}Create`}
                        className={`text-light ${window.location.pathname === `/${toLowerCase(title)}Create` ? "active" : ""}`}
                        aria-current="page"
                    >
                        Back to {capitalizeFirstLetter(title)}
                    </Link>                </div>
            </div>
            <div className="iq-card-body">

                <form className="was-validated">
                    <div className="mb-3">
                        <label htmlFor="validationTextarea">Textarea</label>
                        <textarea className="form-control is-invalid" id="validationTextarea" placeholder="Required example textarea" required defaultValue={""} />
                        <div className="invalid-feedback">
                            Please enter a message in the textarea.
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="customControlValidation1" required />
                        <label className="custom-control-label" htmlFor="customControlValidation1">Check this custom checkbox</label>
                        <div className="invalid-feedback">Example invalid feedback text</div>
                    </div>
                    <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" id="customControlValidation2" name="radio-stacked" required />
                        <label className="custom-control-label" htmlFor="customControlValidation2">Toggle this custom radio</label>
                    </div>
                    <div className="custom-control custom-radio mb-3">
                        <input type="radio" className="custom-control-input" id="customControlValidation3" name="radio-stacked" required />
                        <label className="custom-control-label" htmlFor="customControlValidation3">Or toggle this other custom radio</label>
                        <div className="invalid-feedback">More example invalid feedback text</div>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" required>
                            <option value>Open this select menu</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                        </select>
                        <div className="invalid-feedback">Example invalid custom select feedback</div>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                        <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                        <div className="invalid-feedback">Example invalid custom file feedback</div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
            </div>
        </div >



    );
}
