import pandas as pd
import numpy as np
import json

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
                "rotation":[0, 0, row[4]],
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
                        "location":[row[1], row[3], row[2]-12],
                        "rotation":[row[4], row[6], row[5]],
                        "material":"concrete",
                        "scale":scalings[row[0]]
                    })
            elif (i*gap+n) > t:
                data_map["objects"].append(
                    {
                        "id":i,
                        "class":obj_translation[row[0]],
                        "location":[row[1], row[3], row[2]-12],
                        "location": {
                            "dist": {
                                "type": "multivariate-normal",
                                "mean": [row[1], row[3], row[2]-12],
                                "cov": covs[0].tolist()
                            }
                        },
                        "rotation":{
                             "dist": {
                                "type": "von-mises",
                                "mean": [row[4], row[6], row[5]],
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
                        "location":[row[1], row[3], row[2]-12],
                        "location": {
                            "dist": {
                                "type": "multivariate-normal",
                                "mean": [row[1], row[3], row[2]-12],
                                "cov": covs[k].tolist()
                            }
                        },
                        "rotation":{
                             "dist": {
                                "type": "von-mises",
                                "mean": [row[4], row[6], row[5]],
                                "kappa": ks[k].tolist()
                            }
                        },
                        "material":"concrete",
                        "scale":scalings[row[0]]
                    }
                )
            
        pdts.append(data_map)

    return pdts
    
def make_single(path):
    d = read_unity_data("unity_dol.txt")
    d_ = dol_to_dict(d)
    with open(f'{path}dol_pdt.json', 'w') as f:
        json.dump(d_, f, indent=4)

def make_series(path):
    d = read_unity_data("unity_dol.txt")
    pdts = dol_over_time(d)
    for i in range(len(pdts)):
        fp = f'{path}dol_pdt_{i}.json'
        with open(fp, 'w') as f:
            json.dump(pdts[i], f, indent=4)

def main():
    make_single("/Users/mpopko/otc/Code/230606_GUI4PDT-SB/backend/data/PDT3/")
    make_series("/Users/mpopko/otc/Code/230606_GUI4PDT-SB/backend/data/PDT4/")



if __name__ == "__main__":
    main()
