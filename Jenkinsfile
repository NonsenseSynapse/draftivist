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
                    docker.withDockerRegistry([ credentialsId: "DOCKER_HUB", url: "" ]) {
                        sh  'docker push nonsensesynapse/draftivist:latest'
                        sh  'docker push nonsensesynapse/draftivist:${VERSION_TAG}'
                    }
                }
            }
        }
    }
}


// node {
//     checkout scm
//
//     stage('Build image') {
//         echo "Jenkinsfile building staging with version tag ${VERSION_TAG}"
//         sh "jenkins/build_staging.sh ${VERSION_TAG}"
//     }
//
//     stage('Publish image to Docker Hub') {
//         docker.withDockerRegistry([ credentialsId: "DOCKER_HUB", url: "" ]) {
//           sh  'docker push nonsensesynapse/draftivist:latest'
//           sh  'docker push nonsensesynapse/draftivist:${VERSION_TAG}'
//         }
//
//     }
//
// //     stage('Deploy') {
// //         echo "Exporting and deploying Docker image to remote server"
// //         sh "enkins/export_staging.sh ${VERSION_TAG}"
// //     }
// }