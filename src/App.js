import React, { useEffect, useState, useCallback } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Search from './components/Search'
import Modal from './components/UI/modal/Modal'
import Button from './components/UI/button/Button'

export default function App() {
	const [products, setProducts] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const fetchProducts = useCallback(
		async pageNumber => {
			try {
				const url = searchQuery
					? `${process.env.REACT_APP_BASE_URL}?name=${searchQuery}&page=${pageNumber}&limit=10`
					: `${process.env.REACT_APP_BASE_URL}?page=${pageNumber}&limit=10`

				const response = await fetch(url)

				if (!response.ok) {
					throw new Error('Failed to fetch data')
				}

				const data = await response.json()

				if (data.length < 10) {
					setHasMore(false)
				}

				setProducts(prev => (pageNumber === 1 ? data : [...prev, ...data]))
				setLoading(false)
			} catch (error) {
				console.log(error)
				setError(error.message)
				setLoading(false)
			}
		},
		[searchQuery]
	)

	useEffect(() => {
		setPage(1)
		setHasMore(true)
		setLoading(true)
		fetchProducts(1)
	}, [searchQuery, fetchProducts])

	function addProduct(product) {
		setProducts([...products, product])
	}

	async function removeProduct(product) {
		try {
			const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${product.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Ошибка при удалении продукта');
			}

			setProducts(products.filter(p => p.id !== product.id));
		} catch (error) {
			console.error('Ошибка:', error);
			setError('Ошибка при удалении продукта');
		}
	}

	const handleScroll = useCallback(() => {
		if (loading || !hasMore) return

		const scrollHeight = document.documentElement.scrollHeight
		const scrollTop = document.documentElement.scrollTop
		const clientHeight = document.documentElement.clientHeight

		if (scrollHeight - scrollTop <= clientHeight + 100) {
			setLoading(true)
			setPage(prev => prev + 1)
			fetchProducts(page + 1)
		}
	}, [loading, hasMore, page, fetchProducts])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [handleScroll])

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
			{error && <p>{error}</p>}
			<Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>
			<ProductList products={products} remove={removeProduct} />
			{loading && <p>Loading Products...</p>}
			{!hasMore && <p>No more products to load</p>}

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ProductForm add={addProduct} onClose={() => setIsModalOpen(false)} />
			</Modal>
		</div>
	)
}
