import React from 'react'
import { BsSun } from 'react-icons/bs'
import { FaMoon } from 'react-icons/fa'
import './toggle.scss'

interface ToggleProps {
  handle: boolean
  onClick: () => void
}

const Toggle: React.FC<ToggleProps> = ({ handle, onClick }) => {
  return (
    <button className="theme-button" onClick={onClick}>
      {handle ? (
        <BsSun className="theme-icons" />
      ) : (
        <FaMoon className="theme-icons" />
      )}
    </button>
  )
}

export default Toggle
