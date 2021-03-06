
document.addEventListener('DOMContentLoaded',function(){
   
    Vue.component('fa-trash',{
        props:['size'],
        template:'<svg v-bind:width="size+\'px\'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z" class=""></path></svg>'
    })

    Vue.component('fa-plus',{
        props:['size'],
        template:'<svg v-bind:width="size+\'px\'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 64c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352m0-32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-60 206h-98v-98c0-6.6-5.4-12-12-12h-12c-6.6 0-12 5.4-12 12v98h-98c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h98v98c0 6.6 5.4 12 12 12h12c6.6 0 12-5.4 12-12v-98h98c6.6 0 12-5.4 12-12v-12c0-6.6-5.4-12-12-12z" class=""></path></svg>'
    })

    Vue.component('text-layer',{
        props:{
            elem:{
                type:Object,
                default: () => {
                    return{
                        style:'',
                        value:'Wpisz tekst'
                    } 
                }
            }
        },
        template:'<div class="layer-element" v-bind:style="elem.style">{{elem.value}}</div>'
    })

    var app = new Vue({
        el:'#app',
        data(){
            return {
                layers:[],
                fontSize: []
            }
        },
        mounted(){
            for(var i=1;i<73;i++){
                this.fontSize.push(i+'px');
            }
        },
        methods:{
            addLayer(){
                this.layers.push(new Layer({
                    
                }))
                this.render();
            },
            deleteLayer(i){
                this.layers.splice(i, 1);
            },
            render(){

                var c = document.getElementById("layerCanvas");
                console.log(c)
                var ctx = c.getContext("2d");

                var elements = this.layers;
                for(let i in elements){
                    let element = elements[i]
                    if(element.typ === 'text-layer'){
                        var style =  element.data.style 
                        ctx.style = style ;
                        console.log(element)
                        ctx.strokeText(element.data.value, style.left,style.top);
                    }
                }





            }

        }
    })

   
})


// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');

// var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
//   '<foreignObject width="100%" height="100%">' +
//   '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
//   '<em>I</em> like <span style="color:white; text-shadow:0 0 2px blue;">cheese</span>' +
//   '</div>' +
//   '</foreignObject>' +
//   '</svg>';

// var DOMURL = window.URL || window.webkitURL || window;

// var img = new Image();
// var svg = new Blob([data], {
//   type: 'image/svg+xml;charset=utf-8'
// });
// var url = DOMURL.createObjectURL(svg);

// img.onload = function() {
//   ctx.drawImage(img, 0, 0);
//   DOMURL.revokeObjectURL(url);
// }

// img.src = url;