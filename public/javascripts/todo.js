let modal_btn = document.body.querySelector(".todo");
let modal = document.body.querySelector(".modal");
let modal_close_btn = document.body.querySelector(".modal-content .close");
let modal_save_btn = document.body.querySelector(".modal-btn .save-button")
let modal_cancel_btn = document.body.querySelector(".modal-btn .cancel-button")
let textField = document.body.querySelector(".modal-content .modal-text")
let todoItems = document.body.querySelector(".todo-box .todo-items").querySelector("ul");
let inprogresItems = document.body.querySelector(".inprogres-box .todo-items").querySelector("ul");
let doneItems =document.body.querySelector(".done-box .todo-items").querySelector("ul");


let todos = [];
let inprogres = [];
let done = [];

modal_btn.addEventListener('click', function(e){
	//console.log(e.target.className);
	if(e.target.className != "add button") // use tagName = "BUTTON" in capital letter
		return;
	modal.style.display = "block";
	//console.log(e.target.dataset.app);
	textField.value = "";
	modal_save_btn.setAttribute("data-task", e.target.dataset.app);
});

modal_btn.addEventListener('click', function(e){
	//console.log(e.target.parentNode);
	//console.log(e.target.parentElement)
	if(e.target.className != 'remove button')
		return;
	let key = e.target.dataset.key;
	localStorage.removeItem(key);
	e.target.parentNode.remove();
})
modal_close_btn.addEventListener('click', () =>{
	modal.style.display = "none";
});

modal_cancel_btn.addEventListener('click', ()=>{
	modal.style.display = "none";
});

function Task(id, value, app){
	this.id = app+id;
	this.value = value;
	this.app = app;
}

function createItem(task){
	let div = document.createElement("li");
	div.classList.add("item")
	let ptag = document.createElement("p");
	let ptext = document.createTextNode(task.value);
	ptag.appendChild(ptext);
	let button = document.createElement("button");
	let buttonText = document.createTextNode("-");
	button.classList.add("remove")
	button.classList.add("button")
	button.setAttribute("data-key", task.id);
	button.appendChild(buttonText);
	div.append(ptag,button);
	//console.log("create Item :" +task.app.substr(0,4));
	if(task.app.substr(0,4) == "todo")
		todoItems.appendChild(div);
	if(task.app.substr(0,4) == "inpr"){
		inprogresItems.appendChild(div);
	}
	if(task.app.substr(0,4) == "done"){
		doneItems.appendChild(div);
	}
}
function saveItem(task){
	//console.log(task);
	let stringify = JSON.stringify(task);
	localStorage.setItem(task.id, stringify);
}
function getItems(){
	 for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if(key != null){
            	var item = localStorage.getItem(key);
            	//console.log(key.substr(0,4));
            	if(key.substr(0,4) == "todo"){
		            let Item = JSON.parse(item);
		            todos.push(Item)
		        }
		        if(key.substr(0,4) == "inpr"){
		            let Item = JSON.parse(item);
		            inprogres.push(Item);
		        }
		        if(key.substr(0,4) == "done"){
		            let Item = JSON.parse(item);
		            done.push(Item)
		        }
           }
       }
       //console.log(todos);
      // console.log(inprogres);
       //console.log(done);
       todos.forEach(createItem);
       inprogres.forEach(createItem);
       done.forEach(createItem);
}
modal_save_btn.addEventListener('click', () => {
		//console.log(textField.value);
		let text = textField.value;
		let id = localStorage.length;
		let app = modal_save_btn.dataset.task;
		//console.log("modal app : " + app); 
		let task = new Task(id,text,app);
		if(task.value != ""){
			createItem(task,app.substr(0,4));
			saveItem(task);
			modal.style.display = "none"
		}
		else{
			textField.style.border = "2px solid red";
		}
})
window.onclick = function(e){
	if(e.target == modal){
		modal.style.display = "none";
	}
}
window.onload = getItems;
