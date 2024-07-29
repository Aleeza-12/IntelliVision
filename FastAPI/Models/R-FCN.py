import torch
from torchvision import models, transforms
from PIL import Image
import matplotlib.pyplot as plt
import torchvision.transforms as T

# Load a pre-trained object detection model (e.g., Faster R-CNN, since R-FCN is not directly available in torchvision)
model = models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

# Function to load and preprocess the image
def load_image(image_path):
    image = Image.open(image_path).convert("RGB")
    transform = transforms.Compose([
        transforms.ToTensor(),
    ])
    return transform(image)

# Function to plot bounding boxes on the image
def plot_image_with_boxes(img, boxes, labels):
    plt.figure(figsize=(10, 10))
    plt.imshow(img)
    ax = plt.gca()
    for box, label in zip(boxes, labels):
        x, y, x2, y2 = box
        ax.add_patch(plt.Rectangle((x, y), x2 - x, y2 - y, fill=False, color='red', linewidth=2))
        ax.text(x, y, label, bbox={'facecolor': 'white', 'alpha': 0.5})
    plt.axis('off')
    plt.show()

# Load and preprocess the image
image_path = "path_to_your_image.jpg"
image = load_image(image_path)

# Perform detection
with torch.no_grad():
    predictions = model([image])

# Extract boxes, labels, and scores
boxes = predictions[0]['boxes'].cpu().numpy()
scores = predictions[0]['scores'].cpu().numpy()
labels = predictions[0]['labels'].cpu().numpy()

# Filter out predictions with low scores
confidence_threshold = 0.5
high_conf_boxes = boxes[scores >= confidence_threshold]
high_conf_labels = labels[scores >= confidence_threshold]

# Load the original image for plotting
original_image = Image.open(image_path).convert("RGB")

# Plot the image with bounding boxes
plot_image_with_boxes(original_image, high_conf_boxes, high_conf_labels)