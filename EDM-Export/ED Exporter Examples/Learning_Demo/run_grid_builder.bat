:: This .bat file runs create_grid_of_models.py. 
:: This script generate .mvs that contains grid of edm_models. 
:: It needs when you have several .blend files and you want to convert it to .emd format and watch it simultaneously.
:: Input:  json file with list of model names.
:: Output: view_all_models.mvs file. (Then you need to open ModelView.exe and load view_all_models.mvs)

set BLENDER_41_EXE="C:\\Program Files\\Blender Foundation\\Blender 4.1\\blender.exe"
set BLENDER_43_EXE="C:\\Program Files\\Blender Foundation\\Blender 4.3\\blender.exe"
set GLOBAL_PATH="e:\\repos\\trunk\\Utils\\EDMTools\\io_scene_edm\\Learning_Demo\\"

echo TEST BLENDER 4.1
python %~dp0create_grid_of_models.py %BLENDER_41_EXE% %GLOBAL_PATH%list_of_models.json %GLOBAL_PATH%view_all_models_41.mvs

echo TEST BLENDER 4.3
python %~dp0create_grid_of_models.py %BLENDER_43_EXE% %GLOBAL_PATH%list_of_models.json %GLOBAL_PATH%view_all_models_43.mvs

pause