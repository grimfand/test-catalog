import React, { useState } from 'react'
import Input from './UI/input/Input'
import Button from './UI/button/Button'

export default function ProductForm({ add, onClose }) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        rating: ''
    })

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        
        if (!product.name || product.name.length < 3 || product.name.length > 15) {
            newErrors.name = 'Имя должно быть от 3 до 15 символов'
        }
        
        if (!product.description || product.description.length < 10 || product.description.length > 100) {
            newErrors.description = 'Описание должно быть от 10 до 100 символов'
        }
        
        if (!product.price || !/^\d+\.\d{2}$/.test(product.price)) {
            newErrors.price = 'Цена должна быть в формате "000.00"'
        }
        
        if (!product.rating || product.rating < 1 || product.rating > 10 || !Number.isInteger(Number(product.rating))) {
            newErrors.rating = 'Рейтинг должен быть целым числом от 1 до 10'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function addNewProduct(e) {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }

        const newProduct = {
            name: product.name,
            description: product.description,
            price: product.price,
            rating: Number(product.rating) * 10,
            createdAt: new Date().toISOString()
        }

        try {
            const response = await fetch(process.env.REACT_APP_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })

            if (!response.ok) {
                throw new Error('Ошибка при создании продукта')
            }

            const createdProduct = await response.json()
            add(createdProduct)
            setProduct({ name: '', description: '', price: '', rating: '' })
            onClose()
        } catch (error) {
            console.error('Ошибка:', error)
            setErrors({ submit: error.message })
        }
    }

    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h2 style={{ marginTop: 0 }}>Добавить новый продукт</h2>
            
            <Input
                type='text'
                placeholder='Название (3-15 символов)'
                value={product.name}
                onChange={e => setProduct({ ...product, name: e.target.value })}
            />
            {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</span>}

            <Input
                type='text'
                placeholder='Описание (10-100 символов)'
                value={product.description}
                onChange={e => setProduct({ ...product, description: e.target.value })}
            />
            {errors.description && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.description}</span>}

            <Input
                type='text'
                placeholder='Цена (формат: 000.00)'
                value={product.price}
                onChange={e => setProduct({ ...product, price: e.target.value })}
            />
            {errors.price && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.price}</span>}

            <Input
                type='number'
                placeholder='Рейтинг (1-10)'
                value={product.rating}
                onChange={e => setProduct({ ...product, rating: e.target.value })}
                min="1"
                max="10"
            />
            {errors.rating && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.rating}</span>}

            {errors.submit && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.submit}</span>}

            <Button onClick={addNewProduct}>Добавить продукт</Button>
        </form>
    )
}
