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
    export default {
        name: "Login",
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if(this.input.password == "pass") {
                    this.$store.commit("setAuthentication", true);
                    this.$router.replace({ name: "admin" });
                    //this.hideModal();
                } else {
                    console.log("The username and / or password is incorrect");
                }
            }
        }
    }
</script>

<style scoped></style>