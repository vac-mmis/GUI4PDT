import csv
import math
with open('water_elevation_map.csv', 'w+', newline='') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerow(["x","y","z","z_var"])

    amplitude = 1
    size = 150
    step = 1
    z_var = 0
    
    offset_z = 22

    frequency = 0.1



    

    for x in range(-size,size,step):
        for y in range(-size,size,step):
            spamwriter.writerow([y, x, amplitude*math.cos(x*frequency)*math.cos(y*frequency)+offset_z,z_var])