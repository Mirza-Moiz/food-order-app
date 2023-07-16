import React, { useEffect, useState } from 'react'
import styles from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    useEffect(() => {
        const fetchMeals = async () => {

            const response = await fetch('https://food-order-app-4b994-default-rtdb.firebaseio.com/meals.json');
            const responseData = await response.json();
            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }
            setMeals(loadedMeals);
        }
        fetchMeals();
    }, [])

    const mealsList = meals.map((meals) =>
        <MealItem
            id={meals.id}
            key={meals.id}
            title={meals.name}
            description={meals.description}
            price={meals.price} />
    )
    return (

        <section className={styles.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals