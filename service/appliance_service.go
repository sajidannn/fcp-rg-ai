package service

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/repository"
)

type ApplianceService interface {
	Create(energyConsumption *model.Appliance) error
	GetAll() ([]model.Appliance, error)
}

type applianceService struct {
	applianceRepository repository.ApplianceRepo
}

func NewApplianceService(applianceRepository repository.ApplianceRepo) ApplianceService {
	return &applianceService{applianceRepository}
}

func (s *applianceService) Create(energyConsumption *model.Appliance) error {
	return s.applianceRepository.Create(energyConsumption)
}

func (s *applianceService) GetAll() ([]model.Appliance, error) {
	return s.applianceRepository.GetAll()
}
