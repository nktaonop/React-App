import React, { useEffect, useRef, useState } from 'react'
import Menu from '../../menu/menu'
import { TbPointFilled } from 'react-icons/tb'
import { FaRegCalendar } from 'react-icons/fa'
import { IoEllipsisVertical } from 'react-icons/io5'
import { Task, TaskItem } from '../../../../interfaces/taskList-interface'
import ModalWindow from '../../modalWindows/modalWindow/modalWindow'
import './task.scss'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { httpClient } from '../../../../axios/axiosConfig'
import { addTaskList } from '../../../../store/task-list/sliceTask-list'
import InfoModalWindow from '../../modalWindows/infoModalWindow/infoModalWindow'

interface Tasks {
  task: TaskItem
  deleteTask: (id: number) => void
}

export default function TaskComponent({ task, deleteTask }: Tasks) {
  const [showMenu, setShowMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const taskList = useAppSelector((state) => state.taskList.data)
  const dispatch = useAppDispatch()

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const handleInfoModal = () => {
    setShowInfoModal(!showInfoModal)
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

  const formatDate = (stringDate: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }
    const date = new Date(stringDate)
    return date.toLocaleDateString('en-US', options)
  }

  async function moveTask(event: React.ChangeEvent<HTMLSelectElement>) {
    const taskId = task.id
    const moveToId = event.target.value

    try {
      await httpClient.post(`/task/${taskId}/move/${moveToId}`)
      const { data } = await httpClient.get('task-list')
      dispatch(addTaskList(data))
    } catch (error) {
      console.error('Error moving task:', error)
    }
  }

  return (
    <div className="task__container">
      <div className="task-title__container">
        <h3 className="task-title">{task.name}</h3>

        <button className="icons settings-icon" onClick={() => handleMenu()}>
          <IoEllipsisVertical className="icons task-list__edit" />
        </button>

        {showMenu && (
          <Menu
            ref={menuRef}
            onDelete={() => deleteTask(task.id)}
            onEdit={handleModal}
          />
        )}

        {showModal && (
          <ModalWindow
            task={task}
            taskListId={task.taskListId}
            isNewTask={false}
            onClose={handleModal}
          />
        )}
      </div>

      <ul onClick={handleInfoModal}>
        <li className="task-item task-item__description">{task.description}</li>
        <div className="date__container">
          <FaRegCalendar className="icons" />
          <li className="task-item task-item__date">
            {formatDate(task.dueDate)}
          </li>
        </div>
        <li className="task-item task-item__priority">
          <TbPointFilled className="icons" />
          {task.priority}
        </li>
      </ul>

      {showInfoModal && (
        <InfoModalWindow task={task} onClose={handleInfoModal} />
      )}

      <select className="task-select" onInput={moveTask} defaultValue="moveTo">
        <option disabled value="moveTo">
          Move to:
        </option>
        {taskList
          .filter((el) => el.id !== task.taskListId)
          .map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
      </select>
    </div>
  )
}
