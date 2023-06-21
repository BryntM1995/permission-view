<template>
  <div>
    <section>
      <h4>Permission List</h4>
      <h4 v-show="allData.length === 0" class="mt-2">No Available Data to Display</h4>
      <!-- Button trigger modal -->
      <button @click="setEmptyValues" type="button" class="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Request a Permission
      </button>
      <!-- Button trigger modal -->
      <button @click="setEmptyValues" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add Permission description
      </button>
    </section>
    <section class="row row-cols-3">
      <div v-for="(entity, index) in allData" :key="index" class="col">
        <div class="card cardMainDiv">
          <img src="../assets/logo.png" class="card-img-top" alt="nothing">
          <div class="card-body">
            <h5 class="card-title">{{ entity.employeeFirstName }} {{ entity.employeeLastName }} </h5>
            <h5 id="permissionName">{{ dataConverter(entity.permissionTypeId) }}</h5>
            <p class="card-text">Date: {{ entity.permissionDate | formatDate('MMMM Do YYYY, h:mm:ss a') }}</p>
            <button @click="requestDeletion(entity.id)" class="btn btn-primary me-2">Delete</button>
            <button @click="drawAModal(index, entity.id)" type="button" class="btn btn-primary" data-bs-toggle="modal"
              data-bs-target="#editModal">Edit</button>
          </div>
        </div>
      </div>
    </section>
    <section>
      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header mb-3">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text">First Name</span>
                <input v-model="employeeFirstName" type="text" aria-label="First name" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Last Name</span>
                <input v-model="employeeLastName" type="text" aria-label="Last name" class="form-control">
              </div>
              <div class="mb-3">
                <select v-model="permissionTypeId" class="form-select" aria-label="Default select example">
                  <option value="" selected>Open this select menu</option>
                  <option v-for="(entityType, index) in allDataType" :key="index" :value="entityType.id">{{
                    entityType.description }}</option>
                </select>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Requested Date</span>
                <input v-model="permissionDate" type="datetime-local" aria-label="First name" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
              <button @click="setEmptyValues" type="button" class="btn btn-secondary"
                data-bs-dismiss="modal">Close</button>
              <button @click="toConfirm" type="button" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal2 -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text">Please name this description</span>
                <input v-model="description" type="text" aria-label="First name" class="form-control"
                  placeholder="Let us know the reason why you are missing.">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="addPermissionType" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save
                changes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal3 -->
      <div class="modal fade" id="editModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit a Permission</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text">First Name</span>
                <input v-model="employeeFirstName" type="text" aria-label="First name" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Last Name</span>
                <input v-model="employeeLastName" type="text" aria-label="Last name" class="form-control">
              </div>
              <div class="mb-3">
                <select v-model="permissionTypeId" class="form-select" aria-label="Default select example">
                  <option value="" selected>Open this select menu</option>
                  <option v-for="(entityType, index) in allDataType" :key="index" :value="entityType.id">{{
                    entityType.description }}</option>
                </select>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Requested Date</span>
                <input v-model="permissionDate" type="datetime-local" aria-label="First name" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
              <button @click="setEmptyValues" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button @click="editPermission" data-bs-dismiss="modal" type="button" class="btn btn-primary">Save
                changes</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import moment from 'moment';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'ShowData',
  props: {
  },
  filters: {
    formatDate(value, format) {
      if (!value) return '';
      return moment(value).format(format);
    },


  },
  computed: {
    ...mapState(['allData']),
    ...mapState(['allDataType']),
  },
  data() {
    return {
      id: "",
      employeeFirstName: "",
      employeeLastName: "",
      permissionDate: "",
      description: "",
      permissionTypeId: null,
    }
  },
  methods: {
    ...mapActions(['fetchList']),
    ...mapActions(['sendData']),
    ...mapActions(['fetchListType']),
    ...mapActions(['sendDataType']),
    ...mapActions(['deletePermission']),
    ...mapActions(['deletePermissionType']),
    ...mapActions(['updatePermission']),
    ...mapActions(['updatePermissionType']),
    async  toSendPermissionData() {
      const permissionData = {
        employeeFirstName: this.employeeFirstName,
        employeeLastName: this.employeeLastName,
        permissionTypeId: this.permissionTypeId,
        permissionDate: this.permissionDate,
      };

      await this.sendData(permissionData);
      this.fetchList();
      this.setEmptyValues();
    },
    async addPermissionType() {
      const dataType = {
        description: this.description,
      }
      await this.sendDataType(dataType);
      this.fetchList();
      this.setEmptyValues();
    },
    setEmptyValues() {
      this.employeeFirstName = '',
        this.employeeLastName = '',
        this.permissionDate = '',
        this.description = ''
      this.permissionTypeId = null;
    },
    toConfirm() {
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to perform this action?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.toSendPermissionData();
          Swal.fire('Action Performed', 'The action has been successfully completed.', 'success');
        } else {
          this.setEmptyValues();
          Swal.fire('Action Canceled', 'The action has been canceled.', 'info');
        }
      });
    },
    dataConverter(id) {
      if (!id) return "No Available Reason"
      const permissionType = this.allDataType.find(x => x.id == id);
      return permissionType.description;
    },
     requestDeletion(id) {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then( async (result) => {
        if (result.isConfirmed) {
          await this.deletePermission(id);
          Swal.fire('Saved!', '', 'success')
          this.fetchList();
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    },
    async deletePermissionType(id) {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then( async (result) => {
        if (result.isConfirmed) {
          await this.deletePermissionType(id);
          Swal.fire('Saved!', '', 'success')
          
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    },
    async editPermission() {
      
      const newValue = {
        id: this.id,
        employeeFirstName: this.employeeFirstName,
        employeeLastName: this.employeeLastName,
        permissionTypeId: this.permissionTypeId,
        permissionDate: this.permissionDate
      }
      await this.updatePermission(newValue)
      this.fetchList();
      this.setEmptyValues();
    },
    drawAModal(id , entityId) {
      this.id = entityId
      const newPermission = this.allData[id];
      this.employeeFirstName = newPermission.employeeFirstName,
        this.employeeLastName = newPermission.employeeLastName,
        this.permissionDate = newPermission.permissionDate,
        this.permissionTypeId = newPermission.permissionTypeId
    },
  },
  created() {
    this.fetchList();
    this.fetchListType();
  },
}
//vee validate, remove, update
</script>


<style scoped>
img {
  border-radius: 50%;
  height: 80px;
  width: 35%;
  border: solid black;
}

.cardMainDiv {
  display: flex;
  place-items: center;
  text-align: center;
  margin-top: 1%;
  margin-bottom: 2%;
  padding-top: 2%;
  background: linear-gradient(45deg, yellowgreen, transparent);
  width: 50%
}

h4 {
  font-weight: 500;
  border: solid 2px;
  text-align: center;
  background: linear-gradient(45deg, yellowgreen, transparent);
}

#permissionName {
  text-transform: capitalize;
  color: gray;
}
</style>
