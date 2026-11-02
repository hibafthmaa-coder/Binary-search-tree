// ========================================
// 1. NODE CLASS
// ========================================

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// ========================================
// 2. BUILD TREE FUNCTION
// ========================================

function buildTree(array) {
  // Remove duplicates and sort numbers
  const sortedArray = [...new Set(array)].sort((a, b) => a - b);

  function build(start, end) {
    // Base case
    if (start > end) {
      return null;
    }

    // Find middle index
    const mid = Math.floor((start + end) / 2);

    // Create node using middle value
    const node = new Node(sortedArray[mid]);

    // Recursively build left and right subtrees
    node.left = build(start, mid - 1);
    node.right = build(mid + 1, end);

    return node;
  }

  return build(0, sortedArray.length - 1);
}

// ========================================
// 3. TREE CLASS
// ========================================

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  // ======================================
  // 4. INCLUDES
  // ======================================

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) {
        return true;
      }

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  // ======================================
  // 5. INSERT
  // ======================================

  insert(value) {
    const newNode = new Node(value);

    // Empty tree
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;

    while (true) {
      if (value === current.data) {
        return; // No duplicates
      }

      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }

        current = current.right;
      }
    }
  }

  // ======================================
  // 6. DELETE ITEM
  // ======================================

  deleteItem(value) {
    function deleteNode(node, value) {
      if (node === null) {
        return null;
      }

      if (value < node.data) {
        node.left = deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
      } else {
        // Case 1: No children
        if (node.left === null && node.right === null) {
          return null;
        }

        // Case 2: Only right child
        if (node.left === null) {
          return node.right;
        }

        // Case 2: Only left child
        if (node.right === null) {
          return node.left;
        }

        // Case 3: Two children

        // Find smallest value in right subtree
        let successor = node.right;

        while (successor.left !== null) {
          successor = successor.left;
        }

        // Replace current node's value
        node.data = successor.data;

        // Delete the successor
        node.right = deleteNode(node.right, successor.data);
      }

      return node;
    }

    this.root = deleteNode(this.root, value);
  }

  // ======================================
  // 7. LEVEL ORDER TRAVERSAL (BFS)
  // ======================================

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (this.root === null) {
      return;
    }

    const queue = [this.root];
    let index = 0;

    while (index < queue.length) {
      const current = queue[index];

      index++;

      callback(current.data);

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  // ======================================
  // 8. INORDER TRAVERSAL (DFS)
  // ======================================

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);

      callback(node.data);

      traverse(node.right);
    }

    traverse(this.root);
  }

  // ======================================
  // PREORDER TRAVERSAL (DFS)
  // ======================================

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function traverse(node) {
      if (node === null) {
        return;
      }

      callback(node.data);

      traverse(node.left);

      traverse(node.right);
    }

    traverse(this.root);
  }

  // ======================================
  // POSTORDER TRAVERSAL (DFS)
  // ======================================

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);

      traverse(node.right);

      callback(node.data);
    }

    traverse(this.root);
  }

  // ======================================
  // 9. HEIGHT
  // ======================================

  height(value) {
    // Find the node
    function findNode(node, value) {
      if (node === null) {
        return null;
      }

      if (value === node.data) {
        return node;
      }

      if (value < node.data) {
        return findNode(node.left, value);
      }

      return findNode(node.right, value);
    }

    const target = findNode(this.root, value);

    if (target === null) {
      return undefined;
    }

    // Calculate height
    function calculateHeight(node) {
      if (node === null) {
        return -1;
      }

      const leftHeight = calculateHeight(node.left);
      const rightHeight = calculateHeight(node.right);

      return 1 + Math.max(leftHeight, rightHeight);
    }

    return calculateHeight(target);
  }

  // ======================================
  // 10. DEPTH
  // ======================================

  depth(value) {
    let current = this.root;
    let depth = 0;

    while (current !== null) {
      if (value === current.data) {
        return depth;
      }

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }

      depth++;
    }

    return undefined;
  }

  // ======================================
  // 11. IS BALANCED
  // ======================================

  isBalanced() {
    function checkBalance(node) {
      if (node === null) {
        return 0;
      }

      const leftHeight = checkBalance(node.left);

      // -1 means an unbalanced subtree
      if (leftHeight === -1) {
        return -1;
      }

      const rightHeight = checkBalance(node.right);

      if (rightHeight === -1) {
        return -1;
      }

      // Check height difference
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      return 1 + Math.max(leftHeight, rightHeight);
    }

    return checkBalance(this.root) !== -1;
  }

  // ======================================
  // 12. REBALANCE
  // ======================================

  rebalance() {
    const values = [];

    // Inorder traversal gives sorted values
    this.inOrderForEach((value) => {
      values.push(value);
    });

    // Build a new balanced tree
    this.root = buildTree(values);
  }
}

// ========================================
// 13. PRETTY PRINT FUNCTION
// ========================================

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(
    node.right,
    `${prefix}${isLeft ? "│   " : "    "}`,
    false
  );

  console.log(
    `${prefix}${isLeft ? "└── " : "┌── "}${node.data}`
  );

  prettyPrint(
    node.left,
    `${prefix}${isLeft ? "    " : "│   "}`,
    true
  );
};

// ========================================
// 14. DRIVER SCRIPT
// ========================================

// Generate random numbers
function generateRandomNumbers() {
  const numbers = [];

  for (let i = 0; i < 15; i++) {
    numbers.push(Math.floor(Math.random() * 100));
  }

  return numbers;
}

// Create a tree
const randomArray = generateRandomNumbers();

const tree = new Tree(randomArray);

console.log("Original array:", randomArray);

console.log("\nInitial balanced tree:");

prettyPrint(tree.root);

// Check if balanced
console.log("\nIs balanced?", tree.isBalanced());

// Print traversals
console.log("\nLevel order:");

const levelOrder = [];
tree.levelOrderForEach((value) => levelOrder.push(value));
console.log(levelOrder);

console.log("\nPreorder:");

const preorder = [];
tree.preOrderForEach((value) => preorder.push(value));
console.log(preorder);

console.log("\nPostorder:");

const postorder = [];
tree.postOrderForEach((value) => postorder.push(value));
console.log(postorder);

console.log("\nInorder:");

const inorder = [];
tree.inOrderForEach((value) => inorder.push(value));
console.log(inorder);

// Insert larger values to unbalance tree
console.log("\nInserting larger numbers...");

tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(150);

console.log("\nUnbalanced tree:");

prettyPrint(tree.root);

// Check balance again
console.log("\nIs balanced?", tree.isBalanced());

// Rebalance tree
console.log("\nRebalancing tree...");

tree.rebalance();

// Check balance after rebalancing
console.log("\nIs balanced after rebalancing?", tree.isBalanced());

console.log("\nBalanced tree:");

prettyPrint(tree.root);

// Print traversals again
console.log("\nFinal level order:");

const finalLevelOrder = [];
tree.levelOrderForEach((value) => finalLevelOrder.push(value));
console.log(finalLevelOrder);

console.log("\nFinal preorder:");

const finalPreorder = [];
tree.preOrderForEach((value) => finalPreorder.push(value));
console.log(finalPreorder);

console.log("\nFinal postorder:");

const finalPostorder = [];
tree.postOrderForEach((value) => finalPostorder.push(value));
console.log(finalPostorder);

console.log("\nFinal inorder:");

const finalInorder = [];
tree.inOrderForEach((value) => finalInorder.push(value));
console.log(finalInorder);