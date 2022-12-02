import React from "react";
import type { NextPage } from "next";
// components
import { Todos } from "../components/Todos";
import { Header } from "../components/header/Header";
// TS -> interface
import { Todo, IsData } from "../model";
type DTodos = {
  NTodos: Todo[];
  ITodos: Todo[];
};

// react hooks
const { useState, useEffect } = React;

const Recently: NextPage = () => {
  const [data, setData] = useState<IsData>({
    todo: "",
    color: "",
    install: false,
  });

  const [todos, setTodos] = useState<DTodos>({
    NTodos: [],
    ITodos: [],
  });

  //  handel submit data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const DColor: string = "color-default";

    const dataObj = {
      id: Date.now(),
      todo: data.todo,
      color: data.color || DColor,
      idDone: false,
      isInstall: data.install,
    } as Todo;

    if (data.todo.trim() !== "") {
      if (data.install) {
        return (
          setTodos({
            ...todos,
            ITodos: [
              ...todos.ITodos,
              {
                ...dataObj,
              },
            ],
          }),
          setData({
            todo: "",
            color: "",
            install: false,
          })
        );
      }
      setTodos({
        ...todos,
        NTodos: [
          ...todos.NTodos,
          {
            ...dataObj,
          },
        ],
      });
      setData({
        todo: "",
        color: "",
        install: false,
      });
    }
  };

  const handelDeleteTodo = (id: number, install: boolean) => {
    if (install) {
      return setTodos({
        ...todos,
        ITodos: todos.ITodos.filter((item) => item.id !== id),
      });
    }
    // if install false
    setTodos({
      ...todos,
      NTodos: todos.NTodos.filter((item) => item.id !== id),
    });
  };

  const handelChangeInstallTodo = (todo: Todo) => {
    if (todo.isInstall) {
      return setTodos({
        NTodos: [...todos.NTodos, { ...todo, isInstall: false }],
        ITodos: todos.ITodos.filter((item) => item.id !== todo.id),
      });
    }
    setTodos({
      NTodos: todos.NTodos.filter((item) => item.id !== todo.id),
      ITodos: [...todos.ITodos, { ...todo, isInstall: true }],
    });
  };

  useEffect(() => {
    document.body.classList.add("body-todo");

    return () => document.body.classList.remove("body-todo");
  }, []);

  return (
    <>
      <Header />
      <section className="todo-list">
        <div className="container">
          <div className="todo-list-header">
            <h2>Todo List</h2>
          </div>
          <div className="todo-list-body">
            {todos.ITodos.length >= 1 && (
              <div className="todo-install todos">
                <h6># Install</h6>
                <div className="note-items">
                  {todos.ITodos.map((item) => (
                    <div className="todo-items" key={item.id}>
                      <Todos
                        item={item}
                        handelDeleteTodo={handelDeleteTodo}
                        handelChangeInstallTodo={handelChangeInstallTodo}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {todos.NTodos.length >= 1 && (
              <div className="todo-other todos">
                <h6># other</h6>
                <div className="note-items">
                  {todos.NTodos.map((item) => (
                    <div className="todo-items" key={item.id}>
                      <Todos
                        item={item}
                        handelDeleteTodo={handelDeleteTodo}
                        handelChangeInstallTodo={handelChangeInstallTodo}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Recently;