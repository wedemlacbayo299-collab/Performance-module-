#!/bin/bash

# Early boot optimization script

# Disable unused services
systemctl disable other-service

# Adjust the kernel parameters
sysctl -w kernel.sched_min_granularity_ns=1000000

# Clean up temp files
rm -rf /tmp/*

# Log message
logger "Post-FS data operations executed."