
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
            this.layer.push('test1')
            this.layer.push('test2')
        }
    })

})


