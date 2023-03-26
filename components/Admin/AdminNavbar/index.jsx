import React from 'react';

function AdminNavbar() {
  return <div className="navbar bg-base-100">
    <div className="flex-1">
      <span className="btn btn-ghost normal-case text-xl">Membros IBCL</span>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <a
            className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
            href="/api/auth/logout"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
}

export default AdminNavbar;
