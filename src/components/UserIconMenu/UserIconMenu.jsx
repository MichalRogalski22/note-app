import { Link } from "react-router-dom";

const UserIconMenu = ({ userEmail, signout }) => {
  return (
    <div className="btn-group">
      <button
        className="btn btn-secondary btn-lg rounded-4 d-flex gap-3 align-items-center px-md-4"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <div className="d-none d-md-block">Account</div>
        <img
          src={`https://api.dicebear.com/5.x/bottts/svg?seed=${userEmail}`}
          alt="profile-icon"
          style={{ width: 40 }}
          className="rounded-circle"
        />
      </button>
      <ul className="dropdown-menu w-100">
        <div className="px-3 text-break">Logged as: {userEmail}</div>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li className="dropdown-item">
          <Link to="#" className="text-decoration-none" onClick={signout}>
            <div className="nav-link w-100 h-100 p-1 mx-2">Signout</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserIconMenu;
