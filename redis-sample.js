/*

Commands to install redis on mysql
sudo yum -y install gcc make # install GCC compiler
cd /usr/local/src 
sudo wget http://download.redis.io/redis-stable.tar.gz
sudo tar xvzf redis-stable.tar.gz
sudo rm -f redis-stable.tar.gz
cd redis-stable
sudo make distclean
sudo make


sudo cp src/redis-server /usr/local/bin/
sudo cp src/redis-cli /usr/local/bin/

redis-server

npm install redis inside backend dir

https://medium.com/@ss.shawnshi/how-to-install-redis-on-ec2-server-for-fast-in-memory-database-f30c3ef8c35e
https://medium.com/tech-tajawal/introduction-to-caching-redis-node-js-e477eb969eab

*/

const redis = require('redis')

// create and connect redis client to local instance.
const client = redis.createClient(6379)

// echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});

router.post('/login',function(req,res){
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);

    // key to check in Redis store
    const loginKey = `login:${req.body.email}`;

    // Try fetching the result from Redis first in case we have it cached
    return client.get(loginKey, (err, user) => {

    	// If that key exists in Redis store
        if (user) {
        	// Validate password and send appropriate response

        } else {

        	// Make kafka request and save user object in redis
        	// Save the  API response in Redis store, data expire time in 3600 seconds, that is one hour
        	client.setex(loginKey, 3600, JSON.stringify(user))

        	// Send JSON response to client
        }

    }