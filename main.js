// Basic Blockchain configuration as ArrayList/LinkedList
// no proof of work, mining

let CryptoJS = require("crypto-js");

class Block {
  constructor(index, data, prevHash) {
    this.index = index;
    this.timestamp = Math.floor(Date.now() / 1000);
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.getHash();
  }

  getHash() {
    // Create Hash using block data values as salt
    return CryptoJS.SHA256(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [];
  }

  addBlock(data) {
    let index = this.chain.length;
    let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
    let block = new Block(index, data, prevHash);
    this.chain.push(block);
  }

  chainIsValid() {
    // Two validation checks per block must be passed for every block in chain
    for (let i = 0; i < this.chain.length; i++) {
      // 1. the block's current "hash" value must match the results of a real-time call to "getHash()"
      if (this.chain[i].hash !== this.chain[i].getHash()) return false;
      // 2. for each block with a "prevHash" entry, that value must match "hash" value of previous block
      if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash) return false;
    }
    // Validation checks passed
    return true;
  }
}

// ========================= TEST =========================
// ======== Initialize a new BlockChain
// const OfficialBlockchain = new BlockChain();

// OfficialBlockchain.addBlock({ sender: "Brian Hummel", receiver: "M Gustave", amount: 500 });
// OfficialBlockchain.addBlock({ sender: "Jopling", receiver: "Deputy Kovacs", amount: 100 });
// OfficialBlockchain.addBlock({ sender: "Mr. Moustafa", receiver: "Henckels", amount: 50 });

// console.log(JSON.stringify(OfficialBlockchain, null, 4));

// ======== Check Chain Validity
// console.log("Validity: ", OfficialBlockchain.chainIsValid());

// ======== Modify Chain and check validity again
// OfficialBlockchain.chain[0].data.reciver = "Madame D.";
// console.log("Validity: ", OfficialBlockchain.chainIsValid());
