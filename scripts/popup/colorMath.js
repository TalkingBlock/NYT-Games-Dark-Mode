// Runs the color math calculations for format translations

// Ensures HSV numbers are always between 0 and 1
export function clamp(value) {
    return Math.min(1, Math.max(0, value));
}

// Converts hex colors to the legal 6 character format
export function normalizeHexColor(input) {
    if (!input) return null;
    let hex = String(input).trim().toUpperCase();
    const shortHexFormat = /^#([0-9A-F]{3})$/;
    const fullHexFormat = /^#([0-9A-F]{6})$/;

    if (!hex.startsWith("#")) {
        hex = `#${hex}`;
    }
    if (shortHexFormat.test(hex)) {
        const shortValue = hex.slice(1);
        hex = `#${shortValue[0]}${shortValue[0]}${shortValue[1]}${shortValue[1]}${shortValue[2]}${shortValue[2]}`;
    }
    if (!fullHexFormat.test(hex)) {
        return null;
    }
    return hex;
}

// Converts HSV colors to RGB format
export function hsvToRgb(hue, saturation, value) {
    const chroma = value * saturation;
    const hueSection = (hue % 360) / 60;
    const secondaryColor = chroma * (1 - Math.abs((hueSection % 2) - 1));
    const brightness = value - chroma;
    let red = 0;
    let green = 0;
    let blue = 0;

    if (hueSection >= 0 && hueSection < 1) {
        red = chroma;
        green = secondaryColor;
    } else if (hueSection >= 1 && hueSection < 2) {
        red = secondaryColor;
        green = chroma;
    } else if (hueSection >= 2 && hueSection < 3) {
        green = chroma;
        blue = secondaryColor;
    } else if (hueSection >= 3 && hueSection < 4) {
        green = secondaryColor;
        blue = chroma;
    } else if (hueSection >= 4 && hueSection < 5) {
        red = secondaryColor;
        blue = chroma;
    } else {
        red = chroma;
        blue = secondaryColor;
    }
    return {
        red: Math.round((red + brightness) * 255),
        green: Math.round((green + brightness) * 255),
        blue: Math.round((blue + brightness) * 255)
    };
}

// Converts HSV colors to Hex format
export function hsvToHex(hue, saturation, value) {
    const {red, green, blue} = hsvToRgb(hue, saturation, value);
    const toHexPair = (channel) => channel.toString(16).padStart(2, "0");
    return `#${toHexPair(red)}${toHexPair(green)}${toHexPair(blue)}`.toUpperCase();
}

// Converts Hex colors to HSV format
export function hexToHsv(hex) {
    const normalizedHex = normalizeHexColor(hex);
    if (!normalizedHex) return null;
    const red = parseInt(normalizedHex.slice(1, 3), 16) / 255;
    const green = parseInt(normalizedHex.slice(3, 5), 16) / 255;
    const blue = parseInt(normalizedHex.slice(5, 7), 16) / 255;
    const maxChannel = Math.max(red, green, blue);
    const minChannel = Math.min(red, green, blue);
    const delta = maxChannel - minChannel;
    let hue = 0;

    if (delta !== 0) {
        if (maxChannel === red) {
            hue = ((green - blue) / delta) % 6;
        } else if (maxChannel === green) {
            hue = (blue - red) / delta + 2;
        } else {
            hue = (red - green) / delta + 4;
        }
        hue *= 60;
        if (hue < 0) {
            hue += 360;
        }
    }
    const saturation = maxChannel === 0 ? 0 : delta / maxChannel;
    const value = maxChannel;
    return {h: hue, s: saturation, v: value};
}