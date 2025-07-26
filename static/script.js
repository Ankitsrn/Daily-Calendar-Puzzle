// Drag and drop logic for tiles
const paletteItems = document.querySelectorAll('.tile-palette-item');
const board = document.getElementById('puzzleBoard');
let draggedTile = null;

paletteItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        draggedTile = item.getAttribute('data-tile');
        e.dataTransfer.setData('text/plain', draggedTile);
    });
});

if (board) {
    board.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            const tile = e.dataTransfer.getData('text/plain');
            cell.classList.add('tile');
            // Only set text if cell is not highlighted
            if (!cell.classList.contains('highlight')) {
                cell.textContent = tile;
            }
        });
    });
}

// Modal logic for initialization
window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('initModal');
    const form = document.getElementById('initForm');
    if (modal && form) {
        modal.style.display = 'block';
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const day = document.getElementById('initDay').value;
            const month = document.getElementById('initMonth').value;
            const weekday = document.getElementById('initWeekday').value;
            modal.style.display = 'none';
            highlightBoard(day, month, weekday);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('solveForm');
    const resultDiv = document.getElementById('result');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const day = document.getElementById('day').value;
            const month = document.getElementById('month').value;
            const weekday = document.getElementById('weekday').value;
            fetch('/solve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ day, month, weekday })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let colors = [
                        '#e57373', '#f06292', '#ba68c8', '#64b5f6', '#4dd0e1',
                        '#81c784', '#ffd54f', '#ffb74d', '#a1887f', '#90caf9'
                    ];
                    let html = '<h2>Solution:</h2>';
                    html += '<table class="solution-table">';
                    const day = document.getElementById('day').value;
                    const monthIdx = parseInt(document.getElementById('month').value);
                    const weekdayIdx = parseInt(document.getElementById('weekday').value);
                    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                    const BOARD_LAYOUT = [
                        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'X'],
                        ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'X'],
                        ['01', '02', '03', '04', '05', '06', '07'],
                        ['08', '09', '10', '11', '12', '13', '14'],
                        ['15', '16', '17', '18', '19', '20', '21'],
                        ['22', '23', '24', '25', '26', '27', '28'],
                        ['29', '30', '31', 'Sun', 'Mon', 'Tue', 'Wed'],
                        ['X', 'X', 'X', 'X', 'Thu', 'Fri', 'Sat']
                    ];
                    data.grid.forEach((row, rIdx) => {
                        html += '<tr>';
                        row.forEach((cell, cIdx) => {
                            let label = '';
                            let isChosen = false;
                            // Only render the chosen day, month, or weekday as a black cell with label
                            if (cell === 'X') {
                                // For day, match with leading zero
                                let dayLabel = day.padStart(2, '0');
                                if (BOARD_LAYOUT[rIdx][cIdx] === dayLabel) { label = day; isChosen = true; }
                                else if (BOARD_LAYOUT[rIdx][cIdx] === monthNames[monthIdx-1]) { label = monthNames[monthIdx-1]; isChosen = true; }
                                else if (BOARD_LAYOUT[rIdx][cIdx] === weekdayNames[weekdayIdx-1]) { label = weekdayNames[weekdayIdx-1]; isChosen = true; }
                                if (isChosen) {
                                    html += `<td class="block-x">${label}</td>`;
                                } else {
                                    html += `<td class="block-x" style="background:transparent;border:none;"></td>`;
                                }
                            } else if (!isNaN(cell) && cell >= '0' && cell <= '9') {
                                html += `<td style='background:${colors[parseInt(cell)]};'></td>`;
                            } else {
                                html += `<td></td>`;
                            }
                        });
                        html += '</tr>';
                    });
                    html += '</table>';
                    resultDiv.innerHTML = html;
                } else {
                    resultDiv.innerHTML = `<div class='error'>${data.error}</div>`;
                }
            })
            .catch(err => {
                resultDiv.innerHTML = `<div class='error'>${err}</div>`;
            });
        });
    }
});

function highlightBoard(day, month, weekday) {
    if (!board) return;
    // Remove previous highlights
    board.querySelectorAll('td').forEach(cell => {
        cell.classList.remove('highlight');
    });
    // Highlight month
    const monthNames = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    const monthText = monthNames[parseInt(month)-1];
    board.querySelectorAll('td').forEach(cell => {
        if (cell.textContent.trim().toLowerCase() === monthText) {
            cell.classList.add('highlight');
        }
    });
    // Highlight day
    board.querySelectorAll('td').forEach(cell => {
        if (cell.textContent.trim() === day) {
            cell.classList.add('highlight');
        }
    });
    // Highlight weekday
    const weekdayMap = {
        'Sunday': 'sun',
        'Monday': 'mon',
        'Tuesday': 'tue',
        'Wednesday': 'wed',
        'Thursday': 'thur',
        'Friday': 'fri',
        'Saturday': 'sat'
    };
    const weekdayText = weekdayMap[weekday];
    board.querySelectorAll('td').forEach(cell => {
        if (cell.textContent.trim().toLowerCase() === weekdayText) {
            cell.classList.add('highlight');
        }
    });
}

