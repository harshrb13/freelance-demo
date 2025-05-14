import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="flex bg-light bg-black text-white">
        <div className="container-fluid flex justify-between w-full px-10 items-center">
          <a className="navbar-brand uppercase" href="/">
            Logo
          </a>
          <div className="flex" >
            <ul className="flex">
              <li className="py-4 px-10">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="py-4">
                <a className="nav-link" href="/admin">
                  Admin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
