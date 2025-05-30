<template>
     <div v-if="showAlert" :class="classStyle">
        <Icon :name="icon"/>
        <p>{{ props.message }}</p>
        <Icon :name="icon"/>
    </div>
</template>
<script setup lang="ts">
import { StateAlert } from '~/types/alert';


const props = defineProps<{
    message : string
    state : StateAlert | undefined
}>()

const showAlert = ref<boolean>(false)
const icon = ref<string>('')

const classStyle = computed(() : String => { 
    if(props.state == StateAlert.success ){
        icon.value = "material-symbols:swords"
        return "flex items-center justify-center gap-4 flex-row bg-success w-full mt-[5px] rounded p-[10px] text-text"
    }else{
        icon.value = "material-symbols:shield"
        return "flex items-center justify-center gap-4 flex-row bg-danger w-full mt-[5px] rounded p-[10px] text-text"
    }
})

const showAndDisapear = (show : Ref<boolean>) => {
        show.value = true
    setTimeout(() => {
        show.value = false
    }, 2000)
}

showAndDisapear(showAlert)

</script>