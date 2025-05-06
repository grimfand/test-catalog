import React, { useEffect, useMemo, useState } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Input from './components/UI/input/Input'
import Button from './components/UI/button/Button'

export default function App() {
	const [products, setProducts] = useState([])
	const [searchQuery, setSearchQuery] = useState('')

	const searchedProducts = useMemo(() => {
		return products.filter(p =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}, [searchQuery, products])

	async function fetchProducts() {
		let response = await fetch(
			`${process.env.REACT_APP_BASE_URL}?page=1&limit=10`
		)
		const data = await response.json()
		return data
	}

	useEffect(() => {
		fetchProducts().then(data => setProducts(data))
	}, [])

	function addProduct(product) {
		setProducts([...products, product])
	}

	function removeProduct(product) {
		setProducts(products.filter(p => p.id !== product.id))
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
			}}
		>
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
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					style={{ width: '300px' }}
				/>
				<Button>Add New Product</Button>
			</div>

			<ProductList products={searchedProducts} remove={removeProduct} />

			<ProductForm add={addProduct} />
		</div>
	)
}
