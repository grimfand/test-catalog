import React from 'react'
import styles from './Product.module.css'

export default function Product(props) {
	return (
		<div className={styles.product}>
			<h2>{props.product.name}</h2>
			{/* <img src='' alt='Image'></img> */}
			<p>{props.product.description}</p>
			<span>{props.product.price}</span>
			{/* <span>{rating}</span> */}
			{/* <span>{createdAt}</span> */}
		</div>
	)
}
