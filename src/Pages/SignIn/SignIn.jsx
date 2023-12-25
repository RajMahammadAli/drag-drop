import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import SocialLogin from "../../Components/SocialLogIn/SocialLogin";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

export default function () {
  const { userSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isClick, setIsclick] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    userSignIn(email, password)
      .then((result) => {
        e.target.reset();

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
        setErrorMessage("Invalid email or password. Please try again.");
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="container mx-auto mt-20 py-12">
        <div className="w-full md:h-[80dvh] flex justify-center items-center">
          <div className="w-full md:w-[60%] md:h-[90%] flex shadow-lg rounded-sm">
            <div className="w-[40%] h-full hidden  md:flex justify-center items-center text-white bg-violet-950">
              <div className="px-8">
                <h1 className="my-8">
                  Login using social media to get quick access
                </h1>
                <SocialLogin />
              </div>
            </div>
            <div className="w-full md:w-[60%] h-full flex justify-center items-center">
              <div>
                <h1 className="text-2xl text-center text-violet-900 font-semibold">
                  Login to Your Account
                </h1>
                <p>
                  Don't have an account?{" "}
                  <span className="text-sky-700 font-medium">
                    <Link to="/signUp">Sign Up Free!</Link>
                  </span>
                </p>

                <div className="my-8">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      className="px-4 py-2 border-b-2 focus:outline-none focus:border-b-2 focus:border-sky-300 "
                    />

                    <div className="relative">
                      <input
                        type={isClick ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="pl-4 pr-10 py-2 border-b-2 focus:outline-none focus:border-b-2 focus:border-sky-300"
                      />
                      <span className="absolute right-5 top-3">
                        <span onClick={() => setIsclick(!isClick)}>
                          {isClick ? <IoIosEyeOff /> : <IoEyeSharp />}
                        </span>
                      </span>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full bg-sky-600 text-white px-4 py-2 my-4 rounded-md hover:bg-sky-500 duration-300 font-semibold"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="my-4 md:hidden">
                    <div className="divider">OR</div>
                    <div className="my-4">
                      <h1>Login using social media to get quick access</h1>
                    </div>
                    <SocialLogin />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
