

// sidebar opensclose//

document.getElementById('sidebar-open-close').addEventListener('click', function (el) {

    el.preventDefault();
    var hamburger = document.getElementById('sidebar-open-close');
    var sideClass = document.getElementById('sidebar').classList;
    var innerColor = document.getElementById('hamburger-inner');
    if (sideClass.contains('sidebar-close')) {
        sideClass.remove('sidebar-close');
        sideClass.add('sidebar-open');
        innerColor.style.backgroundColor = "#f50057";
        hamburger.classList.toggle('is-active');
    }
    else if (sideClass.contains('sidebar-open')) {
        sideClass.remove('sidebar-open');
        sideClass.add('sidebar-close');
        innerColor.style.backgroundColor = "#fff";
        hamburger.classList.toggle('is-active');


    }
});
document.getElementById('sidebar').addEventListener('click', function () {
    var hamburger = document.getElementById('sidebar-open-close');
    var sideClass = document.getElementById('sidebar').classList;
    var innerColor = document.getElementById('hamburger-inner');
    if (sideClass.contains('sidebar-open')) {
        sideClass.remove('sidebar-open');
        sideClass.add('sidebar-close');
        innerColor.style.backgroundColor = "#fff";
        hamburger.classList.toggle('is-active');

    }
});
// sidebar opensclose//


//toggle view//
document.getElementById('showActive').addEventListener('click', function () {
    for (var classActive = document.getElementsByClassName('todo-item-completed'),
             j = 0, lj = classActive.length; j < lj; j++) classActive [j].style.display = 'none';
    for (var classCompl = document.getElementsByClassName('todo-item-active'),
             i = 0, li = classCompl.length; i < li; i++) classCompl [i].style.display = 'block';

});

document.getElementById('showCompleted').addEventListener('click', function () {
    for (var classActive = document.getElementsByClassName('todo-item-completed'),
             j = 0, lj = classActive.length; j < lj; j++) classActive [j].style.display = 'block';
    for (var classCompl = document.getElementsByClassName('todo-item-active'),
             i = 0, li = classCompl.length; i < li; i++) classCompl [i].style.display = 'none';
});

document.getElementById('showAll').addEventListener('click', function () {
    for (var classActive = document.getElementsByClassName('todo-item-completed'),
             j = 0, lj = classActive.length; j < lj; j++) classActive [j].style.display = 'block';
    for (var classCompl = document.getElementsByClassName('todo-item-active'),
             i = 0, li = classCompl.length; i < li; i++) classCompl [i].style.display = 'block';
});

document.getElementById('clearAll').addEventListener('click', function () {
    var container = document.getElementById('items-all');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

});
//toggle view//


// create new //
function createNew() {
    document.getElementById('new-item-input').style.display = 'block';
    document.getElementById('items-all').style.display = 'none';
    document.getElementById('createNew').style.display = 'none';
}

function closeCreateNew() {
    document.getElementById('new-item-input').style.display = 'none';
    document.getElementById('items-all').style.display = 'block';
    document.getElementById('createNew').style.display = 'inline-block';
}


function addValues() {
    var titleNew = document.getElementById('titleNew').value;
    var contentNew = document.getElementById('contentNew').value;

    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    var thisItemDate = new Date(2014, 0, 30);

    var template = '<div class="todo-item todo-item-active">' +
        '<div class="todo-item-title">' + titleNew + '</div>' +
        '<div class="todo-item-text">' + contentNew + '</div>' +
        '<div class="actions-time">' +
        '<div class="time">' + formatDate(thisItemDate) + '</div>' +
        '<ul  class="done-remove-btn">' +
        '<li  id = "complet-btn" onclick="moveToCompleted(this)"><i class="material-icons">&#xE876;</i></li>' +
        '<li  id = "delete-btn" onclick="removeItem(this)"><i class="material-icons">&#xE15B;</i></li>' +
        '</ul>' +
        '</div>';
    if (contentNew !== '') {
        document.getElementById('items-all').innerHTML += template;
        document.getElementById('titleNew').value = '';
        document.getElementById('contentNew').value = '';
        document.getElementById('new-item-input').style.display = 'none';
        document.getElementById('items-all').style.display = 'block';
        document.getElementById('createNew').style.display = 'inline-block';
    }
    else {
        alert("Please enter an TODO content to continue.")
    }

}

//
// document.getElementById('add').addEventListener('click', addValues);
// document.getElementById('new-item-input').addEventListener('keydown', function () {
//     if(event.keyCode === 13){
//         addValues()
//     }
// });




// create new //


//remove item//
function removeItem(param) {
    param.parentNode.parentNode.parentNode.remove()
}

//remove item//


//move to complite //

function moveToCompleted(param) {
    param.parentNode.parentNode.parentNode.classList.remove('todo-item-active');
    param.parentNode.parentNode.parentNode.classList.add('todo-item-completed');
}

//move to complite //




