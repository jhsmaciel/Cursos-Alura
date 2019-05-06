var cluster = require('cluster');
var cpus = require('os').cpus();

console.log('exec thread')
if(cluster.isMaster){
    console.log('th master')
    cpus.forEach(function(){
        cluster.fork()
    });
    cluster.on('listening', worker => {
        console.log('Cluster %d connected', worker.process.pid)
    });
    cluster.on('exit',worker => {
        console.log('Cluster %d desconnected', worker.process.pid)
        cluster.fork();
    })
} else {
    console.log('th slave')
    require('./index');
}
