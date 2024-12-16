package repository

import (
	"a21hc3NpZ25tZW50/model"

	"gorm.io/gorm"
)

type SensorRepository interface {
	SaveSensorData(data *model.SensorData) error
	GetLatestSensorData() (*model.SensorData, error)
}

type sensorRepository struct {
	db *gorm.DB
}

func NewSensorRepository(db *gorm.DB) SensorRepository {
	return &sensorRepository{db: db}
}

func (r *sensorRepository) SaveSensorData(data *model.SensorData) error {
	return r.db.Create(data).Error
}

func (r *sensorRepository) GetLatestSensorData() (*model.SensorData, error) {
	var data model.SensorData
	err := r.db.Last(&data).Error
	if err != nil {
		return nil, err
	}
	return &data, nil
}

