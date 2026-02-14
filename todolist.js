// declare lists
const finishedList = [];
const unfinishedList = [];

// declare existing html elements
const unfinished = document.getElementById('unfinished');
const finished = document.getElementById('finished');
const goal = document.getElementById('goal');
const button = document.getElementById('button');

const refresh = () => {
    // clear the previous list contents to prevent duplicates
    unfinished.innerHTML = '<p>unfinished:</p>';
    finished.innerHTML = '<p>finished:</p>';

    // iterate through each array member
    for (let i = 0; i < unfinishedList.length; i++)
    {
        // create parent element which will hold text and button, apply styles
        const parent = document.createElement('div');
        parent.className = 'item';

        // create a 'p' element and assign it its corresponding text
        const p = document.createElement('p');
        p.textContent = `${i}. ${unfinishedList[i]}`;        
        
        // create a button which moves item into the 'finished' list
        const moveButton = document.createElement('button');
        moveButton.id = `${i}`;
        moveButton.className = 'remove-button'
        moveButton.textContent = 'done';
        moveButton.onclick = () => {
            addToFinished(i);
            refresh();
        };

        // append the text and button to the parent
        parent.append(p, moveButton);        

        // append parent to 'unfinished' list
        unfinished.appendChild(parent);
    }

    // iterate through each array member again, but this time for 'finished list'
    for (let i = 0; i < finishedList.length; i++)
    {
        // create a parent element which will hold text and button, apply styles
        const parent = document.createElement('div');
        parent.className = 'item';

        // create a 'p' element and assign it its corresponding text
        const p = document.createElement('p');
        p.textContent = finishedList[i];
        
        // create a button which removes item from the 'finished' list
        // and add corresponding styling to it
        const removeButton = document.createElement('button');
        removeButton.id = `${i}`;
        removeButton.className = 'remove-button'
        removeButton.textContent = 'remove';
        removeButton.onclick = () => {
            removeTask(i);
            refresh();
        };

        // append the text and button to the parent
        parent.append(p, removeButton);

        // append parent to 'unfinished' list
        finished.appendChild(parent);
    }
}

const addToUnfinished = () => {
    // check if the 'goal' isn't already in 'unfinished list'
    // and if the 'goal' isn't empty
    if (!unfinishedList.includes(goal.value) && goal.value !== "") {
        // add 'goal' into 'unfinished' list
        unfinishedList.push(goal.value);
        saveTasks();
    }
    refresh();
};

// move task to the finished list
const addToFinished = (index) => {
    const item = unfinishedList[index];
    if (item) {
        // add task to finished list
        finishedList.push(item);
        // remove task from unfinished list
        unfinishedList.splice(index, 1);
        // save tasks into localStorage
        saveTasks();
    }
}

// removes item from finished list.
const removeTask = (index) => {
    finishedList.splice(index, 1);
    saveTasks();
}

// saves both finished and unfinished tasks to local storage
const saveTasks = () => {
    localStorage.setItem('unfinished_tasks', JSON.stringify(unfinishedList));
    localStorage.setItem('finished_tasks', JSON.stringify(finishedList));
}

// loads finished and unfinished tasks from local storage, if there's any to load
const loadTasks = () => {
    const savedUnfinished = localStorage.getItem('unfinished_tasks');
    const savedFinished = localStorage.getItem('finished_tasks');
    if (savedUnfinished) {
        const unfinishedTasks = JSON.parse(savedUnfinished);
        for (let i = 0; i < unfinishedTasks.length; i++) {
            unfinishedList.push(unfinishedTasks[i]);
        }
    }   
    if (savedFinished) {
        const finishedTasks = JSON.parse(savedFinished);
        for (let i = 0; i < finishedTasks.length; i++) {
            finishedList.push(finishedTasks[i]);
        }
    }   
}

// add a 'click' event listener for 
// button, when 'button' is clicked, it will add 
// goal to the unfinished list and refresh. 
button.addEventListener('click', (e) => {
    addToUnfinished();
    goal.value = ''; // clear input
});

// load stored tasks and refresh lists upon website load
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    refresh();
});
