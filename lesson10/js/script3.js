class Options {
    constructor (height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    createDiv() {
        let div = document.createElement('div');
        div.className = "main-dop";
        div.innerHTML = "Это пример текста, с которым сейчас будем работать через JS!";
        mainm.appendChild(div);

        div.style.cssText="height: " + this.height + "px; width: " + this.width + "px; background-color: " + this.bg + "; text-align: " + this.textAlign + ";font-size: " + this.fontSize + ";";
    }
}

let prim = new Options(200, 250, "red", 24, "center");

prim.createDiv();