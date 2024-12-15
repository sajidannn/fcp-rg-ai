package service

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/repository"
)

type ApplianceService interface {
	Create(appliance *model.Appliance) error
	GetAll() ([]model.Appliance, error)
	GetByName(applianceName string) ([]model.Appliance, error)
	GetByDate(startDate, endDate string) ([]model.Appliance, error)
}

type applianceService struct {
	applianceRepository repository.ApplianceRepo
}

func NewApplianceService(applianceRepository repository.ApplianceRepo) ApplianceService {
	return &applianceService{applianceRepository}
}

func (s *applianceService) Create(appliance *model.Appliance) error {
	return s.applianceRepository.Create(appliance)
}

func (s *applianceService) GetAll() ([]model.Appliance, error) {
	return s.applianceRepository.GetAll()
}

func (s *applianceService) GetByName(applianceName string) ([]model.Appliance, error) {
	return s.applianceRepository.GetByName(applianceName)
}

func (s *applianceService) GetByDate(startDate, endDate string) ([]model.Appliance, error) {
	return s.applianceRepository.GetByDate(startDate, endDate)
}

