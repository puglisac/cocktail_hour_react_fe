import React, { useState } from 'react';
import './JobCard.css';
import DrinkApi from '../api/DrinkApi';

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function DrinkDetail({ drink }) {
	console.debug('JobCard');

	// const [ currDrink, setDrink ] = useState();
	const currDrink = drink === 'random' ? DrinkApi.getRandomDrink() : DrinkApi.getDrinkById(drink);
	// React.useEffect(function getDrink() {
	// 	const drinkDetails = drink === 'random' ? DrinkApi.getRandomDrink() : DrinkApi.getDrinkById(drink);
	// 	setDrink(drinkDetails);
	// }, []);

	return (
		<div className="JobCard card">
			{' '}
			<div className="card-body">
				<h6 className="card-title">{currDrink['strDrink']}</h6>
				<p>{currDrink['strInstructions']}</p>
			</div>
		</div>
	);
}

export default DrinkDetail;
