import { createRouter, createWebHistory } from "vue-router";
import verify_token from '@/assets/js/verify_token'
// import { getToken } from '@/utils/TokenUtils';

const routes = [{
    name: "main",
    path: "/main",
    component: () => import("@/components/HomeView.vue"),
    children: [
        {
            name: "users",
            path: "user",
            component: () => import("@/components/User.vue")
        }
    ]
},{
    name: 'front_page',
    path: '/',
    component: () => import("@/pages/front_page.vue")
}, {
    name: "test",
    path: "/test",
    component: () => import("@/test/TestTemplate.vue")
}, {
    name: 'homepage',
    path: '/homepage',
    component: () => import("@/pages/homepage.vue"),
    
    redirect: {
        name: 'order_center'
    },
    children: [
        {
            name: 'order_center',
            path: 'order_center',
            component: () => import("@/components/home_page/order_center.vue")
        },
        {
            name: 'person_center',
            path: 'person_center',
            component: () => import("@/components/home_page/person_center.vue")
        },
        {
            name: 'collection_center',
            path: 'collection_center',
            component: () => import("@/components/home_page/collection_center.vue")
        },
        {
            name: 'resign_center',
            path: 'resign_center',
            component: () => import("@/components/home_page/resign_center.vue")

        }
    ]
}, {
    name: 'product',
    path: '/product',
    component: () => import("@/pages/product.vue")
}, {
    name:'cart_success',
    path:'/cart_success',
    component: () => import("@/pages/cart_success_page.vue")
}, {
    name:'cart_calc',
    path:'/cart_calc',
    component: () => import("@/pages/cart_calc.vue"),
    redirect:{
        name:'part1'
    },
    children:[
        {
            name:'part1',
            path:'part1',
            component: () => import("@/components/cart_calc/cart_calc_part1.vue")
        },
        {
            name:'part2',
            path:'part2',
            component: () => import("@/components/cart_calc/cart_calc_part2.vue")
        },
        {
            name:'part3',
            path:'part3',
            component: () => import("@/components/cart_calc/cart_calc_part3.vue")
        }
    ]
}
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

// //to：目标路由 from：来源路由 next：函数，指定去哪个路由
// router.beforeEach((to, from, next) => {
//     let jwt = getToken();//先取出token

//     //next();

//     if (jwt) {//如果有token
//         if (to.name === "login") {
//             next({ name: "users" });
//         } else {
//             next();
//         }
//     } else {//没有token
//         if (to.name !== "login") {
//             next({ name: "login" });
//         } else {
//             next();
//         }
//     } 
// });

router.beforeEach((to, from, next) =>{
    // debugger
    console.log('to:@@',to,'from:@@',from)
    let check_res = verify_mixin();
    check_res.then(res => {
        console.log(res);
    });
    next();
    // let next_res = next(async (vm) => {
    //     console.log("66666666666666666666666666666666");
    //     if (await verify_token.apply(vm)) {
    //         console.log('verify successful')
    //         return true
    //     }
    //     else {
    //         console.log('verification failed!@@')
    //         debugger
    //         vm.$router.push({
    //             name: 'front_page'
    //         })
    //         // vm.$root.$emit('bv::show::modal', 'myModal'); 
    //         vm.$store.dispatch('modal', 1)   
    //     }

    // });
    // next_res.then(res=>{
    //     console.log(res);
    // });
});

async function verify_mixin() {
    // console.log("66666666666666666666666666666666");
    if (await verify_token()) {
        console.log('verify successful')
        return true
    }
    else {
        console.log('verification failed!@@')
        debugger
        // vm.$router.push({
        //     name: 'front_page'
        // })
        // vm.$root.$emit('bv::show::modal', 'myModal'); 
        // vm.$store.dispatch('modal', 1)
        return false;
    }
};

export default router;