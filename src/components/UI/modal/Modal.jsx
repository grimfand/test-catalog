import React from 'react'

export default function Modal({ isOpen, onClose, children }) {
	return <dialog open={isOpen}>{children}</dialog>
}
