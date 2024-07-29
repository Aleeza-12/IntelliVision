import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import matplotlib.pyplot as plt

# Load the pre-trained U-Net model
model = load_model('path/to/your/pretrained_unet_model.h5')

# Function to preprocess the image
def preprocess_image(image_path, target_size=(128, 128)):
    # Load the image
    image = load_img(image_path, target_size=target_size)
    # Convert the image to array
    image_array = img_to_array(image)
    # Normalize the image
    image_array = image_array / 255.0
    # Expand dimensions to match the input shape
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

# Function to post-process the prediction
def postprocess_prediction(prediction):
    # Remove the batch dimension
    prediction = np.squeeze(prediction, axis=0)
    # If using a single channel (binary segmentation), convert the output to a binary mask
    prediction = (prediction > 0.5).astype(np.uint8)
    return prediction

# Load and preprocess an input image
input_image_path = 'path/to/your/input_image.jpg'
preprocessed_image = preprocess_image(input_image_path)

# Predict the segmentation mask
predicted_mask = model.predict(preprocessed_image)

# Post-process the prediction
segmentation_mask = postprocess_prediction(predicted_mask)

# Plot the original image and the segmentation mask
original_image = load_img(input_image_path)
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.imshow(original_image)
plt.title('Original Image')
plt.axis('off')
plt.subplot(1, 2, 2)
plt.imshow(segmentation_mask, cmap='gray')
plt.title('Segmentation Mask')
plt.axis('off')
plt.show()