window.addEventListener('load' , RestoreHandler);
let addBtn = document.querySelector('button');
let taskList = document.querySelector('ul');
let input = document.querySelector('input');
let arr;
if( !localStorage.getItem('myToDoList') ){
    arr = [];
}
else{
    arr = localStorage.getItem('myToDoList').split(',');
    console.log(arr);
}

addBtn.addEventListener('click' , ()=>{
    if(input.value !== '' && input.value !== ' '){
        let text = input.value;
        taskSave(text);
        createTask(text);
        input.value = '';
    }
});
taskList.addEventListener('click' , (event)=>{
    if(event.target.nodeName === 'I'){
        let myElement = event.target.parentElement.parentElement;
        myElement.style = 'display: none';
        arr.splice( arr.indexOf(myElement.textContent) , 1 );
        localStorage.setItem('myToDoList' , arr);
    }
    if(event.target.nodeName === 'LI'){
        event.target.classList.toggle('done');
    }
});

function createTask(text){
    let li = document.createElement('li');
    li.textContent = text;
    li.innerHTML += '<span class="closeBtn"><i class="fa-solid fa-trash-can"></i></span>';
    taskList.appendChild(li);
    return li;
}

function taskSave(myText){
    arr.push(myText);
    localStorage.setItem('myToDoList' , arr);
}
function RestoreHandler(){
    for(let restoreToDo of arr){
        createTask(restoreToDo);
    }
}