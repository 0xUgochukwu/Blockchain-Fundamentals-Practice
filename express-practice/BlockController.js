const SHA256 = require('crypto-js/sha256');
const e = require('express');
const BlockClass = require('./Block.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
        this.validateBlockchain();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/api/block/:index", (req, res) => {
            // Add your code here
            res.send(this.blocks[req.params.index]);
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.app.post("/api/block", (req, res) => {
            
            if (req.body.data){
                let newBlock = new BlockClass.Block(req.body.data);
                newBlock.height = this.blocks.length;
                newBlock.time = new Date().getTime().toString().slice(0,-3);
                if (this.blocks.length > 0){
                    newBlock.previousBlockHash = this.blocks[this.blocks.length - 1].hash;
                }
                newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
                this.blocks.push(newBlock);
                res.send(newBlock);
            }
            else {
                res.send("Please enter data to add a new block");
            }
        });
    }

    validateBlockchain() {
        this.app.get("/api/validate", (req, res) => { 
            let currentBlock;
            let blockHash;
            let height;
            let errorLog = [];
            for (let i = 0; i < this.blocks.length; i++) {
                // Check if any block has been mutated or tempered with
                currentBlock = this.blocks[i];
                blockHash = currentBlock.hash;
                height = currentBlock.height;
                currentBlock.hash = '';
                if (blockHash != SHA256(JSON.stringify(currentBlock)).toString()) {
                    errorLog.push(`Hash Error at Block #${height}`);
                }
                // Make sure the chain is valid
                if (i > 0 && this.blocks[i].previousBlockHash != this.blocks[i-1].hash) {
                    errorLog.push(`Chain Error at Block #${height}`);
                }
            }

            if (errorLog.length > 0) {
                // res.send(`Block errors = ${errorLog.length}\nBlocks: ${errorLog}`);
                res.send({errorLog});
            }
            else {
                res.send("No errors detected");
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
            for (let index = 0; index < 10; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`);
                blockAux.height = index;
                if (this.blocks.length > 0){
                    blockAux.previousBlockHash = this.blocks[this.blocks.length - 1].hash;
                }
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.push(blockAux);
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}