// util

Util = new function () {
    this.distance = function (a, b) {
        return sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }


    this.checkIfBlocksOverlap = function (newBlock, blocks) {
        var flag = false;
        for(var block of blocks) {
            if (
                newBlock.position.x < block.position.x + block.size.width &&
                newBlock.position.x + newBlock.size.width > block.position.x &&
                newBlock.position.y < block.position.y + block.size.height &&
                newBlock.position.y + newBlock.size.height > block.position.y
            ) {
                return true;
            }
        };
        return false;
    }
}