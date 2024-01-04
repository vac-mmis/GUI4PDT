from PIL import Image
import numpy as np
import os

def create_albedo_map(body_path, buffer_path, root_accessory_path):
    # Load the textures
    body_texture = Image.open(body_path)
    buffer_texture = Image.open(buffer_path)
    root_accessory_texture = Image.open(root_accessory_path)

    # Ensure all textures have the same size
    width, height = body_texture.size
    buffer_texture = buffer_texture.resize((width, height))
    root_accessory_texture = root_accessory_texture.resize((width, height))

    # Convert images to numpy arrays for easier manipulation
    body_array = np.array(body_texture)
    buffer_array = np.array(buffer_texture)
    root_accessory_array = np.array(root_accessory_texture)

    # Average the RGB values
    albedo_array = np.mean([body_array, buffer_array, root_accessory_array], axis=0).astype(np.uint8)

    # Convert the resulting array back to an image
    albedo_map = Image.fromarray(albedo_array)

    return albedo_map

# Example usage
body_path = os.path.abspath("boat_body_diffuse.jpg")
buffer_path = "boat_buffer_diffuse.jpg"
root_accessory_path = "boat_roof_accessory_diffuse.jpg"

albedo_map = create_albedo_map(body_path, buffer_path, root_accessory_path)
albedo_map.save("albedo_map.jpg")