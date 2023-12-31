import { Link } from "react-router-dom";

export default function () {
  return (
    <>
      <div className="container mx-auto">
        <div
          className="w-full hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">
                Effortlessly manage your tasks with our intuitive to-do list
                app. Streamline your day, prioritize your goals, and stay
                organized with ease. Experience the convenience of Provident,
                where productivity meets simplicity. Your tasks, your way.
              </p>
              <Link to="/taskManageDashBoard" className="btn btn-primary">
                Let's Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
