import json
import time

# Laden der JSON-Daten aus der Datei (wenn vorhanden)
try:
    with open("pdt.json", "r") as file:
        data = json.load(file)
except (FileNotFoundError, json.JSONDecodeError):
    # Wenn die Datei nicht vorhanden ist oder nicht analysiert werden kann,
    # initialisiere data mit einem leeren Dictionary.
    pass

try:
    counter = 0
    while True:
        data["objects"][1]["location"][0] = counter
        counter += 1

        # JSON-Daten in die Datei schreiben
        with open("pdt.json", "w") as file:
            json.dump(data, file)

        time.sleep(1)

except KeyboardInterrupt:
    # Im Falle einer KeyboardInterrupt (z.B. durch Strg+C) die Daten zurücksetzen und speichern
    data["objects"][1]["location"][0] = 0
    with open("pdt.json", "w") as file:
        json.dump(data, file)