aws eks update-kubeconfig --region ap-southeast-3 --name APLOG-EKS
aws ecr get-login-password --region ap-southeast-3 | docker login --username AWS --password-stdin 851725647704.dkr.ecr.ap-southeast-3.amazonaws.com
docker build -t inshopper_api .
docker tag inshopper_api:latest 851725647704.dkr.ecr.ap-southeast-3.amazonaws.com/inshopper_api:latest
docker push 851725647704.dkr.ecr.ap-southeast-3.amazonaws.com/inshopper_api:latest
kubectl apply -f eks.yaml