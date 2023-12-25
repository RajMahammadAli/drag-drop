import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function () {
  const { user } = useContext(AuthContext);
  const listsById = useLoaderData();
  const id = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const email = user.email;

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:5000/toDoLists/${id.id}`, { ...data })
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your list has been created",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/taskManageDashBoard");
      })
      .catch((error) => {
        console.error("Error updating todo lists:", error);
      });
  };
  return (
    <>
      <div className="w-full mx-auto px-10">
        <div>
          <h1 className="text-xl text-center font-bold my-5">
            Update your list here
          </h1>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            defaultValue={listsById.title}
            {...register("title", { required: true })}
            className="px-4 py-2 border-b-2 focus:outline-none focus:border-b-2 focus:border-sky-300 "
          />
          <input
            type="text"
            defaultValue={listsById.description}
            placeholder="Description"
            {...register("description", { required: true })}
            className="px-4 py-2 border-b-2 focus:outline-none focus:border-b-2 focus:border-sky-300 "
          />
          <input
            type="date"
            defaultValue={listsById.deadline}
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
    </>
  );
}
