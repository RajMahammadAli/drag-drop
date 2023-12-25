import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import Swal from "sweetalert2";

export default function () {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="my-4">
        <button className="w-full flex items-center justify-center bg-blue-700 rounded-md py-2">
          <FaFacebookF className="mr-2" /> Signin with Facebook
        </button>
        <button className="w-full flex items-center justify-center bg-sky-700 my-2 rounded-md py-2">
          <FaTwitter className="mr-2" /> Signin with Twitter
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-red-700 rounded-md py-2"
        >
          <FaGoogle className="mr-2" /> Signin with Google
        </button>
      </div>
    </>
  );
}
