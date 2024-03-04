const form = document.querySelector('form');
const filter = document.querySelector('#filter');
const ulList = document.querySelector('ul');
const clear = document.querySelector('#clear');
const inPut = document.querySelector('#inPut');


form.addEventListener('submit', function(e){
  e.preventDefault();
  let task = inPut.value;
  if(task === ''){
      alert('Enter Task');
  }else{
        addItemToTaskList(task);
        addItemToStorage(task);
        inPut.value = '';
  }
});

function addItemToTaskList(task){
    const list = document.createElement('li');
    list.className = 'list-item mt-3';
    list.appendChild(document.createTextNode(task));
    const btn = document.createElement('button');
    btn.className = 'btn btn-info text-white rightFl';
    btn.innerHTML = `<span class="xmark">x</span>`;
    list.appendChild(btn);
    ulList.appendChild(list);
}

function addItemToStorage(task){
    let tasks = getTasks();
        tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.addEventListener('DOMContentLoaded', function(){
    displayTasks();
});

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
     return tasks;
}

function displayTasks(){
    let tasks = getTasks();
    tasks.forEach(function(task){
        addItemToTaskList(task);
    });
}


ulList.addEventListener('click', removeItem);

function removeItem(e){
    if(e.target.classList.contains('xmark')){
        e.target.parentElement.parentElement.remove();
          removeItemFromStorage(e.target.parentElement.parentElement)
    }
}

function removeItemFromStorage(taskItem){
    let text = taskItem.textContent;
    let tasks = getTasks();
        tasks.forEach(function(task, index){
            if(text.slice(0, text.indexOf('x')) === task){
                tasks.splice(index, 1);
            }
        });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

clear.addEventListener('click', clearItems);

function clearItems(){
    while(ulList.firstChild){
        ulList.removeChild(ulList.firstChild);
    }
    clearTasksFromStorage();
}

function clearTasksFromStorage(){
    localStorage.clear();
}

filter.addEventListener('keyup', filterItems);

function filterItems(e){
    let testItem = e.target.value.toLowerCase();
    const lists = ulList.querySelectorAll('li');
          lists.forEach(function(li){
              if(li.firstChild.textContent.toLowerCase().indexOf(testItem) !== -1){
                  li.style.display = 'block';
              }else{
                  li.style.display = 'none';
              }
          });
}

