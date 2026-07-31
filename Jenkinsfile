pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
    steps {
        sh '''
        cd deploy/docker-compose
        docker-compose build
        '''
            }
        }

        stage('Deploy') {
    steps {
        sh '''
        cd deploy/docker-compose
        docker-compose up -d
        '''
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps'
            }
        }
    }
}
