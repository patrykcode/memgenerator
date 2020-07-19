
document.addEventListener('DOMContentLoaded',function(){

    var app = new Vue({
        el:'#app',
        data(){
            return {
                layers:[]
            }
        },
        mounted(){
            this.layer.push('test')
        }
    })

})


