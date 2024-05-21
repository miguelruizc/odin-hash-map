class HashMap {
	constructor() {}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashcode = primeNumber * hashCode + key.charCodeAt(i);
		}

		return hashCode;
	}

	set(key, value) {}

	get(key) {}

	has(key) {}

	remove(key) {}

	length() {}

	clear() {}

	keys() {}

	values() {}

	entries() {}
}

class HashSet {
	//Create a HashSet class or factory function that behaves the same as a HashMap but only contains keys with no values.
}
