<template>
    <div>
        <!-- Top Navbar -->
        <Navbar></Navbar>
        <div class="d-flex">
            <!-- Sidebar -->
            <Sidebar></Sidebar>
            <!-- Main Content -->
            <div class=" content w-100">
                <h1>Caregory</h1>
                <div class="d-flex justify-content-end  my-5" >
                    <button class="btn bg-primary text-light" @click="openCreate">Add Category</button>
                </div>
                <BaseTable :columns="columns" :rows="categoryStore.categories"  @edit="onOpenEdit" @delete="openDelete" :loading = categoryStore.islodading></BaseTable>
                <BasePagination :totalPages=categoryStore.pagination.totalPages
                    :current=categoryStore.pagination.currentPage @update:page=handleNexPage></BasePagination>
            </div>
            <!-- Modal for Create and Updat -->
            <BaseModal v-if="showModal" :title = "titleModal" @close="showModal=false">
                <div>
                    <label for="">Category name</label>
                    <input type="text" class="form-control" v-model="name">
                </div>
                <template #footer>
                    <button class="btn bg-secondary text-light">cencel</button>
                    <button class="btn bg-primary text-light"@click="handleAction">{{ titleBtn }}</button>
                </template>
            </BaseModal>
            <!-- Modal for Delete -->
            <BaseModal v-if="modalDelete" title="Delete category"  @close="modalDelete = false">
                <div>
                    <p>Are you sure to want to delete this category?</p>
                </div>
                <template #footer>
                    <button class="btn bg-secondary text-light">cencel</button>
                    <button class="btn bg-danger text-light" @click="handleDelete">Delete</button>
                </template>
            </BaseModal>
        </div>
    </div>
</template>
<script setup>
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import { useCategoryStore } from '@/stores/category';
import BaseTable from '@/components/ui/BaseTable.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import { onMounted, ref } from 'vue';
import api from '@/api/http';
import BaseModal from '@/components/ui/BaseModal.vue';
let per_page = ref(10);
let categoryStore = useCategoryStore();
let showModal = ref(false);
let modalDelete = ref(false);
let titleModal = ref("Create Category");
let titleBtn = ref('Create')
let isEdit = ref(false);
let isId = ref(null)
let name = ref("")
let columns = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
]


// 1. Fetch data from API category
onMounted(async () => {
    await categoryStore.fetchCategory(1, per_page.value);
})
// 2. pagination

const handleNexPage = async (page) => {
    await categoryStore.fetchCategory(page, per_page.value);
}
const handleAction = async () =>{
    try{
        alert(isEdit.value)
       if(!isEdit.value){
           await api.post(`/categories`, {name: name.value});
        }else{
           await api.put(`/categories/${isEdit.value}`,{name: name.value});
           isEdit.value = false;
           
       }
    await categoryStore.fetchCategory(1, per_page.value);

        
    }catch(e){
        console.error(e)
    }finally{
        showModal.value = false;
        name.value = "";

    }
    
}
const openCreate = ()=>{
    showModal.value = true;
    titleModal.value = "Create Category"
    titleBtn.value = "Create";
    name.value = "";
}

const onOpenEdit = async(id)=>{
    isEdit.value = id;
    showModal.value = true;
    titleModal.value = "Update Category"
    titleBtn.value = "Update";
    let res = await api.get(`/categories/${id}`);
    name.value = res.data.data.name;
}
const openDelete = (id)=>{
    isId.value = id
    modalDelete.value = true;
}
const handleDelete = async() =>{
    try{
        await api.delete(`/categories/${isId.value}`)
        await categoryStore.fetchCategory(1, per_page.value);
    }catch(e){
        console.error(e)
    }finally{
        modalDelete.value = false;
    }
}
</script>