"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Task } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function Home() {
  //tasks = array of {id: string, title: string, completed: boolean}
  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState(0);
  const [all, setAll] = useState(0);


  const addTask = (newTaskTitle) => {
    const newTask = { id: nanoid(), title: newTaskTitle, completed: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setAll(all+1);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    if(task.completed) setDone(done-1);
    const newTask = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    setAll(all-1);
  };

  const toggleDoneTask = (taskId) => {
    //structuredClone will copy an array or an object "deeply"
    //So objects within an object will be copied too
    const newTasks = structuredClone(tasks);
    //search for a task based on condition
    const task = newTasks.find((x) => x.id === taskId);
    task.completed = !task.completed;
    const countDone = task.completed ? done +1 : done -1;
    setDone(countDone);
    setTasks(newTasks);
  };

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <TaskSummary all={all} done={done}/>
        {/* task input */}
        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer year="2023" fullName="Thanabordee Sornchai" studentId="650610765" />
    </div>
  );
}
