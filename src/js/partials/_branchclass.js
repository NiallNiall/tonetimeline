function createBranch(initialPos) {

    var branchPath = new paper.Path();
    branchPath.strokeColor = 'Tomato';
    branchPath.strokeWidth = 3.0;
    branchPath.strokeCap = 'round';
    branchPath.add(initialPos);
    branchPath.add(initialPos);

    var branchPHPos = initialPos;
    var playHead = new paper.Path.Circle(branchPHPos, 8);
    playHead.fillColor = 'FireBrick';

    var playHeadPos = initialPos;

    var startShape = new paper.Path.Circle(initialPos, 10);
    startShape.fillColor = 'Tomato';

    var endShape = new paper.Path.Circle(initialPos, 10);
    endShape.fillColor = 'Tomato';

    var moving = true;

    var branch = {
        branchPath: branchPath,
        addPoints: addPoints,
        loop: loop,
        playHeadPos: playHeadPos,
        getPHPos: getPHPos,
        branchPHPos: branchPHPos,
        playHead: playHead,
        startShape: startShape,
        endShape: endShape,
        removeBranch: removeBranch
    };

    function removeBranch() {
        playHead.remove();
        startShape.remove();
        endShape.remove();
        playHead.remove();
        branchPath.remove();
        moving = false;
    }


    function addPoints(pointPos) {
        branchPath.add(pointPos);
        endShape.position = pointPos;
    }

    var pointPos = 0.001;

    function loop() {

        if (pointPos <= 1) {
            pointPos += masterSpeed;
        } else {
            pointPos = 0.001;
        }
        // console.log(pointPos);
        movePlayhead(branchPath, pointPos);
    }

    function movePlayhead(tempBranch, tempPointPos) {

        if (moving) {
            var getLength = tempBranch.length;
            // console.log(getLength);
            var pos = getLength * tempPointPos;

            playHeadPos = tempBranch.getPointAt(pos);
            playHead.position = playHeadPos;
        }
    }

    function getPHPos() {
        var rtnPos = playHeadPos;

        return rtnPos;

    }

    return branch;

}