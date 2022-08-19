import { Check, Trash } from 'phosphor-react'
import { useState } from 'react'

import styles from './Task.module.css'

interface TaskProps {
  id: number
  task: string
  completed: boolean
  onDeleteTask: (id: number) => void
  onUpdateTask: (taskId: number) => void
}

export function Task({ id, task, onDeleteTask, onUpdateTask }: TaskProps) {
  const [taskIsChecked, setTaskIsChecked] = useState(false)

  function handleCheckTask() {
    setTaskIsChecked(!taskIsChecked)
    onUpdateTask(id)
  }

  return (
    <div className={styles.taskContainer}>
      <div className={styles.containerCheckAndTask}>
        <button
          type="button"
          onClick={handleCheckTask}
          className={`${styles.buttonCheckTask} ${
            taskIsChecked ? styles.isChecked : ''
          }`}
        >
          {taskIsChecked && <Check size={20} />}
        </button>
        <p className={taskIsChecked ? styles.isChecked : ''}>{task}</p>
      </div>

      <button
        onClick={() => onDeleteTask(id)}
        className={styles.buttonDeleteTask}
        type="button"
      >
        <Trash size={20} />
      </button>
    </div>
  )
}
