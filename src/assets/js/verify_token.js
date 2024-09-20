import { useStore } from 'vuex';

export default async function () {
    let token = window.localStorage.getItem('token')
    let store = useStore();
    console.log(store);
    let verify_loc = store.state.location_prefix + '/users/verify'
    console.log('this is the verify location:@@', verify_loc)
    console.log('this is the verify token:@@', token)
    let _this=this
    return await fetch(verify_loc, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(async res => await res.json())
        .then(async res => {
            if (res.ok) {
                console.log('this is the verify result:@@', res)
                let target = store.state.location_prefix + '/users/info' + `?id=${res.data.id}`

                await fetch(target, {

                    method: 'GET'

                })
                    .then(async res => {
                        console.log(res)
                        return await res.json()
                    }).then(res => {
                        store.dispatch("setUserinfo", res);
                    })
                // this.setUserinfo({
                //     username: res.data.name,
                //     userid: res.data.id
                // })
                // this.$emit('verified')
                return true
            }
            else {
                return false
            }
        })
        .catch(err => {
            console.log(err)
            return false
        })
}