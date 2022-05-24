let child = document.querySelector('child')
let parent = document.querySelector('parent')

function isChildOf(child, parent) {
  var parentNode;
  if(child && parent) {
    parentNode = child.parentNode;
    while(parentNode) {
      if(parent === parentNode) {
        return true;
      }
      parentNode = parentNode.parentNode;
    }
  }
  return false;
}

let child = document.querySelector('.child')
let parent = document.querySelector('.parent')

function isParent(parent, child) {
  let parentNode
  if (child && parent) {
    parentNode = child.parentNode
    while(parentNode) {
      if (parent === parentNode) {
        return true
      }
      parentNode = parentNode.parentNode
    }
  }
}