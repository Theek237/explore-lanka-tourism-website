# Generate SSH Key
resource "tls_private_key" "app_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}
//
# Save the generated private key
resource "local_file" "private_key_pem" {
  content         = tls_private_key.app_key.private_key_pem
  filename        = "explore-lanka-key.pem"
  file_permission = "0400" # Read-only permission for the owner
}

# Upload public key to AWS
resource "aws_key_pair" "app_key_pair" {
  key_name   = "explore-lanka-key"
  public_key = tls_private_key.app_key.public_key_openssh
}

# Find Ubuntu server image in AWS
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical's owner ID
}

# Create EC2 instance
resource "aws_instance" "app_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro" 
  key_name      = aws_key_pair.app_key_pair.key_name
  
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  # Increase root volume size to 20GB for Docker images
  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  tags = {
    Name = "Explore-Lanka-Server"
  }
}

# Show server's public ip as output
output "instance_public_ip" {
  value       = aws_instance.app_server.public_ip
  description = "The public IP address of the web server."
}
