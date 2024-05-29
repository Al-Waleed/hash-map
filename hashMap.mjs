import node from "./node.mjs";

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
    const index = hash(key);
    // add the key and value node to the map using the index ---> (hash(key))
    if (map[index] === undefined) {
      // this creates a node with the key, value and next, we need next in case we need to add more nodes to the same index
      map[index] = node(key, value);
      // in case the first node has the same key we update its value
    } else if (map[index].key === key) {
      map[index] = node(key, value, map[index].next);
    } else {
      // to append the new node to the .next of the last node
      let pointer = map[index];
      // to reach the last node
      while (pointer.next !== null) {
        //!!! i need to create a function that checks if the key exits and update its value
        pointer = pointer.next;
      }
      pointer.next = node(key, value);
    }
  };

  return {
    map,
    set,
  };
}

const testHashMap = hashMap();

testHashMap.set("test", "0");
testHashMap.set("test1", "1");
testHashMap.set("test2", "2");
testHashMap.set("test3", "3");
testHashMap.set("test4", "4");
testHashMap.set("test5", "5");

console.log(testHashMap.map)