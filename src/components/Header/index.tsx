import { ChangeEvent, FormEvent, InvalidEvent } from 'react'
import PlusCircle from 'phosphor-react/src/icons/PlusCircle'

import logo from '../../assets/images/logo.svg'

import styles from './Header.module.css'

interface HeaderProps {
  onCreateTask: (event: FormEvent) => void
  task: string
  setTask: React.Dispatch<React.SetStateAction<string>>
}

export function Header({ onCreateTask, task, setTask }: HeaderProps) {
  function handleTaskInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')

    setTask(event.target.value)
  }

  function handleTaskInputInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  return (
    <header className={styles.headerContainer}>
      <img src={logo} alt="Logo todo" />

      <form onSubmit={onCreateTask} className={styles.headerContent}>
        <input
          className={styles.inputHeader}
          placeholder="Adicione uma nova tarefa"
          type="text"
          value={task}
          onChange={handleTaskInputChange}
          onInvalid={handleTaskInputInvalid}
          required
        />
        <button className={styles.headerButtonCreate} type="submit">
          Criar
          <PlusCircle size={16} />
        </button>
      </form>
    </header>
  )
}
