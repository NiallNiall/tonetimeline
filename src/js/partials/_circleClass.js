function createRipple(thisx,thisy) {

    var alive = true;

    var objRadius = 1;
    var objMaxRadius = 200;
    var objx = thisx;
    var objy = thisy;

    var clrInc = 0;

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
        clrInc += 0.03;
        var icol = _interpolateColor(scol, ecol, clrInc);
        var hcol = r2h(icol);

        if(objRadius<objMaxRadius){
            objRadius+=1;
            drawNoiseCircle(objx,objy,objRadius, objRadius,objRadius/2, hcol);
        } else {
            alive = false;
        }
    }

    // drawRipple(objx,objy,objRadius,nhpink);


    return ripple;

}