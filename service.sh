#!/system/bin/sh
# Performance Module - Service Script
# Optimizes FPS, CPU, and GPU for gaming and system performance

MODDIR=${0%/*}
MODPATH=$MODDIR

# Enable logging
exec 2>$MODDIR/service.log
set -x

# Function to write to system properties
setprop() {
    /system/bin/setprop "$1" "$2"
}

# Function to write to sysfs
write_sysfs() {
    if [ -w "$1" ]; then
        echo "$2" > "$1"
    fi
}

# GPU Optimization
gpu_optimize() {
    # Enable GPU boost
    write_sysfs /sys/class/devfreq/*/governor "performance"
    write_sysfs /sys/devices/platform/*/devfreq/*/governor "performance"
    
    # GPU frequency scaling
    for gpu in /sys/class/kgsl/kgsl-3d*; do
        if [ -d "$gpu" ]; then
            write_sysfs "$gpu/devfreq/max_freq" "700000000"
        fi
    done
}

# CPU Optimization
cpu_optimize() {
    # Set CPU governor to performance for better FPS
    for cpu in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
        write_sysfs "$cpu" "performance"
    done
    
    # Increase CPU frequency scaling
    for cpu in /sys/devices/system/cpu/cpu*/cpufreq/scaling_max_freq; do
        if [ -w "$cpu" ]; then
            cat "$cpu" > "$cpu" 2>/dev/null
        fi
    done
    
    # Enable CPU boost
    write_sysfs /sys/module/cpu_boost/parameters/input_boost_enabled 1
}

# Memory Optimization
memory_optimize() {
    # Increase minfree
    write_sysfs /proc/sys/vm/extra_free_kbytes 43200
    
    # Optimize swappiness
    write_sysfs /proc/sys/vm/swappiness 10
    
    # Disable memory compaction
    write_sysfs /proc/sys/vm/compact_memory 0
}

# I/O Optimization
io_optimize() {
    # Set I/O scheduler to performance
    for iosched in /sys/block/*/queue/scheduler; do
        if [ -w "$iosched" ]; then
            echo "noop" > "$iosched" 2>/dev/null || echo "none" > "$iosched" 2>/dev/null
        fi
    done
}

# FPS Boost Function
fps_boost() {
    # Disable CPU input boost delay
    write_sysfs /sys/module/cpu_input_boost/parameters/input_boost_ms 0
    
    # Reduce frame drops
    setprop ro.vendor.extension_library ""
    setprop debug.atrace.tags.enableflags 0
}

# Main execution
gpu_optimize
cpu_optimize
memory_optimize
io_optimize
fps_boost

# Completion
echo "Performance Module initialized successfully" >> $MODDIR/service.log
