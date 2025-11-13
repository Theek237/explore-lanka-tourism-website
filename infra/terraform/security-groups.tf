resource "aws_security_group" "app_sg" {
  name        = "explore-lanka-sg"
  description = "Allow web and SSH traffic"


  # Allow traffic coming from port 80(HTTP)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow traffic from port 22(SSH) 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Note: For learning only. In production, limit this to your IP.
  }

  # Allow any traffic going outide the server
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "explore-lanka-sg"
  }
}
