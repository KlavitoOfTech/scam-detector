import pytesseract

from PIL import (
    Image,
    ImageEnhance,
    ImageFilter
)

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

# Open local image
image = Image.open("test.png")

# Convert to grayscale
image = image.convert("L")

# Resize larger
width, height = image.size

image = image.resize(
    (width * 2, height * 2)
)

# Increase contrast
enhancer = ImageEnhance.Contrast(image)

image = enhancer.enhance(3)

# Sharpen image
image = image.filter(
    ImageFilter.SHARPEN
)

# Save processed image
image.save("processed.png")

# OCR
text = pytesseract.image_to_string(
    image,
    config="--oem 3 --psm 6"
)

print("OCR RESULT:")
print(text)