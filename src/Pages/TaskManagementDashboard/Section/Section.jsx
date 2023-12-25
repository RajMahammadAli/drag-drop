// import { useDrop } from "react-dnd";
import { Draggable } from "react-beautiful-dnd";
import ListCard from "../../../Components/ListCard/ListCard";

export default function ({
  status,
  toDoLists,
  setToDoLists,
  todo,
  inProgress,
  closed,
  provided,
}) {
  //   const [{ isOver }, drop] = useDrop(() => ({
  //     accept: "task",
  //     drop: (item) => addItemSection(item._id),
  //     collect: (monitor) => ({
  //       isDragging: !!monitor.isOver(),
  //     }),
  //   }));

  //   console.log(isOver);
  let text = "Todo";
  let bg = "bg-slate-500";
  let taskToMap = todo;

  if (status === "inProgress") {
    text = "In progress";
    bg = "bg-purple-500";
    taskToMap = inProgress;
  }
  if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    taskToMap = closed;
  }

  //   const addItemSection = (id) => {
  //     console.log("dropped", id);
  //   };

  return (
    <>
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        className={`w-64 `}
      >
        <Header text={text} bg={bg} count={taskToMap.length} />
        {taskToMap.length > 0 &&
          taskToMap.map((item, index) => (
            <Draggable draggableId={item._id} key={index}>
              {(provided) => (
                <ListCard
                  key={index}
                  item={item}
                  toDoLists={toDoLists}
                  setToDoLists={setToDoLists}
                  provided={provided}
                />
              )}
            </Draggable>
          ))}
      </div>
    </>
  );
}

const Header = ({ text, bg, count }) => {
  return (
    <>
      <div
        className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
      >
        {text}
        <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
          {count}
        </div>
      </div>
    </>
  );
};
