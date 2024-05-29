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
  };

  const remove = (key) => {
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
    }//i got the logic to remove the node if its the head
    // !!in the next else i need the logic to remove nested nodes
    // else {
      // let pointer = map[index];
      // while (pointer.next !== null) {
        // if (pointer.key === key) {
          // console.log(pointer)
          // pointer = pointer.next;
          // return pointer.value;
        // }
      // }
// 
      // return false;
    // }
  };

  return {
    map,
    set,
    get,
    has,
    remove,
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

// console.log(testHashMap.remove("a"));
// testHashMap.remove("test1");
// testHashMap.remove("test5");
testHashMap.remove("test3");

console.log(testHashMap.map[1]);

// console.log(testHashMap.has("testss"));
// console.log(testHashMap.has("aa"));
// console.log(testHashMap.has("aab"));
// console.log(testHashMap.has("aaa"));
// console.log(testHashMap.has("test2"));
// console.log(testHashMap.has("test3"));
// console.log(testHashMap.has("test4"));
// console.log(testHashMap.has("test5"));
