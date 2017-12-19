function createRipple(thisx,thisy) {

    var alive = true;

    var objRadius = 1;
    var objMaxRadius = randomIntFromInterval(50,150);
    var objSpeed = objMaxRadius / 250; 
    var objx = thisx;
    var objy = thisy;

    var clrInc = 0;

    var ripple = {
        drawRipple: drawRipple,
        loop: loop,
        getStatus: getStatus
    };

    function drawRipple(x,y,radius,clr) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.lineWidth = 10;
        ctx.strokeStyle = clr;
        ctx.stroke();
        ctx.closePath();
    }

    function getStatus(){
        var thisStatus = alive;
        return thisStatus;
    }

    function loop(){
        clrInc += 0.03;
        var icol = _interpolateColor(scol, ecol, clrInc);
        var hcol = 'rgba(255,255,255,0.5)';//r2h(icol);

        if(objRadius<objMaxRadius){
            objRadius+=objSpeed;
            drawNoiseCircle(objx,objy,objRadius, objRadius,objRadius/2, hcol);
        } else {
            alive = false;
        }
    }

    // drawRipple(objx,objy,objRadius,nhpink);


    return ripple;

}