package handler

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SensorHandler struct {
	service service.SensorService
}

func NewSensorHandler(service service.SensorService) *SensorHandler {
	return &SensorHandler{service: service}
}

func (h *SensorHandler) SaveSensorData() gin.HandlerFunc {
	return func(c *gin.Context) {
		var request model.SensorData
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		if err := h.service.StoreSensorData(&request); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save sensor data"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Sensor data saved successfully"})
	}
}

func (h *SensorHandler) GetLatestSensorData() gin.HandlerFunc {
	return func(c *gin.Context) {
		data, err := h.service.GetLatestData()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch latest sensor data"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"data":   data,
		})
	}
}
