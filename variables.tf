variable "bucket_name" {
  description = "name of s3 bucket"
  type        = string
}

variable "region" {
  description = "s3 region"
  type        = string
  default     = "us-east-1"
}
