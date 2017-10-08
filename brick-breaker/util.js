// util

Util = new function () {
    this.distance = function (a, b) {
        return sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }

    this.checkIfBlocksOverlap = function (newBlock, blocks) {
        var flag = false;
        for(var block of blocks) {
            if (
                newBlock.position.x < block.position.x + block.width &&
                newBlock.position.x + newBlock.width > block.position.x &&
                newBlock.position.y < block.position.y + block.height &&
                newBlock.position.y + newBlock.height > block.position.y
            ) {
                return true;
            }
        };
        return false;
    }
}