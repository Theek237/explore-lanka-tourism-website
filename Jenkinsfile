pipeline {
    agent any

    stages {
        stage('Build Frontend Image') {
            steps {
                script {
                    echo 'Building the React frontend Docker image...'
                    dir('frontend') {
                        sh 'docker build -t explore-lanka-client:latest .'
                    }
                }
            }
        }
        stage('Build Backend Image') {
            steps {
                script {
                    echo 'Building the Node.js backend Docker image...'
                    dir('backend') {
                        sh 'docker build -t explore-lanka-server:latest .'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}