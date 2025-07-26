from flask import Flask, request, render_template, jsonify
import sol

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    data = request.get_json()
    day = int(data['day'])
    month = int(data['month'])
    weekday = int(data['weekday'])
    try:
        all_solutions = sol.load_all_solutions(sol.PASTE_FILE)
        key = (day, month, weekday)
        grid = all_solutions.get(key)
        if grid:
            return jsonify({'success': True, 'grid': grid})
        else:
            return jsonify({'success': False, 'error': 'No solution recorded for this date.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
