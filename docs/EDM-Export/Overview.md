# Eagle Dynamics DCS Blender Export Plugin

## Introduction
This documentation was compiled because the official docs included with the plugin (in the `manual` folder) are outdated, incomplete, and poorly formatted.  
That said, the **template EDM files** provided are still very useful.

!!! note
    **The plugin is still a work in progress, and some features may not function.**

!!! warning
    This guide assumes general Blender knowledge, including familiarity with **materials** and **animation**.

---

## Supported Blender Versions

- Reccomended to use any **Blender `4.x.x LTS`** version
- Blender 3.x support was removed **19/12/25**
- Blender 5.0 is partially supported, work is ongoing (at time of writing 20/12/25)

---

## Installation

Download the Blender plugin from:  
[mods.eagle.ru/blender_plugin/files.html](https://mods.eagle.ru/blender_plugin/files.html){:target="_blank"}

1. Open Blender -> `Edit > Preferences`
2. Install the `.zip` file as an addon

---

## Example Files

The following example files are available for download:

| Example              | Blender File                                                     | Extra Files                                                                  |
|----------------------|------------------------------------------------------------------|------------------------------------------------------------------------------|
| **Cube Example**     | [cube.blend](Blender%20Examples/Blend/cube.blend)                | [Cube.png](Blender%20Examples/EDM/Textures/Cube.png){:download="Cube"}       |
| **Animation Test**   | [animation.blend](Blender%20Examples/Blend/animation.blend)      | —                                                                            |
| **Skin Animation**   | [skin.blend](Blender%20Examples/Blend/skin.blend)                | —                                                                            |

---

## Contributing

If you discover additional details or fixes, feel free to **create a pull request** and contribute your findings.

---

## Plugin Changelog

Release 19.12.2025
* Remove support of Blender 3.

Release 17.12.2025
* Fix bug with fcurves in Blender 5.0

Release 17.12.2025
* Fix bug with fcurves in Blender 5.0

Release 16.12.2025
* Update materials works now for Blender version 5.0.

Release 24.11.2025
* Added ability to set path for EDM Fast Export;
* Check Blender Plugin Version. If it's 5.0 and later - you can't use the plugin.

Release 23.10.2025
* Return hash check of materials;
* Fix reference .blend glass material (default version was 5 while min = 6, max = 6, instance = 6).

Release 03.10.2025
* Remove asterisk from Damage Visibility sockets in Glass and Default material.

Release 02.09.2025
* Added `optimizeVertexCache` checkbox in dev mode
* Check Action name - it should start with integer (argument).

Release 31.08.2025
* Added support of multiple animation of bones through nla-editor

Release 10.11.2024:
* Added support of rgba damage mask.

Release 26.11.2024:
* Fixed bug preventing export of aircraft registration numbers on machines with non english locale.
* Fixed bug in blender plugin: after updating edm materials, the values ​​in the drop-down lists were set to default values. 
* Fixed blender warning: 'WARN (bpy.rna): \intern\bpy_rna.cc:1366 pyrna_enum_to_py: current value '0' matches no enum in '.

20.02.2025
* Added per vertex damage to deck material.

