package service

import (
	"errors"
	"strings"
)

type RepositoryInterface interface {
	ReadFileContent(fileContent string) ([][]string, error)
}

type FileService struct {
	Repo RepositoryInterface
}

func NewFileService(repo RepositoryInterface) *FileService {
	return &FileService{Repo: repo}
}

func (s *FileService) ProcessFile(fileContent string) (map[string][]string, error) {
	if strings.TrimSpace(fileContent) == "" {
		return nil, errors.New("CSV file content is empty")
	}

	records, err := s.Repo.ReadFileContent(fileContent)
	if err != nil {
		return nil, err
	}

	if len(records) < 2 {
		return nil, errors.New("CSV file is missing header row")
	}

	table := make(map[string][]string)
	headers := records[0]

	for _, record := range records[1:] {
		if len(record) != len(headers) {
			return nil, errors.New("CSV record length does not match header length")
		}

		for i, header := range headers {
			table[header] = append(table[header], record[i])
		}
	}

	return table, nil
}
