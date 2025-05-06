import React from 'react'
import Product from './Product'
import styles from './ProductList.module.css'

export default function ProductList({ products, remove }) {
	return (
		<>
			{products.length === 0 && (
				<p style={{ textAlign: 'center' }}>Products not found</p>
			)}
			<div className={styles.productList}>
				{products.map(product => (
					<Product product={product} key={product.id} remove={remove} />
				))}
			</div>
		</>
	)
}
