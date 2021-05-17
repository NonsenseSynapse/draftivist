// pipeline {
//     checkout scm

//     agent {
//         dockerfile {
//             filename 'Dockerfile.prod'
//             label 'draftivist_staging'
//             additionalBuildArgs  '--build-arg API_HOST="${API_HOST}" --build-arg STATIC_PATH="${STATIC_PATH}"'
//             args '-t draftivist_staging:"${VERSION_TAG}'
//         }
//     }
//     stages {
//         stage('Build') {
//             echo "Jenkinsfile building staging with version tag ${VERSION_TAG}"
//             sh 'jenkins/build_staging.sh ${VERSION_TAG}'
//         }
//         stage('Deploy') {
//             echo "Exporting and deploying Docker image to remote server"
//             sh 'jenkins/export_staging.sh ${VERSION_TAG}'
//             sshPublisher(publishers: [{'configName': 'STAGING_DROPLET', 'sourceFiles': 'draftivist_staging_${VERSION_TAG}.tar', 'remoteDirectory': '~/pipetest'}])
//         }
//     }
// }

node {
    checkout scm

    stage('Build image') {
        echo "Jenkinsfile building staging with version tag ${VERSION_TAG}"
        sh "jenkins/build_staging.sh ${VERSION_TAG}"
    }

    stage('Publish image to Docker Hub') {
        steps {
            withDockerRegistry([ credentialsId: "DOCKER_HUB", url: "" ]) {
              sh  'docker push nonsensesynapse/draftivist:latest'
              sh  'docker push nonsensesynapse/draftivist:${VERSION_TAG}'
            }

        }
    }

//     stage('Deploy') {
//         echo "Exporting and deploying Docker image to remote server"
//         sh "enkins/export_staging.sh ${VERSION_TAG}"
//     }
}