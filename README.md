# DCS OpenSource Modding Guide

The parent repo for the [DCS OpenSource Modding Guide](https://modding.caffeinesimulations.com/).

Feel free to fork the repo, and make additions, as this is a guide made by the community, for the community.

## Guide Contents
* Lua Functions
* EFM API tips
* Useful tips / references to core ED files (weapons, commands etc)
* ED Blender Exporter Guide

## Turkish Support

Turkish documentation lives under `docs/tr/` and is exposed in the MkDocs navigation under **Türkçe**. When adding a new English guide page, add the matching Turkish page as well and keep DCS API names, Lua symbols, paths, and command constants unchanged.

## Tags

To add tags for unverified sections, add `{: .unverified-section }` for example:

```
### FindNearestPoint {: .unverified-section }
```

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
python -m mkdocs serve --livereload --watch docs
```

---
