import React, { useEffect, useState } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Search from './components/Search'

export default function App() {
	const [products, setProducts] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		setLoading(true)
		async function fetchProducts() {
			try {
				const url = searchQuery
					? `${process.env.REACT_APP_BASE_URL}?name=${searchQuery}`
					: `${process.env.REACT_APP_BASE_URL}?page=1&limit=10`

				const response = await fetch(url)

				if (!response.ok) {
					throw new Error('Failed to fetch data')
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
	}, [searchQuery])

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
			<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			{loading && <p>Loading Products...</p>}
			{error && <p>{error}</p>}

			<ProductList products={products} remove={removeProduct} />
			<ProductForm add={addProduct} />
		</div>
	)
}
