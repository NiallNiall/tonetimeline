function createRipple() {

    var ripple = {
        drawRipple: drawRipple
    };

    function drawRipple(x,y,radius,clr) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = clr;
        ctx.stroke();
        ctx.closePath();
    }

    drawRipple(200,200,10,'white');


    return ripple;

}