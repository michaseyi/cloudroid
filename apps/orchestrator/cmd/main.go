package main

import (
	containermanager "cloudroid/orchestrator/internal/container-manager"
)

func main() {
	orchestrator := containermanager.NewOrchestrator()
	orchestrator.Init()
}
