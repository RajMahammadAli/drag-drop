import { useEffect, useState } from "react";
import Section from "../Section/Section";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function ({ toDoLists, setToDoLists }) {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodo = toDoLists.filter((item) => item.status === "todo");
    const fInProgress = toDoLists.filter(
      (item) => item.status === "inProgress"
    );
    const fClosed = toDoLists.filter((item) => item.status === "closed");
    setTodo(fTodo);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [toDoLists]);

  const statuses = ["todo", "inProgress", "closed"];
  const handleDragDrop = (results) => {
    const [source, destination, type] = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reOrderToDoLists = [...toDoLists];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removeToDoLists] = reOrderToDoLists.splice(sourceIndex, 1);
      reOrderToDoLists.splice(destinationIndex, 0, removeToDoLists);
      console.log(reOrderToDoLists);
      return setToDoLists(reOrderToDoLists);
    }
    console.log("hello world", results);
  };
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-center items-start gap-4 px-8 ">
        <DragDropContext onDragEnd={handleDragDrop}>
          {statuses.map((status, index) => (
            <Droppable key={index} droppableId={status}>
              {(provided) => (
                <div>
                  <Section
                    key={index}
                    status={status}
                    toDoLists={toDoLists}
                    setToDoLists={setToDoLists}
                    todo={todo}
                    inProgress={inProgress}
                    closed={closed}
                    provided={provided}
                  />
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );
}
