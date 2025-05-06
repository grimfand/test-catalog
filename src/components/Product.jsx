import React from 'react'
import styles from './Product.module.css'
import Button from './UI/button/Button'

export default function Product(props) {
	const createdAt = new Date(props.product.createdAt)
	const fixedDateFormat = createdAt.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})

	const rating = Math.round(props.product.rating / 10)

	return (
		<div className={styles.product}>
			<h2>{props.product.name}</h2>
			<img
				src={props.product.image}
				alt={props.product.name}
				className={styles.productImage}
			/>
			<p>{props.product.description}</p>
			<span>Price: {props.product.price}</span>
			<span>Rating: {rating}</span>
			<span>Created at: {fixedDateFormat}</span>
			<Button onClick={() => props.remove(props.product)}>Delete</Button>
		</div>
	)
}
