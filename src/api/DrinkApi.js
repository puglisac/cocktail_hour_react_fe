import axios from 'axios';

class DrinkApi {
	static API_BASE = `https://www.thecocktaildb.com/api/json/v1/1`;

	static async request(endpoint, data = {}, method = 'get') {
		const url = `${this.API_BASE}/${endpoint}`;
		console.debug('API Call:', url, data, method);
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	static async getRandomDrink() {
		const res = await this.request('random.php');
		return res.data['drinks'][0];
	}

	static async searchByName(name) {
		const res = await this.request('search.php', { s: name });
		return res['drinks'];
	}

	static async getDrinkById(id) {
		const res = await this.request('lookup.php', { i: id });
		return res['drinks'][0];
	}
}
export default DrinkApi;
