package repository

import (
	"encoding/csv"
	"errors"
	"os"
	"strings"
)

// FileRepository provides methods to interact with the file system.
type FileRepository struct{}

// NewFileRepository creates a new instance of FileRepository.
func NewFileRepository() *FileRepository {
	return &FileRepository{}
}

// SaveFile saves the uploaded file content to the server's file system.
func (r *FileRepository) SaveFile(filename string, content []byte) error {
	return os.WriteFile(filename, content, 0644)
}

// ReadFile reads the content of a file from the server's file system.
func (r *FileRepository) ReadFile(filename string) ([]byte, error) {
	return os.ReadFile(filename)
}

// FileExists checks if a file already exists.
func (r *FileRepository) FileExists(filename string) bool {
	_, err := os.Stat(filename)
	return !os.IsNotExist(err)
}

// ReadFileContent parses a string of CSV content and returns the records as a 2D slice.
func (r *FileRepository) ReadFileContent(fileContent string) ([][]string, error) {
	reader := csv.NewReader(strings.NewReader(fileContent))
	records, err := reader.ReadAll()
	if err != nil {
		return nil, errors.New("failed to parse CSV content")
	}
	return records, nil
}
