
document.addEventListener('DOMContentLoaded',function(){
   
    Vue.component('fa-trash',{
        props:['size'],
        template:'<svg v-bind:width="size+\'px\'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z" class=""></path></svg>'
    })

    Vue.component('fa-plus',{
        props:['size'],
        template:'<svg v-bind:width="size+\'px\'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 64c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352m0-32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-60 206h-98v-98c0-6.6-5.4-12-12-12h-12c-6.6 0-12 5.4-12 12v98h-98c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h98v98c0 6.6 5.4 12 12 12h12c6.6 0 12-5.4 12-12v-98h98c6.6 0 12-5.4 12-12v-12c0-6.6-5.4-12-12-12z" class=""></path></svg>'
    })

    Vue.component('fa-img',{
        props:['size'],
        template:'<svg v-bind:width="size+\'px\'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M112 192a48 48 0 1 0-48-48 48 48 0 0 0 48 48zm0-64a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm304-96H32A32 32 0 0 0 0 64v384a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32zm0 416H32v-80h384zM85.2 336l52-69.33 40 53.33-12 16zm120 0l76-101.33 76 101.33zm210.8 0h-18.8L294 198.41c-6.06-8.07-19.56-8.07-25.62 0l-71.19 94.91L150 230.41c-6.06-8.07-19.56-8.07-25.62 0L45.18 336H32V64h384z" class=""></path></svg>'
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
    Vue.component('img-layer',{
        props:{
            elem:{
                type:Object,
                default: () => {
                    return{
                        style:'',
                        value:'/placeholder.png'
                    } 
                }
            }
        },
        template:'<div class="layer-element" v-bind:style="elem.style"><img v-bind:src="elem.value" style=""/></div>'
    })

    var app = new Vue({
        el:'#app',
        data(){
            return {
                layers:[],
                accordeon:[],
                fontSize: [],
                canvas:{
                    width:500,
                    height:500
                },
                downloadUrl:null,
                pos:{}
            }
        },
        mounted(){
            for(var i=1;i<73;i++){
                this.fontSize.push(i+'px');
            }
        },
        updated(e){
            console.log('update::',e)
        },
        methods:{
            accordToggle(index){
                this.layers.forEach(function(item){
                    item.show = false;
                });
                this.layers[index].show = true
            },
            addLayer(typ){
                this.layers.push(new Layer({typ:typ}))
                this.accordToggle(this.layers.length-1)
                setTimeout(this.render,200);
            },
            deleteLayer(i){
                this.layers.splice(i, 1);
            },
            switchLayer(i){
                this.layers[i].typ = 'img-layer'
                this.layers[i].data.value = (this.layers[i].typ == 'text-layer' ? 'Wpisz tekst' : window.location.href + 'placeholder.png')
                this.layers[i].data.style = this.layers[i].types[this.layers[i].typ]
            },
            htmlToXml(html) {
                var doc = document.implementation.createHTMLDocument('');
                doc.write(html);
                // doc.documentElement.setAttribute('xmlns', doc.documentElement.namespaceURI);
                html = (new XMLSerializer).serializeToString(doc.body);
                console.log(html);
                return html;
            },
            downloadSVG() {
                const element = document.createElement("a");
                element.download = "mem.png";
                element.href = this.downloadUrl;
                element.click();
                element.remove();
            },
            render(){
                var canvas = document.getElementById('layerCanvas');
                
                canvas.height = this.canvas.height;
                canvas.width = this.canvas.width;

                var ctx = canvas.getContext('2d');
                
                var data = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" '+
                  'width="'+this.canvas.width+'" height="'+this.canvas.height+'">' +
                  '<foreignObject width="'+this.canvas.width+'" height="'+this.canvas.height+'">' +
                  this.htmlToXml(document.getElementById('canvas').innerHTML) +
                  '</foreignObject>' +
                  '</svg>'; 

                var img = new Image();
                 var $this = this
                img.addEventListener('load', function() {
                    ctx.drawImage(img, 0, 0);
                    $this.downloadUrl = canvas.toDataURL("image/png");
                }, false);

                img.setAttribute('crossorigin', 'Anonymous');
                img.src = data;
               

            },
            drag(e){
                this.pos[e.target.id] = {
                    1:0,
                    2:0,
                    3:0,
                    4:0
                }
                // console.log(this.pos, e.target)
                e.stopPropagation();
                this.dragMouseDown(e)
            },
            dragMouseDown(e) {
                e.preventDefault();
                try{
                    this.pos[e.target.id][3] = e.clientX;
                    this.pos[e.target.id][4] = e.clientY;
                    document.onmouseup = this.closeDragElement;
                    document.onmousemove = this.elementDrag;
                }catch(e){}
            }, 
            elementDrag(e) {
                try{
                    var e = e || window.event;
                    e.preventDefault();
                    var elmnt = e.target
                    var k = elmnt.getAttribute('k')
                    this.pos[e.target.id][1] = this.pos[e.target.id][3] - e.clientX;
                    this.pos[e.target.id][2] = this.pos[e.target.id][4] - e.clientY;
                    this.pos[e.target.id][3] = e.clientX;
                    this.pos[e.target.id][4] = e.clientY;
                    elmnt.style.position = 'absolute';
                    elmnt.style.top = (elmnt.offsetTop - this.pos[e.target.id][2]) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - this.pos[e.target.id][1]) + "px";
                    this.layers[k].data.style.top =elmnt.style.top
                    this.layers[k].data.style.left =elmnt.style.left
                }catch(e){}
            },
            closeDragElement() {
                
                document.onmouseup = null;
                document.onmousemove = null;
                setTimeout(this.render,200);
            }
        }
    })

   
})



