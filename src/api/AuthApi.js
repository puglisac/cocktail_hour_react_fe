import axios from 'axios';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class AuthApi {
	// the token for interactive with the API will be stored here.
	static token;
	static API_BASE = `http://127.0.0.1:5000`;
	static async request(endpoint, data = {}, method = 'get') {
		const url = `${this.API_BASE}/${endpoint}`;
		console.debug('API Call:', url, data, method);
		const headers = {
			Authorization: `Bearer ${AuthApi.token}`
		};
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	// Individual API routes

	/** Get the current user. */

	static async getCurrentUser(email) {
		let res = await this.request(`${email}`);
		return res.user;
	}

	/** Get companies (filtered by name if not undefined) */

	static async getCompanies(name) {
		let res = await this.request('companies', { name });
		return res.companies;
	}

	/** Get details on a company by handle. */

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	/** Get list of jobs (filtered by title if not undefined) */

	static async getJobs(title) {
		let res = await this.request('jobs', { title });
		return res.jobs;
	}

	/** Apply to a job */

	static async applyToJob(username, id) {
		await this.request(`users/${username}/jobs/${id}`, {}, 'post');
	}

	/** Get token for login from username, password. */

	static async login(data) {
		let res = await this.request(`login`, data, 'post');
		return res.access_token;
	}

	/** Signup for site. */

	static async signup(data) {
		let res = await this.request(`signup`, data, 'post');
		return res.access_token;
	}

	/** Save user profile page. */

	static async saveProfile(username, data) {
		let res = await this.request(`users/${username}`, data, 'patch');
		return res.user;
	}
}

export default AuthApi;
