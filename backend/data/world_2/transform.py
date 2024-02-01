import json
import os
import glob

directory_path = os.getcwd()

json_files = glob.glob(os.path.join(directory_path, '*.json'))

for json_file in json_files:

    with open(json_file,"r") as f:
        original_json = json.load(f)


    transformed_data = {
        "name": original_json["name"],
        "timestep": original_json["timestep"],
        "timestamp": original_json["timestamp"],
        "objects": {}
    }

    for obj in original_json["objects"]:
        object_id = obj["id"]
        transformed_data["objects"][str(object_id)] = {
            "name": f"object_{object_id}",
            "class": obj["class"],
            "location": obj["location"],
            "rotation": obj["rotation"],
            "scale": obj["scale"],
            "material": obj["material"]
        }

    with open(json_file, "w") as file:
        json.dump(transformed_data, file, indent=2)