
// 采用异步按需加载组件模式
const Index = () => import('../views/index/index.vue')
const Introduce = () => import('../views/index/introduce.vue')
const Token = () => import('../views/index/token.vue')
const Ecology = () => import('../views/index/ecology.vue')
const Track = () => import('../views/index/track.vue')

const routes = [
    {
        path: '/',
        redirect: 'index/introduce'
    },
    {path: '/index',
        meta: {keepAlive: true},
        redirect: '/index/introduce',
        component: Index,
        children: [
            {path: 'index',
                name: 'index',
                meta: {keepAlive: true},
                component: Introduce
            },
            {path: 'introduce',
                name: 'introduce',
                meta: {keepAlive: true},
                component: Introduce
            },
            {path: 'token',
                name: 'token',
                meta: {keepAlive: true},
                component: Token
            },
            {path: 'ecology',
                name: 'ecology',
                meta: {keepAlive: true},
                component: Ecology
            },
            {path: 'track',
                name: 'track',
                meta: {keepAlive: true},
                component: Track
            }
        ]
    }
]

export default routes
