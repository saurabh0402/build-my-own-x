# Reflex 💃
Reflex is a simple React clone. The code is small and simple enough to get an understanding of the react internals.

## Before you begin 🏁
Before you begin diving into the code, here are a few things that will help you understand things better

### Fibers
- For rendering elements, react and therefore reflex uses something called a `Fiber tree`. Now a fiber tree is a tree of fibers. So, let's first see what `fiber` is. A Fiber is an object, mostly similar to what `createElement` returns but with a few added properties that help us to render the element and to traverse through the tree. A fiber basically looks like this 
  ```js
  {
    dom: "<DOM_ELEMENT>",
    type: "<CREATE_ELEMENT_TYPE>",
    props: "<CREATE_ELEMENT_PROPS>",
    child: "<REFERENCE_TO_ANOTHER_FIBER>",
    sibling: "<REFERENCE_TO_ANOTHER_FIBER>",
  }
  ```
  The Fiber tree also is a combination of Linked List and "unary" trees in the sense that each node has a maximum of one child which is stored in `child` key. Now, each fiber can have reference to its next sibling in the `sibling` key. This way, `child` and `sibling` actually forms a kind of linked list.

  So, let's say we have a HTML that looks like this
  ```html
  <div>
    <div>
      <h1> H1 </h1>
      <h2> H2 </h2>
    </div>
    <h3> H3 </h3>
  </div>
  ```

  The fiber tree for this will be somewhat like this
  ```js
  dom: null,
  type: "div",
  props: {},
  child: {
    dom: null,
    type: "div",
    props: {},
    child: {
      dom: null,
      type: "h1",
      props: {},
      child: null,
      sibling: "fiber for h2"
    },
    sibling: "fiber for h3"
  },
  sibling: null,
  ```

  One other thing to remember when you look at the code is that this tree is actually created on the fly while rendering.

## Credits 🏆
***All Credits to [https://pomb.us/build-your-own-react/](https://pomb.us/build-your-own-react/)***