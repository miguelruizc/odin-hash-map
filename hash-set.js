class HashSet {
	static INITIAL_CAPACITY = 16;
	static LOAD_FACTOR = 0.75;

	constructor() {
		this.arraySize = HashSet.INITIAL_CAPACITY;
		this.keyCount = 0;

		this.array = new Array(this.arraySize);
		for (let i = 0; i < this.arraySize; i++) this.array[i] = new Set();
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}

		return hashCode % this.arraySize;
	}

	set(key) {
		const index = this.hash(key);
		this.array[index].add(key);

		this.keyCount++;
		this.checkCapacity();
	}

	get(key) {
		const index = this.hash(key);
        
        let found = null;

		this.array[index].forEach((element) => {
			if (element === key) found = element;
		});

		return found;
	}

	has(key) {
		const index = this.hash(key);
		let has = false;

		this.array[index].forEach((element) => {
			if (element === key) has = true;
		});

		return has;
	}

	remove(key) {
		const index = this.hash(key);

		this.array[index].forEach((element) => {
			if (element === key) {
				this.array[index].delete(element);
				this.keyCount--;
				return true;
			}
		});

		return false;
	}

	length() {
		return this.keyCount;
	}

	reset(size = HashSet.INITIAL_CAPACITY) {
		this.arraySize = size;
		this.keyCount = 0;

		this.array = new Array(this.arraySize);
		for (let i = 0; i < this.arraySize; i++) this.array[i] = new Set();
	}

	keys() {
		let keys = [];
		this.array.forEach((element) => {
			element.forEach(thing => {
                keys.push(thing);
            })
		});

		return keys;
	}


	checkCapacity() {
		let currentLoad = this.keyCount / this.arraySize;

		if (currentLoad >= HashSet.LOAD_FACTOR) this.grow();
	}

	grow() {
		// Store data
		let keys = this.keys();
		let keyCount = this.keyCount;

		// Expand array
		this.arraySize += 16;
		this.reset(this.arraySize);

		// Add data back
		for (let i = 0; i < keyCount; i++) {
			this.set(keys[i]);
		}
	}
}