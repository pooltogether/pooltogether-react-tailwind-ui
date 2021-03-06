import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import Dialog from '@reach/dialog'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@pooltogether/hooks'

export const Modal = (props) => {
  const {
    isOpen,
    closeModal,
    children,
    label,
    className,
    noPad,
    noSize,
    noBgColor,
    noTextColor,
    noRoundCorners
  } = props

  const shouldReduceMotion = useReducedMotion()

  if (!label) {
    console.warn('Modal required a label! <Modal /> with children:', children)
  }

  return (
    <Dialog aria-label={label} isOpen={isOpen} onDismiss={closeModal}>
      <motion.div
        id='modal-animation-wrapper'
        key={label}
        transition={{ duration: shouldReduceMotion ? 0 : 0.1, ease: 'easeIn' }}
        initial={{
          opacity: 0
        }}
        exit={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        className={classnames(
          'mx-auto relative',
          {
            'p-4': !noPad,
            'bg-card': !noBgColor,
            'text-inverse': !noTextColor,
            'h-full sm:h-auto sm:max-w-sm': !noSize,
            'rounded-none sm:rounded-xl ': !noRoundCorners
          },
          className
        )}
      >
        <CloseModalButton closeModal={closeModal} />
        {children}
      </motion.div>
    </Dialog>
  )
}

Modal.defaultProps = {
  noPad: false,
  noSize: false
}

const CloseModalButton = (props) => {
  const { closeModal } = props
  return (
    <button
      className='my-auto ml-auto close-button trans text-inverse hover:opacity-30 absolute right-2 top-2'
      onClick={closeModal}
    >
      <FeatherIcon icon='x' className='w-6 h-6' />
    </button>
  )
}
