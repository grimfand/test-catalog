import React, { useCallback } from 'react'
import Input from './UI/input/Input'
import Button from './UI/button/Button'

export default function Search({ searchQuery, setSearchQuery }) {
	const debouncedSearch = useCallback(
		value => {
			const timeoutId = setTimeout(() => {
				setSearchQuery(value)
			}, 1000)

			return () => clearTimeout(timeoutId)
		},
		[setSearchQuery]
	)

	const handleSearch = e => {
		const value = e.target.value
		debouncedSearch(value)
	}

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				gap: '0.5rem',
				marginBottom: '1rem',
			}}
		>
			<Input
				type='text'
				placeholder='Search...'
				onChange={handleSearch}
				style={{ width: '300px' }}
			/>
			<Button>Add New Product</Button>
		</div>
	)
}
