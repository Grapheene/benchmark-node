# benchmark-node

a simple benchmark

1. Copy sample.env to .env
2. Replace environmental variables with your Grapheene credentials
3. run an npm install
4. run npm start

execution time will be outputed and a node profile log will be created

### Results

The console will display something similar to...

```
> benchmark-node@1.0.0 start
> NODE_ENV=production node --prof app.js

This client has already been setup.
No custom DATABASE_URL provided, using a default SQLite local db
    Set DATABASE_URL env if you want to use your own PostgreSQL db
File successfully closed
{
  uuid: 'RD3D42B154098E41219AD2FD88FA0DCB69',
  name: '1GB.bin',
  path: './1GB.bin',
  service: 'local'
}
sync: 2.399s

```

### Conclusion

With Grapheene's KMF and industry leading AES 256bit encryption we can encrypt a 1GB file in about 2 seconds!
