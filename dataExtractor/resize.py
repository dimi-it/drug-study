from PIL import Image
from PIL import ImageOps
import os

imgDir = "./images/"
saveDir = "../server/images/"

for filename in os.listdir(os.path.join(os.getcwd(), "images")):
    print(filename)
    im = Image.open(imgDir + filename)
    invIm =ImageOps.invert(im.convert("RGB"))
    im2 = im.crop(invIm.getbbox())
    im2.save(saveDir + filename)