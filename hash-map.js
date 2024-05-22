class HashMap {
	static INITIAL_CAPACITY = 16;
	static LOAD_FACTOR = 0.75;

	constructor() {
		this.arraySize = HashMap.INITIAL_CAPACITY;
		this.keyCount = 0;

		this.array = new Array(this.arraySize);
		for (let i = 0; i < this.arraySize; i++) this.array[i] = {};
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}

		return hashCode % this.arraySize;
	}

	set(key, value) {
		const index = this.hash(key);
		this.array[index][key] = value;

		this.keyCount++;
		this.checkCapacity();
	}

	get(key) {
		const index = this.hash(key);
		if (this.array[index][key]) return this.array[index][key];
		else return null;
	}

	has(key) {
		const index = this.hash(key);
		if (this.array[index][key]) return true;
		return false;
	}

	remove(key) {
		const index = this.hash(key);

		if (this.array[index][key]) {
			delete this.array[index][key];
			this.keyCount--;
			return true;
		}

		return false;
	}

	length() {
		return this.keyCount;
	}

	reset(size = HashMap.INITIAL_CAPACITY) {
		this.arraySize = size;
		this.keyCount = 0;

		this.array = new Array(this.arraySize);
		for (let i = 0; i < this.arraySize; i++) this.array[i] = {};
	}

	keys() {
		let keys = [];
		this.array.forEach((element) => {
			keys.push(...Object.keys(element));
		});

		return keys;
	}

	values() {
		let values = [];
		this.array.forEach((element) => {
			values.push(...Object.values(element));
		});

		return values;
	}

	entries() {
		let entries = [];
		this.array.forEach((element) => {
			entries.push(...Object.entries(element));
		});

		return entries;
	}

	checkCapacity() {
		let currentLoad = this.keyCount / this.arraySize;

		if (currentLoad >= HashMap.LOAD_FACTOR) this.grow();
	}

	grow() {
		// Store data
		let keys = this.keys();
		let values = this.values();
		let keyCount = this.keyCount;

		// Expand array
		this.arraySize += 16;
		this.reset(this.arraySize);
		
		// Add data back
		for(let i = 0; i < keyCount; i++){
			this.set(keys[i], values[i]);
		}
	}
}

// Test
let h = new HashMap();
for (let i = 0; i < 30; i++) {
	h.set(`key${i}`, `value${i}`);
	console.log(h);
}
