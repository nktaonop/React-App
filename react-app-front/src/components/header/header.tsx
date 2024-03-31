import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GrAdd } from 'react-icons/gr'
import { TbReload } from 'react-icons/tb'
import { httpClient } from '../../axios/axiosConfig'
import { addTaskList } from '../../store/task-list/sliceTask-list'
import { useAppDispatch } from '../../store/hooks'
import Toggle from './toggle/toggle'
import History from './history/history'
import './header.scss'

interface HeaderProps {
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ isDark, setIsDark }) => {
  const [list, setList] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [showButtons, setShowButtons] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [errorMessage, setErrorMessage] = useState<string>('')

  const dispatch = useAppDispatch()

  const addList = async (name: string) => {
    try {
      await httpClient.post('/task-list', { name })
      const { data } = await httpClient.get('task-list')
      dispatch(addTaskList(data))
    } catch (error) {
      console.error('Error fetching task list:', error)
    }
  }

  useEffect(() => {
    showInput && inputRef.current?.focus()
  }, [showInput])

  const handleList = () => {
    setShowInput(true)
    setShowButtons(false)
    if (inputRef.current !== null) {
      inputRef.current.focus()
    }
  }

  const handleInputChange = (event: any) => {
    setList(event.target.value)
  }

  const handleInputSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (list.trim() === '') {
      setErrorMessage('List name cannot be empty.')
      return
    }

    addList(list)
    setShowInput(false)
    setShowButtons(true)
    setList('')
    setErrorMessage('')
  }

  const handleCancel = () => {
    setShowInput(false)
    setShowButtons(true)
    setList('')
  }

  const handleHistory = () => {
    setShowHistory(!showHistory)
  }

  return (
    <div className="container">
      <div className="header__container">
        <motion.h1
          className="title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}>
          My Task Board
        </motion.h1>

        <div className="buttons__container">
          <Toggle handle={isDark} onClick={() => setIsDark(!isDark)} />

          {showButtons && (
            <motion.div
              className="started-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}>
              <button className="new-list" onClick={handleList}>
                <GrAdd className="plus-icon" />
                Create New List
              </button>
              <button className="history-button" onClick={handleHistory}>
                <TbReload className="reload-icon" />
                History
              </button>
            </motion.div>
          )}

          {showHistory && <History onClose={handleHistory} />}

          {showInput && (
            <motion.div
              className="input__container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}>
              <form onSubmit={handleInputSubmit}>
                <input
                  className="create-input"
                  type="text"
                  value={list}
                  onChange={handleInputChange}
                  ref={inputRef}
                  placeholder={errorMessage || 'Enter list name'}
                />
                <div className="create-list__container">
                  <button className="create-button" type="submit">
                    Create
                  </button>
                  <button
                    className="cancel-button"
                    type="button"
                    onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
