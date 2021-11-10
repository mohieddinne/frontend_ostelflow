import React from "react";
import Icon from "@material-ui/core/Icon";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { gql, useMutation } from "@apollo/client";

const gQl = gql`
  mutation deleteTodo($id: Int) {
    deleteTodo(id: $id)
  }
`;
function TodoList({ todos, AssignRoom, refetch }) {
  const [exec] = useMutation(gQl);

  const onClickIcon = (e) => {
    exec({ variables: { id: e } }).then(() => {
      refetch();
    });
  };
  return (
    <div className=" p-8 flex flex-wrap justify-between">
      {todos?.map((e) => (
        <div className="flex flex-wrap justify-between  items-center
         sm:w-2/3 md:w-1/3 lg:w-1/4
          border-dashed  border-2 border-gray-200 rounded-2xl m-2">
          <Icon fontSize="large"> {e.icon}</Icon>
          <div className="flex flex-wrap "> {e.name}</div>

          <ClearOutlinedIcon
            onClick={() => onClickIcon(e.id)}
            fontSize="small"
            color="primary"
          />
        </div>
      ))}
    </div>
  );
}

export default TodoList;
