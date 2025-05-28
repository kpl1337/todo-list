// declare lists
let finishedList = [];
let unfinishedList = [];

// declare existing html elements
let unfinished = document.getElementById('unfinished');
let finished = document.getElementById('finished');
let goal = document.getElementById('goal');
let button = document.getElementById('button');

refresh = function() {
    // clear the previous list contents to prevent duplicates
    unfinished.innerHTML = '';
    finished.innerHTML = '';

    // iterate through each array member
    for (let i = 1; i <= unfinishedList.length; i++)
    {
        // create parent element which will hold text and button, apply styles
        const parent = document.createElement('div');
        parent.className = 'item';
        parent.style = 'display: flex; flex-direction: row; justify-content: space-between;'
        parent.style.borderRadius = i == 1 ? '10px 10px 0px 0px' : '0px';

        // create a 'p' element and assign it its corresponding text
        const p = document.createElement('p');
        p.textContent = `${i}. ${unfinishedList[i-1]}`;        
        
        // create a button which moves item into the 'finished' list
        const a = document.createElement('button');
        a.id = `${i}`;
        a.textContent = 'done';
        a.onclick = () => {
            addToFinished(i);
            refresh();
        };

        parent.append(p,a);        
        // append the text and button to the parent

        unfinished.appendChild(parent);
        // append parent to 'unfinished' list
    }

    // iterate through each array member again, but for 'finished list'
    for (let i = 1; i <= finishedList.length; i++)
    {
        // create parent element which will hold text and button, apply styles
        const parent = document.createElement('div');
        parent.className = 'item';
        parent.style = 'display: flex; flex-direction: row; justify-content: space-between;'
        parent.style.borderRadius = i == 1 ? '10px 10px 0px 0px' : '0px';

        // create a 'p' element and assign it its corresponding text
        const p = document.createElement('p');
        p.textContent = finishedList[i-1];
        
        // create a button which moves item into the 'finished' list
        const button = document.createElement('button');
        button.id = `${i}`;
        button.textContent = 'remove';
        button.onclick = () => {
            removeFromFinished(i-1);
            refresh();
        };

        parent.append(p, button);
        // append the text and button to the parent

        finished.appendChild(parent);
        // append parent to 'unfinished' list
    }
}

function addToUnfinished() {
    // check if the 'goal' isn't already in 'unfinished list'
    // and if the 'goal' isn't empty

    if (!unfinishedList.includes(goal.value) && goal.value !== "") {
        // add 'goal' into 'unfinished' list
        unfinishedList.push(goal.value);
    }
};

function addToFinished(index) {
    const item = unfinishedList[index - 1];
    if (item) {
        finishedList.push(item);
        unfinishedList.splice(index - 1, 1);
    }
}

// removes item from finished list.
function removeFromFinished(index) {
    finishedList.splice(index, 1);
}

// add a 'click' event listener for 
// button, when 'button' is clicked, it will add 
// goal to the unfinished list and refresh. 
button.addEventListener('click', (e) => {
    addToUnfinished();
    refresh();
});