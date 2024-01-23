output "s3_bucket_url" {
  value = aws_s3_bucket_website_configuration.website_index.website_endpoint
}

