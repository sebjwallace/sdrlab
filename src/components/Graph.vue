<template>
<div class="graph-container">
    <svg width="100%" height="100%" v-on:mousemove="moveMouse($event)"  v-on:mouseup="mouseDown = false">
        <g v-for="node in graph"
            v-bind:key="node.id"
            v-on:mousedown="mouseDown = true; mouseOn = true"
            v-on:mouseup="mouseDown = false; endConnection(node)"
            v-on:mouseleave="mouseOn = false"
            v-on:click="$store.commit('selectNode',{node})"
            v-on:mousemove="dragNode($event,node)">
            <rect :x="node.x" :y="node.y" width="100" height="40" class="node" fill="white"></rect>
            <text :x="node.x + 10" :y="node.y + 24" text-anchor="start">{{node.type}}</text>
            <text :x="node.x + 70" :y="node.y + 24" text-anchor="middle">{{(node.state || []).join(',')}}</text>
            <circle :cx="node.x+50" :cy="node.y" r="4" stroke="lightgray" stroke-width="1" fill="#e2e2e2"/>
            <circle :cx="node.x+50" :cy="node.y+40" r="4" stroke="lightgray" stroke-width="1" fill="#e2e2e2" v-on:mousedown="startConnection(node)"/>
            <path v-for="source in getSources(node)"
                v-bind:key="source.id"
                v-on:click="removeConnection(source,node)"
                :d="curveLine(node.x+50,node.y,source.x+50,source.y+40)"
                style="stroke-width:3;stroke:rgba(0,0,0,0.2);fill:none;"/>
        </g>
        <path
            v-if="connectingNode && mouseDown"
            :d="curveLine(connectingNode.x+50,connectingNode.y+40,mouseX-2,mouseY-2)"
            stroke-dasharray="5, 5"
            style="stroke-width:2;stroke:rgba(0,0,0,0.2);fill:none;"/>
    </svg>
</div>
</template>

<script>
export default {
    name: 'graph',
    computed:{
        graph(){
            return this.$store.getters.graph
        }
    },
    created(){
        this.$store.commit('compute')
    },
    data(){
        return {
            mouseX: false,
            mouseY: false,
            mouseDown: false,
            mouseOn: false,
            connectingNode: false
        }
    },
    methods: {
        compute: function(){
            this.$store.commit('compute')
        },
        getSources: function(node){
            const sources = []
            for(var i = 0; i < node.sources.length; i++)
                for(var j = 0; j < this.graph.length; j++)
                    if(this.graph[j].id == node.sources[i])
                        sources.push(this.graph[j])
            return sources
        },
        moveMouse: function(e){
            this.mouseX = e.clientX
            this.mouseY = e.clientY
        },
        dragNode: function(e,node){
            if(this.mouseDown && this.mouseOn){
                node.x += e.clientX - (this.mouseX || e.clientX)
                node.y += e.clientY - (this.mouseY || e.clientY)
            }
        },
        startConnection: function(node){
            this.connectingNode = node
        },
        endConnection: function(node){
            if(this.connectingNode && node){
                this.$store.commit('connect',{source:this.connectingNode,target:node})
                this.compute()
            }
            this.connectingNode = false
        },
        removeConnection: function(source,target){
            this.$store.commit('disconnect',{source,target})
            this.compute()
        },
        curveLine: function(x1,y1,x2,y2){
            return "M" + x1 + "," + y1 + " " +
            "C" + (x1 + 20) + "," + y1 + " " +
                (x2 - 20) + "," + y2 + " " +
                x2 + "," + y2
        }
    }
}
</script>

<style>
    .graph-container {
        width: 100%;
        height: 100%;
        background-color: #f7f7f7;
        background-image: url('http://api.thumbr.it/whitenoise-361x370.png?background=e8e8e800&noise=626262&density=40&opacity=5')
    }
    .node {
        stroke: lightgray;
        stroke-width: 1;
        cursor: pointer;
        user-select: none;
    }
    text {
        cursor: pointer;
        user-select: none;
    }
</style>
