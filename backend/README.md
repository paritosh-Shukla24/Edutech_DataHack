 # Project Setup and Usage Guide

## Table of Contents
1. [Setting Up the Python Virtual Environment](#1-setting-up-the-python-virtual-environment)
2. [Install Dependencies](#2-install-dependencies)
3. [Running the Flask Application](#3-running-the-flask-application)
4. [Folder Structure](#folder-structure)
5. [Git Commands](#git-commands)
6. [Deactivating the Virtual Environment](#deactivating-the-virtual-environment)
7. [Additional Resources](#additional-resources)

## 1. Setting Up the Python Virtual Environment

Create and activate a virtual environment named `myenv`:

**Windows:**
```bash
python -m venv myenv
myenv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv myenv
source myenv/bin/activate
```

When activated, your prompt will show `(myenv)`.

## 2. Install Dependencies

With the virtual environment active, install required packages:

```bash
pip install -r requirements.txt
```

## 3. Running the Flask Application

Start the Flask app:

```bash
python app.py
```

Access at: `http://127.0.0.1:5000/`

## Folder Structure

```
<repository-folder>/
├── frontend/           # Frontend files (see its README.md)
├── backend/            # New folder for backend components
│   ├── myenv/          # Python virtual environment
│   ├── app.py          # Flask application entry point
│   └── requirements.txt # Python dependencies
└── README.md           # This file

```

## Git Commands

### Clone Repository
```bash
git clone <repository-url>
```

### Check Status
```bash
git status
```

### Stage Changes
```bash
git add <file-name>
# or
git add .
```

### Commit Changes
```bash
git commit -m "Your commit message"
```

### Push Changes
```bash
git push origin <branch-name>
```

### Pull Changes
```bash
git pull origin <branch-name>
```

### Create New Branch
```bash
git checkout -b <new-branch-name>
```

### Switch Branches
```bash
git checkout <branch-name>
```

## Deactivating the Virtual Environment

```bash
deactivate
```

## Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Python Documentation](https://docs.python.org/)
- [Git Documentation](https://git-scm.com/doc)

For questions or assistance, please contact the project maintainer.

