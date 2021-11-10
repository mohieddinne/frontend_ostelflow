import React, { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { COLUMN_NAMES } from "./consts";

const MovableItem = (props) => {
  const { name, index, currentColumnName, moveCardHandler, setItems, id } =
    props;
  const changeItemColumn = (currentItem, columnName, id) => {
    setItems((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          employee: e.name === currentItem.name ? columnName : e.employee,
          employeeID: e.id === currentItem.id ? id : e.employeeID,
        };
      });
    });
  };
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { index, name, id, currentColumnName, type: "Our first type" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const { name, id } = dropResult;
        const { ROOM_LIST } = COLUMN_NAMES;

        if (name === ROOM_LIST) {
          changeItemColumn(item, ROOM_LIST);
        } else {
          changeItemColumn(item, name, id);
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));
  return (
    <div
      ref={ref}
      className="flex justify-between  border-2 border-light-blue-500 p-8"
      style={{ opacity }}
    >
      {name}
    </div>
  );
};

const Column = ({ children, className, title, id }) => {
  const [, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title, id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={className}>
      <Typography gutterBottom variant="h6" className="text-center">
        {title}
      </Typography>
      <Divider variant="middle" className="m-8" />
      <div className="w-full">{children}</div>
    </div>
  );
};

const Assignment = ({ items, setItems, EMPLOYEES_LIST, assign }) => {
  const assign_room = items?.map((e) => {
    const assign_room = {
      roomId: e.id,
      user: { id: e.employeeID, lastName: e.employee },
    };
    return assign_room;
  });
  function handleClick() {
    assign({ variables: { params: assign_room } })
      .then(() => {})
      .catch((err) => {
        if (process.env.NODE_ENV !== "production") console.log(err);
      });
  }
  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName, id) => {
    return items
      ?.filter((item) => item.employee === columnName || item.employeeID === id)
      ?.map((item, index) => {
        return (
          <MovableItem
            key={item.id}
            name={item.name}
            id={item.id}
            currentColumnName={item.employee}
            setItems={setItems}
            index={index}
            moveCardHandler={moveCardHandler}
          />
        );
      });
  };

  const { ROOM_LIST } = COLUMN_NAMES;
  let name = "";
  let id = "";
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className="m-8 inset-0"
        onClick={handleClick}
      >
        confirmer
      </Button>
      <div className="flex justify-between m-10 mx-4 gap-6">
        <DndProvider backend={HTML5Backend}>
          <Column title={ROOM_LIST} className="  shadow-md w-1/3 ">
            <div className="flex flex-wrap gap-2">
              {returnItemsForColumn(ROOM_LIST)}
            </div>
          </Column>
          <div className="w-full  shadow-md ml-2">
            <Typography gutterBottom variant="h6" className="text-center">
              Liste des GRA
            </Typography>
            {EMPLOYEES_LIST?.map(
              (el) => (
                (name = el.lastName)((id = el.id)),
                (
                  <Column
                    id={el.id}
                    title={name}
                    className="border-2 border-indigo-600 w-full min-h-128 py-8 my-4"
                  >
                    <div className="flex flex-wrap justify-center gap-2">
                      {returnItemsForColumn(name, id)}
                    </div>
                  </Column>
                )
              )
            )}
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default Assignment;
