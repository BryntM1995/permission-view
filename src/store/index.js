import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allData: [],
    allDataType: [],
  },
  getters: {},
  mutations: {
    setAllData(state, allData) {
      state.allData = allData;
    },
    setAllDataType(state, allDataType) {
      state.allDataType = allDataType;
    },
  },
  actions: {
    async fetchList({ commit }) {
      const response = await axios.get(
        "https://localhost:44377/api/Permission"
      );
      commit("setAllData", response.data);
    },
    async fetchListType({ commit }) {
      const response = await axios.get(
        "https://localhost:44377/api/PermissionType"
      );
      commit("setAllDataType", response.data);
    },
    async sendData({ commit }, data) {
      const response = await axios.post(
        "https://localhost:44377/api/Permission",
        data
      );
      commit("addData", response.data);
    },
    async sendDataType({ commit }, data) {
      try {
        const response = await axios.post(
          "https://localhost:44377/api/PermissionType",
          data
        );
        commit("addDataType", response.data);
        alert("Sent!");
      } catch (error) {
        console.error(error);
      }
    },
    async deletePermission({ commit }, id) {
      const response = await axios.delete(
        `https://localhost:44377/api/Permission/${id}`
      );
      commit("deleteItem", id);
    },
    async deletePermissionType({ commit }, id) {
      const response = await axios.delete(
        `https://localhost:44377/api/PermissionType/${id}`
      );
      commit("deleteItem", id);
    },
    async updatePermission({ commit }, newData) {
      await axios.put(
        `https://localhost:44377/api/Permission/${newData.id}`,
        newData
      );
      commit('updateItem',newData)
    },
    async updatePermissionType({ commit }, id, newData) {
      axios
        .put(`https://localhost:44377/api/PermissionType/${id}`, {
          value: newData,
        })
        .then((response) => {
          commit("updateItem", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  modules: {},
});
