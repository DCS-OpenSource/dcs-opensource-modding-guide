# ModelViewer

## Loading Textures
Some Additional configuration is needed to load textures from your custom EDMs.

Navigate to `"C:\Users\{YOUR_USERNAME}\Saved Games\edModelViewerTrunk\"` and open the `autoexec.lua` file, if it doesn't exist, create it.

Copy and paste this lua code into the `autoexec.lua` file.

Then edit line 13 to point to your saved games/DCS install. This could look like:  
`local saved_games_path = "C:/Users/{YOUR_USERNAME}/Saved Games/DCS/"`  
`local saved_games_path = "C:/Users/{YOUR_USERNAME}/Saved Games/DCS.OpenBeta/"`

Leave everything else untouched and you're good to go

```lua
log.set_output('animator-log', 'ANIMATOR', log.ALL, log.MESSAGE)
--autoexecute sample for model viewer
--mount_vfs_liveries_path("Mods/aircrafts/Wunderluft/Liveries")
--mount_vfs_texture_path("Mods/aircrafts/Wunderluft/Textures/base_zip_package")


--LoadModel("Bazar/World/Shapes/A-10.edm")
--LoadLivery("A-10C","184th FS Arkansas ANG, Fort Smith (FS)")
--SetArgument(0,1)
--SetArgument(3,1)
--SetArgument(5,0.75)

local saved_games_path = "C:/Users/username/Saved Games/DCS/" -- Edit me with your Saved games path

animator = 
{
	statistics_enabled = true;
}


local lfs = require("lfs")
local function service_file(file)
	return file == "." or
		   file == ".." or 
		   file == ".svn" or 
		   file == "_svn" 
end


function scan_for_environment_cubes(path)
	local lower_case = path:lower()	
	for file in lfs.dir(path) do
		if not service_file(file) then
			local fn = path.."/"..file
			local attrMode = lfs.attributes(fn, "mode")
			if attrMode == "file" then
				local ext = string.sub(file,-4) 
				if '.dds' == ext then
					AddEnvironmentMap(file)
				end
			end
		end
	end
end


function scan_for_textures(path)
	local lower_case      = path:lower()
	if lower_case:find("liveries") then
	   mount_vfs_liveries_path(path)  
	   return
	end
	local is_texture_path  = lower_case:find("texture") ~= nil
	local mounted_already  = false 
	for file in lfs.dir(path) do
		if not service_file(file) then
		   local fn 	  = path.."/"..file
		   local attr 	  = lfs.attributes (fn)     
		   if attr.mode	 == "directory" then
			  scan_for_textures(fn)
		   elseif is_texture_path then
			  local ext = string.sub(file,-4)
			  if '.zip' == ext then
					mount_vfs_texture_path(fn)			
			  elseif not mounted_already and (
				 '.dds' == ext or
			     '.bmp' == ext or
				 '.jpg' == ext or
				 '.png' == ext or
				 '.tga' == ext) then
					mount_vfs_texture_path(path)
					mounted_already = false
			  end
		   end
		end
	end
end


function scan_for_environment_cubes(path)
	local lower_case = path:lower()	
	for file in lfs.dir(path) do
		if not service_file(file) then
			local fn = path.."/"..file
			local attrMode = lfs.attributes(fn, "mode")
			if attrMode == "file" then
				local ext = string.sub(file,-4) 
				if '.dds' == ext then
					AddEnvironmentMap(file)
				end
			end
		end
	end
end


print("----------------------------------------------------------------")
print("scan for environment cubes")
print("----------------------------------------------------------------")
scan_for_environment_cubes("Bazar/EffectViewer/envcubes")
print("scan done")
print("----------------------------------------------------------------")
print("mount extra stuff")
print("----------------------------------------------------------------")

scan_for_textures(saved_games_path .. "Mods")				-- Your path Check DCS or OpenBeta
scan_for_textures(saved_games_path .. "Mods/Aircraft")		-- Your path Check DCS or OpenBeta
scan_for_textures(saved_games_path .. "Mods/Tech")			-- Your path Check DCS or OpenBeta
scan_for_textures(saved_games_path .. "Liveries")			-- Your path Check DCS or OpenBeta


print("scan done")
print("----------------------------------------------------------------")


mount_vfs_liveries_path     (saved_games_path .. "Liveries")	-- Your path Check DCS or OpenBeta
mount_vfs_textures_path	    (saved_games_path .. "Liveries")	-- Your path Check DCS or OpenBeta

mount_vfs_liveries_path     ("CoreMods/tech/USS_Nimitz/animations/liveries")
mount_vfs_animations_path   ("CoreMods/tech/USS_Nimitz/animations/animations")
mount_vfs_models_path       ("CoreMods/tech/USS_Nimitz/animations/models")
mount_vfs_textures_path     ("CoreMods/tech/USS_Nimitz/animations/textures")

mount_vfs_liveries_path     ("CoreMods/tech/Animals/Liveries")
mount_vfs_models_path       ("CoreMods/tech/Animals/models")
mount_vfs_textures_path	    ("CoreMods/tech/Animals/Textures")
mount_vfs_animations_path   ("CoreMods/tech/Animals/animations")

mount_vfs_models_path       ("CoreMods/characters/models")
mount_vfs_textures_path	    ("CoreMods/characters/textures")
mount_vfs_animations_path   ("CoreMods/characters/animations")
mount_vfs_animations_path   ("Mods/tech/WIP/Animations")
mount_vfs_models_path       ("Mods/tech/WIP/Shapes")

mount_vfs_textures_path("Mods/terrains/Caucasus/Models/Communication/Communication.texture.zip") 

mount_vfs_liveries_path     (saved_games_path .. "Mods/Aircraft")	-- Your path Check DCS or OpenBeta
mount_vfs_models_path       (saved_games_path .. "Mods/Aircraft")	-- Your path Check DCS or OpenBeta
mount_vfs_textures_path     (saved_games_path .. "Mods/Aircraft")	-- Your path Check DCS or OpenBeta	
mount_vfs_liveries_path     (saved_games_path .. "Mods/Tech")		-- Your path Check DCS or OpenBeta
mount_vfs_models_path       (saved_games_path .. "Mods/Tech")		-- Your path Check DCS or OpenBeta
mount_vfs_textures_path     (saved_games_path .. "Mods/Tech")		-- Your path Check DCS or OpenBeta

print("done")
print("----------------------------------------------------------------")

```