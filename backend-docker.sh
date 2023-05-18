cd backend

docker build . -t backend && echo "Docker image build done !"

docker run -p 3000:3000 -d backend && echo "Docker is now running on port 3000 in the background (detached) !"

