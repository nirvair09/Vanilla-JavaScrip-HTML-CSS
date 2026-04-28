# Project Learnings & Bug Fixes

This document summarizes the key technical concepts and common pitfalls identified and resolved during the development of the Smart Dashboard.

## 1. JavaScript Array Methods (`.filter`)
- **Pitfall:** Arrow functions with curly braces `{}` do NOT return values automatically.
- **Fix:** Either remove the curly braces for an implicit return or use the `return` keyword explicitly.
- **Example:**
  ```javascript
  // Incorrect
  list.filter(item => { item.id === 1 }) // returns undefined
  
  // Correct
  list.filter(item => item.id === 1) // implicit return
  ```

## 2. Proper Infinite Scroll Logic
- **Math Reliability:** Avoid strict equality checks like `window.innerHeight + window.scrollY === document.body.offsetHeight`. Scroll positions can vary by sub-pixels.
- **Thresholds:** Always use a threshold (e.g., `- 100px`) so the next batch of data starts loading *before* the user hits the dead bottom.
- **Properties:** `document.documentElement.scrollHeight` is generally more consistent than `document.body.offsetHeight` for total page height.

## 3. Data Flattening (Spread Operator)
- **Pitfall:** When appending an array of products to an existing array, using `[...state.products, data.products]` creates a **nested array** (`[p1, [p2, p3]]`).
- **Fix:** Spread both arrays to merge them into one flat list: `[...state.products, ...data.products]`.

## 4. Debouncing API Calls
- **Timer Management:** Always use `clearTimeout(timer)` to cancel a previous `setTimeout`. Using `clearInterval` is technically incorrect for timeouts.
- **UX:** Debouncing prevents firing an API request for every single keystroke, saving server resources and improving performance.

## 5. CSS Transitions & Display Property
- **Concept:** CSS cannot animate/transition between `display: none` and `display: block`.
- **Solution:** For smooth modal fades, use `opacity: 0` and `visibility: hidden`. Then toggle them to `opacity: 1` and `visibility: visible`.
- **Interaction:** Use `pointer-events: none` when the modal is hidden so users don't accidentally click things "through" the invisible modal.

## 6. State vs. UI Synchronization
- **Bug:** Changing a tab's CSS class to `active` doesn't automatically update the data.
- **Fix:** Ensure your event listeners update your `state` object (e.g., `state.tab = "favourites"`) before calling `render()`.

## 7. Dynamic Event Binding
- **Context:** When elements are created dynamically via `document.createElement`, listeners like `onclick` must be attached *before* the element is appended to the DOM.
- **Reference:** Always check that the variable names used in listeners match the iterator variable in your loop (e.g., using `p` instead of `item`).

## 9. Common Beginner Confusions
- **Async/Await:** Beginners often forget that `fetch` is asynchronous. If you don't `await` the response, your code will try to use the data before it has actually arrived from the server.
- **The Event Object (`e`):** In listeners like `onclick` or `oninput`, the `e` (event) object contains crucial info like `e.target.value`. Forgetting to pass `e` into your function is a common source of "undefined" errors.
- **State vs. DOM:** A common mistake is trying to change the text on the screen directly. It's much better to **update your State first**, then call a `render()` function to make the screen match the state. This keeps your app predictable.
- **`id` vs. `class`:** Remember that `document.getElementById` returns a **single** element, while `document.querySelectorAll` returns a **list** (NodeList) that you must loop through (using `.forEach`).

## 10. Pro Coding Tips for This Project
- **Meaningful Naming:** Instead of using `p` or `item` in your loops, use `product`. It makes line 49 (`product.title`) much easier to read than `p.title`.
- **Defensive Coding:** In your `fetchData` function, always check if the data actually exists. For example, `if (!data.products) return;` prevents your app from crashing if the API has an issue.
- **Empty States:** Always handle the case where a search returns nothing. Adding a simple `if (data.length === 0) list.innerHTML = "No results found"` improves user experience significantly.
- **Console is your Friend:** If something isn't working, use `console.log(state)` inside your `render` function. Seeing the "brain" of your app in the console helps you spot bugs instantly.
- **Network Tab:** Use the Chrome DevTools "Network" tab to see exactly what URL is being fetched. This is how you spot bugs in your pagination `skip` and `limit` logic.
