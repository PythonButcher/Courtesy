"""
Courtesy Backend – Entrypoint

Run with: python run.py
The server binds to the host and port specified in .env (defaults: 127.0.0.1:5000).
"""

from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(
        host=app.config.get("BACKEND_HOST", "127.0.0.1"),
        port=int(app.config.get("BACKEND_PORT", 5000)),
        debug=app.config.get("DEBUG", True),
    )
