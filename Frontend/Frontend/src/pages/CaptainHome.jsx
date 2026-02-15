import { Link } from "react-router-dom";

const CaptainHome = () => {
  return (
    <div>
      <h1>Captain Dashboard</h1>
      <Link to="/captain-logout">Logout</Link>
    </div>
  );
};

export default CaptainHome;
