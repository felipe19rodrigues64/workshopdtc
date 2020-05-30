var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/workshoptdc", { useNewUrlParser: true })
            .then(conn => global.conn = conn.db("workshoptdc"))
            .catch(err => console.log(err))

const TAMANHO_PAGINA = 5;

function findAll(pagina, callback){  
    const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1);
    global.conn.collection("customers").find({})
                                       .skip(tamanhoSkip)
                                       .limit(TAMANHO_PAGINA)
                                       .toArray(callback);
}

//callback deve considerar error e count
function countAll(callback){  
    global.conn.collection("customers").count(callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("customers").find(new ObjectId(id)).toArray(callback);
}

function insert(customer, callback){
    global.conn.collection("customers").insert(customer, callback);
}

function update(id, customer, callback){
    global.conn.collection("customers").updateOne(new ObjectId(id), customer, callback);
}

function deleteOne(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne, countAll, TAMANHO_PAGINA }
