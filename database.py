import sqlite3

def init_db():
    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    # Create users table (NO free trials)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
    """)

    # Optional sample user (remove in production if you want)
    cursor.execute("""
    INSERT OR IGNORE INTO users (username, password)
    VALUES (?, ?)
    """, ("claver", "password123"))

    connection.commit()
    connection.close()

    print("Database initialized successfully")


if __name__ == "__main__":
    init_db()