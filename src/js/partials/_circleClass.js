function createRipple(thisx,thisy) {

    var objRadius = 10;
    var objx = thisx;
    var objy = thisy;

    var ripple = {
        drawRipple: drawRipple,
        loop: loop
    };

    function drawRipple(x,y,radius,clr) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.lineWidth = 10;
        ctx.strokeStyle = clr;
        ctx.stroke();
        ctx.closePath();
    }

    function loop(){
        objRadius+=1;
        // drawRipple(objx,objy,objRadius+5,'rgba(0, 0, 0, 0.05)');
        drawRipple(objx,objy,objRadius,'white');
    }

    drawRipple(objx,objy,objRadius,'white');


    return ripple;

}