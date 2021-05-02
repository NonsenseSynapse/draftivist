node {
    checkout scm

    stage('Build image') {
        echo "Jenkinsfile building staging with version tag ${VERSION_TAG}"
        sh 'jenkins/build_staging.sh ${VERSION_TAG}'
    }
}