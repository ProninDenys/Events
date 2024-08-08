document.addEventListener('DOMContentLoaded', function() {
    var textContainer = document.getElementById('textContainer');
    var textEditor = document.getElementById('textEditor');

    document.addEventListener('keydown', function(event) {
        // ⌘ + E to edit
        if (event.metaKey && event.key === 'e') {
            event.preventDefault(); // Prevent default behavior
            textEditor.value = textContainer.innerHTML;
            textContainer.style.display = 'none';
            textEditor.style.display = 'block';
            textEditor.focus();
        }

        // ⌘ + S to save
        if (event.metaKey && event.key === 's') {
            event.preventDefault(); // Prevent default behavior
            textContainer.innerHTML = textEditor.value;
            textContainer.style.display = 'block';
            textEditor.style.display = 'none';
        }
    });

    // Resizable text block
    var resizer = document.querySelector('.resizer');
    var resizable = document.querySelector('.resizable');

    resizer.addEventListener('mousedown', initResize);

    function initResize(e) {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    }

    function resize(e) {
        resizable.style.width = (e.clientX - resizable.offsetLeft) + 'px';
        resizable.style.height = (e.clientY - resizable.offsetTop) + 'px';
    }

    function stopResize(e) {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
    }
});

function sortTable(columnIndex) {
    var table = document.getElementById("sortableTable");
    var rows = Array.from(table.rows).slice(1);
    var isNumeric = !isNaN(rows[0].cells[columnIndex].innerText);
    var ascending = table.getAttribute("data-sort-asc") === "true";

    rows.sort(function (a, b) {
        var aText = a.cells[columnIndex].innerText;
        var bText = b.cells[columnIndex].innerText;

        if (isNumeric) {
            return ascending ? aText - bText : bText - aText;
        } else {
            return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        }
    });

    table.tBodies[0].append(...rows);
    table.setAttribute("data-sort-asc", !ascending);
}
