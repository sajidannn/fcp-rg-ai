package handler

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ApplianceHandler struct {
	service service.ApplianceService
}

func NewApplianceHandler(service service.ApplianceService) *ApplianceHandler {
	return &ApplianceHandler{service: service}
}

func (h *ApplianceHandler) CreateAppliance() gin.HandlerFunc {
	return func(c *gin.Context) {
		var appliance model.Appliance
		if err := c.ShouldBindJSON(&appliance); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := h.service.Create(&appliance); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Appliance created successfully"})
	}
}

func (h *ApplianceHandler) GetAllAppliances() gin.HandlerFunc {
	return func(c *gin.Context) {
		appliances, err := h.service.GetAll()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, appliances)
	}
}
