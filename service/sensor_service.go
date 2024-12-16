package service

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/repository"
)

type SensorService interface {
	StoreSensorData(data *model.SensorData) error
	GetLatestData() (*model.SensorData, error)
}

type sensorService struct {
	repo repository.SensorRepository
}

func NewSensorService(repo repository.SensorRepository) SensorService {
	return &sensorService{repo: repo}
}

func (s *sensorService) StoreSensorData(data *model.SensorData) error {
	return s.repo.SaveSensorData(data)
}

func (s *sensorService) GetLatestData() (*model.SensorData, error) {
	return s.repo.GetLatestSensorData()
}

