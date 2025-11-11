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
                        sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
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
                    echo 'Deploying the new images to AWS server...'
                    dir('infra') {
                        if (fileExists('explore-lanka-key.pem')) {
                            // Use key from repo
                            sh '''
                              chmod 600 explore-lanka-key.pem || true
                              ansible-playbook -i inventory.ini playbook.yml \
                                --private-key explore-lanka-key.pem \
                                --ssh-common-args='-o StrictHostKeyChecking=no'
                            '''
                        } else {
                            // Fallback to Jenkins SSH credentials (configure this ID in Jenkins)
                            withCredentials([sshUserPrivateKey(credentialsId: 'explore-lanka-ssh-key', keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'SSH_USER')]) {
                                sh '''
                                  chmod 600 "$SSH_KEY_FILE" || true
                                  ansible-playbook -i inventory.ini playbook.yml \
                                    --private-key "$SSH_KEY_FILE" \
                                    --ssh-common-args='-o StrictHostKeyChecking=no'
                                '''
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            // log out from docker hub
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