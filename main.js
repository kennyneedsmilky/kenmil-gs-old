/* ケンミル */ /* 神様最高 */ "use strict"; console.log(new Date);

// DOM
const btns = document.querySelectorAll("BUTTON");
console.log(btns);
const canvas = document.querySelector(".canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 160; canvas.height = 160;

// Get the recent virtural key.
let recentVirturalKey;
let realKey;

// This is a constructor for blocks.
class Block {
    constructor (x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    update () {
        if (recentVirturalKey === "ArrowLeft" || realKey === "ArrowLeft") {
            this.x -= 1;
        } else if (recentVirturalKey === "ArrowRight" || realKey === "ArrowRight") {
            this.x += 1;
        } else if (recentVirturalKey === "ArrowUp" || realKey === "ArrowUp") {
            this.y -= 1;
        } else  if (recentVirturalKey === "ArrowDown" || realKey === "ArrowDown") {
            this.y += 1;
        }

        // Keep on canvas.
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > canvas.width - this.w) {
            this.x = canvas.width - this.w;
        } else if (this.y < 0) {
            this.y = 0;
        } else if (this.y > canvas.height - this.h) {
            this.y = canvas.height - this.h;
        }
    }
    draw () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    // This will animate the object.
    animate () {
        this.update();
        this.draw();
    }
}

// A block object.
const block1 = new Block (0, 0, 16, 16, "green");

// The animate function.
function animate () {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    block1.animate();
    window.requestAnimationFrame(animate);
}
animate();

// Check to see what virtural button is pressed and log it to the console.
for (const btn of btns) {
    btn.addEventListener("touchstart", function(e) {
        let btnId = btn.getAttribute("data-btn-id");
        // console.log(btnId);
        recentVirturalKey = btnId;
        // console.log(recentVirturalKey);
    });
}

// Check to see what virtural button is released and log it to the console.
for (const btn of btns) {
    btn.addEventListener("touchend", function(e) {
        let btnId = btn.getAttribute("data-btn-id");
        // console.log(btnId);
        recentVirturalKey = "";
        // console.log(recentVirturalKey);
    });
}

// Check to see what key is pressed and log it to the console.
window.addEventListener("keydown", function(e){
    let keyId = e.code;
    // console.log(e.code);
    realKey = keyId;
});

// Check to see what key is released and log it to the console.
window.addEventListener("keyup", function(e){
    let keyId = e.code;
    // console.log(e.code);
    realKey = "";
});