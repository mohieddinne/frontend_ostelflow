import React from "react";
import { ReactComponent as Bed } from "../../../icon/bed.svg";
import { ReactComponent as Shower } from "../../../icon/shower.svg";
import { ReactComponent as Light } from "../../../icon/light.svg";
import { ReactComponent as Tv } from "../../../icon/tv.svg";
import { useMutation, gql } from "@apollo/client";
import Icon from "@material-ui/core/Icon";

const CHEKED = gql`
  mutation chekedTodo($id: Int, $isCheked: Boolean) {
    chekedTodo(id: $id, isCheked: $isCheked)
  }
`;
function Todo({ todo, openActiveRoom }) {
  const [checked, setChecked] = React.useState(todo?.checkedOn);
  const [chekedTodo] = useMutation(CHEKED);
  let icon = "shower";
  switch (todo?.icon) {
    case "light":
      icon = <Light className={"m-2"} fill={"none"} />;
      break;
    case "shower":
      icon = <Shower className={"m-2"} fill={"none"} />;
      break;
    case "bed":
      icon = <Bed className={"m-2"} fill={"none"} />;
      break;
    case "tv":
      icon = <Tv className={"m-2"} fill={"none"} />;
      break;
    default:
      // eslint-disable-next-line no-unused-vars
      icon = <Tv className={"m-2"} fill={"none"} />;
      break;
  }
  const handleCheckboxClick = React.useMemo(() => {
    return (e) => {
      setChecked(!checked);

      chekedTodo({
        variables: {
          id: todo?.id,
          isCheked: !checked,
        },
      });
    };
  }, [checked, chekedTodo, todo.id]);
  return (
    <div
      className={
        checked
          ? "line-through opacity-40 flex justify-start w-2/3 gap-8 items-center  border-dashed  border-2 border-gray-200 rounded-2xl m-2"
          : "flex justify-start w-2/3 gap-8 items-center  border-dashed  border-2 border-gray-200 rounded-2xl m-2"
      }
      onClick={() => (openActiveRoom ? "" : handleCheckboxClick())}
      role="button"
      disabled={openActiveRoom}
    >
      <input
        checked={checked}
        name="checkbox"
        type="checkbox"
        id="checkbox"
        className="ml-2"
      />
      <Icon fontSize="large"> {todo?.icon}</Icon>
      <span>{todo?.name}</span>
    </div>
  );
}

export default Todo;
