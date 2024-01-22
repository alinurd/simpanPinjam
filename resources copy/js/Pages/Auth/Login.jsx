import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Login(props) {
    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
    });

    const submitLogin = (e) => {
        e.preventDefault();
        post("/login");
    }
    return (
       <section className="sign-in-page">
  <div className="container bg-white mt-5 p-0">
    <div className="row no-gutters">
      <div className="col-sm-6 align-self-center">
        <div className="sign-in-from">
          <h1 className="mb-0 dark-signin">Sign in</h1>
          <p>Enter your email address and password to access admin panel.</p>
          <form onSubmit={submitLogin}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="text" className="form-control" placeholder="Enter Email" value={data.email} onChange={e => setData('email',e.target.value)}/>
                                {errors.email && <span className="text-danger">{errors.email}</span>}

              {/* <input type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email" /> */}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <a href="#" className="float-right">Forgot password?</a>
              <input type="password" className="form-control" placeholder="********" onChange={e => setData('password',e.target.value)}/>
                                {errors.password && <span className="text-danger">{errors.password}</span>}            </div>
            <div className="d-inline-block w-100">
              <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label>
              </div>
              <button type="submit" className="btn btn-primary float-right">Sign in</button>
            </div>
            <div className="sign-info">
              <span className="dark-color d-inline-block line-height-2">Don't have an account? <a href="#">Sign up</a></span>
              <ul className="iq-social-media">
                <li><a href="#"><i className="ri-facebook-box-line" /></a></li>
                <li><a href="#"><i className="ri-twitter-line" /></a></li>
                <li><a href="#"><i className="ri-instagram-line" /></a></li>
              </ul>
            </div>
          </form>
        </div>
      </div>
      <div className="col-sm-6 text-center">
        <div className="sign-in-detail text-white">
          <a className="sign-in-logo mb-5" href="#"><img src="{{ asset('assets/images/logo-white.png') }}" className="img-fluid" alt="logo" /></a>
          <div className="slick-slider11" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items={1} data-items-laptop={1} data-items-tab={1} data-items-mobile={1} data-items-mobile-sm={1} data-margin={0}>
            <div className="item">
            <img src="{{ asset('assets/images/login/2.png') }}" className="img-fluid mb-4" alt="logo" />
              <h4 className="mb-1 text-white">Lorem Ipsum</h4>
              <p>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generato</p>
            </div>
            <div className="item">
            <img src="{{ asset('assets/images/login/2.png') }}" className="img-fluid mb-4" alt="logo" />
              <h4 className="mb-1 text-white">Lorem Ipsum</h4>
              <p>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generato</p>
            </div>
            <div className="item">
            <img src="{{ asset('assets/images/login/2.png') }}" className="img-fluid mb-4" alt="logo" />
              <h4 className="mb-1 text-white">Lorem Ipsum</h4>
              <p>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generato</p>
            </div>
    
          </div>
        </div>
      </div>
    </div>
    <br /><br /><br />
    <h6 className="text-center">Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generato <br /> <b>KPNMJ</b> | <b>ALi Nurdin</b> <br />2024</h6> <br /> <br />
  </div>
</section>

    );
}
