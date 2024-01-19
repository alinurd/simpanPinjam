import { Link } from "@inertiajs/react";
const capitalizeAllLetters = (string) => {
  return string.toUpperCase();
};
export default function Sidebar() {

  return (
    <div className="iq-sidebar">
      <div className="iq-sidebar-logo d-flex justify-content-between">
        <a href="../dashboard">
          <img src="../images/logo.gif" className="img-fluid" alt />
          <span>Vito</span>
        </a>
        <div className="iq-menu-bt-sidebar">
          <div className="iq-menu-bt align-self-center">
            <div className="wrapper-menu">
              <div className="main-circle"><i className="ri-arrow-left-s-line" /></div>
              <div className="hover-circle"><i className="ri-arrow-right-s-line" /></div>
            </div>
          </div>
        </div>
      </div>
      <div id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            <li className="iq-menu-title"><i className="ri-subtract-line" /><span>Home</span></li>
            <li>
              <Link
                href="/dashboard"
                className={`iq-waves-effect  ${
                window.location.pathname === "/dashboard"? "active": "" }`}aria-current="page" > 
                Dashboard
              </Link>
             </li>  

            <li className="iq-menu-title"><i className="ri-subtract-line" /><span>Apps</span></li>
            <li>
              <a href="#anggota" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-pencil-ruler-line" /><span>Anggota</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
              <ul id="anggota" className="iq-submenu collapse" data-parent="#anggota">
                <li>
                  <Link
                  href="/anggota"
                  className={`iq-waves-effect  ${
                  window.location.pathname === "/anggota"? "active": "" }`}aria-current="page" > 
                  List
                </Link> 
              </li> 
              </ul>
            </li>
            <li>
              <a href="#parameter" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-profile-line" /><span>Parameter</span><i className="ri-arrow-right-s-line iq-arrow-right" /></a>
              <ul id="parameter" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                <li>
                  <Link
                    href="/parameter"
                    className={`iq-waves-effect  ${
                    window.location.pathname === "/parameter"? "active": "" }`}aria-current="page" > 
                    Kriteria
                  </Link> 
                </li> 
                <li>
                  <Link
                    href="/parameter"
                    className={`iq-waves-effect  ${
                    window.location.pathname === "/parameter"? "active": "" }`}aria-current="page" > 
                    Sub Kriteria
                  </Link> 
                </li> 
              </ul>
            </li>
            <li>
                  <Link
                    href="/logout"
                    method="post"
                    className={`btn btn-primary  text-white  ${
                    window.location.pathname === "/parameter"? "active": "" }`}aria-current="page" > 
                    Logout
                  </Link> 
                </li> 
             
          </ul>
        </nav>
        <div className="p-3" />
      </div>
    </div>



  );
}
