<template>
<div class="tools-container">
    <el-card>
        <el-button @click="$store.commit('compute')">Run</el-button>
    </el-card>
    <el-tabs type="border-card" class="fillHeight">
        <el-tab-pane label="Create">
            <div class="heading">Primitives</div>
            <div v-for="primitive in primitives" v-bind:key="primitive.title">
                <el-button size="mini" class="block-btn" @click="create(primitive.title)">{{primitive.title}}</el-button>
            </div>
            <br>
            <div class="heading">Operators</div>
            <div v-for="operator in operators" v-bind:key="operator.title">
                <el-button size="mini" class="block-btn" @click="create(operator.title)">{{operator.title}}</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Node" v-if="node">
            Id: {{node.id}}
            <el-input v-model="node.title" />
            <el-input :value="node.state.join(',')" v-on:change="node.state = $event.split(',')" />
        </el-tab-pane>
    </el-tabs>
</div>
</template>


<script>
export default {
    name: 'tools',
    computed:{
        node(){
            return this.$store.getters.node
        }
    },
    data(){
        return {
            operators: [
                {title:'Union'},
                {title:'Intersect'},
                {title:'Subsample'},
                {title:'Difference'}
            ],
            primitives: [
                {title:'SDR'},
                {title:'Map'},
                {title:'Classifier'},
            ]
        }
    },
    methods: {
        create(type){
            this.$store.commit('create',{type:type.toLowerCase()})
            this.$store.commit('compute')
        }
    }
}
</script>

<style>
    .tools-container {
        height: 100%;
    }
    .block-btn {
        width: 100%;
        margin: 2px;
    }
    .state-input input {
        display: inline !important;
        padding: 5px !important;
    }
</style>
