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
        clrInc += 10;

        if(objRadius<objMaxRadius){
            objRadius+=1;
            // drawRipple(objx,objy,objRadius,nhpink);
                // drawNoiseCircle(tempPosX,tempPosY,25, rndRadius, sclrVar )

            drawNoiseCircle(objx,objy,objRadius, objRadius,objRadius/2, clrInc);
        } else {
            alive = false;
        }
    }

    // drawRipple(objx,objy,objRadius,nhpink);


    return ripple;

}