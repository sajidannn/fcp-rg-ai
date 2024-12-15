package repository

import (
	"a21hc3NpZ25tZW50/model"

	"gorm.io/gorm"
)

type ApplianceRepo interface {
	Create(appliance *model.Appliance) error
	GetAll() ([]model.Appliance, error)
	GetByName(applianceName string) ([]model.Appliance, error)
	GetByDate(startDate, endDate string) ([]model.Appliance, error)
}

type applianceRepo struct {
	db *gorm.DB
}

func NewApplianceRepo(db *gorm.DB) ApplianceRepo {
	return &applianceRepo{db}
}

func (repo *applianceRepo) Create(appliance *model.Appliance) error {
	return repo.db.Create(appliance).Error
}

func (repo *applianceRepo) GetAll() ([]model.Appliance, error) {
	var records []model.Appliance
	err := repo.db.Find(&records).Error
	return records, err
}

func (repo *applianceRepo) GetByName(applianceName string) ([]model.Appliance, error) {
	var records []model.Appliance
	err := repo.db.Where("appliance = ?", applianceName).Last(&records).Error
	return records, err
}

func (repo *applianceRepo) GetByDate(startDate, endDate string) ([]model.Appliance, error) {
	var records []model.Appliance
	err := repo.db.Where("date >= ? AND date <= ?", startDate, endDate).Find(&records).Error
	return records, err
}
