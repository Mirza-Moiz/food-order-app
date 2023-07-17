import React, { useEffect, useState } from 'react'
import styles from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [httpError, setHttpError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://food-order-app-4b994-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error("Something went Wrong");
            }

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
            setIsLoading(false);
        }
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [])

    if (isLoading) {
        return (
            <section className={styles.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }
    if (httpError) {
        return (
            <section className={styles.MealsError}>
                <p>Failed to Fetch maels Data :(</p>
            </section>
        )
    }

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