import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import ListCard from "../../Components/ListCard/ListCard";
import { useDrop } from "react-dnd";
import CreateList from "./CreateList/CreateList";
import ShowList from "./ShowList/ShowList";

export default function () {
  const { user } = useContext(AuthContext);
  const [toDoLists, setToDoLists] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/toDoLists?email=${user?.email}`)
      .then((response) => {
        setToDoLists(response.data);
        setListLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todo lists:", error);
      });
  }, [listLoading]);

  return (
    <>
      <div className="w-full h-auto flex justify-center items-start my-20">
        <div className="w-full container mx-auto">
          <CreateList setListLoading={setListLoading} />
          <ShowList toDoLists={toDoLists} setToDoLists={setToDoLists} />
        </div>
      </div>
    </>
  );
}
