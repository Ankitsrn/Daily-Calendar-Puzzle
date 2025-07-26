
# Daily Calendar Puzzle

A logic/polyomino puzzle based on the classic calendar challenge, playable with any date combination!

## 🧩 What is the Daily Calendar Puzzle?

This puzzle is inspired by the physical "A-Puzzle-A-Day" calendar puzzle. The game features a special 8x7 board showing months, dates, and weekdays. Each day, you choose a date (month, day, and weekday) to mark as "uncovered." Your challenge: fit all 10 unique polyomino pieces to completely cover every other space on the board.

**Every date produces a different, often tricky, puzzle!**

## 🎮 How to Play

1. Choose a date:
    - Select a Month (Jan–Dec)
    - Select a Date (1–31)
    - Select a Weekday (Sun–Sat)
2. The selected month, date, and weekday are blocked ("uncovered")
3. Drag and fit the provided 10 polyomino tiles onto the board
4. Tiles can be rotated and flipped (depending on digital/physical implementation)
5. You win if all remaining spaces are covered with no overlaps or gaps

## 🔥 Features

- Real calendar mapping—always a unique challenge for any date!
- Uses 10 distinct polyomino shapes
- Fast instant checker (looks up pre-stored solutions)
- Works offline
- Perfect for daily brain exercise and family puzzles

## 🛠️ Usage

### Python Solver (Terminal)

1. Save this repo and make sure `paste.txt` (with all 366×7 solutions) is in the repo folder.
2. Run:

    ```bash
    python sol.py
    ```

3. Enter:
    - Date (`1`–`31`)
    - Month (`1`–`12`; Jan=1 … Dec=12)
    - Weekday (`1`–`7`; Sun=1 … Sat=7)

4. The solution grid will display in your terminal:
    - Numbers (`0`–`9`) show tile placement
    - X marks blocked/uncovered (edges + selected date)

### Example Output

```
Solution for: 8/4 [5]:
(Apr 8, Thu)
-------------------------
0 0 0 X 1 1 X
2 2 0 0 4 1 X
2 2 3 3 4 1 1
X 2 3 4 4 5 5
7 6 3 3 5 5 9
7 6 6 6 6 8 9
7 7 7 8 8 8 9
X X X X X 8 9
```

## 📦 Requirements

- Python 3.x
- The file `paste.txt` containing all precomputed solutions

## ✨ How This Works

- The solver doesn't compute solutions; it looks them up from a full archive for instant speed and max reliability.

## 📝 License

Feel free to adapt, share, and remix for non-commercial or hobby use!
