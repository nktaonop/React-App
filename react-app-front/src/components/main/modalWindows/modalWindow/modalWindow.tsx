import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import dayjs from 'dayjs'
import { TaskItem } from '../../../../interfaces/taskList-interface'
import { httpClient } from '../../../../axios/axiosConfig'
import { useAppDispatch } from '../../../../store/hooks'
import { addTaskList } from '../../../../store/task-list/sliceTask-list'
import './modalWindow.scss'

interface ModalProps {
  task?: TaskItem
  taskListId: number
  isNewTask: boolean
  onClose: () => void
}

type Inputs = {
  name: string
  priority: string
  dueDate: string
  description: string
}

export default function ModalWindow({
  task,
  onClose,
  taskListId,
  isNewTask,
}: ModalProps) {
  const { register, handleSubmit, setValue } = useForm<Inputs>()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
    const url = isNewTask ? `/task/${taskListId}` : `/task/${task?.id}`
    const method = isNewTask ? 'POST' : 'PATCH'

    await httpClient.request({
      url,
      method,
      data: {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
      },
    })

    onClose()
    const { data } = await httpClient.get('task-list')
    dispatch(addTaskList(data))
  }

  useEffect(() => {
    if (!isNewTask && task) {
      setValue('name', task.name)
      setValue('description', task.description)
      setValue('dueDate', dayjs(task.dueDate).format('YYYY-MM-DD'))
      setValue('priority', task.priority)
    }
  }, [])

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

        <div className="main__container">
          <div className="create-task__container">
            <div className="inputs__container">
              <form
                className="form"
                onSubmit={handleSubmit(onSubmit)}
                id="form">
                <input
                  placeholder="Name"
                  autoComplete="off"
                  {...register('name')}
                />
                <select defaultValue="Priority" {...register('priority')}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <input
                  className="due-date"
                  placeholder="Due date"
                  type="date"
                  autoComplete="off"
                  {...register('dueDate', { required: true })}
                />
                <input
                  placeholder="Description"
                  autoComplete="off"
                  {...register('description')}
                />
              </form>
            </div>

            <button className="create-button__modal" type="submit" form="form">
              Create
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
