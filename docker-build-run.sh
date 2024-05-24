#!/bin/bash
sudo docker build . -t sflab_benchmark_front
sudo docker run -it -d -p 8081:80 sflab_benchmark_front