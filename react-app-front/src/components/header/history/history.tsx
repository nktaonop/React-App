import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RxCross2 } from 'react-icons/rx'
import { httpClient } from '../../../axios/axiosConfig'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { addAction } from '../../../store/history/slice-history'
import { HistoryInterface } from '../../../interfaces/history-interface'
import './history.scss'
import dayjs from 'dayjs'

interface HistoryProps {
  onClose: () => void
}

const History: React.FC<HistoryProps> = ({ onClose }) => {
  const history = useAppSelector((state) => state.history.data)
  const dispatch = useAppDispatch()

  const getHistory = async () => {
    const { data } = await httpClient.get('/user-actions')
    dispatch(addAction(data))
  }

  useEffect(() => {
    getHistory()
  }, [])

  const formatDate = (isoDate: string) => {
    return dayjs(isoDate).locale('en').format('ddd, MMM D, h:mm A')
  }

  return (
    <motion.div
      className="history__container"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 1, scale: 0.5 }}
      transition={{ duration: 0.1 }}>
      <div className="history__wrapper">
        <div className="history-header">
          <h3>History</h3>
          <button className="history-close" onClick={onClose}>
            <RxCross2 />
          </button>
        </div>
        <div className="history-list">
          {history.length === 0 && (
            <p className="history__empty-state">History list is empty.</p>
          )}
          {history.map((action: HistoryInterface) => (
            <div className="history" key={action.id}>
              <div className="history__modal">
                <div className="history-data__container">
                  <p
                    className="history-data"
                    dangerouslySetInnerHTML={{ __html: action.title }}
                  />
                  <p className="history-data">{formatDate(action.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default History
