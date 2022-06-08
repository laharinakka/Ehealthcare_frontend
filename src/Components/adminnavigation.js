import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function AdminNavbar(props) {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container">
          <a className="navbar-brand" href="/">
            E-HCMS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  exact
                  to="/admin/medicinesReport"
                >
                  Inventory Reports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/admin/medicinesReport">
                  User Reports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/admin/medicinesReport">
                  Order Reports
                </NavLink>
              </li>
            </ul>

            <Link to="/" className="btn btn-success">
              Log Out
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
