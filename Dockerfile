FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
COPY daka-back-end/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
