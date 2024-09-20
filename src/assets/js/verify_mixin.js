import verify_token from './verify_token'

//据说该方法被弃用了，所以搬到router里试试？？
export default {
    async beforeRouteEnter(to, from, next) {
        // debugger
        console.log('to:@@',to,'from:@@',from)
        await next(async (vm) => {
            if (await verify_token.apply(vm)) {
                console.log('verify successful')
                return true
            }
            else {
                console.log('verification failed!@@')
                debugger
                vm.$router.push({
                    name: 'front_page'
                })
                // vm.$root.$emit('bv::show::modal', 'myModal'); 
                vm.$store.dispatch('modal', 1)   
            }

        })
    }, 
}
