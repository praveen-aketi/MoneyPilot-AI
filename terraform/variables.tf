variable "project_name" {
  description = "The name of the project, used for naming resources."
  type        = string
  default     = "moneypilot"
}

variable "environment" {
  description = "The deployment environment (e.g., dev, prod)."
  type        = string
  default     = "dev"
}

variable "location" {
  description = "The Azure region to deploy resources."
  type        = string
  default     = "East US"
}

variable "node_count" {
  description = "The initial number of nodes for the AKS cluster."
  type        = number
  default     = 2
}
