import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

export default function () {
  const { user, userLogOut } = useContext(AuthContext);

  const handleLogOut = () => {
    userLogOut();
  };
  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 font-bold border-b-2 border-red-500"
            : "font-bold"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/signIn"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 font-bold border-b-2 border-red-500"
            : "font-bold"
        }
      >
        {user ? <span onClick={handleLogOut}>LogOut</span> : "Join Us"}
      </NavLink>

      <NavLink
        to="/taskManageDashBoard"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 font-bold border-b-2 border-red-500"
            : "font-bold"
        }
      >
        Dashboard
      </NavLink>
    </>
  );
  return (
    <>
      <div className="w-full bg-gray-100 ">
        <div className="w-full container mx-auto">
          <div className="flex justify-between items-center h-auto px-8 py-4">
            <div className="p-1">
              <h1 className="flex flex-col">
                <span className="text-3xl font-extrabold tracking-widest ">
                  SCC
                </span>{" "}
                <span className="text-base">Technovision Inc.</span>
              </h1>
            </div>
            <div className="flex gap-4">{navLinks}</div>
          </div>
        </div>
      </div>
    </>
  );
}
