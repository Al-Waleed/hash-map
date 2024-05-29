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
        pointer = pointer.next;
        // if we find the pointer with the wanted key we update its value then stop
        if (pointer.key === key) {
          pointer.value = value;
          return;
        }
      }
      pointer.next = node(key, value);
    }
  };

  const get = (key) => {
    const index = hash(key);
    // to check if the key at the specified index == the key we entered
    if (map[index].key === key) {
      return map[index].value;
    } else {
      // check every node inside the linked list until we find the key
      let pointer = map[index];
      while (pointer.next !== null) {
        pointer = pointer.next;
        if (pointer.key === key) {
          return pointer.value;
        }
      }
    }
  };

  return {
    map,
    set,
    get,
  };
}

const testHashMap = hashMap();

testHashMap.set("test", "0");
testHashMap.set("test1", "1");
testHashMap.set("test2", "2");
testHashMap.set("test3", "3");
testHashMap.set("test4", "4");
testHashMap.set("test5", "5");
testHashMap.set("a", "a");
testHashMap.set("aa", "aa");
testHashMap.set("aaa", "aaa");
testHashMap.set("test2", "22");
testHashMap.set("test3", "333");
testHashMap.set("test", "00");

console.log(testHashMap.map);

console.log(testHashMap.get("test"));
console.log(testHashMap.get("test1"));
console.log(testHashMap.get("test2"));
console.log(testHashMap.get("test3"));
console.log(testHashMap.get("test4"));
console.log(testHashMap.get("test5"));
