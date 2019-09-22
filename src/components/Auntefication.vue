<template>
<div></div>
</template>

<script>
import Axios from 'axios'
/* eslint-disable */
    const axInst = Axios.create({
        baseURL: `http://${window.location.hostname}:8080/api/v1`,
        proxyHeaders: false,
        credentials: false
    })
    export default {
        name: "Auntefication",

        data: () => ({
            auth: true
        }),
        mounted: function () {
            let token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            let url = "/checkToken?checkToken=" + token
            axInst.get(url).then((res) => {
                console.log(res);
                this.auth = res.data;
            })
        }
    }
</script>

<style scoped>

</style>
