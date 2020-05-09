let todoApp = document.querySelector(".todo");
//let todoBox = todo.querySelector(".todo-box");
//let inproBox = todo.querySelector(".inprogres-box");
//let doneBox = todo.querySelector(".done-box");

let x = null;
let y = null;
let x1 = null;
let y1 = null;
let currentX;
let currentY;
let grandParent = null;
let target = null;
todoApp.addEventListener("mousedown", function(e){
	let clicked = false;
	let item = e.target;

	if (e.target.parentNode.classList.contains("item")) {
		clicked = true;
		target = e.target.parentNode;

		if(target.style.left == 0&& target.style.top == 0){
			x = e.pageX;
			y = e.pageY;
		}
		else{
			x = e.pageX - target.style.left.slice(0,-2);
			y = e.pageY - target.style.top.slice(0,-2);
		}
		grandParent = target.parentNode;
		console.log("x y : "+x +" "+y);

	}
	if(clicked && e.target.parentNode.classList.contains("item")){
		
		target.classList.add("dragstart");
		target.style.width = target.offsetWidth;
		target.style.height = target.offsetHeight;
		//target.style.position = "absolute";
		target.style["z-index"] = 100;	
		//x = target.style.left.slice(0,-2);		
		//y = target.style.top.slice(0,-2);
		console.log(e.pageX + " "+e.pageY);
		
		target.style.left = e.pageX - x + 'px'; //trying to center target div
		target.style.top = e.pageY - y + 'px';
	}
	else{
		return;
	}
});

todoApp.addEventListener("mousemove",function(e){
	if(target === null){
		return;
	}
	let tgtRect = target.getBoundingClientRect();
	target.style.left = e.pageX - x + 'px';
	target.style.top = e.pageY - y + 'px';
	target.ondragstart = function(){
		return false;
	};
});

todoApp.addEventListener("mouseup", function(e){
	if(target !== null){
		let tgtRect = target.getBoundingClientRect();
		///let todoBoxRect = todoBox.getBoundingClientRect();
		//let inproBoxRect = inproBox.getBoundingClientRect();
		//let doneBoxRect = doneBox.getBoundingClientRect();
		target.style["z-index"] = 0;
		//target.style.position = "relative";
		target = null;

	}
});




