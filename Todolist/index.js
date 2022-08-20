const dayLabel= document.getElementById('dayLabel');
const input = document.querySelector('#itnew');
const addTaskButton = document.getElementById('addTaskButton');
const timePicker = document.querySelector('#timePicker');
const form = document.querySelector('#formitnew');
const selectList = document.querySelector('#slist');
const listsContainer = document.querySelector('#lists');
const show ='';
const hide ='display:none';

var dayValue = selectList.selectedIndex;

let todos = [];
let lists = [
    {id: uuid(), text: 'Monday', count: 0},
    {id: uuid(), text: 'Tuesday', count: 0},
    {id: uuid(), text: 'Wednesday', count: 0},
    {id: uuid(), text: 'Thursday', count: 0},
    {id: uuid(), text: 'Friday', count: 0}
];

document.addEventListener('DOMContentLoaded', e =>{
    refreshUI();
    lists.forEach(list => {
        selectList.innerHTML += `<option value="${list.id}" id="${list.text}"> ${list.text}</option>`;
    });
});

function renderLists(){
    lists.forEach(list => {
        list.count = 0;
        
    });

    todos.forEach(todo =>{
        lists.forEach(list =>{
            if(todo.day === list.text){
                list.count++;
            }
        });
    });

    listsContainer.innerHTML = '';
    lists.forEach(list =>{
        listsContainer.innerHTML += renderListItem(list);
    });
}

function renderListItem(list){
    return `
        <div class="list">
            <h3>${list.text}</h3>
            ${list.count} tareas
        </div>
    `;
}

function Todo (id,text,time,day,list,completed){
    return {id:id,text:text,time:time,day:day,list:list,completed:completed};
}

addEventListener('submit',e =>{
    e.preventDefault();
    const text = input.value.trim();
    const time = timePicker.value;
    const listId = selectList.value;
    const toDay = selectList.options[selectList.selectedIndex].id;
    
    if(text ==='') return false;

    const newTodo = new Todo(uuid(), text, time, toDay, listId, false);

    todos.push(newTodo);
    localStorage.setItem('Todos',JSON.stringify(todos));
    input.value = '';
    timePicker.value= '';

    refreshUI();
});

timePicker.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const text = input.value.trim();
        const time = timePicker.value;
        const listId = selectList.value;
        const toDay = selectList.options[selectList.selectedIndex].id;
    
    if(text ==='') return false;

        const newTodo = new Todo(uuid(), text, time, toDay, listId, false);

        todos.push(newTodo);
        localStorage.setItem('Todos',JSON.stringify(todos));
        input.value = '';
        timePicker.value= '';

        refreshUI();
    }
});

addTaskButton.addEventListener('click',e =>{
    e.preventDefault();
    const text = input.value.trim();
    const time = timePicker.value;
    const listId = selectList.value;
    const toDay = selectList.options[selectList.selectedIndex].id;
    
    if(text ==='') return false;

    const newTodo = new Todo(uuid(), text, time, toDay, listId, false);

    todos.push(newTodo);
    localStorage.setItem('Todos',JSON.stringify(todos));
    input.value = '';
    timePicker.value= '';

    refreshUI();
});

function refreshUI(){
    var d=selectList.selectedIndex;

    renderTodos();
    renderLists();

    listFilter('Monday',hide,0);

    if(d=== 0){
        listFilter('Monday',hide,0);
    }if(d=== 1){
        listFilter('Tuesday',hide,1);
    }if(d=== 2){
        listFilter('Wednesday',hide,2);
    }if(d=== 3){
        listFilter('Thursday',hide,3);
    }if(d=== 4){
        listFilter('Friday',hide,4);
    }  
}

function renderTodos(){
    const todosContainer = document.querySelector('#todos');
    todosContainer.innerHTML= '';

    todos.forEach(todo =>{
        todosContainer.innerHTML += renderTodo(todo);
    });

    document.querySelectorAll('.todo label input').forEach(item =>{
        item.addEventListener('click', e =>{
            const id = e.target.parentNode.parentNode.getAttribute('data-id');
            const index = todos.findIndex(todo => todo.id === id)
                
            todos[index].completed = !todos[index].completed;
            localStorage.setItem('Todos',JSON.stringify(todos));
            refreshUI();
           
        });
    });

    document.querySelectorAll('.todo i').forEach(item =>{
        item.addEventListener('click', e =>{
            const id = e.target.parentNode.getAttribute('data-id');
            const obj = getItemAndIndex(todos, {id: id});
                
            todos.splice(obj.index, 1);
            localStorage.setItem('Todos',JSON.stringify(todos));
            refreshUI();
        });
    });
}

function getItemAndIndex(arr,obj){
    let i = 0;
    const key = Object.keys(obj);
    const value= obj[key];

    for(i = 0; i< arr.length; i++ ){
        if(arr[i][key]=== value){
            return {index: i, item: arr[i]};
        }
    }
}

function renderTodo(todo){

    const taskCompleted= todo.completed ? 'checked="checked"': ''
    const line = todo.completed ? '-line-through' : '' 

    return `
           <div class="todo" data-id="${todo.id}" data-day="${todo.day}" style="">
                <label class="checkbox-container${line}">
                    <input type="checkbox" ${(taskCompleted)}" class="checkbox">
                    ${todo.text}  ${todo.time}
                    <span class="checkmark"></span>
                </label>
                <i class="far fa-times-circle"></i>
           </div> 
    `;
}

function listFilter (day,act,arrDay){
    const td = document.getElementsByClassName('todo');
    
    for(i=0;i<td.length;i++){
        if(td[i].attributes[2].value != day){
        td[i].attributes[3].value =act;
        }
        else{ td[i].attributes[3].value =show;
            selectList.selectedIndex = arrDay;
        }};
}

mondayButton.addEventListener('click',()=>{
    listFilter('Monday',hide,0);
});

tuesdayButton.addEventListener('click',()=>{
    listFilter('Tuesday',hide,1);
});

wednesdayButton.addEventListener('click',()=>{
    listFilter('Wednesday',hide,2);
});

thursdayButton.addEventListener('click',()=>{
    listFilter('Thursday',hide,3);
});

fridayButton.addEventListener('click',()=>{
    listFilter('Friday',hide,4);
});

selectList.addEventListener('change',()=>{
    const td = document.getElementsByClassName('todo');
    
    for(i=0;i<td.length;i++){
        if(td[i].attributes[2].value != selectList.options[selectList.selectedIndex].id){
        td[i].attributes[3].value =hide;
        }
        else{ td[i].attributes[3].value =show;
        }};
});

sortButton.addEventListener('click', ()=> {
    const dayValue=selectList.selectedIndex;
    var day=selectList.options[selectList.selectedIndex].id;
    todos.sort((a,b) =>{
        if (a.time < b.time){
            return -1;
        }

        if (a.time > b.time){
            return 1;
        }
        return 0;
    })
    
    refreshUI();
    listFilter (day,hide,dayValue);
});

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

let data = localStorage.getItem('Todos')
  if(data){
      todos = JSON.parse(data);
      console.log(todos);
      id = uuid();
      loadList(todos);
      loadList(lists);
      refreshUI();
  }else {
      todos = []
      id = 0
  }
  
function loadList(array) {
    array.forEach(function(item){
    Todo(item.id,item.text,item.time,item.day,item.list,item.completed);
    });
}
