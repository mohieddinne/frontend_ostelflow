import React from "react";
import { ReactComponent as NoteIcon } from "../../../icon/note.svg";
import Todo from "./Todo";
import { useTranslation } from "react-i18next";

function Note({ openActiveRoom, description, note, todos }) {
  const { t } = useTranslation();
  return (
    <>
      {description || note ? (
        <div className="rounded-8 200 border-1 p-8 bg-white  ">
          <div className="flex justify-between  ">
            <div className="flex flex-wrap w-2/3">
              <div className>
                <strong className="ml-8 sm:text-13 md:text-15">Note</strong>
              </div>
            </div>
            <div>
              <NoteIcon fill="red" className="m-4" />
            </div>
          </div>
          <div className="m-8 font-400 sm:text-10 md:text-13  ">
            {description || note}
          </div>
        </div>
      ) : todos?.length > 0 ? (
        <div className="rounded-8 200 border-1 p-8 bg-white  ">
          <div className="flex justify-between  ">
            <div className="flex flex-wrap w-2/3">
              <div className>
                <strong className="ml-8 sm:text-13 md:text-15">Tasks</strong>
              </div>
            </div>
          </div>
          <div className="m-8 font-400 sm:text-10 md:text-13  ">
            {todos?.map((todo) => (
              <Todo key={todo.id} todo={todo} openActiveRoom={openActiveRoom} />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-8 200 border-1 p-8 bg-white  ">
          <div className="flex justify-between  ">
            <div className="flex flex-wrap w-2/3">
              <div className>
                <strong className="ml-8 sm:text-13 md:text-15">Tasks</strong>
              </div>
            </div>
          </div>
          <div className="m-8 font-400 sm:text-10 md:text-13  ">
            {t("no_data")}
          </div>
        </div>
      )}
      {!note ? (
        <div className="rounded-8 200 border-1 p-8 bg-white  ">
          <div className="flex justify-between  ">
            <div className="flex flex-wrap w-2/3">
              <div className>
                <strong className="ml-8 sm:text-13 md:text-15">Note</strong>
              </div>
            </div>
            <div>
              <NoteIcon fill="red" className="m-4" />
            </div>
          </div>
          <div className="m-8 font-400 sm:text-10 md:text-13  ">
            {t("no_data")}
          </div>
        </div>
      ) : todos?.length > 0 ? (
        <div className="rounded-8 200 border-1 p-8 bg-white  ">
          <div className="flex justify-between  ">
            <div className="flex flex-wrap w-2/3">
              <div className>
                <strong className="ml-8 sm:text-13 md:text-15">Tasks</strong>
              </div>
            </div>
          </div>
          <div className="m-8 font-400 sm:text-10 md:text-13  ">
            {todos?.map((todo) => (
              <Todo key={todo.id} todo={todo} openActiveRoom={openActiveRoom} />
            ))}
          </div>
        </div>
      ) : !todos || todos?.length === 0 ? (
        <div className="rounded-8 200 border-1 p-8 bg-white  ">
          <div className="flex justify-between  ">
            <div className="flex flex-wrap w-2/3">
              <div className>
                <strong className="ml-8 sm:text-13 md:text-15">Tasks</strong>
              </div>
            </div>
          </div>
          <div className="m-8 font-400 sm:text-10 md:text-13  ">
            {t("no_data")}
          </div>
        </div>
      ) : (
        ""
      )}
      {}
    </>
  );
}

export default Note;
