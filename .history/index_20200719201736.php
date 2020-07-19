<!DOCTYPE html>
<html>
    <head>
        <script src="js/index.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css"/>
    </head>
    <body>
        <div id="app">
            <div class="layer">
                <div class="layers-accordeon">
                    <div class="items-accordeon">
                        <button v-if="downloadUrl" class="btn btn-small btn-success w-100" v-on:click="downloadSVG()">pobierz</button>
                    </div>
                    <div v-bind:key="index" v-for="layer,index in layers" class="items-accordeon">
                        <div class="header" v-on:click="accordToggle(index)">
                            Pole tekstowe {{index+1}}
                        </div>
                        <div class="header-del" v-on:click="deleteLayer(index)">
                            <fa-trash  v-bind:size="15"/>
                        </div>
                        <div class="body" v-show.slow="layer.show"> 
                        <label for="">
                            czcionka
                        </label>
                        <select v-model="layer.data.style['font-family']">
                            <option>arial</option>
                            <option>ubuntu</option>
                            <option>helvetica</option>
                        </select>
                        <label for="">
                            wieklość czcionki
                        </label>
                        <input type="range"  min="1" max="75" v-model="layer.data.size" @change="layer.data.style['font-size']=layer.data.size+'px'" step="1"/>
                        <label for="">
                            tekst
                        </label>
                        <input type="text" v-model="layer.data.value">
                        <label for="">
                            color
                        </label>
                        <input type="color" v-model="layer.data.style.color">
                        
                        </div>
                    </div>
                    <div class="items-accordeon">
                        <button class="btn btn-primary btn-small w-100" v-on:click="addLayer()">
                            <fa-plus v-bind:size="15"/>
                        </button>
                    </div>
                </div>
            </div>
            <div id="canvas">
                <div v-bind:key="'element'+index" v-for="element,index in layers" v-bind:id="'element'+index">
                    <div v-on:mousedown="drag" v-bind:id="'handler'+index+'element'">
                        <component  @click.stop="event.stopPropagation()" :is="element.typ" v-bind:k="index" v-bind:elem="element.data"></component>
                    </div>
                </div>
            </div>
            <canvas id="layerCanvas" style="border:1px solid #000000;"></canvas>
        </div>
        
    </body>
</html>