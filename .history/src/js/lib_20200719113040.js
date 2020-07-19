
document.addEventListener('DOMContentLoaded',function(){

    var app = new Vue({
        el:'#app',
        data(){
            return {
                layers:[]
            }
        },
        mounted(){
            this.layers.push('test')
            this.layers.push('test1')
            this.layers.push('test2')
        }
    })

})


