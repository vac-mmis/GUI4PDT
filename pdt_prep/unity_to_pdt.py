import pandas as pd
import numpy as np
import json

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

def read_unity_data(file):
    data = pd.read_csv(file, sep=" ", header=None)
    return data

def dol_to_dict(data, name="dol_single"):
    obj_translation = {
        "cone":"reefcone",
        "ring":"reefring",
        "tetrapod_small":"tetrapod",
        "tetrapod_big":"tetrapod"
    }

    scalings = {
        "cone":1,
        "ring":1,
        "tetrapod_small":0.8,
        "tetrapod_big":1
    }
    data_map = {"name":name,
                "timestep":0,
                "timestamp":None,
                "objects":[]}
    for i, row in data.iterrows():
        data_map["objects"].append(
            {
                "id":i,
                "class":obj_translation[row[0]],
                "location":[row[1], row[2], row[3]],
                "rotation":[row[4],row[5],row[6]],
                "material":"concrete",
                "scale":scalings[row[0]]
            }
        )
    return data_map


def dol_over_time(data, name="dol"):
    # start reduction of noisy every g timesteps for new object
    # take n timesteps to noise to zero

    gap = 0
    n = 50

    start_std_loc = 0.5
    
    rotation_k_start = [1e10, 1e10, 50]
    rotation_k_end = [1e10, 1e10, 1e6]

    cov_start = [[start_std_loc, 0.0, 0.0],
                [0.0, start_std_loc, 0.0],
                [0.0, 0.0, 0.001]]
    cov_end = [[0.001, 0.0, 0.0],
                [0.0, 0.001, 0.0],
                [0.0, 0.0, 0.001]]

    covs = np.linspace(cov_start, cov_end, num=n)
    ks = np.logspace(np.log10(rotation_k_start), np.log10(rotation_k_end), num=n, axis=0)

    obj_translation = {
        "cone":"reefcone",
        "ring":"reefring",
        "tetrapod_small":"tetrapod",
        "tetrapod_big":"tetrapod"
    }

    scalings = {
        "cone":1,
        "ring":1,
        "tetrapod_small":0.8,
        "tetrapod_big":1
    }

    pdts = []
    for t in range(data.shape[0]*gap+n):
        data_map = {"name":name,
                    "timestep":t,
                    "timestamp":None,
                    "objects":[]}
        for i, row in data.iterrows():
            if (i*gap+n) <= t:
                data_map["objects"].append(
                    {
                        "id":i,
                        "class":obj_translation[row[0]],
                        "location":[row[1], row[2], row[3]],
                        "rotation":[row[4],row[5],row[6]],
                        "material":"concrete",
                        "scale":scalings[row[0]]
                    })
            elif (i*gap+n) > t:
                data_map["objects"].append(
                    {
                        "id":i,
                        "class":obj_translation[row[0]],
                        "location":[row[1], row[2], row[3]-12],
                        "location": {
                            "dist": {
                                "type": "multivariate-normal",
                                "mean": [row[1], row[2], row[3]-12],
                                "cov": covs[0].tolist()
                            }
                        },
                        "rotation":{
                             "dist": {
                                "type": "von-mises",
                                "mean": [row[4], row[5], row[6]],
                                "kappa": ks[0].tolist()
                            }
                        },
                        "material":"concrete",
                        "scale":scalings[row[0]]
                    }
            )
            else:
                k = t - (i*gap)
                data_map["objects"].append(
                    {
                        "id":i,
                        "class":obj_translation[row[0]],
                        "location":[row[1], row[2], row[3]-12],
                        "location": {
                            "dist": {
                                "type": "multivariate-normal",
                                "mean": [row[1], row[2], row[3]-12],
                                "cov": covs[k].tolist()
                            }
                        },
                        "rotation":{
                             "dist": {
                                "type": "von-mises",
                                "mean": [row[4], row[5], row[6]],
                                "kappa": ks[k].tolist()
                            }
                        },
                        "material":"concrete",
                        "scale":scalings[row[0]]
                    }
                )
            
        pdts.append(data_map)

    return pdts

def dol_demoday(data, name="demoday"):

    every_item = 5

    std_mean = 0.3
    std_std = 0.3

    rot_z_std_mean = 50
    rot_z_std_std = 20
    rot_xy_std_mean = 100
    rot_xy_std_std = 20

    obj_translation = {
        "cone":"reefcone",
        "ring":"reefring",
        "tetrapod_small":"tetrapod",
        "tetrapod_big":"tetrapod"
    }

    scalings = {
        "cone":1,
        "ring":1,
        "tetrapod_small":0.7,
        "tetrapod_big":1
    }

    pdt = {"name":name,
                "timestep":0,
                "timestamp":None,
                "objects":[]}
    
    for i in np.arange(start=0, step=every_item, stop=len(data.index)):

        row = data.iloc[i]

        # absoulute value is not the right way but....
        std_x = np.abs(np.random.normal(std_mean, std_std))
        std_y = np.abs(np.random.normal(std_mean, std_std))

        rot_z_std = np.abs(np.random.normal(rot_z_std_mean, rot_z_std_std))
        rot_xy_std = np.abs(np.random.normal(rot_xy_std_mean, rot_xy_std_std))

        cov = [[std_x, 0.0, 0.0],
                [0.0, std_y, 0.0],
                [0.0, 0.0, 0.001]]
        

        o = {"id":i//every_item}

        if (row[1] > -69) and (row[1] < -48) and (row[2] > -64) and (row[2] < 12):
            dist = np.random.dirichlet([1,1])
            o["class"] = {
                "dist": {
                    "type": "categorical",
                    "mass": {
                        "tetrapod": dist[0],
                        "reefcone": dist[1]
                    }
                }}
        else:
            o["class"] = obj_translation[row[0]]

        o = o | {
            "location": {
                "dist": {
                    "type": "multivariate-normal",
                    "mean": [row[1], row[2], row[3]],
                    "cov": cov
                }
            },
            "rotation":{
                    "dist": {
                    "type": "von-mises",
                    "mean": [np.rad2deg(row[4]), np.rad2deg(row[5]), np.rad2deg(row[6])],
                    "kappa": [rot_xy_std, rot_xy_std, rot_z_std]
                }
            },
            "material":"concrete",
            "scale":scalings[row[0]]
            }
        
        pdt["objects"].append(o)
            
    return pdt
                
def make_single(path):
    d = read_unity_data("test_convert/ObjectPositions.txt")
    d_ = dol_to_dict(d)
    with open(f'{path}dol_pdt.json', 'w') as f:
        json.dump(d_, f, indent=4)

def make_series(path):
    d = read_unity_data("test_convert/ObjectPositions.txt")
    pdts = dol_over_time(d)
    for i in range(len(pdts)):
        fp = f'{path}dol_pdt_{i}.json'
        with open(fp, 'w') as f:
            json.dump(pdts[i], f, indent=4)

def make_demoday(path):
    d = read_unity_data("test_convert/ObjectPositions.txt")
    d_ = dol_demoday(d)
    with open(f'{path}demoday.json', 'w') as f:
        json.dump(d_, f, indent=4, cls=NpEncoder)

def main():
    #make_single("/Users/mpopko/otc/Code/230606_GUI4PDT-SB/backend/data/PDT3/")
    #make_series("/Users/mpopko/otc/Code/230606_GUI4PDT-SB/backend/data/PDT4/")
    make_demoday("/Users/mpopko/otc/Code/230606_GUI4PDT-SB/backend/data/PDT5/")



if __name__ == "__main__":
    main()
