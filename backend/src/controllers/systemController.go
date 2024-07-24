package controllers

import (
	"encoding/json"
	"net/http"
	"os/exec"

	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/load"
	"github.com/shirou/gopsutil/mem"
)

func GetSystemInfo(w http.ResponseWriter, r *http.Request) {
	var specs struct {
		Hostname string `json:"hostname"`
		Kernel string `json:"kernel"`
		TotalMemory uint64 `json:"totalMemory"`
		UsedMemory uint64 `json:"usedMemory"`
		CPU string `json:"cpu"`
		CPUUsage float64 `json:"cpuUsage"`
		TotalDiskSpace uint64 `json:"totalDiskSpace"`
		UsedDiskSpace uint64 `json:"usedDiskSpace"`
	}

	hostname, _ := exec.Command("hostname").Output()
	kernel, _ := exec.Command("uname", "-r").Output()
	cpu, _ := cpu.Info()
	cpuUsage, _ := load.Avg()
	memory, _ := mem.VirtualMemory()
	disk, _ := disk.Usage("/")

	specs.Hostname = string(hostname)
	specs.Kernel = string(kernel)
	specs.TotalMemory = memory.Total / 1024 / 1024
	specs.UsedMemory = memory.Used / 1024 / 1024
	specs.CPU = cpu[0].ModelName
	specs.CPUUsage = cpuUsage.Load1
	specs.TotalDiskSpace = disk.Total / 1024 / 1024
	specs.UsedDiskSpace = disk.Used / 1024 / 1024

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(specs)
}