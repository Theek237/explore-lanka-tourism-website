pipeline {
    agent any

    environment {
        DOCKERHUB_ID = 'theek237'
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials'
    }

    stages {
        stage('Build Frontend Image') {
            steps {
                script {
                    echo 'Building the React frontend Docker image...'
                    dir('frontend') {
                        sh "docker build -t ${env.DOCKERHUB_ID}/explore-lanka-client:latest ."
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    echo 'Building the Node.js backend Docker image...'
                    dir('backend') {
                        sh "docker build -t ${env.DOCKERHUB_ID}/explore-lanka-server:latest ."
                    }
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    // login to docker hub
                    withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin'
                    }
                    
                    // push frontend image
                    echo "Pushing frontend image to Docker Hub..."
                    sh "docker push ${env.DOCKERHUB_ID}/explore-lanka-client:latest"

                    // push backend image
                    echo "Pushing backend image to Docker Hub..."
                    sh "docker push ${env.DOCKERHUB_ID}/explore-lanka-server:latest"
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                script {
                    try {
                        sshagent(credentials: ['aws-ssh-key']) {
                            // Bind GEMINI_API_KEY from Jenkins Credentials (Secret text with ID 'gemini-api-key')
                            withCredentials([string(credentialsId: 'gemini-api-key', variable: 'GEMINI_API_KEY')]) {
                                echo 'Deploying the new images to AWS server...'
                                dir('infra/ansible') {
                                    sh '''
                                      ansible-playbook -i inventory.ini playbook.yml \
                                        -e gemini_api_key=$GEMINI_API_KEY \
                                        --ssh-common-args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null'
                                    '''
                                }
                            }
                        }
                    } catch (e) {
                        // ssh-agent plugin may throw IOException during cleanup even after successful deployment
                        if (e.toString().contains('ssh-agent')) {
                            echo "Ignoring ssh-agent cleanup error: ${e.message}"
                        } else {
                            throw e
                        }
                    }
                }
            }
        }
    } 

    post {
        always {
            echo 'Logging out from Docker Hub...'
            sh 'docker logout'
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