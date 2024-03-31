import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RxCross2 } from 'react-icons/rx'
import { FaRegEdit } from 'react-icons/fa'
import { FaRegCalendar } from 'react-icons/fa'
import { LuTag } from 'react-icons/lu'
import dayjs from 'dayjs'
import { TaskItem } from '../../../../interfaces/taskList-interface'
import ModalWindow from '../modalWindow/modalWindow'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { HistoryInterface } from '../../../../interfaces/history-interface'
import './infoModalWindow.scss'
import { httpClient } from '../../../../axios/axiosConfig'
import { addAction } from '../../../../store/taskHistory/slice-taskHistory'

interface ModalProps {
  task: TaskItem
  onClose: () => void
}

export default function InfoModalWindow({ task, onClose }: ModalProps) {
  const [showEditModal, setShowEditModal] = useState(false)

  const dispatch = useAppDispatch()
  const taskHistory = useAppSelector((state) => state.taskHistory.data)

  const fetchTaskHistory = async () => {
    try {
      const { data } = await httpClient.get(`/user-actions/${task.id}`)
      dispatch(addAction(data))
    } catch (error) {
      console.error('Error fetching task history:', error)
    }
  }

  useEffect(() => {
    fetchTaskHistory()
  }, [])

  const formatDate = (isoDate: string) => {
    return dayjs(isoDate).locale('en').format('ddd, MMM D')
  }

  const onCloseEditModal = () => {
    setShowEditModal(false)
    fetchTaskHistory()
  }

  const editRedirect = () => {
    setShowEditModal(!showEditModal)
  }

  return (
    <div className="modal__container">
      <motion.div
        className="modal-window"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 1, scale: 0.5 }}
        transition={{ duration: 0.3 }}>
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            <RxCross2 className="cross-icon" />
          </button>
        </div>

        <div className="info-main__container">
          <div className="info-modal__container">
            <div className="info__container">
              <div className="task-info">
                <h3 className="task-name">{task.name}</h3>
                <p className="task-dueDate">
                  <span>
                    <FaRegCalendar />
                    Due Date
                  </span>
                  {formatDate(task.dueDate)}
                </p>
                <div className="task-priority">
                  <span>
                    <LuTag />
                    Priority
                  </span>
                  <p>{task.priority}</p>
                </div>
                <div className="task-description">
                  <h2>Description</h2>
                  <p>{task.description}</p>
                </div>
              </div>
            </div>

            <button className="edit-button__model" onClick={editRedirect}>
              <FaRegEdit /> <span>Edit task</span>
            </button>

            {showEditModal && (
              <ModalWindow
                task={task}
                taskListId={task.id}
                isNewTask={false}
                onClose={onCloseEditModal}
              />
            )}

            <div className="history-info__model-container">
              <h3 className="history-title">History</h3>
              {taskHistory.length === 0 && (
                <p className="history__empty-state">History list is empty.</p>
              )}
              <div className="history-items">
                {taskHistory.map((action: HistoryInterface) => (
                  <div className="history" key={action.id}>
                    <div className="history__modal">
                      <div className="history-action">
                        <p
                          className="history-data"
                          dangerouslySetInnerHTML={{ __html: action.title }}
                        />
                        <p className="history-data">
                          {formatDate(action.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
