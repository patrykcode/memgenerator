
document.addEventListener('onloadDOMContent',function(){

    var app = new Vue({
        el:'#app',
        data(){
            return {
                layer:[]
            }
        },
        mounted(){
            this.layer.push('test')
        }
    })

})


