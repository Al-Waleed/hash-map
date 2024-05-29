import node from "./node.mjs";

export default function linkedList() {
  let list = {
    head: null,
  };

  const head = () => {
    return list.head;
  };

  const tail = () => {
    let pointer = head();
    // to keep pointing to the next pointer until its the last node
    while (pointer.next !== null) {
      pointer = pointer.next;
    }
    return pointer;
  };

  const append = (value) => {
    let pointer = head();
    // to add the node to the head in case the list is empty
    if (pointer === null) {
      list.head = node(value);
    } else {
      // to keep pointing the next item until its the last item
      while (pointer.next !== null) {
        pointer = pointer.next;
      }
      if (pointer.next === null) {
        //!!i think this if isn't necessary ill get back to it later
        pointer.next = node(value);
      }
    }
  };

  const prepend = (value) => {
    list.head = node(value, list.head);
  };

  const size = () => {
    let pointer = list.head;
    let total = 0;
    // in case the pointer(head) is empty return 0
    if (pointer === null) {
      return total;
    } else {
      // add 1 to the total before the while loop because in the loop it stops adding to the total before reaching the last value
      total += 1;
      while (pointer.next !== null) {
        console.log;
        pointer = pointer.next;
        total += 1;
      }
      return total;
    }
  };

  const at = (index) => {
    let pointer = head();
    let counter = 0;
    // to return the first item on the list in case index = 0
    if (counter === index) {
      return pointer;
      // to check if the entered number is larger than the list's length
    } else if (index > size()) {
      return "the list is not that long";
    } else {
      // keep going to the next pointer and adding 1 to the counter until it matches the index number
      while (counter < index) {
        pointer = pointer.next;
        counter += 1;
      }
      return pointer;
    }
  };

  const pop = () => {
    let pointer = head();
    // to check if the list is empty or not
    if (pointer === null) {
      return "The list is already empty";
      // to check if the list only has 1 item
    } else if (pointer.next === null) {
      list.head = null;
      // keep pointing to the next pointer until we reach the one before the last so we can delete the next item which is the last
    } else {
      while (pointer.next.next !== null) {
        pointer = pointer.next;
      }
      if (pointer.next.next === null) {
        // at this point pointer refers to the node second to last -- and pointer.next refers to the last item
        pointer.next = null;
      }
    }
  };

  const contains = (value) => {
    let pointer = head();
    // loop through the list until we find the value we want and return true
    while (pointer.next !== null) {
      if (pointer.value === value) {
        return true;
      }
      pointer = pointer.next;
    }
    // to check the last value because the while loop stops before checking it
    if (pointer.value === value) {
      return true;
    } else return false;
  };

  const find = (value) => {
    let pointer = head();
    let index = 0;
    // to loop over the list
    while (pointer.next !== null) {
      // to return the index of the node if it's == value
      if (pointer.value === value) {
        return index;
      }
      pointer = pointer.next;
      index += 1;
    }
    // to check the last value because the loop stops before checking it
    if (pointer.value === value) {
      return index;
    } else return null;
  };

  const toString = () => {
    let string = "";
    let pointer = head();
    // to check if the list is empty
    if (pointer === null) {
      return "The list is empty";
    }
    // keep going to the next item and add the value to string
    while (pointer.next !== null) {
      string += `(${pointer.value}) -> `;
      pointer = pointer.next;
    }
    // to add the last item to string because the loop stops before reaching it
    string += `(${pointer.value}) -> null`;
    return string;
  };

  const insertAt = (value, index) => {
    // to check if the entered index is larger than the list size
    if (size() < index) {
      return "The list is not that long";
      // if the index is 0 we use the function we have (prepend) to add the value to the head
    } else if (index === 0) {
      prepend(value);
    } else {
      // we use at(index-1) to point to the node before the node we want to insert so we can edit the .next in it
      let pointer = at(index - 1);
      pointer.next = node(value, pointer.next);
    }
  };

  const removeAt = (index) => {
    // to check if the specified index is larger than the length of the list
    if (size() <= index) {
      return "The list is not that long";
      //to check if the specified index refers to the last item then we use pop() to remove it
    } else if (index === size() - 1) {
      pop();
      // if the first node is specified we remove it by adding a node() function with the value and the .next of the node after it
    } else if (index === 0) {
      list.head = node(list.head.next.value, list.head.next.next);
    } else {
      // we use at(index-1) to get the node before the one we want to remove
      let pointer = at(index - 1);
      //pointer.next.next.value refers to the value of the node after the one we want to remove
      //pointer.next.next.next refers to the (.next) of the node after the one we want to remove
      pointer.next = node(pointer.next.next.value, pointer.next.next.next);
    }
  };

  return {
    head,
    tail,
    append,
    prepend,
    size,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

const list = linkedList();
