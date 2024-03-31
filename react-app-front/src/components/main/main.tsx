import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import TaskColumn from './tasksColumn/taskColumn'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addTaskList } from '../../store/task-list/sliceTask-list'
import { httpClient } from '../../axios/axiosConfig'
import Draggable from './tasksColumn/draggable/draggable'
import './main.scss'

export default function Main() {
  const dispatch = useAppDispatch()
  const taskList = useAppSelector((state) => state.taskList.data)

  const getData = async () => {
    try {
      const response = await httpClient.get('/task-list')
      const data = response.data
      dispatch(addTaskList(data))
    } catch (error) {
      console.error('Error fetching task list: ', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteList = async (taskListId: number) => {
    try {
      await httpClient.delete(`task-list/${taskListId}`)
      getData()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTask = async (taskListId: number) => {
    try {
      await httpClient.delete(`task/${taskListId}`)
      getData()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container">
      <Draggable>
        <motion.div
          className="task-list__container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 1, scale: 0.5 }}
          transition={{ duration: 0.3 }}>
          {taskList.length === 0 && (
            <p className="empty-error">List are empty.</p>
          )}
          {taskList.map((task) => (
            <TaskColumn
              key={task.id}
              task={task}
              tasks={task.tasks}
              deleteList={deleteList}
              deleteTask={deleteTask}
            />
          ))}
        </motion.div>
      </Draggable>
    </div>
  )
}
