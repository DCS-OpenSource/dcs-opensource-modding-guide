# DCS OpenSource Modding Guide

The parent repo for the [DCS OpenSource Modding Guide](https://modding.caffeinesimulations.com/).

Feel free to fork the repo, and make additions, as this is a guide made by the community, for the community.

## Guide Contents
* Lua Functions
* EFM API tips
* Useful tips / references to core ED files (weapons, commands etc)
* ED Blender Exporter Guide

---

## Building the docs

### Creating your live edit Environment

#### create a Virtual Environment

```bash
python -m venv .venv
```

#### Activate the Virtual Environment
```bash
# Powershell
.venv\Scripts\Activate.ps1
```
```bash
# CMD
.venv\Scripts\activate.bat
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```
#### Run the docs
```bash
python -m mkdocs serve
```

---
