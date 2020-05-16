import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mynotes">Catatan Ku</Link>
        </li>
        <li>
          <Link to="/favorites">Favorite</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
