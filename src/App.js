import React, { useEffect, useMemo, useState } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Input from './components/UI/input/Input'
import Button from './components/UI/button/Button'

export default function App() {
	const [products, setProducts] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const searchedProducts = useMemo(() => {
		return products.filter(p =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}, [searchQuery, products])

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BASE_URL}?page=1&limit=10`
				)

				if (!response.ok) {
					throw new Error('Something wrong')
				}

				const data = await response.json()
				setProducts(data)
				setLoading(false)
			} catch (error) {
				console.log(error)
				setError(error.message)
				setLoading(false)
			} finally {
				setLoading(false)
			}
		}
		fetchProducts()
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

			{loading ? <p>Loading Products...</p> : error && <p>{error}</p>}
			<ProductList products={searchedProducts} remove={removeProduct} />
			<ProductForm add={addProduct} />
		</div>
	)
}
