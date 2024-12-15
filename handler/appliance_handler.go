package handler

import (
	"a21hc3NpZ25tZW50/model"
	"a21hc3NpZ25tZW50/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ApplianceHandler struct {
	applianceService 	service.ApplianceService
	aiService   			service.AIService
}

func NewApplianceHandler(applianceService service.ApplianceService, aiService service.AIService) *ApplianceHandler {
	return &ApplianceHandler{
		applianceService: applianceService,
		aiService:   aiService,
	}
}

func (h *ApplianceHandler) CreateAppliance() gin.HandlerFunc {
	return func(c *gin.Context) {
		var appliance model.Appliance
		if err := c.ShouldBindJSON(&appliance); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := h.applianceService.Create(&appliance); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Appliance created successfully"})
	}
}

func (h *ApplianceHandler) GetAllAppliances() gin.HandlerFunc {
	return func(c *gin.Context) {
		appliances, err := h.applianceService.GetAll()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, appliances)
	}
}

func (h *ApplianceHandler) GetApplianceByName() gin.HandlerFunc{
	return func(c *gin.Context) {
		applianceName := c.Param("name")
		if applianceName == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Appliance name is required"})
			return
		}

		records, err := h.applianceService.GetByName(applianceName)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve data"})
			return
		}

		c.JSON(http.StatusOK, records)
	}
}

func (h *ApplianceHandler) AnalyzeAppliances() gin.HandlerFunc {
	return func(c *gin.Context) {
		var request = model.ApplianceAnalyze{}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if request.StartDate == "" || request.EndDate == "" || request.Query == "" || request.Model == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
			return
		}

		appliances, err := h.applianceService.GetByDate(request.StartDate, request.EndDate)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if len(appliances) == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "No data found for the given date range"})
			return
		}

		table := make(map[string][]string)
		table["Name"] = []string{}
		table["Date"] = []string{}
		table["Consumption"] = []string{}
		for _, appliance := range appliances {
			table["Name"] = append(table["Name"], appliance.Appliance)
			table["Date"] = append(table["Date"], appliance.Date)
			consumption := strconv.FormatFloat(appliance.EnergyConsumption, 'f', 2, 64)
			table["Consumption"] = append(table["Consumption"], consumption)
		}

		result, err := h.aiService.AnalyzeData(table, request.Query, request.Model)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"result": result})
	}
}