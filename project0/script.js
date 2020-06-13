// class names for list items, checkboxes , textboxes and delete buttons
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

// html tag references
const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// variable for unique li - id
var counter = 1

// function to add new checkboxes, textboxes, delete button for each todo.
function newTodo() {

  var node = document.createElement("li")
  node.setAttribute("class",classNames.TODO_ITEM)
  node.setAttribute("id",`li-id-${counter}`)
  
  var check_box = document.createElement("input")
  check_box.setAttribute("type","checkbox")
  check_box.setAttribute("class",classNames.TODO_CHECKBOX)
  check_box.addEventListener("click",updateCounts)

  var txt_box = document.createElement("input")
  txt_box.setAttribute("type","text")
  txt_box.setAttribute("class",classNames.TODO_TEXT)

  var del_button = document.createElement("button")
  del_button.setAttribute("class",classNames.TODO_DELETE)
  del_button.setAttribute("onClick","deleteTodo(this.parentElement.id)")
  del_button.innerHTML = "Delete"

  node.appendChild(check_box)
  node.appendChild(txt_box)
  node.appendChild(del_button)
  list.appendChild(node)

  updateCounts()
  counter+=1
}

// function that updates total items and unchecked items.
function updateCounts()
{
  var all_cks = document.querySelectorAll('input[type="checkbox"]').length
  var chk = document.querySelectorAll('input[type="checkbox"]:checked').length
  var unchk = all_cks - chk
  itemCountSpan.textContent = all_cks
  uncheckedCountSpan.textContent = unchk
}

// function to delete/remove the entire li item

function deleteTodo(li_id)
{
  var li = document.getElementById(li_id)
  li.parentNode.removeChild(li)

  updateCounts()
}

