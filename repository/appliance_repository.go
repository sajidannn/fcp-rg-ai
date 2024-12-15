package repository

import (
	"a21hc3NpZ25tZW50/model"

	"gorm.io/gorm"
)

type ApplianceRepo interface {
	Create(appliance *model.Appliance) error
	GetAll() ([]model.Appliance, error)
}


// applianceRepo defines the repository for Appliance model.
type applianceRepo struct {
	db *gorm.DB
}

func NewApplianceRepo(db *gorm.DB) *applianceRepo {
	return &applianceRepo{db}
}

// Create inserts a new Appliance record into the database.
func (repo *applianceRepo) Create(energyConsumption *model.Appliance) error {
	return repo.db.Create(energyConsumption).Error
}

// GetAll retrieves all Appliance records from the database.
func (repo *applianceRepo) GetAll() ([]model.Appliance, error) {
	var records []model.Appliance
	err := repo.db.Find(&records).Error
	return records, err
}
