/*
Incluses common functions 
*/

/**
 * Returns the hex color for text depending on the color of the background 
 * @param {Object} color - An object containing "red" "green" and "blue" keys
 * @returns {String} Hex Color 
 */
export function getTextColor({red, green, blue}) {


    return ((red*0.299 + green*0.587 + blue*0.114) > 150)?"#000000":"#ffffff";
}

/**
 * Takes in a color and parces it to an object
 * @param {String} color - A RGB or Hex color
 * @returns {Color} A color class containing the colors "red" "green" "blue" "alpha" and a function that converts it to rgba
 * @throws {TypeError}
 */
export function parseRGBHEX(color) {
    if(color.substr(0, 3) == "rgb") { //parse as rgb
        let match = color.match(" *rgba?\\((\\d{1,3}) ?, ?(\\d{1,3}) ?, ?(\\d{1,3}) ?\\)?(?:, ?(\\d(?:\\.\\d*)? ?)\\))? *");
        return new Color(match[1], match[2], match[3], (match[4] != undefined)?match[4]:1.0);
    } else if(color.charAt(0) == '#') { // parse as hex
        let res = {
            red: parseInt(color.substr(1,2), 16),
            green: parseInt(color.substr(3,2), 16),
            blue: parseInt(color.substr(5,2), 16),
            alpha: 1.0
        };
        if(color.length > 7) {
            res.alpha = parseInt(color.substr(7,2), 16);
        }
        return new Color(res.red, res.green, res.blue, res.alpha);
    } else {
        throw new TypeError("\"color\" must be either a rgb or hex string");
    }
}


export class Color {
    /**
     * An RGBA color class
     * @param {Number} red 
     * @param {Number} green 
     * @param {Number} blue 
     * @param {Number} alpha 
     */
    constructor(red, green, blue, alpha = 1) {
        this.red = parseInt(red);
        this.green = parseInt(green);
        this.blue = parseInt(blue);
        this.alpha = parseFloat(alpha);
        
    }

    /**
     * @returns {String} A css rgba string
     */
    toRGBA() {
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
    }
}