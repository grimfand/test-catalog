import React from 'react'
import Product from './Product'
import styles from './ProductList.module.css'

export default function ProductList({ products, remove }) {
	return (
		<div className={styles.productList}>
			{products.map(product => (
				<Product product={product} key={product.id} remove={remove} />
			))}
		</div>
	)
}
