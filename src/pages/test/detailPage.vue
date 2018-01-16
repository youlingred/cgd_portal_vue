<template>
  <detail></detail>
</template>
<script>
  import detail from '@/components/Detail.vue'

  export default {
    components:{
      detail
    },
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    }
  }
</script>
