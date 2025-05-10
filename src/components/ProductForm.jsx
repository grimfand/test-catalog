import React, { useState } from 'react'
import Input from './UI/input/Input'
import Button from './UI/button/Button'

export default function ProductForm({ add, onClose }) {
	const [product, setProduct] = useState({
		name: '',
		description: '',
		price: '',
	})

	function addNewProduct(e) {
		e.preventDefault()
		const newProduct = { ...product, id: Date.now() }
		add(newProduct)
		setProduct({ name: '', description: '', price: '' })
		onClose()
	}

	return (
		<form style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
			<h2 style={{ marginTop: 0 }}>Add New Product</h2>
			<Input
				type='text'
				placeholder='Name'
				value={product.name}
				onChange={e => setProduct({ ...product, name: e.target.value })}
			/>
			<Input
				type='text'
				placeholder='Description'
				value={product.description}
				onChange={e => setProduct({ ...product, description: e.target.value })}
			/>
			<Input
				type='number'
				placeholder='Price'
				value={product.price}
				onChange={e => setProduct({ ...product, price: e.target.value })}
			/>
			<Button onClick={addNewProduct}>Add product</Button>
		</form>
	)
}
