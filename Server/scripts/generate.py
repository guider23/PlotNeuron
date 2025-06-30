import os
import sys
import json
import shutil
import subprocess

# Always resolve path relative to this script's location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PYCORE_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, '..', 'plotter', 'PlotNeuralNet', 'pycore'))
sys.path.insert(0, PYCORE_DIR)
from tikzeng import *

def generate_arch_from_json(data):
    arch = [
        to_head('..'),
        to_cor(),
        to_begin()
    ]
    prev_name = None
    for i, layer in enumerate(data.get("layers", [])):
        ltype = layer["type"].lower()
        name = layer.get("name", f"layer{i}")
        if ltype == "conv":
            arch.append(to_Conv(
                name=name,
                s_filer=layer.get("filters", 64),
                n_filer=layer.get("filters", 64),
                to=layer.get("position", "(0,0,0)"),
                width=2, height=20, depth=20
            ))
        elif ltype == "pool":
            arch.append(to_Pool(
                name=name,
                to=layer.get("position", "(0,0,0)"),
                width=1, height=10, depth=10
            ))
        elif ltype == "dense":
            arch.append(to_SoftMax(
                name=name,
                s_filer=layer.get("units", 10),
                to=layer.get("position", "(0,0,0)"),
                width=1.5, height=3, depth=10
            ))
        # Add more layer types as needed
        if prev_name:
            arch.append(to_connection(prev_name, name))
        prev_name = name
    arch.append(to_end())
    return arch

def main():
    # Go to the pyexamples directory
    base_dir = os.path.join(os.getcwd(), "plotter", "PlotNeuralNet", "pyexamples")
    os.makedirs(os.path.join("..", "..", "output"), exist_ok=True)
    os.chdir(base_dir)

    # Read JSON input
    if len(sys.argv) > 1:
        json_path = sys.argv[1]
        with open(json_path, "r") as f:
            data = json.load(f)
        arch = generate_arch_from_json(data)
        tex_name = "main.tex"
        to_generate(arch, tex_name)
    else:
        print("No JSON input provided.")
        sys.exit(1)

    print("Compiling LaTeX...")
    subprocess.run(["pdflatex", "main.tex"], check=True)

    print("Converting to PNG...")
    subprocess.run(["magick", "-density", "300", "main.pdf", "-quality", "100", "main.png"], check=True)

    # Copy to output
    output_path = os.path.join("..", "..", "output", "main.png")
    shutil.copy("main.png", output_path)
    print(f"Copied to {output_path}")

if __name__ == "__main__":
    main()
