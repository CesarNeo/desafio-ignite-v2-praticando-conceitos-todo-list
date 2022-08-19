import { Header } from './components/Header'

import styles from './App.module.css'
import './global.css'
import { ClipboardText } from 'phosphor-react'
import { Task } from './components/Task'
import { FormEvent, useEffect, useState } from 'react'

function App() {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: 'Integer urna interdum massa libero auctor neque turpis turpis semper.Duis vel sed fames integer. sdfsesdtseE adsa',
      completed: false
    },
    {
      id: 2,
      task: 'Integer urna interdum massa libero auctor neque turpis turpis semper.',
      completed: false
    },
    {
      id: 3,
      task: 'Duis vel sed fames integer.',
      completed: false
    }
  ])
  const [tasksCompleted, setTasksCompleted] = useState<
    { id: number; task: string; completed: boolean }[]
  >([])
  const totalTasks = tasks.length

  useEffect(() => {
    const tasksCompleted = tasks.filter(task => task.completed === true)

    setTasksCompleted(tasksCompleted)
  }, [tasks])

  console.log(totalTasks > 0)
  function handleUpdateTask(taskId: number) {
    const taskExists = tasks.find(task => task.id === taskId)

    if (taskExists) {
      const newTasks = tasks.map(task => {
        if (task.id === taskId) {
          task.completed = !task.completed
        }

        return task
      })

      setTasks(newTasks)
    }
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    setTasks(oldTasks => [
      ...oldTasks,
      {
        id: oldTasks.length + 1,
        task: taskInput,
        completed: false
      }
    ])

    setTaskInput('')
  }

  function handleDeleteTask(taskId: number) {
    const newTasks = tasks.filter(task => task.id !== taskId)

    setTasks(newTasks)
  }

  return (
    <>
      <Header
        onCreateTask={handleCreateTask}
        task={taskInput}
        setTask={setTaskInput}
      />

      <main className={styles.mainContent}>
        <header className={styles.containerTaskInfos}>
          <div className={styles.taskCreateInfo}>
            <p>Tarefas criadas</p>
            <span>{totalTasks}</span>
          </div>

          <div className={styles.taskCompletedInfo}>
            <p>Concluídas</p>
            <span>
              {tasksCompleted.length <= 0 && totalTasks <= 0
                ? '0'
                : `${tasksCompleted.length} de ${totalTasks}`}
            </span>
          </div>
        </header>

        {tasks.length > 0 ? (
          <div className={styles.containerTasks}>
            {tasks.map(task => (
              <Task
                key={task.id}
                {...task}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
              />
            ))}
          </div>
        ) : (
          <div className={styles.containerTasksEmpty}>
            <ClipboardText size={56} />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        )}
      </main>
    </>
  )
}

export default App
