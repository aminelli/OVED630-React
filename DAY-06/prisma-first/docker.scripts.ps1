
docker build -t myorg/prismatest:v1.0 .

docker run -d --name react-test --hostname react-test --network net-react -p 3000:3000 myorg/prismatest:v1.0