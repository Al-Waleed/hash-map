function hashMap() {
  const map = new Array(16);

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  };

  const set = (key, value) => {
    const hashed = hash(key);
    // add the key value pain to the index of the hash if its empty
    if (map[hashed] === undefined) {
      map[hashed] = { key: value };
    }
    // else if (map[hashed] !== undefined) {
    //   // code for linked lists (ill add it later)
    // }
  };

  return {
    map,
    set,
  };
}

const testHashMap = hashMap()

testHashMap.set("waleed", "age:24");

console.log(testHashMap.map);
