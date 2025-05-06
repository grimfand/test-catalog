import React, { useState } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

export default function App() {
	const [products, setProducts] = useState([
		{ id: 1, name: 'Name', description: 'Descr', price: 500 },
		{ id: 2, name: 'Name', description: 'Descr', price: 500 },
		{ id: 3, name: 'Name', description: 'Descr', price: 500 },
	])

	// async function fetchProducts() {
	// 	let response = await fetch(
	// 		'https://6818644b5a4b07b9d1ceddd8.mockapi.io/api/v1/products'
	// 	)
	// 	const data = await response.json()
	// 	console.log(data)
	// 	return data
	// }

	function addProduct(product) {
		setProducts([...products, product])
	}

	return (
		<>
			{/* <button onClick={fetchProducts}>Load products</button> */}
			<h1>Catalog:</h1>
			<ProductList products={products} />

			<h2>Add new Product:</h2>
			<ProductForm add={addProduct} />
		</>
	)
}
