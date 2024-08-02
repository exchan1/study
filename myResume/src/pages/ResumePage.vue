<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1>이력서</h1>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-card>
            <v-card-title>기술</v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="tech in technologies" :key="tech.name" cols="3">
                  <v-img
                    :src="tech.image"
                    :alt="tech.name"
                    class="mb-2"
                  ></v-img>
                  <v-chip>{{ tech.name }}</v-chip>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-card>
            <v-card-title>이력</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="n in 3" :key="n">
                  <v-list-item-content>
                    <v-list-item-title>이력 {{ n }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-card>
            <v-card-title>연락처</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >이메일: example@example.com</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "ResumePage",
  data() {
    return {
      technologies: [
        { name: "JAVA", image: "path/to/java.png" },
        { name: "Javascript", image: "path/to/javascript.png" },
        { name: "VueJS", image: "path/to/vuejs.png" },
        { name: "Oracle", image: "path/to/oracle.png" },
        { name: "Mysql", image: "path/to/mysql.png" },
        { name: "MariaDB", image: "path/to/mariadb.png" },
        { name: "MSSQL", image: "path/to/mssql.png" },
        { name: "Docker", image: "path/to/docker.png" },
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.v-img {
  max-width: 100px;
  margin: 0 auto;
}
</style>
