const scanner = require('sonarqube-scanner').default;

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "sqp_16d1d631270ef781b501ce658e9d0639b1962b86",
        options: {
            'sonar.projectName': 'RMS',
            'sonar.projectDescription': 'RMS',
            'sonar.projectKey': 'RMS',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.ws.timeout':120
        }
    },
    error => {
        if (error) {
            console.error(error);
        }
        process.exit();
    },
)