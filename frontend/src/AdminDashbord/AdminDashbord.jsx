import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Contactadmin from "./Contactadmin";
import Projects from "../project/project";
import Toolsadmin from "./toolsadmin";
import Profilimage from "./Profilimage";
import Description from "./description";
function AdminDashbord() {
  return (
    <div>
      <ul className="d-flex flex-column flex-sm-row justify-content-around m-0 p-0">
        <li className="mx-2">
          <Link to="/AdminDashbord/toolsadmin">Tools Admin</Link>
        </li>
        <li className="mx-2">
          <Link to="/AdminDashbord/projadmin">Project Admin</Link>
        </li>
        <li className="mx-2">
          <Link to="/AdminDashbord/Contactadmin">Contacts</Link>
        </li>
        <li className="mx-2">
          <Link to="/AdminDashbord/description">description</Link>
        </li>
        <li className="mx-2">
          <Link to="/AdminDashbord/Profilimage">profile image</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<div>Admin Home Page</div>} />
        <Route path="/toolsadmin" element={<Toolsadmin />} />
        <Route path="/description" element={<Description />} />
        <Route path="/profileimage" element={<Profilimage />} />
        <Route path="/projadmin" element={<Projects islogin={true} />} />
        <Route path="/Contactadmin" element={<Contactadmin />} />
        <Route path="/Profilimage" element={<Profilimage />} />
      </Routes>
    </div>
  );
}

export default AdminDashbord;
