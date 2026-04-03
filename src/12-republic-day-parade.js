/**
 * 🇮🇳 Republic Day Parade - Capstone: All DOM Concepts Combined
 *
 * Republic Day parade ka live dashboard bana rahe hain! Multiple DOM
 * concepts ek saath use honge - createElement, appendChild, classList,
 * dataset, event delegation, DOM traversal, insertBefore, sab kuch.
 * Jaise 26 January ko Rajpath pe alag alag contingents march karte hain
 * aur commentary team sab track karti hai, waise hi tum DOM se parade
 * ka poora dashboard manage karoge. Yeh CAPSTONE challenge hai - saare
 * DOM skills combine karo!
 *
 * Functions:
 *
 *   1. createContingent(name, type, state, members)
 *      - Creates a div.contingent with:
 *        - data-name attribute = name
 *        - data-type attribute = type (e.g., "military", "cultural", "school")
 *        - data-state attribute = state (e.g., "Maharashtra", "Punjab")
 *        - h3 with textContent = name
 *        - span.type with textContent = type
 *        - span.state with textContent = state
 *        - ul with each member as an li element
 *      - Returns the div element
 *      - Validation: name (string), type (string), state (string),
 *        members (array of strings). Agar invalid, return null.
 *
 *   2. setupParadeDashboard(container)
 *      - Sets up the parade dashboard on container element
 *      - Returns object with these methods:
 *
 *        addContingent(contingent)
 *          - contingent: { name, type, state, members }
 *          - Creates element using createContingent()
 *          - Appends to container
 *          - Returns the created element, or null if invalid
 *
 *        removeContingent(name)
 *          - Finds .contingent child with data-name matching name
 *          - Removes it from container
 *          - Returns true if found and removed, false if not found
 *
 *        moveContingent(name, direction)
 *          - direction: "up" or "down"
 *          - "up": swaps contingent with its previousElementSibling
 *            (uses insertBefore to place it before its previous sibling)
 *          - "down": swaps with its nextElementSibling
 *            (uses insertBefore to place next sibling before this element)
 *          - Returns true if moved, false if can't move (no sibling in that direction)
 *          - Returns false if contingent not found
 *
 *        getContingentsByType(type)
 *          - Finds all .contingent children with data-type matching type
 *          - Returns array of elements
 *
 *        highlightState(state)
 *          - Adds class "highlight" to all .contingent children with
 *            data-state matching state
 *          - Removes class "highlight" from all other .contingent children
 *          - Returns count of highlighted contingents
 *
 *        getParadeOrder()
 *          - Returns array of contingent names in current DOM order
 *          - Reads data-name from each .contingent child
 *
 *        getTotalMembers()
 *          - Counts ALL li elements across all contingents in container
 *          - Returns the total count
 *
 *      - Agar container null/undefined, return null
 *
 * Hint: Yeh capstone hai - createElement, appendChild, classList, dataset,
 *   querySelectorAll, insertBefore, removeChild sab use hoga. Har method
 *   mein ek alag DOM concept practice hoga.
 *
 * @example
 *   const container = document.createElement("div");
 *   const dashboard = setupParadeDashboard(container);
 *
 *   dashboard.addContingent({
 *     name: "Punjab Regiment",
 *     type: "military",
 *     state: "Punjab",
 *     members: ["Col. Singh", "Maj. Kaur", "Capt. Gill"]
 *   });
 *
 *   dashboard.addContingent({
 *     name: "Bharatanatyam Group",
 *     type: "cultural",
 *     state: "Tamil Nadu",
 *     members: ["Lakshmi", "Priya", "Deepa", "Meena"]
 *   });
 *
 *   dashboard.getParadeOrder();
 *   // => ["Punjab Regiment", "Bharatanatyam Group"]
 *
 *   dashboard.moveContingent("Bharatanatyam Group", "up");
 *   // => true
 *   dashboard.getParadeOrder();
 *   // => ["Bharatanatyam Group", "Punjab Regiment"]
 *
 *   dashboard.getContingentsByType("military");
 *   // => [element for Punjab Regiment]
 *
 *   dashboard.highlightState("Punjab");
 *   // => 1 (Punjab Regiment highlighted)
 *
 *   dashboard.getTotalMembers();
 *   // => 7 (3 + 4)
 *
 *   dashboard.removeContingent("Punjab Regiment");
 *   // => true
 */
export function createContingent(name, type, state, members) {
  // Your code here

  if(typeof(name) !== "string" || typeof(type) !== "string" || typeof(state) !== "string" || !Array.isArray(members))
    return null

  for(let i=0;i<members.length;i++){
    if(typeof(members[i]) !== "string")
      return null
  }

  const element = document.createElement("div")
  element.classList.add("contingent")

  element.dataset.name = name
  element.dataset.type = type
  element.dataset.state = state

  const heading = document.createElement("h3")
  heading.textContent = name

  const typeElement = document.createElement("span")
  typeElement.classList.add("type")
  typeElement.textContent = type

  const stateElement = document.createElement("span")
  stateElement.classList.add("state")
  stateElement.textContent = state

  const list = document.createElement("ul")

  for(let i=0;i<members.length;i++){
    const item = document.createElement("li")
    item.textContent = members[i]
    list.appendChild(item)
  }

  element.appendChild(heading)
  element.appendChild(typeElement)
  element.appendChild(stateElement)
  element.appendChild(list)

  return element
}



export function setupParadeDashboard(container) {
  // Your code here

  if(!container)
    return null

  return {

    addContingent(contingent){

      const element = createContingent(contingent.name, contingent.type, contingent.state, contingent.members)

      if(!element)
        return null

      container.appendChild(element)

      return element
    },

    removeContingent(name){

      const elements = container.querySelectorAll(".contingent")

      for(let i=0;i<elements.length;i++){

        if(elements[i].dataset.name === name){
          container.removeChild(elements[i])
          return true
        }

      }

      return false
    },

    moveContingent(name, direction){

      const elements = container.querySelectorAll(".contingent")

      let target = null

      for(let i=0;i<elements.length;i++){
        if(elements[i].dataset.name === name){
          target = elements[i]
          break
        }
      }

      if(!target)
        return false

      if(direction === "up"){

        const previous = target.previousElementSibling

        if(!previous)
          return false

        container.insertBefore(target, previous)

        return true
      }

      if(direction === "down"){

        const next = target.nextElementSibling

        if(!next)
          return false

        container.insertBefore(next, target)

        return true
      }

      return false
    },

    getContingentsByType(type){

      const elements = container.querySelectorAll(".contingent")

      const result = []

      for(let i=0;i<elements.length;i++){

        if(elements[i].dataset.type === type)
          result.push(elements[i])

      }

      return result
    },

    highlightState(state){

      const elements = container.querySelectorAll(".contingent")

      let count = 0

      for(let i=0;i<elements.length;i++){

        if(elements[i].dataset.state === state){
          elements[i].classList.add("highlight")
          count++
        }else{
          elements[i].classList.remove("highlight")
        }

      }

      return count
    },

    getParadeOrder(){

      const elements = container.querySelectorAll(".contingent")

      const result = []

      for(let i=0;i<elements.length;i++)
        result.push(elements[i].dataset.name)

      return result
    },

    getTotalMembers(){

      const elements = container.querySelectorAll("li")

      return elements.length
    }

  }
}
