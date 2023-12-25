import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
export default function ({ setListLoading }) {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/toDoLists", {
        ...data,
        email: user.email,
        status: "todo",
      })
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your list has been created",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setListLoading(true);
      })
      .catch((error) => {
        console.error("Error submitting todo list:", error);
      });
  };
  return (
    <>
      <div className="w-full sm:flex justify-center items-center gap-4">
        <div className="w-full sm:w-1/2 my-20">
          <h1 className="text-center">show users name and photo here</h1>
        </div>
        <div className="w-full sm:w-3/4 mx-auto px-10">
          <div>
            <h1 className="text-xl text-center font-bold my-5">
              Create your list here
            </h1>
          </div>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Task Title"
              {...register("title", { required: true })}
              className="px-4 py-2 border-b-2 focus:outline-none focus:border-b-2 focus:border-sky-300 "
            />
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
              className="px-4 py-2 border-b-2 focus:outline-none focus:border-b-2 focus:border-sky-300 "
            />
            <input
              type="date"
              placeholder="Deadline"
              {...register("deadline", { required: true })}
              className="px-4 py-2 border-b-2 focus:outline-none focus:border-b-2 focus:border-sky-300 "
            />
            <select
              {...register("priority", { required: true })}
              className="px-4 py-2 border-b-2 focus:outline-none focus:border-b-2 focus:border-sky-300 "
            >
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </select>
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <div className="w-full flex justify-center items-center">
              <input
                className="w-[200px] bg-sky-600 text-white px-4 py-2 my-4 rounded-md hover:bg-sky-500 duration-300 font-semibold"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
