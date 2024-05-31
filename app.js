const todoContainer = document.getElementById("task-container");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");

class Task {
	constructor(item, id) {
		this._item = item;
		this._id = id;
		this.itemLocal();
		this.display();
	}

	get item() {
		return this._item.trim("");
	}

	itemLocal() {
		localStorage.setItem(this._id, JSON.stringify(this.item));
	}

	display() {
		const div = document.createElement("div");
		div.classList.add("task");
		div.id = this._id;

		div.innerHTML = `<p class="task-item">${this.item}</p>
      <button id="task-delete" class="delete-btn">X</button>`;

		todoContainer.appendChild(div);
	}
}

class DeleteTask {
	constructor(item) {
		this._item = item;
		this.cancel();
	}

	cancel() {

    const itemId = this._item.parentElement.id

    localStorage.removeItem(itemId)


    this._item.parentElement.remove()
	}
}

function userTask() {
	const taskValue = userInput.value;

	const id = Math.floor(Math.random() * 9999999999);

	if (taskValue) {
		new Task(taskValue, id);
		userInput.value = "";
	} else {
		alert("enter a task please");
	}
}

function taskRemoval (e) {
  const rem =  e.target

  if (rem.classList.contains("delete-btn")) {
    new DeleteTask(rem)
  } else {
    return
  }

}

function init() {
	submitBtn.addEventListener("click", (e) => {
		e.preventDefault();
		userTask();
	});

	todoContainer.addEventListener("click", taskRemoval);
}

init();