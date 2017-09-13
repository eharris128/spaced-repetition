// --- Linked List ------

// Initialization
export default class LinkedList {
    constructor() {
      this.length = 0;
      this.head = null;
    }
  
    // Insertion
    insert(nthPosition, value) {
      if (nthPosition < 0 || nthPosition > this.length) {
        throw new Error('nthPosition error');
      }
      const newNode = {
        value
      };
      if (nthPosition === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        const node = this._find(nthPosition - 1);
        newNode.next = node.next;
        node.next = newNode;
      }
      this.length++;
    }
    _find(nthPosition) {
      let node = this.head;
      for (let i = 0; i < nthPosition; i++) {
        node = node.next;
      }
      return node;
    }
  
    // Retrieval
    get(nthPosition) {
      if (nthPosition < 0 || nthPosition >= this.length) {
        throw new Error('Index error');
      }
      return this._find(nthPosition).value;
    }
  
    // Removal
    remove(nthPosition) {
      if (nthPosition < 0 || nthPosition >= this.length) {
        throw new Error('Index error');
      }
      if (nthPosition === 0) {
        this.head = this.head.next;
      } else {
        const node = this._find(nthPosition - 1);
        node.next = node.next.next;
      }
      this.length--;
    }
}
const list = new LinkedList();