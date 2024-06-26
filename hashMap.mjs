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

  // the same code as get() but instead of a value it returns true or false
  const has = (key) => {
    const index = hash(key);
    // we need to check if the bucket is empty or not
    if (map[index] !== undefined) {
      // to check if the key at the specified index = the key we entered
      if (map[index].key === key) {
        return true;
      } else {
        // check every node inside the linked list until we find the key and return true
        let pointer = map[index];
        while (pointer.next !== null) {
          pointer = pointer.next;
          if (pointer.key === key) {
            return true;
          }
        }
      }
      // if the key isn't found we return false
      return false;
      // if the bucket is empty it means the key doesn't exist so we return false
    } else return false;
  };

  const remove = (key) => {
    // check if the key is in the list first using has()
    if (has(key)) {
      const index = hash(key);
      // check if the key is at the head of the linked list
      if (map[index].key === key) {
        // when the node that has the key is the head node we check if there's a node after it
        // if there's another node after it then the node we want to delete must equal to the next node
        if (map[index].next !== null) {
          map[index] = node(
            // this refers to the key,value and .next of the node after the one we want to delete
            map[index].next.key,
            map[index].next.value,
            map[index].next.next
          );
          return true;
        } else {
          // if there isn't a node after it then we delete it without worrying about the next node
          map[index] = undefined;
          return true;
        }
        // to if there's another node in the list
      } else if (map[index].next !== null) {
        let pointer = map[index];
        // to loop over the nodes in the list but using .next.next stops at the node second to last because we want to be able to check its .next.key then remove it if it matches
        while (pointer.next.next !== null) {
          // if the key on the next node matches we remove it
          if (pointer.next.key === key) {
            pointer.next = node(
              pointer.next.next.key,
              pointer.next.next.value,
              pointer.next.next.next
            );
            return true;
          }
          pointer = pointer.next;
        }
        // we still have to check the last node in the list
        if (pointer.next.key === key) {
          pointer.next = null;
          return true;
        }
      }
      // if the key doesn't exist we return false
    } else return false;
  };

  const length = () => {
    let keyCount = 0;
    // map over the buckets we have in the map
    map.forEach((bucket) => {
      // to check if the bucket is empty or not
      if (bucket !== undefined) {
        let pointer = bucket;
        // to check for nested nodes in each bucket
        while (pointer.next) {
          //add 1 to the count
          if (pointer.key) {
            keyCount += 1;
          }
          pointer = pointer.next;
        }
        // to check for the key in single node buckets && to check the last node for its key because the while loop doesn't go over it
        if (pointer.key) {
          keyCount += 1;
        }
      }
    });
    return keyCount;
  };

  const clear = () => {
    for (let i = 0; i < map.length; i++) {
      map[i] = undefined;
    }
  };

  const keys = () => {
    let keys = [];
    // map over the buckets we have in the map
    map.forEach((bucket) => {
      // to check if the bucket is empty or not
      if (bucket !== undefined) {
        let pointer = bucket;
        // to check for nested nodes in each bucket
        while (pointer.next) {
          if (pointer.key) {
            keys.push(pointer.key);
          }
          pointer = pointer.next;
        }
        // to check for the key in single node buckets && to check the last node for its key because the while loop doesn't go over it
        if (pointer.key) {
          keys.push(pointer.key);
        }
      }
    });
    return keys;
  };

  const values = () => {
    let values = [];
    // map over the buckets we have in the map
    map.forEach((bucket) => {
      // to check if the bucket is empty or not
      if (bucket !== undefined) {
        let pointer = bucket;
        // to check for nested nodes in each bucket
        while (pointer.next) {
          if (pointer.value) {
            values.push(pointer.value);
          }
          pointer = pointer.next;
        }
        // to check for the value in single node buckets && to check the last node for its value because the while loop doesn't go over it
        if (pointer.value) {
          values.push(pointer.value);
        }
      }
    });
    return values;
  };

  const entries = () => {
    let entries = [];
    // map over the buckets we have in the map
    map.forEach((bucket) => {
      // to check if the bucket is empty or not
      if (bucket !== undefined) {
        let pointer = bucket;
        // to check for nested nodes in each bucket
        while (pointer.next) {
          if (pointer.value) {
            entries.push(`${pointer.key}: ${pointer.value}`);
          }
          pointer = pointer.next;
        }
        // to check for entries in single node buckets && to check the last node for its entries because the while loop doesn't go over it
        if (pointer.value) {
          entries.push(`${pointer.key}: ${pointer.value}`);
        }
      }
    });
    return entries;
  };

  return {
    map,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

const testHashMap = hashMap();

testHashMap.set("test1", "1Waleed");
testHashMap.set("test2", "2Waleed");
testHashMap.set("test3", "3Waleed");
testHashMap.set("test4", "4Waleed");
testHashMap.set("test5", "5Waleed");
testHashMap.set("a", "a");
testHashMap.set("aa", "aa");
testHashMap.set("aaa", "111");
testHashMap.set("aaaa", "111");
testHashMap.set("aaaaa", "111");
testHashMap.set("aaaaaa", "111");

console.log(testHashMap.keys());
console.log(testHashMap.values());
console.log(testHashMap.entries());

testHashMap.clear();

console.log(testHashMap.keys());
console.log(testHashMap.values());
console.log(testHashMap.entries());

