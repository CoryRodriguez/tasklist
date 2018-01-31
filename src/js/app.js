// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
   // DOM load event
   document.addEventListener('DOMContentLoaded', getTasks);

   //add task event
   form.addEventListener('submit', addTask);

   //REMOVE TASK EVENT
   taskList.addEventListener('click', removeTask);

   //CLEAR ALL TASKS
   clearBtn.addEventListener('click', clearTasks);

   //FILTER TASKS EVENT
   filter.addEventListener('keyup', filterTasks);
};

   //Get tasks from LS
   function getTasks() {
      let tasks;
      if (localStorage.getItem('tasks') === null) {
         tasks = [];
      } else {
         tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach(function(task) {
         // CREATE DIV ELEMENT
         const div = document.createElement('div');
         // ADD CLASS
         div.className = 'input-group';

         //add div?
         const div2 = document.createElement('div');
         //add class
         div2.className = 'form-control'
         //append
         div.appendChild(div2);

         // CREATE TEXT NODE AND APPEND TO div2
         div2.appendChild(document.createTextNode(task));
         // CREATE NEW LINK

         //new div
         const div3 = document.createElement('div');
         //div class
         div3.className = 'input-group-append';
         //append to div2
         div.appendChild(div3);

         //create 'a' tag
         const link = document.createElement('a');
         // ADD CLASS
         link.className = 'input-group-text fa fa-remove';
         // ADD ATTRIBUTE
         link.setAttribute("href", "#");
         // ADD ICON HTML
         //link.innerHTML = '<span class="input-group-text fa fa-remove" id=""></span>';
         // APPEND THE LINK TO div3
         div3.appendChild(link);

         //APPEND div TO UL
         taskList.appendChild(div);
      });
   };

// ADD TASK
function addTask(e){
   if(taskInput.value === ''){
      alert('Add a task');
      removeTask();
   }

   // CREATE DIV ELEMENT
   const div = document.createElement('div');
   // ADD CLASS
   div.className = 'input-group';

   //add div?
   const div2 = document.createElement('div');
   //add class
   div2.className = 'form-control'
   //append
   div.appendChild(div2);
   
   // CREATE TEXT NODE AND APPEND TO div2
   div2.appendChild(document.createTextNode(taskInput.value));
   // CREATE NEW LINK

   //new div
   const div3 = document.createElement('div');
   //div class
   div3.className = 'input-group-append';
   //append to div2
   div.appendChild(div3);

   //create 'a' tag
   const link = document.createElement('a');
   // ADD CLASS
   link.className = 'input-group-text fa fa-remove';
   // ADD ATTRIBUTE
   link.setAttribute("href", "#");
   // ADD ICON HTML
   //link.innerHTML = '<span class="input-group-text fa fa-remove" id=""></span>';
   // APPEND THE LINK TO div3
   div3.appendChild(link);

   //APPEND div TO UL
   taskList.appendChild(div);

   //Store in LocalStorage
   storeTaskInLocalStorage(taskInput.value);

   //CLEAR INPUT
   taskInput.value = '';

   e.preventDefault();
};

// Store Task
function storeTaskInLocalStorage(task){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.push(task);

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e){
   if(e.target.parentElement.classList.contains('input-group-append')){
      e.target.parentElement.parentElement.remove();
   }
   //REMOVE FROM LS
   removeTaskFromLocalStorage(e.target.parentElement.parentElement);

   //e.target.parentElement.parentElement.parentElement.remove();
}

//REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
   let tasks;
   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function (task, index) {
      if(taskItem.textContent === task){
         tasks.splice(index, 1);
      }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR TASKS
function clearTasks(){
   // taskList.innerHTML = '';
   
   //Faster
   if(confirm('Are you sure?')){
      while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
      } 
   }

   //Clear from LS
   clearTasksFromLocalStorage();
}

//CLEAR TASKS FROM LOCAL STORAGE
function clearTasksFromLocalStorage() {
   localStorage.clear();
}

//FILTER TASKS
function filterTasks(e){
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.input-group').forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
         task.style.display = 'flex';
      } else {
         task.style.display = 'none';
      }
   });
}
