import React from 'react'
import styles from './Product.module.css'
import Button from './UI/button/Button'

export default function Product(props) {
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
			<span>Rating: {props.product.rating}</span>
			<span>{props.product.createdAt}</span>
			<Button onClick={() => props.remove(props.product)}>Delete</Button>
		</div>
	)
}
