from pyexamples.core import *

def architecture():
    Conv(filters=64, kernel=3, stride=1)
    ReLU()
    MaxPool(pool_size=2)
    Dense(units=128, activation='softmax')

architecture()