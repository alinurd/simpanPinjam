import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Footer(props) {

   const { auth } = usePage().props;
   return (
   <footer className="iq-footer">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-6">
        <ul className="list-inline mb-0">
          <li className="list-inline-item"><a href="./privacy-policy.html">Privacy Policy</a></li>
          <li className="list-inline-item"><a href="./terms-of-service.html">Terms of Use</a></li>
        </ul>
      </div>
      <div className="col-lg-6 text-right">
        Copyright 2024 <a href="#">Ali Nurdin</a> All Rights Reserved.
      </div>
    </div>
  </div>
</footer>


   );

}
