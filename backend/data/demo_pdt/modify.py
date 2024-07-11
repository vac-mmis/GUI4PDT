import json
import os

files = os.listdir(os.getcwd())

for file in files:
    if (file == "modify.py") or (file == "animate_rov.py") or (file == "manipulate_height.py") or (file == "sand_elevation_map.csv") or (file == "water_elevation_map.csv"):
        continue
    with open(file,"r") as f:
    
        data = json.load(f)

        objects = data["objects"]
        data["objects"] = {}

        for o in objects:
            id_str = str(o["id"])
            o.pop("id")
            o["name"] = "object" + id_str
            data["objects"][id_str] = o

    with open(file,"w") as f:
        json.dump(data,f)