import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { useDrag } from "react-dnd";
export default function ({ item, toDoLists, setToDoLists, provided }) {
  const { _id, title, description, deadline, priority, status } = item;

  const navigate = useNavigate();

  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "task",
  //   item: { id: _id },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));

  const handleEdit = (id) => {
    console.log("edit button clicked", id);
    navigate(`/edittodolists/${id}`);
  };
  const handleDelete = (id) => {
    console.log("delete button clicked", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://my-drag-drop-server.vercel.app/toDoLists/${id}`)
          .then((response) => {
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              setUserPosts(response.data);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            if (axios.isAxiosError(error) && error.response?.status === 403) {
              Swal.fire({
                title: "Access Denied",
                text: "You don't have permission to delete this assignment.",
                icon: "error",
              });
            } else {
              console.error("Error deleting assignments:", error);
            }
          });
      }
    });
  };

  return (
    <div
      // ref={drag}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
      className={`relative px-8 py-4 my-4 border cursor-grab `}
    >
      <h1>
        <span className="font-bold">Title:</span> {title}
      </h1>
      <p>
        <span className="font-bold">Description:</span> {description}
      </p>
      <p>
        <span className="font-bold">Deadline:</span> {deadline}
      </p>
      <p>
        <span className="font-bold">Priority:</span> {priority}
      </p>
      <div className="absolute top-2 right-2 flex gap-3">
        <div
          onClick={() => handleEdit(_id)}
          className="border p-1 rounded-full cursor-pointer"
        >
          <MdEdit />
        </div>
        <div
          onClick={() => handleDelete(_id)}
          className="border p-1 rounded-full cursor-pointer"
        >
          <MdDelete />
        </div>
      </div>
    </div>
  );
}
