import React, { useRef } from "react";
import RoomItem from "./RoomItem";
import { useDrag, useDrop } from "react-dnd";

function DragableRoomItem(props) {
  const {
    name,
    index,
    currentColumnName,
    moveCardHandler,
    setItems,
    movable,
    id,
    room,
  } = props;
  const ref = useRef(null);

  const changeItemColumn = (currentItem, columnName, lastName, email) => {
    setItems((prevState) => {
      return prevState.map((e) => {
        if (currentItem.id === e.id) {
          return {
            ...e,
            assignedTo: columnName === "rooms" ? null : columnName,
            lastName: columnName === "rooms" ? null : lastName,
            email: columnName === "rooms" ? null : email,
          };
        } else {
          return e;
        }
      });
    });
  };

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        // Don't replace items with themselves
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
      if (typeof moveCardHandler === "function") {
        moveCardHandler(dragIndex, hoverIndex);
      }

      item.index = hoverIndex;
    },
    canDrop: (item, monitor) => {
      const disabled = item.disabled;
      return {
        canDrop: disabled,
      };
    },
  });

  const [, drag] = useDrag(
    {
      item: { index, name, id, currentColumnName },
      type: "Our first type",
      canDrag: movable,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (!dropResult) return;
        const { idGRA, name: dropName, lastName, email, disabled } = dropResult;
        if (disabled || !moveCardHandler) {
          return;
        } else if (idGRA) {
          changeItemColumn(item, idGRA, lastName, email);
        } else if (dropName === "rooms") {
          changeItemColumn(item, "rooms", lastName, email);
        }
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    },
    [movable]
  );

  drag(drop(ref));
  return (
    <div ref={ref} className={movable === false && "opacity-60"}>
      <RoomItem
        room={room}
        name={name}
        setItems={setItems}
        changeItemColumn={changeItemColumn}
        movable={movable}
      />
    </div>
  );
}

export default DragableRoomItem;
