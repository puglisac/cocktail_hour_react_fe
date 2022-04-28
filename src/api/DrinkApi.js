import axios from "axios";

class DrinkApi {
	static API_BASE = `https://www.thecocktaildb.com/api/json/v1/1`;

	static async getRandomDrink() {
		try {
			const res = await axios.get(`${this.API_BASE}/random.php`);
			return res.data["drinks"][0];
		} catch (e) {
			console.log(e);
			throw Error(e);
		}
	}

	static async searchByName(name) {
		try {
			const res = await axios.get(`${this.API_BASE}/search.php?s=${name}`);
			return res["drinks"];
		} catch (e) {
			console.log(e);
			throw Error(e);
		}
	}

	static async getDrinkById(id) {
		try {
			const res = await this.request(`${this.API_BASE}/lookup.php?i=${id}`);
			return res["drinks"][0];
		} catch (e) {
			console.log(e);
			throw Error(e);
		}
	}
}
export default DrinkApi;
