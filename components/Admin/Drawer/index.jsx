/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Link from 'next/link';

function Drawer() {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay" />
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <Link href="/admin/membros">Membresia</Link>
          </li>
          <li>
            <Link href="/admin/casamentos" className={`${1}`}>
              Casais
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
