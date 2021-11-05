/* index.js
  A simple client script to illustrate CRUD operations to an express server using mongodb
*/
let nextSeqID = 0;

(function renderTasks() {
  const todoForm = document.getElementById('todoForm');
  const taskList = document.getElementById('tasks');

  // READ and render tasks
  fetch('/task/all')
    .then((resp) => resp.json())
    .then((data) => {
      let tasksStr = '';
      data.forEach((task) => {
        tasksStr += `<li class='task' data-id='${task._id}'>
          <input type='checkbox' class='state' ${task.state === 'done' ? 'checked' : ''}>
          </input><span class='descr'>${task.descr}</span>
          <button class='delete'>delete</button></li>`;
        nextSeqID = Math.max(nextSeqID, task._id);
      });
      taskList.innerHTML = tasksStr;
    });

  todoForm.addEventListener('click', (event) => {
    const { target } = event;
    const currID = target.parentNode.dataset.id;

    //  CREATE new TASK
    if (target.matches('#addTask')) {
      const newTaskInput = document.getElementById('newTask');
      const newTask = {
        _id: ++nextSeqID,
        descr: newTaskInput.value,
        state: 'open',
      };
      fetch('/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((res) => {
          newTaskInput.value = '';
          console.log('Success:', res);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      // MODIFY a task by updating its state
    } else if (target.matches('input.state')) {
      const data = {
        state: target.checked ? 'done' : 'open',
      };
      fetch(`/task/${currID}`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log('Success:', res);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      // DELETE a certain task
    } else if (target.matches('button.delete')) {
      fetch(`/task/${currID}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((res) => {
          console.log('Success:', res);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  });
})();
