import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IoEllipsisVertical } from 'react-icons/io5'
import { GrAdd } from 'react-icons/gr'
import { Task, TaskItem } from '../../../interfaces/taskList-interface'
import Menu from '../menu/menu'
import ModalWindow from '../modalWindows/modalWindow/modalWindow'
import TaskComponent from './task/task'
import { httpClient } from '../../../axios/axiosConfig'
import { useAppDispatch } from '../../../store/hooks'
import { addTaskList } from '../../../store/task-list/sliceTask-list'
import './taskColumn.scss'

interface TaskColumnProps {
  task: Task
  tasks: TaskItem[]
  deleteList: (taskListId: number) => void
  deleteTask: (taskListId: number) => void
}

export default function TaskColumn({
  task,
  tasks,
  deleteList,
  deleteTask,
}: TaskColumnProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const handleInput = () => {
    setShowInput(!showInput)
    setShowMenu(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus()
    }
  }, [showInput])

  const changeTaskListName = async (name: string, taskListId: number) => {
    try {
      if (name.trim() === '') {
        throw new Error('Task list name cannot be empty')
      }

      await httpClient.patch(`/task-list/${taskListId}`, { name })
      const { data } = await httpClient.get('/task-list')
      dispatch(addTaskList(data))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <motion.div
        className="task-list__item"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <h2 className="task-list__title">
          {showInput ? (
            <input
              className="task-list__input"
              type="text"
              placeholder="Enter task name"
              onBlur={(e) => {
                changeTaskListName(e.target.value, task.id)
                setShowInput(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  changeTaskListName(inputRef.current?.value || '', task.id)
                  setShowInput(false)
                }
              }}
              ref={inputRef}
            />
          ) : (
            <>
              <span>{task.name}</span>
              <button className="settings-icon" onClick={() => handleMenu()}>
                <IoEllipsisVertical className="icons title-edit" />
              </button>
            </>
          )}

          {showMenu && (
            <Menu
              ref={menuRef}
              onDelete={() => deleteList(task.id)}
              onEdit={() => {
                handleInput()
              }}
            />
          )}
        </h2>

        <button className="task-list__button" onClick={handleModal}>
          <GrAdd className="icons" />
          <span>Add new task</span>
        </button>

        {showModal && (
          <ModalWindow
            taskListId={task.id}
            isNewTask={true}
            onClose={handleModal}
          />
        )}

        {tasks.map((task) => (
          <div className="task" key={task.id}>
            <TaskComponent task={task} deleteTask={deleteTask} />
          </div>
        ))}
      </motion.div>
    </>
  )
}
