let display = document.getElementById("display");
let calculator = document.getElementById("calculator");

function animateDisplay() {
    display.style.transform = "scale(1.03)";
    setTimeout(() => {
        display.style.transform = "scale(1)";
    }, 120);
}

function insert(value) {
    display.value += value;
    animateDisplay();
}

//toggle to scientific part
function toggleScientific() {
    calculator.classList.toggle("scientific-mode");
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let exp = display.value;

        // ln(x) → Math.log(x)
        exp = exp.replace(/ln\(/g, "Math.log(");

        // e → Math.E
        exp = exp.replace(/\be\b/g, "Math.E");

        // power: a^b → Math.pow(a,b)
        if (exp.includes("^")) {
            let parts = exp.split("^");
            exp = `Math.pow(${parts[0]},${parts[1]})`;
        }

        display.value = eval(exp);

        // auto close scientific mode
        calculator.classList.remove("scientific-mode");

    } catch {
        display.value = "Error";
    }
}

// Scientific functions
function sin() {
    display.value = Math.sin(toRadians(display.value));
}

function cos() {
    display.value = Math.cos(toRadians(display.value));
}

function tan() {
    display.value = Math.tan(toRadians(display.value));
}

function sqrt() {
    display.value = Math.sqrt(display.value);
}

function square() {
    display.value = Math.pow(display.value, 2);
}

function log() {
    display.value = Math.log10(display.value);
}

function toRadians(deg) {
    return deg * (Math.PI / 180);
}

function insertBracket() {
    let open = (display.value.match(/\(/g) || []).length;
    let close = (display.value.match(/\)/g) || []).length;

    display.value += open > close ? ')' : '(';
}
