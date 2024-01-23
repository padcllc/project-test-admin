resource "aws_s3_bucket" "s3_bucket" {
  bucket_prefix = var.bucket_name
}

module "template_files" {
  source   = "hashicorp/dir/template"
  base_dir = "./build"
}

resource "aws_s3_object" "index_html" {
  depends_on = [aws_s3_bucket.s3_bucket, aws_s3_bucket_ownership_controls.example]
  for_each   = module.template_files.files

  bucket       = aws_s3_bucket.s3_bucket.id
  key          = each.key
  content_type = each.value.content_type
  source       = each.value.source_path
  content      = each.value.content
  acl          = "public-read"
  etag         = each.value.digests.md5
}

resource "aws_s3_bucket_website_configuration" "website_index" {
  bucket = aws_s3_bucket.s3_bucket.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket                  = aws_s3_bucket.s3_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_ownership_controls" "example" {
  bucket = aws_s3_bucket.s3_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}


resource "aws_s3_bucket_cors_configuration" "example" {
  depends_on = [aws_s3_bucket.s3_bucket, aws_s3_bucket_ownership_controls.example]
  bucket     = aws_s3_bucket.s3_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["x-amz-server-side-encryption", "x-amz-request-id", "x-amz-id-2"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

#--------------------------------------------------------------------------------------

# SSL Certificate for custom domains (Assuming you're using ACM for SSL)
# resource "aws_acm_certificate" "ssl_certificate" {
#   domain_name       = "yourdomain.com"  # Update with your custom domain
#   validation_method = "DNS"
# }

# Custom domain mapping for development environment
# resource "aws_route53_record" "domain_mapping" {
#   name    = "dev.yourdomain.com" # Update with your custom subdomain
#   type    = "A"
#   zone_id = "your_route53_zone_id" # Update with your Route53 hosted zone ID

#   alias {
#     name                   = aws_s3_bucket.s3_bucket.website_endpoint
#     zone_id                = "Z2FDTNDATAQYW2" # S3 Zone ID, do not change
#     evaluate_target_health = false
#   }
# }
