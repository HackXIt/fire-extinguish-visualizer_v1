<template>
  <div class="home">
    <h1>This is the main Page.</h1>

    <h2>Testing area:</h2>
    <h3>Simple Data Example</h3>
    <br />
    <div class="container">
      <div class="simpleLabel">
        <button @click="simpleXOR()">XOR</button>
        {{ data }}
      </div>
      <vue-draggable-resizable
        class="simple"
        v-for="(bit, index) in simpleData"
        :key="index"
        :w="50"
        :h="50"
        :parent="true"
        :resizable="false"
        :x="(index + 5) * 50"
      >
        {{ `Bit-${index} => ` }}
        <status-indicator :status="bit ? 'positive' : 'negative'" />
      </vue-draggable-resizable>
    </div>
    <h3>Flatted Data Example (Array in Obj)</h3>
    <div class="container">
      <vue-draggable-resizable
        class="label"
        v-for="(obj, index) in nestedArrayObj.data"
        :key="obj.name"
        :h="50"
        :y="index * 50"
        :resizable="false"
        :draggable="false"
      >
        <button @click="nestedArrayXOR(obj.name)">XOR -> {{ obj.name }}</button>
        <br />
        {{ Object.values(obj.states) }}
      </vue-draggable-resizable>
      <vue-draggable-resizable
        class="inner"
        v-for="wrapper in flattenStatesArray(nestedArrayObj.data)"
        :key="wrapper.key"
        :resizable="false"
        :w="100"
        :h="50"
        :x="(wrapper.index + 5) * 100"
        :y="wrapper.objIndex * 50"
        :parent="true"
      >
        <div v-if="wrapper.obj.contentType === 'TypeA'">
          <b>{{ `Bit-${wrapper.index} of ${wrapper.obj.name}` }}</b>
          <br />
          <status-indicator :status="wrapper.state ? 'positive' : 'negative'" />
        </div>
        <div v-else>
          <b>{{ `Bit-${wrapper.index} of ${wrapper.obj.name}` }}</b>
          <br />
          <status-indicator
            :status="wrapper.state ? 'active' : 'intermediary'"
          />
        </div>
      </vue-draggable-resizable>
    </div>
    <h3>Flattened Data Example (Object in Object)</h3>
    <div class="container">
      <vue-draggable-resizable
        class="label"
        v-for="(obj, index) in nestedObjectObj.data"
        :key="obj.name"
        :h="50"
        :y="index * 50"
        :resizable="false"
        :draggable="false"
      >
        <button @click="nestedObjectXOR(obj.name)">
          XOR -> {{ obj.name }}
        </button>
        <br />
        {{ Object.values(obj.states) }}
      </vue-draggable-resizable>
      <vue-draggable-resizable
        class="inner"
        v-for="wrapper in flattenStatesObj(nestedObjectObj.data)"
        :key="wrapper.key"
        :resizable="false"
        :w="100"
        :h="50"
        :parent="true"
        :x="500 + wrapper.io * 100"
        :y="wrapper.objIndex * 50"
      >
        <div v-if="wrapper.obj.contentType === 'TypeA'">
          <b>{{ `Bit-${wrapper.io} of ${wrapper.obj.name}` }}</b>
          <br />
          <status-indicator :status="wrapper.state ? 'positive' : 'negative'" />
        </div>
        <div v-else>
          <b>{{ `Bit-${wrapper.io} of ${wrapper.obj.name}` }}</b>
          <br />
          <status-indicator
            :status="wrapper.state ? 'active' : 'intermediary'"
          />
        </div>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      simpleData: [0, 1, 0, 1],
      nestedArrayObj: {
        data: [
          {
            states: [0, 1, 0, 1],
            name: "a",
            contentType: "TypeA"
          },
          {
            states: [0, 1, 0, 1],
            name: "b",
            contentType: "TypeB"
          }
        ]
      },
      nestedObjectObj: {
        data: [
          {
            states: {
              1: 0,
              2: 1,
              3: 0,
              4: 1
            },
            name: "a",
            contentType: "TypeA"
          },
          {
            states: {
              1: 0,
              2: 1,
              3: 0,
              4: 1
            },
            name: "b",
            contentType: "TypeB"
          }
        ]
      }
    };
  },
  computed: {
    data() {
      return this.simpleData;
    }
  },
  methods: {
    simpleXOR() {
      var x = [];
      for (var i = 0; i < this.simpleData.length; i++) {
        x.push(this.simpleData[i] ^ 1);
      }
      this.simpleData = x;
      console.debug(this.simpleData);
    },
    nestedArrayXOR(name) {
      var index = this.nestedArrayObj.data.findIndex(obj => {
        return obj.name === name;
      });
      var x = [];
      for (var i = 0; i < this.nestedArrayObj.data[index].states.length; i++) {
        x.push(this.nestedArrayObj.data[index].states[i] ^ 1);
      }
      this.nestedArrayObj.data[index].states = x;
    },
    nestedObjectXOR(name) {
      var index = this.nestedObjectObj.data.findIndex(obj => {
        return obj.name === name;
      });
      for (const [io, state] of Object.entries(
        this.nestedObjectObj.data[index].states
      )) {
        this.nestedObjectObj.data[index].states[`${io}`] = state ^ 1;
      }
    },
    flattenStatesArray(objects) {
      console.debug("Executing flattenStatesArray...");
      return objects.flatMap((obj, objIndex) => {
        return obj.states.map((state, index) => {
          return {
            obj: obj,
            objIndex: objIndex,
            state: state,
            index: index,
            key: `Array-${obj.name}-${index}`
          };
        });
      });
    },
    flattenStatesObj(objects) {
      console.debug("Executing flattenStatesObj...");
      return objects.flatMap((obj, objIndex) => {
        return Object.keys(obj.states).map(io => {
          return {
            obj: obj,
            objIndex: objIndex,
            state: obj.states[io],
            io: io,
            key: `Object-${obj.name}-${io}`
          };
        });
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin: auto;
  height: 100px;
  width: 1000px;
  border: 2px solid black;
  position: relative;
}
.simple {
  top: 0px;
  left: 0px;
}
.simpleLabel {
  height: 50px;
  width: 20%;
  border: 1px dashed green;
}
.label {
  border: 1px dashed green;
  padding: 5px;
  width: 20%;
}
/* // This is the css for vue-draggable-resizable */
/* // DON'T EDIT unless customization is needed */
.vdr {
  touch-action: none;
  position: absolute;
  box-sizing: border-box;
  border: 1px dashed black;
}
.handle {
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  background: #eee;
  border: 1px solid #333;
}
.handle-tl {
  top: -10px;
  left: -10px;
  cursor: nw-resize;
}
.handle-tm {
  top: -10px;
  left: 50%;
  margin-left: -5px;
  cursor: n-resize;
}
.handle-tr {
  top: -10px;
  right: -10px;
  cursor: ne-resize;
}
.handle-ml {
  top: 50%;
  margin-top: -5px;
  left: -10px;
  cursor: w-resize;
}
.handle-mr {
  top: 50%;
  margin-top: -5px;
  right: -10px;
  cursor: e-resize;
}
.handle-bl {
  bottom: -10px;
  left: -10px;
  cursor: sw-resize;
}
.handle-bm {
  bottom: -10px;
  left: 50%;
  margin-left: -5px;
  cursor: s-resize;
}
.handle-br {
  bottom: -10px;
  right: -10px;
  cursor: se-resize;
}
@media only screen and (max-width: 768px) {
  [class*="handle-"]:before {
    content: "";
    left: -10px;
    right: -10px;
    bottom: -10px;
    top: -10px;
    position: absolute;
  }
}
</style>
