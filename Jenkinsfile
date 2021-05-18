pipeline {
    agent any

    stages {
        stage('Build image') {
            steps {
                echo "Jenkinsfile building staging with version tag ${VERSION_TAG}"
                sh "jenkins/build_staging.sh ${VERSION_TAG}"
            }
        }

        stage('Publish image to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([ credentialsId: "DOCKER_HUB", url: "" ]) {
//                         sh  'docker push nonsensesynapse/draftivist:latest'
                        sh  'docker push nonsensesynapse/draftivist:${VERSION_TAG}'
                    }
                }
            }
        }

        stage('Deploy to Droplet') {
//             environment {
//                 STAGING_USER = credentials('STAGING_USER')
//                 STAGING_IP_ADDRESS = credentials('STAGING_IP_ADDRESS')
//             }

            steps {
                script {
                    sshagent(credentials : ['STAGING_DROPLET']) {
                        withDockerRegistry([ credentialsId: "DOCKER_HUB", url: "" ]) {
//                         sh "jenkins/export_staging.sh ${VERSION_TAG}"
                            sh "jenkins/deploy_staging.sh ${VERSION_TAG}"
                        }
//                         sh "pwd"
//                         sh 'ssh -t root@staging.draftivist.com -o StrictHostKeyChecking=no "pwd && pwd"'
//                         sh "pwd"
                    }
                }
            }
        }
    }
}
