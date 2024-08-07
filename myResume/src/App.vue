<template>
  <v-app>
    <v-main>
      <header>
        <h1>Web developer, Resume</h1>
        <p>A free, responsive, one page Bootstrap theme</p>
      </header>
      <section>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <h2>Skill</h2>
              <p>
                <ul>
                  <li>Java, Spring, Spring Boot, PHP</li>
                  <li>Linux, Windows, Docker</li>
                </ul>
              </p>
            </v-col>
            <v-col cols="12" md="6">
              <h2>Contact</h2>
              <p>
                For more information, please contact us at info@example.com.
              </p>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <footer>
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style src="./assets/styles.css"></style>

<!-- <template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script> -->
