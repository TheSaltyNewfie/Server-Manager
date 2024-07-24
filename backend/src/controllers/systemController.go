package controllers

import (
	"encoding/json"
	"net/http"
	"os/exec"

	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
)

func GetSystemInfo(w http.ResponseWriter, r *http.Request) {
	var specs struct {
		Hostname string `json:"hostname"`
		Kernel string `json:"kernel"`
		Memory uint64 `json:"memory"`
		CPU string `json:"cpu"`
		TotalDiskSpace uint64 `json:"TotalDiskSpace"`
		UsedDiskSpace uint64 `json:"UsedDiskSpace"`
	}

	hostname, _ := exec.Command("hostname").Output()
	kernel, _ := exec.Command("uname", "-r").Output()
	cpu, _ := cpu.Info()
	memory, _ := mem.VirtualMemory()
	disk, _ := disk.Usage("/")

	specs.Hostname = string(hostname)
	specs.Kernel = string(kernel)
	specs.Memory = memory.Total / 1024 / 1024
	specs.CPU = cpu[0].ModelName
	specs.TotalDiskSpace = disk.Total / 1024 / 1024
	specs.UsedDiskSpace = disk.Used / 1024 / 1024

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(specs)
}