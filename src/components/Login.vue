<template>
    <div>
        <h4 class="my-4">Please type password to enter.</h4>
        <b-form inline>
            <b-form-input class="mb-2 mr-sm-2 mb-sm-0" type="password" name="password" v-model="input.password" placeholder="Password"></b-form-input>
            <b-button v-on:click="login()">Login</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Login",
    data() {
        return {
            input: {
                username: "admin",
                password: ""
            }
        }
    },
    methods: {
        login() {
            axios.defaults.withCredentials = true;
            axios
            .post(this.$root.BACKEND_BASE + '/login', this.input)
            .then(response => {
                if (response.status == '200') {
                    axios
                    .get(this.$root.BACKEND_BASE + '/user', {withCredentials: true})
                    .then(response => {
                        if (response.status == '200') {
                            this.$store.commit("setAuthentication", true);
                            this.$router.replace({ name: "admin" });
                        }
                    });
                } else {
                    console.log("The username and / or password is incorrect");
                }

            });
        }
    }
}
</script>

<style scoped></style>