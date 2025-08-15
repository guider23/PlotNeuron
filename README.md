# PlotNeuron — Neural Network Diagram Generator

Alright, no sugarcoating — this thing takes in your neural network JSON, runs it through a Node.js backend, cooks it with a Python-LaTeX script, and spits out a clean PNG diagram. Minimal effort, max clarity.

---

## 1. What This Is 

- You send a JSON with your model layers.
- Backend runs a Python script using PlotNeuralNet (built on LaTeX/TikZ).
- It gives you back a crispy PNG diagram. Use it wherever you want.

---

## 2. You’ll Need This Gear

- Windows 10/11 (Mac/Linux work too, but commands vary)
- Python 3.8+ (works well with 3.9)
- Node.js 14+
- LaTeX (MiKTeX or TeX Live — must include `pdflatex`)
- ImageMagick (with `magick` command and PDF support)
- Git (optional, if you're cloning)

---

## 3. Setup Steps

### A. Grab the Project

Using git:
```sh
git clone https://github.com/guider23/PlotNeuron
cd PlotNeuron
```
Or unzip the folder and `cd` into it.

### B. Python Dependencies

No pip installs. Pure standard library — simple and clean.

### C. Node.js Setup
```sh
npm install
```

### D. System Tools

#### 1. LaTeX (for the diagram magic)
- Install [MiKTeX](https://miktex.org/download) or [TeX Live](https://www.tug.org/texlive/).
- Ensure `pdflatex` is accessible from terminal:
```sh
pdflatex --version
```

#### 2. ImageMagick (turns PDF → PNG)
- Install from [here](https://imagemagick.org/script/download.php)
- During install, check:
  - "Install legacy utilities (e.g., convert)"
  - "Install development headers for C/C++"
- Confirm it works:
```sh
magick --version
```
- Still no PNG? Install Ghostscript and add to PATH for PDF support.

---

## 4. Running This Thing

### A. Fire Up the Backend
```sh
node server.js
```

### B. POST Your Network
Send a JSON to `http://localhost:3000/generate`. Example:
```json
{
  "layers": [
    { "type": "Conv", "filters": 64, "position": "(0,0,0)" },
    { "type": "Pool", "position": "(2,0,0)" },
    { "type": "Dense", "units": 128 }
  ]
}
```
Use Postman, curl, whatever you vibe with.

Using curl:
```sh
curl -X POST http://localhost:3000/generate -H "Content-Type: application/json" -d "{\"layers\":[{\"type\":\"Conv\",\"filters\":64,\"position\":\"(0,0,0)\"},{\"type\":\"Pool\",\"position\":\"(2,0,0)\"},{\"type\":\"Dense\",\"units\":128}]}"
```

### C. See the Output
Open:
```
http://localhost:3000/outputs/main.png
```
Boom. There’s your architecture.

---

## 5. What I Customized

- **Dynamic JSON Handling** — No static files. Backend takes your live JSON and builds LaTeX on the fly.
- **Absolute Paths** — No “where’s my file” errors. Full paths passed to Python.
- **Clear Errors** — Any LaTeX/ImageMagick fails? The server yells clearly, not cryptically.

---

## 6. If Stuff Breaks

- **FileNotFoundError** — Check your paths and installed stuff.
- **LaTeX/ImageMagick not working** — Confirm they're in your PATH.
- **No PNG Output** — Server logs are your map.

---

## 7. Pro Tips

- Want new layer types? Hack `scripts/generate.py`, inside `generate_arch_from_json()`.
- Wanna go big? Check out the OG repo: [PlotNeuralNet](https://github.com/HarisIqbal88/PlotNeuralNet)

---

That’s it. Clean project, no clutter. You know the vibe.
Just clone → install → run → post → PNG. 
If anything's off, read the console — it talks back.
