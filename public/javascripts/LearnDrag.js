let parent = document.body.querySelector(".draggable");
let child1= document.body.querySelector(".drag-parent .item1");
let child2 = document.body.querySelector(".drag-parent .item2");

var x, y, target = null;

parent.addEventListener('mousedown', function(e) {
  var clickedDragger = false;
  if(e.target.classList.contains('dragger')){
  	console.log(e.target);
  	target = e.target.parentNode;
  	console.log(target.style.left + " " +target.style.top);
  	console.log(target.getBoundingClientRect().left+" "+target.getBoundingClientRect().top);
  	  x = e.clientX - target.style.left.slice(0, -2);
      y = e.clientY - target.style.top.slice(0, -2);
  }
  /*for(var i = 0; e.path[i] !== document.body; i++) {
    if (e.path[i].classList.contains('dragger')) {
      clickedDragger = true;
    }
    else if (clickedDragger && e.path[i].classList.contains('draggable')) {
      target = e.path[i];
      target.classList.add('dragging');
      x = e.clientX - target.style.left.slice(0, -2);
      y = e.clientY - target.style.top.slice(0, -2);
      return;
    }
  }*/
});

parent.addEventListener('mouseup', function() {
  if (target !== null) target.classList.remove('dragging');
  target = null;
});

parent.addEventListener('mousemove', function(e) {
  if (target === null) return;
  target.style.left = e.clientX - x + 'px';
  target.style.top = e.clientY - y + 'px';
  var pRect = target.parentElement.getBoundingClientRect();
  var tgtRect = target.getBoundingClientRect();

  if (tgtRect.left < pRect.left) target.style.left = 0;
  if (tgtRect.top < pRect.top) target.style.top = 0;
  if (tgtRect.right > pRect.right) target.style.left = pRect.width - tgtRect.width + 'px';
  if (tgtRect.bottom > pRect.bottom) target.style.top = pRect.height - tgtRect.height + 'px';
});
