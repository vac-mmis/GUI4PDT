import json
import re
import os

files = os.listdir(os.getcwd())


def get_object(x,y,z):
    return {
      "class": "rov",
      "location": {
          "dist": {
          "type": "multivariate-normal",
          "mean": [
            x,
            y,
            z
          ],
          "cov": [
            [
              0.0001,
              0,
              0
            ],
            [
              0,
              0.0001,
              0
            ],
            [
              0,
              0,
              0.0001
            ]
          ]
        }},
      "rotation": [
        0,
        0,
        0
      ],
      "material": "rov",
      "scale": 1,
      "name": "rov"
    
  }
    


sorted_files = sorted(files, key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else float('inf'))

print(sorted_files)

for index,file in enumerate(sorted_files):
    if (file == "modify.py") or (file == "animate_rov.py") or (file == "manipulate_height.py"):
        continue
    with open(file,"r") as f:
    
        data = json.load(f)

        objects = data["objects"]
        
        objects["rov"] = get_object(index,0,0)
        

        

    with open(file,"w") as f:
        json.dump(data,f)
      

