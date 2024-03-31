import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import './menu.scss'

interface MenuProps {
  onEdit: () => void
  onDelete: () => void
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ onEdit, onDelete }, ref) => {
    return (
      <>
        <motion.div
          ref={ref}
          className="menu"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 1, scale: 0.5 }}
          transition={{ duration: 0.3 }}>
          <button className="title-menu__buttons" onClick={onEdit}>
            <FaRegEdit />
            Edit
          </button>

          <button className="title-menu__buttons" onClick={onDelete}>
            <RiDeleteBin6Line />
            Delete
          </button>
        </motion.div>
      </>
    )
  }
)

export default Menu
