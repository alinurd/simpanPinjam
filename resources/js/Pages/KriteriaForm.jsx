import React from "react";
import { Link } from "@inertiajs/react";


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to convert a string to lowercase
const toLowerCase = (string) => {
    return string.toLowerCase();
};


export default function KriteriaForm(props) {
    const { title } = props;
    const { mode } = props;
    const { input } = props;
    const { code } = props;
    
    
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
                        Back to {capitalizeFirstLetter(title)}
                    </Link>                </div>
            </div>
            <div className="iq-card-body">
            <form className="was-validated">


      {Object.keys(input).map((key) => {
        
        const { title, type, value, options, properti } = input[key];
        // console.log(properti)
        
         switch (type) {
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

          case 'dropdown':
            return (
              <div className="form-group" key={key}>
                <label htmlFor={`validation${capitalizeFirstLetter(title)}`}>{capitalizeFirstLetter(title)}</label>
                <select className="custom-select" required>
                  <option value>Open this select menu</option>
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
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
        <div  key={index}>
          <input
            type="radio"
            className={`custom-control-input  `}

            id={`customControlValidationRadio${radio.value}`}
            name={`input-${title}`} // Using the title as the identifier for the radio group
            checked={mode=="update"? value : 1}  
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
          Submit form
        </button>
      </div>
    </form> 
            </div>
        </div >



    );
}
