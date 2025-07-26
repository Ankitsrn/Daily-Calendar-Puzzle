import re
from pathlib import Path
from typing import Dict, List, Tuple

PASTE_FILE = Path("paste.txt")
GRID_ROWS  = 8
GRID_COLS  = 7
HEADER_RE  = re.compile(r"Solution for:\s*(\d{1,2})/(\d{1,2})\s*\[(\d)\]:")

# Updated to 1-based indexing with empty slot at index 0
MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
WEEKDAY_NAMES = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

def load_all_solutions(path: Path) -> Dict[Tuple[int,int,int], List[List[str]]]:
    """
    Parse the whole paste.txt once and build a dictionary:
        key   = (day, month, weekday)
        value = 8×7 list of strings (each '0'-'9' or 'X')
    """
    raw = path.read_text().splitlines()
    sol: Dict[Tuple[int,int,int], List[List[str]]] = {}
    i = 0
    while i < len(raw):
        m = HEADER_RE.match(raw[i])
        if m:
            d, mth, wd = map(int, m.groups())          # day / month / weekday
            grid_lines = [raw[i + j + 1].split() for j in range(GRID_ROWS)]
            if any(len(row) != GRID_COLS for row in grid_lines):
                raise ValueError(f"Bad grid at line {i+1}")
            sol[(d, mth, wd)] = grid_lines
            i += GRID_ROWS + 1
        else:
            i += 1
    return sol

def pretty_print(grid: List[List[str]], day: int, month: int, weekday: int) -> None:
    print(f"\nSolution for: {day}/{month} [{weekday}]:")
    print(f"({MONTH_NAMES[month]} {day}, {WEEKDAY_NAMES[weekday]})")
    print("-" * 25)
    for r in grid:
        print(" ".join(r))

def get_user_input():
    """Get date, month, and weekday input from user with validation"""
    
    print("=" * 50)
    print("    DAILY CALENDAR PUZZLE SOLVER")
    print("=" * 50)
    print()
    
    # Get date input
    while True:
        try:
            day = int(input("Enter the date (1-31): "))
            if 1 <= day <= 31:
                break
            else:
                print("❌ Invalid date! Please enter a number between 1 and 31.")
        except ValueError:
            print("❌ Invalid input! Please enter a number.")
    
    # Show month options and get input
    print("\nMonth options:")
    print("1=Jan  2=Feb  3=Mar  4=Apr  5=May  6=Jun")
    print("7=Jul  8=Aug  9=Sep  10=Oct 11=Nov 12=Dec")
    
    while True:
        try:
            month = int(input("Enter the month (1-12): "))
            if 1 <= month <= 12:
                break
            else:
                print("❌ Invalid month! Please enter a number between 1 and 12.")
        except ValueError:
            print("❌ Invalid input! Please enter a number.")
    
    # Show weekday options and get input
    print("\nWeekday options:")
    print("1=Sun  2=Mon  3=Tue  4=Wed  5=Thu  6=Fri  7=Sat")
    
    while True:
        try:
            weekday = int(input("Enter the weekday (1-7): "))
            if 1 <= weekday <= 7:
                break
            else:
                print("❌ Invalid weekday! Please enter a number between 1 and 7.")
        except ValueError:
            print("❌ Invalid input! Please enter a number.")
    
    return day, month, weekday

def main():
    """Main function that gets user input and finds the solution"""
    try:
        # Load all solutions once
        print("Loading puzzle solutions...")
        all_solutions = load_all_solutions(PASTE_FILE)
        print(f"✅ Loaded {len(all_solutions)} solutions from {PASTE_FILE}")
        
        while True:
            # Get user input
            day, month, weekday = get_user_input()
            
            # Display what the user selected
            print(f"\n🗓️  You selected: {MONTH_NAMES[month]} {day}, {WEEKDAY_NAMES[weekday]}")
            
            # Look up the solution
            key = (day, month, weekday)
            try:
                pretty_print(all_solutions[key], day, month, weekday)
            except KeyError:
                print(f"\n❌ No solution recorded for {day}/{month} [{weekday}]")
                print(f"   ({MONTH_NAMES[month]} {day}, {WEEKDAY_NAMES[weekday]})")
            
            # Ask if user wants to try another date
            print("\n" + "=" * 50)
            another = input("Would you like to try another date? (y/n): ").lower().strip()
            if another != 'y' and another != 'yes':
                break
        
        print("\n👋 Thank you for using the Daily Calendar Puzzle Solver!")
    
    except FileNotFoundError:
        print(f"❌ Error: Could not find '{PASTE_FILE}' file.")
        print("Please make sure the paste.txt file is in the same directory as this script.")
    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    main()
