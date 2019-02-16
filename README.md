Build Angular code with cli: ng build.
Run: node server. It picks angular code from dist and redirects * reqs to Angular.

Get:
  git clone https://github.com/akash-potdar7/mean.git
  cd mean
  npm install --save
  ng build --prod
  node server

Current Agenda:
1.  Dockerize the whole app. [PARTLY DONE: SOLUTION PENDING]
2.  Create a webserver, lets say nginx [DONE]
3.  Dockerize it. [DONE]
4.  Setup docker-compose [DONE]
5.  cmd: node server -> will serve api along with db connections made. [DONE]
6.  Build a solution to bring the app up and running, with angular-cli hot reloading. If possible in max 2 containers. [TODO]

[NOTE]
Contributors are welcome. Raise a pull request.
