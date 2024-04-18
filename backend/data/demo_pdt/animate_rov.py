import json
import re
import os
import sys

files = os.listdir(os.getcwd())


def get_rov(x,y,z):
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
        }
      },
      "rotation": [
        0,
        0,
        3.15
      ],
      "material": "blue",
      "scale": 1,
      "name": "rov"
    
  }
    
def get_platform(x,y,z):
    return {
      "class": "platform",
      "location": [x,y,z],
      "rotation": [
        0,
        0,
        0
      ],
      "material": "yellow",
      "scale": 0.6,
      "name": "platform"
    
  }
    


sorted_files = sorted(files, key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else float('inf'))

start = -25
end = 25
num_points = 60

step = (end - start) / (num_points - 1)
points = [start + i * step for i in range(num_points)]

print(points)
print(len(points))




for index,file in enumerate(sorted_files):
    if (file == "modify.py") or (file == "animate_rov.py") or (file == "manipulate_height.py") or (file == "sand_elevation_map.csv") or (file == "water_elevation_map.csv"):
        continue
    with open(file,"r") as f:
        
        print(file)
    
        data = json.load(f)

        objects = data["objects"]
        
        objects["rov"] = get_rov(-60,points[index],5)
        #objects["platform"] = get_platform(5,0,0.375)

        

    with open(file,"w") as f:
        json.dump(data,f)
      

